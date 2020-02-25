import Layout from "antd/es/layout";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { DocumentState } from "../document/document-slice";
import { DocumentTree } from "../document/DocumentTree";
import { ProjectHeader } from "./ProjectHeader";

const { Sider } = Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface ProjectSiderProps {
  document: DocumentState;
}

export const ProjectSider: React.FC<ProjectSiderProps> = props => {
  const location = useLocation();
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    const paths = location.pathname.split("/");
    setProjectName(decodeURIComponent(paths[2]));
  }, [location]);

  return (
    <Sider theme="light" width={300}>
      <Container>
        <ProjectHeader
          projectName={projectName}
          document={props.document}
        ></ProjectHeader>
        {props.document.status === "loaded" && (
          <DocumentTree tree={props.document.tree}></DocumentTree>
        )}
      </Container>
    </Sider>
  );
};
