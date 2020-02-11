import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import { DBSchema, IDBPDatabase, openDB } from "idb";
import React from "react";
import { rootReducer, RootState } from "src/rootReducer";
import { DB_NAME, PROJECT_STATE_STORE, PROJECT_STORE } from "./db-constants";

export const DbContext = React.createContext<IDBPDatabase<MyDb> | undefined>(
  undefined
);

export interface DbProject {
  id?: number;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface MyDb extends DBSchema {
  project: {
    key: number;
    value: DbProject;
  };
  projectState: {
    key: number;
    value: RootState;
  };
}

export function openDatabase(): Promise<IDBPDatabase<MyDb>> {
  return openDB<MyDb>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(PROJECT_STORE, {
        keyPath: "id",
        autoIncrement: true
      });
      db.createObjectStore(PROJECT_STATE_STORE);
    }
  });
}

export function getAllProjects(
  db: IDBPDatabase<MyDb>
): TE.TaskEither<string, DbProject[]> {
  return TE.tryCatch(
    () => db.getAll(PROJECT_STORE),
    e => `Cannot get all projects from database: ${String(e)}`
  );
}

export function putProject(
  project: DbProject,
  key: number | undefined,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<string, number> {
  return TE.tryCatch(
    () => db.put(PROJECT_STORE, project, key),
    e => `Cannot put project in database: ${String(e)}`
  );
}

export function putProjectState(
  state: RootState,
  key: number,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<string, number> {
  return TE.tryCatch(
    () => db.put(PROJECT_STATE_STORE, state, key),
    e => `Cannot put project state in database: ${String(e)}`
  );
}

export function createProject(
  project: DbProject,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<string, number> {
  const toCreate = { ...project };
  delete toCreate["id"];
  return pipe(
    putProject(toCreate, undefined, db),
    TE.chain(key =>
      putProjectState(rootReducer(undefined, { type: "@@INIT@@" }), key, db)
    )
  );
}
