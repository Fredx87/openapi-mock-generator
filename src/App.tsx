import Layout from "antd/es/layout";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { MyHeader } from "./components/MyHeader";
import { DocumentTree } from "./features/document/DocumentTree";
import { EditorsWrapper } from "./features/editor/EditorsWrapper";

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const StyledSider = styled(Sider)`
  overflow: auto;
`;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StyledLayout>
        <Header>
          <MyHeader></MyHeader>
        </Header>
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
      </StyledLayout>
    </BrowserRouter>
  );
};

export default App;
