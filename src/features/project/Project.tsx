import Empty from "antd/es/empty";
import Layout from "antd/es/layout";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { DocumentTree } from "src/features/document/DocumentTree";
import { EditorsWrapper } from "src/features/editor/EditorsWrapper";
import { RootState } from "src/rootReducer";
import styled from "styled-components";
import { EMPTY_PROJECT_MSG } from "./project-constants";

const { Sider, Content } = Layout;

const StyledSider = styled(Sider)`
  overflow: auto;
`;

export const Project: React.FC = () => {
  const document = useSelector((state: RootState) => state.document);

  return document.status === "empty" ? (
    <Content>
      <Empty description={EMPTY_PROJECT_MSG}></Empty>
    </Content>
  ) : (
    <Layout>
      <StyledSider theme="light" width={300}>
        <DocumentTree tree={document.tree}></DocumentTree>
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
};
