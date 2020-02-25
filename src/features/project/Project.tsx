import Empty from "antd/es/empty";
import Layout from "antd/es/layout";
import Skeleton from "antd/es/skeleton";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { RootState } from "src/rootReducer";
import styled from "styled-components";
import { EMPTY_PROJECT_MSG } from "./constants";
import { ProjectSider } from "./ProjectSider";

const EditorsWrapper = React.lazy(() =>
  import("src/features/editor/EditorsWrapper")
);

const { Content } = Layout;

const StyledEmpty = styled(Empty)`
  padding: 30px 0;
`;

export const Project: React.FC = () => {
  const document = useSelector((state: RootState) => state.document);
  const { path } = useRouteMatch();

  return (
    <Layout>
      <ProjectSider document={document} />
      <Content>
        {document.status === "empty" ? (
          <StyledEmpty description={EMPTY_PROJECT_MSG} />
        ) : (
          <Switch>
            <Route path={`${path}/:referenceName`}>
              <React.Suspense fallback={<Skeleton />}>
                <EditorsWrapper />
              </React.Suspense>
            </Route>
          </Switch>
        )}
      </Content>
    </Layout>
  );
};
