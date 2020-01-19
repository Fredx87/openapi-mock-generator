import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../rootReducer";
import { setSchemaValue } from "./editor-slice";

const Editor = styled.textarea`
  width: 100%;
  min-height: 300px;
`;

export const SchemaEditor: React.FC = () => {
  const editorValue = useSelector(
    (state: RootState) => state.editor.schemaValue
  );
  const dispatch = useDispatch();

  const options: monacoEditor.editor.IEditorConstructionOptions = {
    minimap: { enabled: false },
    lineNumbers: "off"
  };

  const onChange = (value: string) => {
    dispatch(setSchemaValue(value));
  };

  return (
    <MonacoEditor
      data-testid="schema-editor"
      language="json"
      height={300}
      value={editorValue}
      onChange={onChange}
      options={options}
    ></MonacoEditor>
  );
};
