import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import * as E from "fp-ts/es6/Either";
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import set from "lodash-es/set";
import { OpenAPIV3 } from "openapi-types";
import { RootState } from "../../rootReducer";
import { convertRefToPath, safeJsonParse } from "../../shared/utils";
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

function initialState(): DocumentState {
  return {
    status: "empty",
    tree: []
  };
}

interface SetRefValuePayload {
  ref: string;
  value: string;
}

const slice = createSlice({
  name: "document",
  initialState: initialState(),
  reducers: {
    setDocument: (
      _,
      action: PayloadAction<OpenAPIV3.Document>
    ): LoadedDocumentState => ({
      status: "loaded",
      content: action.payload,
      tree: buildDocumentTree(action.payload)
    }),
    setRefValue(state, action: PayloadAction<SetRefValuePayload>) {
      if (state.status === "loaded") {
        const { ref, value } = action.payload;

        pipe(
          safeJsonParse(value),
          O.map(parsed =>
            pipe(
              convertRefToPath(ref),
              O.fold(
                () => {
                  console.error(`Cannot convert ref ${ref}`);
                },
                path => {
                  set(state.content, path, parsed);
                }
              )
            )
          )
        );
      }
    }
  }
});

export const { setDocument, setRefValue } = slice.actions;
export const documentReducer = slice.reducer;

export const getDocument = (state: RootState) =>
  state.document.status === "loaded" ? state.document.content : undefined;

export const parseOpenApiFile = (file: File): AppThunk => dispatch => {
  openApiParser(file)().then(res =>
    pipe(
      res,
      E.fold(
        err => {
          console.error(err);
          message.error("Invalid OpenApi file");
        },
        res => {
          dispatch(setDocument(res));
          message.success("File loaded successfully");
        }
      )
    )
  );
};
