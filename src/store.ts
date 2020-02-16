import {
  Action,
  AnyAction,
  configureStore,
  getDefaultMiddleware,
  Reducer
} from "@reduxjs/toolkit";
import { IDBPDatabase } from "idb";
import { ThunkAction } from "redux-thunk";
import { MyDb } from "./database/database";
import { persistStateMiddleware } from "./database/persist";
import { rootReducer, RootState } from "./rootReducer";

export const SET_PERSISTED_DOCUMENT_ACTION_TYPE = "db/set persisted document";

export interface SetPersistedDocumentAction {
  type: typeof SET_PERSISTED_DOCUMENT_ACTION_TYPE;
  payload: RootState;
}

const wrappedReducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === SET_PERSISTED_DOCUMENT_ACTION_TYPE) {
    return action.payload;
  }
  return rootReducer(state, action);
};

export function initStore(db: IDBPDatabase<MyDb>) {
  return configureStore({
    reducer: wrappedReducer,
    middleware: [...getDefaultMiddleware(), persistStateMiddleware(db)]
  });
}

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
