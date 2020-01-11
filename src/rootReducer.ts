import { combineReducers } from "@reduxjs/toolkit";
import { documentReducer } from "./features/document/document-slice";

export const rootReducer = combineReducers({
  document: documentReducer
});

export type RootState = ReturnType<typeof rootReducer>;
