import React from "react";
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

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setSchemaValue(event.target.value));
  };

  return (
    <Editor
      data-testid="schema-editor"
      value={editorValue}
      onChange={onChange}
    ></Editor>
  );
};
