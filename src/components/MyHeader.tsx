import Icon from "antd/es/icon";
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

const StyledMenuItem = styled(Menu.Item)`
  &&&.ant-menu-item-selected {
    background-color: transparent;
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

const StyledAIcon = styled.a`
  &&& {
    font-size: 30px;
    line-height: 64px;

    i {
      font-size: 30px;
    }
  }
`;

export const MyHeader: React.FC = () => (
  <Container>
    <h1>
      <StyledLink to="/">{PAGE_TITLE}</StyledLink>
    </h1>
    <Menu theme="dark" mode="horizontal">
      <StyledMenuItem>
        <StyledA
          href="https://github.com/Fredx87/openapi-mock-generator/blob/master/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </StyledA>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledA
          href="http://marak.github.io/faker.js/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Faker.js APIs
        </StyledA>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledA
          href="https://chancejs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chance APIs
        </StyledA>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledAIcon
          href="https://github.com/Fredx87/openapi-mock-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="github" />
        </StyledAIcon>
      </StyledMenuItem>
    </Menu>
  </Container>
);
