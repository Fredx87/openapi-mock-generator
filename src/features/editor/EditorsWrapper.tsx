import Col from "antd/es/col";
import Row from "antd/es/row";
import React from "react";
import styled from "styled-components";
import { GeneratedEditor } from "./GeneratedEditor";
import { SchemaEditor } from "./SchemaEditor";

const StyledRow = styled(Row)`
  height: 100% !important;
`;

const StyledCol = styled(Col)`
  height: 100% !important;
`;

export const EditorsWrapper: React.FC = () => (
  <StyledRow>
    <StyledCol span={12}>
      <SchemaEditor></SchemaEditor>
    </StyledCol>
    <StyledCol span={12}>
      <GeneratedEditor></GeneratedEditor>
    </StyledCol>
  </StyledRow>
);
