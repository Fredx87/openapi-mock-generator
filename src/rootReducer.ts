import { combineReducers } from "@reduxjs/toolkit";
import { documentReducer } from "./features/document/document-slice";
import { editorReducer } from "./features/editor/editor-slice";

export const rootReducer = combineReducers({
  document: documentReducer,
  editor: editorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
