import React from "react";
import styled from "styled-components";

const Editor = styled.textarea`
  width: 100%;
  min-height: 300px;
`;

export const SchemaEditor: React.FC = () => {
  return <Editor data-testid="schema-editor"></Editor>;
};
