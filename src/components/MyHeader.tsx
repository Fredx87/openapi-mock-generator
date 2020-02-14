import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { OpenApiLoader } from "../features/document/OpenApiLoader";

export const PAGE_TITLE = "OpenApi Fake Generator";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: #fff;

  &:hover {
    color: #fff;
  }
`;

export const MyHeader: React.FC = () => (
  <Container>
    <h1>
      <StyledLink to="/">{PAGE_TITLE}</StyledLink>
    </h1>
    <OpenApiLoader></OpenApiLoader>
  </Container>
);
