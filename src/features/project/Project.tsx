import Empty from "antd/es/empty";
import Layout from "antd/es/layout";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { DocumentTree } from "src/features/document/DocumentTree";
import { EditorsWrapper } from "src/features/editor/EditorsWrapper";
import { RootState } from "src/rootReducer";
import styled from "styled-components";
import { EMPTY_PROJECT_MSG } from "./constants";
import { OpenApiLoader } from "./OpenApiLoader";

const { Sider, Content } = Layout;

const StyledContent = styled(Content)`
  text-align: center;
`;

const StyledEmpty = styled(Empty)`
  padding: 30px 0;
`;

const StyledSider = styled(Sider)`
  overflow: auto;
`;

export const Project: React.FC = () => {
  const document = useSelector((state: RootState) => state.document);
  const { path } = useRouteMatch();

  return document.status === "empty" ? (
    <StyledContent>
      <StyledEmpty description={EMPTY_PROJECT_MSG}></StyledEmpty>
      <OpenApiLoader />
    </StyledContent>
  ) : (
    <Layout>
      <StyledSider theme="light" width={300}>
        <DocumentTree tree={document.tree}></DocumentTree>
      </StyledSider>
      <Content>
        <Switch>
          <Route path={`${path}/:referenceName`}>
            <EditorsWrapper></EditorsWrapper>
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};
