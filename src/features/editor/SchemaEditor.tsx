import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../rootReducer";
import { setSchemaValue } from "./editor-slice";

const EditorContainer = styled.div`
  width: 100%;
  height: 300px;
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
    <EditorContainer data-testid="schema-editor">
      <MonacoEditor
        language="json"
        value={editorValue}
        onChange={onChange}
        options={options}
      ></MonacoEditor>
    </EditorContainer>
  );
};
