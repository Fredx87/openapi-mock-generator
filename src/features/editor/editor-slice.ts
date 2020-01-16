import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  schemaValue?: string;
  generatedValue?: string;
}

const initialState: EditorState = {};

const slice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setSchemaValue(state, action: PayloadAction<string>) {
      state.schemaValue = action.payload;
    },
    parseSchemaValue(state) {}
  }
});

export const { setSchemaValue, parseSchemaValue } = slice.actions;
export const editorReducer = slice.reducer;
