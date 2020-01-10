import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpenAPIV3 } from "openapi-types";

interface EmptyDocumentState {
  status: "empty";
}

interface LoadingDocumentState {
  status: "loading";
}

interface LoadedDocumentState {
  status: "loaded";
  content: OpenAPIV3.Document;
}

type DocumentState =
  | EmptyDocumentState
  | LoadingDocumentState
  | LoadedDocumentState;

const slice = createSlice({
  name: "document",
  initialState: {
    status: "empty"
  } as DocumentState,
  reducers: {
    setDocument: (
      _,
      action: PayloadAction<OpenAPIV3.Document>
    ): LoadedDocumentState => ({
      status: "loaded",
      content: action.payload
    })
  }
});

export const { setDocument } = slice.actions;
export const documentReducer = slice.reducer;
