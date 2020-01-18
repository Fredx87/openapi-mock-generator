import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../rootReducer";

const Editor = styled.textarea`
  width: 100%;
  min-height: 300px;
`;

export const GeneratedEditor: React.FC = () => {
  const editorValue = useSelector(
    (state: RootState) => state.editor.generatedValue
  );

  return (
    <Editor
      data-testid="generated-editor"
      value={editorValue}
      disabled
    ></Editor>
  );
};
