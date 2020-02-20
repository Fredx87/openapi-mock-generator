import Menu from "antd/es/menu";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const PAGE_TITLE = "OpenAPI Mock Generator";

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

const StyledA = styled.a`
  &&& {
    color: #ddd;
    line-height: 64px;

    &:hover {
      color: #fff;
    }
  }
`;

export const MyHeader: React.FC = () => (
  <Container>
    <h1>
      <StyledLink to="/">{PAGE_TITLE}</StyledLink>
    </h1>
    <Menu theme="dark" mode="horizontal">
      <Menu.Item>
        <StyledA
          href="https://github.com/Fredx87/openapi-mock-generator/blob/master/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </StyledA>
      </Menu.Item>
    </Menu>
  </Container>
);
