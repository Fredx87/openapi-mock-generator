import {
  Action,
  AnyAction,
  configureStore,
  getDefaultMiddleware,
  Reducer
} from "@reduxjs/toolkit";
import { IDBPDatabase } from "idb";
import { ThunkAction } from "redux-thunk";
import { MyDb } from "./features/project/database";
import { persistStateMiddleware } from "./features/project/persist";
import { rootReducer, RootState } from "./rootReducer";

const SET_STORE_ACTION_TYPE = "db/set store";

export interface SetStoreAction {
  type: typeof SET_STORE_ACTION_TYPE;
  payload: RootState;
}

const wrappedReducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === SET_STORE_ACTION_TYPE) {
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
