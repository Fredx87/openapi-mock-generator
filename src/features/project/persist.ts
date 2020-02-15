import { Dispatch, Middleware } from "@reduxjs/toolkit";
import * as E from "fp-ts/es6/Either";
import * as IOE from "fp-ts/es6/IOEither";
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import { IDBPDatabase } from "idb";
import { RootState } from "src/rootReducer";
import { SetStoreAction } from "src/store";
import {
  getProjectState,
  MyDb,
  putProjectState,
  updateProjectModifiedAt
} from "./database";

export function getProjectId(): IOE.IOEither<string, number> {
  return pipe(
    IOE.fromOption(() => `Saved Project Id not found`)(
      O.fromNullable(window.location.pathname.split("/")?.[1])
    ),
    IOE.map(res => +res)
  );
}

function saveState(
  state: RootState,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<string, void> {
  return pipe(
    TE.fromIOEither(getProjectId()),
    TE.chain(id =>
      pipe(
        putProjectState(state, id, db),
        TE.chain(() => updateProjectModifiedAt(id, db))
      )
    )
  );
}

export function persistStateMiddleware(
  db: IDBPDatabase<MyDb>
): Middleware<{}, RootState> {
  return store => next => action => {
    next(action);
    saveState(store.getState(), db)().then(res =>
      pipe(
        res,
        E.fold(console.error, () => {})
      )
    );
  };
}

export function loadPersistedProject(
  id: number,
  dispatch: Dispatch,
  db: IDBPDatabase<MyDb>
): TE.TaskEither<string, void> {
  return pipe(
    getProjectState(id, db),
    TE.map(state => {
      const setStoreAction: SetStoreAction = {
        type: "db/set store",
        payload: state
      };
      dispatch(setStoreAction);
      return undefined;
    })
  );
}
