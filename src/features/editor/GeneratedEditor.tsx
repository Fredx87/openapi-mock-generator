import React from "react";
import styled from "styled-components";

const Editor = styled.textarea`
  width: 100%;
  min-height: 300px;
`;

export const GeneratedEditor: React.FC = () => {
  return <Editor data-testid="generated-editor"></Editor>;
};
