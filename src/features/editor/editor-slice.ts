import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jsf from "json-schema-faker";
import $RefParser from "json-schema-ref-parser";
import cloneDeep from "lodash-es/cloneDeep";
import { AppThunk } from "../../store";

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
    setGeneratedValue(state, action: PayloadAction<string>) {
      state.generatedValue = action.payload;
    }
  }
});

export const { setSchemaValue, setGeneratedValue } = slice.actions;
export const editorReducer = slice.reducer;

export const generateModel = (): AppThunk => (dispatch, getState) => {
  const { editor, document } = getState();
  const { schemaValue } = editor;
  if (document.status === "loaded" && schemaValue) {
    const schema = JSON.parse(schemaValue);
    const schemas = document.content.components?.schemas;

    const schemaObj = {
      ...schema,
      components: {
        schemas: cloneDeep(schemas)
      }
    };

    $RefParser
      .dereference(schemaObj)
      .then(parsedSchema => {
        jsf.option("alwaysFakeOptionals", true);
        const generated = jsf.generate(parsedSchema);
        dispatch(setGeneratedValue(JSON.stringify(generated)));
      })
      .catch(err => {
        console.error(err);
      });
  }
};
