import Layout from "antd/es/layout";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { DocumentTree } from "src/features/document/DocumentTree";
import { EditorsWrapper } from "src/features/editor/EditorsWrapper";
import styled from "styled-components";

const { Sider, Content } = Layout;

const StyledSider = styled(Sider)`
  overflow: auto;
`;

export const Project: React.FC = () => (
  <Layout>
    <StyledSider theme="light" width={300}>
      <DocumentTree></DocumentTree>
    </StyledSider>
    <Content>
      <Switch>
        <Route path="/:referenceName">
          <EditorsWrapper></EditorsWrapper>
        </Route>
      </Switch>
    </Content>
  </Layout>
);
