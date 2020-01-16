import { Col, Layout, Row } from "antd";
import React from "react";
import "./App.css";
import { MyHeader } from "./components/MyHeader";
import { DocumentTree } from "./features/document/DocumentTree";
import { GeneratedEditor } from "./features/editor/GeneratedEditor";
import { SchemaEditor } from "./features/editor/SchemaEditor";

const { Header, Sider, Content } = Layout;
const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <MyHeader></MyHeader>
      </Header>
      <Layout>
        <Sider theme="light">
          <DocumentTree></DocumentTree>
        </Sider>
        <Content>
          <Row>
            <Col span={12}>
              <SchemaEditor></SchemaEditor>
            </Col>
            <Col span={12}>
              <GeneratedEditor></GeneratedEditor>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
