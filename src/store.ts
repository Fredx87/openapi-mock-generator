import { Action, AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
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

export function initStore() {
  return configureStore({
    reducer: wrappedReducer
  });
}

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
