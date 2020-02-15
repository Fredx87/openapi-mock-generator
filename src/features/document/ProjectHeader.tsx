import React from "react";
import styled from "styled-components";
import { OpenApiLoader } from "./OpenApiLoader";

const Container = styled.div`
  padding: 4px 0;
  text-align: center;
`;

export const ProjectHeader: React.FC = () => {
  return (
    <Container>
      <OpenApiLoader></OpenApiLoader>
    </Container>
  );
};
