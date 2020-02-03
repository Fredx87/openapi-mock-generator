import Col from "antd/es/col";
import Layout from "antd/es/layout";
import Row from "antd/es/row";
import React from "react";
import styled from "styled-components";
import "./App.css";
import { MyHeader } from "./components/MyHeader";
import { DocumentTree } from "./features/document/DocumentTree";
import { GeneratedEditor } from "./features/editor/GeneratedEditor";
import { SchemaEditor } from "./features/editor/SchemaEditor";

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const StyledRow = styled(Row)`
  height: 100%;
`;

const StyledCol = styled(Col)`
  height: 100%;
`;

const StyledSider = styled(Sider)`
  overflow: auto;
`;

const App: React.FC = () => {
  return (
    <StyledLayout>
      <Header>
        <MyHeader></MyHeader>
      </Header>
      <Layout>
        <StyledSider theme="light" width={300}>
          <DocumentTree></DocumentTree>
        </StyledSider>
        <Content>
          <StyledRow>
            <StyledCol span={12}>
              <SchemaEditor></SchemaEditor>
            </StyledCol>
            <StyledCol span={12}>
              <GeneratedEditor></GeneratedEditor>
            </StyledCol>
          </StyledRow>
        </Content>
      </Layout>
    </StyledLayout>
  );
};

export default App;
