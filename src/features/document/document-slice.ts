import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import * as E from "fp-ts/es6/Either";
import { pipe } from "fp-ts/es6/pipeable";
import { OpenAPIV3 } from "openapi-types";
import { AppThunk } from "../../store";
import { openApiParser } from "./openapi-parser";

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

export const parseOpenApiFile = (file: File): AppThunk => dispatch => {
  openApiParser(file)().then(res =>
    pipe(
      res,
      E.fold(
        err => {
          console.error(err);
          message.error("Invalid OpenApi file");
        },
        doc => {
          dispatch(setDocument(doc));
          message.success("File loaded successfully");
        }
      )
    )
  );
};
