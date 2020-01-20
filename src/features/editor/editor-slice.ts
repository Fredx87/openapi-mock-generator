import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

interface EditorState {
  currentRef?: string;
}

const initialState: EditorState = {};

const slice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCurrentRef(state, action: PayloadAction<string | undefined>) {
      state.currentRef = action.payload;
    }
  }
});

export const { setCurrentRef } = slice.actions;
export const editorReducer = slice.reducer;

export const getCurrentRef = (state: RootState) => state.editor.currentRef;
