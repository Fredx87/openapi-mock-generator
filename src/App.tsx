import Layout from "antd/es/layout";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Project } from "src/features/project/Project";
import { ProjectsList } from "src/features/project/ProjectsList";
import styled from "styled-components";
import "./App.css";
import { MyHeader } from "./components/MyHeader";

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
            <ProjectsList />
          </Route>
          <Route path="/:projectName">
            <Project />
          </Route>
        </Switch>
      </StyledLayout>
    </BrowserRouter>
  );
};

export default App;
