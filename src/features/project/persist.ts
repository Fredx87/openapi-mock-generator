import { Middleware } from "@reduxjs/toolkit";
import { IDBPDatabase } from "idb";
import { RootState } from "src/rootReducer";
import { getProjectState, MyDb, putProjectState } from "./database";

const LAST_PROJECT_ID_KEY = "MockGenerator-LastProjectId";

export function saveLastProjectId(id: number) {
  localStorage.setItem(LAST_PROJECT_ID_KEY, id.toString());
}

export function persistStateMiddleware(
  db: IDBPDatabase<MyDb>
): Middleware<{}, RootState> {
  return store => next => action => {
    next(action);
    const id = +localStorage.getItem(LAST_PROJECT_ID_KEY)!;
    putProjectState(store.getState(), id, db)().then(res => console.log);
  };
}

export function getStoredState(db: IDBPDatabase<MyDb>): Promise<RootState> {
  const id = localStorage.getItem(LAST_PROJECT_ID_KEY);
  if (id) {
    return getProjectState(+id, db)().then(res => {
      if (res._tag === "Right") {
        return res.right;
      } else {
        throw new Error("error");
      }
    });
  }
  return Promise.resolve({ document: { status: "empty", tree: [] } });
}
