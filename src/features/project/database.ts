import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import { DBSchema, IDBPDatabase, openDB } from "idb";
import { RootState } from "src/rootReducer";

export const DB_NAME = "MockGenerator";
export const PROJECT_STORE = "project";

export interface DbProject {
  id?: number;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
  store?: RootState;
}

export interface MyDb extends DBSchema {
  project: {
    key: number;
    value: DbProject;
  };
}

export function openDatabase(): TE.TaskEither<string, IDBPDatabase<MyDb>> {
  return TE.tryCatch(
    () =>
      openDB<MyDb>(DB_NAME, 1, {
        upgrade(db) {
          db.createObjectStore(PROJECT_STORE, {
            keyPath: "id",
            autoIncrement: true
          });
        }
      }),
    e => `Cannot open database: ${String(e)}`
  );
}

export function getAllProjects(): TE.TaskEither<string, DbProject[]> {
  return pipe(
    openDatabase(),
    TE.chain(db =>
      TE.tryCatch(
        () => db.getAll(PROJECT_STORE),
        e => `Cannot get all projects from database: ${String(e)}`
      )
    )
  );
}

export function upsertProject(
  project: DbProject
): TE.TaskEither<string, number> {
  return pipe(
    openDatabase(),
    TE.chain(db =>
      TE.tryCatch(
        () => db.put(PROJECT_STORE, project),
        e => `Cannot create new project into database: ${String(e)}`
      )
    )
  );
}
