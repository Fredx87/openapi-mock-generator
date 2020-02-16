import * as D from "fp-ts/es6/Date";
import * as E from "fp-ts/es6/Either";
import * as IOE from "fp-ts/es6/IOEither";
import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import { DBSchema, IDBPDatabase, openDB } from "idb";
import { createContext } from "react";
import { RootState } from "src/rootReducer";
import { initialDocument } from "../features/document/document-slice";
import { DB_NAME, PROJECT_STATE_STORE, PROJECT_STORE } from "./constants";

export const DbContext = createContext<IDBPDatabase<MyDb> | undefined>(
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

export async function openDatabase(): Promise<IDBPDatabase<MyDb>> {
  const db = await openDB<MyDb>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(PROJECT_STORE, {
        keyPath: "id",
        autoIncrement: true
      });
      db.createObjectStore(PROJECT_STATE_STORE);
    },
    blocking() {
      db.close();
    }
  });
  return db;
}

export function getAllProjects(
  db: IDBPDatabase<MyDb>
): TE.TaskEither<Error, DbProject[]> {
  return TE.tryCatch(() => db.getAll(PROJECT_STORE), E.toError);
}

export function getProject(
  id: number,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<Error, DbProject> {
  return pipe(
    TE.tryCatch(() => db.get(PROJECT_STORE, id), E.toError),
    TE.chain(res =>
      res
        ? TE.right(res)
        : TE.left(
            new Error(`Project with id "${id}" not found in the database`)
          )
    )
  );
}

export function putProject(
  project: DbProject,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<Error, number> {
  return TE.tryCatch(() => db.put(PROJECT_STORE, project), E.toError);
}

export function putProjectState(
  state: RootState,
  key: number,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<Error, number> {
  return TE.tryCatch(() => db.put(PROJECT_STATE_STORE, state, key), E.toError);
}

export function createProject(
  project: DbProject,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<Error, number> {
  const toCreate = { ...project };
  delete toCreate["id"];
  return pipe(
    putProject(toCreate, db),
    TE.chain(key => putProjectState({ document: initialDocument() }, key, db))
  );
}

export function deleteProject(
  project: DbProject,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<Error, void> {
  const { id } = project;

  if (id === undefined) {
    return TE.left(new Error(`Cannot delete a project without id`));
  }

  return pipe(
    TE.tryCatch(() => db.delete(PROJECT_STORE, id), E.toError),
    TE.chain(() =>
      TE.tryCatch(() => db.delete(PROJECT_STATE_STORE, id), E.toError)
    )
  );
}

export function getProjectState(
  id: number,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<Error, RootState> {
  return pipe(
    TE.tryCatch(() => db.get("projectState", id), E.toError),
    TE.chain(res =>
      res ? TE.right(res) : TE.left(new Error("Project state not found"))
    )
  );
}

export function updateProjectModifiedAt(
  id: number,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<Error, void> {
  return pipe(
    getProject(id, db),
    TE.chain(current =>
      pipe(
        TE.fromIOEither<Error, Date>(IOE.rightIO(D.create)),
        TE.map<Date, DbProject>(date => ({ ...current, modifiedAt: date })),
        TE.chain(project => putProject(project, db)),
        TE.map(() => undefined)
      )
    )
  );
}
