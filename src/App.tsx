import Layout from "antd/es/layout";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProjectsListContainer } from "src/features/projects-list/ProjectsListContainer";
import styled from "styled-components";
import { MyHeader } from "./components/MyHeader";
import { ProjectContainer } from "./features/project/ProjectContainer";

const { Header } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StyledLayout>
        <Header>
          <MyHeader></MyHeader>
        </Header>
        <Switch>
          <Route exact path="/">
            <ProjectsListContainer />
          </Route>
          <Route path="/:projectId/:projectName">
            <ProjectContainer />
          </Route>
        </Switch>
      </StyledLayout>
    </BrowserRouter>
  );
};

export default App;
