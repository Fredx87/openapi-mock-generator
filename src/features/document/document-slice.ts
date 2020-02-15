import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import message from "antd/es/message";
import * as E from "fp-ts/es6/Either";
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import set from "lodash-es/set";
import { OpenAPIV3 } from "openapi-types";
import { RootState } from "../../rootReducer";
import { convertRefToPath, safeJsonParse } from "../../shared/utils";
import { AppThunk } from "../../store";
import { openApiParser } from "./openapi-parser";
import { buildDocumentTree, GeneralTreeNode } from "./tree-builder";

export interface MyDocument extends OpenAPIV3.Document {
  playground: unknown;
}

interface EmptyDocumentState {
  status: "empty";
}

interface LoadedDocumentState {
  status: "loaded";
  content: MyDocument;
  tree: GeneralTreeNode[];
}

type DocumentState = EmptyDocumentState | LoadedDocumentState;

export function initialDocument(): DocumentState {
  return {
    status: "empty"
  };
}

interface SetRefValuePayload {
  ref: string;
  value: string;
}

const slice = createSlice({
  name: "document",
  initialState: initialDocument(),
  reducers: {
    setDocument: (
      _,
      action: PayloadAction<OpenAPIV3.Document>
    ): LoadedDocumentState => {
      const content: MyDocument = {
        ...action.payload,
        playground: {}
      };

      return {
        status: "loaded",
        content,
        tree: buildDocumentTree(content)
      };
    },
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
