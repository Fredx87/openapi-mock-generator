import React from "react";
import styled from "styled-components";
import { OpenApiLoader } from "../features/document/OpenApiLoader";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #fff;
`;

export const MyHeader: React.FC = () => (
  <Container>
    <Title>OpenApi Fake Generator</Title>
    <OpenApiLoader></OpenApiLoader>
  </Container>
);
