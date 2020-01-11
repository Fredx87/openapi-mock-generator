import { Layout } from "antd";
import React from "react";
import "./App.css";
import { MyHeader } from "./components/MyHeader";

const { Header, Sider, Content } = Layout;
const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <MyHeader></MyHeader>
      </Header>
      <Layout>
        <Sider></Sider>
        <Content></Content>
      </Layout>
    </Layout>
  );
};

export default App;
