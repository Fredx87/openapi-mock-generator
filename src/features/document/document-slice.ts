import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import * as E from "fp-ts/es6/Either";
import { pipe } from "fp-ts/es6/pipeable";
import { OpenAPIV3 } from "openapi-types";
import { AppThunk } from "../../store";
import { openApiParser } from "./openapi-parser";
import { BranchTreeNode, buildDocumentTree } from "./tree-builder";

interface EmptyDocumentState {
  status: "empty";
  tree: BranchTreeNode[];
}

interface LoadedDocumentState {
  status: "loaded";
  content: OpenAPIV3.Document;
  tree: BranchTreeNode[];
}

type DocumentState = EmptyDocumentState | LoadedDocumentState;

const slice = createSlice({
  name: "document",
  initialState: {
    status: "empty",
    tree: []
  } as DocumentState,
  reducers: {
    setDocument: (
      _,
      action: PayloadAction<OpenAPIV3.Document>
    ): LoadedDocumentState => ({
      status: "loaded",
      content: action.payload,
      tree: buildDocumentTree(action.payload)
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
