import Button from "antd/es/button";
import { saveAs } from "file-saver";
import cloneDeep from "lodash-es/cloneDeep";
import React from "react";
import styled from "styled-components";
import { DocumentState } from "../document/document-slice";
import { DOWNLOAD_SPEC_MSG } from "./constants";
import { OpenApiLoader } from "./OpenApiLoader";

const Container = styled.div`
  padding: 4px 0;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
`;

interface ProjectHeaderProps {
  projectName: string;
  document: DocumentState;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = props => {
  const { document, projectName } = props;
  const onDownloadClick = () => {
    if (document.status === "loaded") {
      const content = cloneDeep(document.content);
      delete content.playground;
      const blob = new Blob([JSON.stringify(content, null, 2)], {
        type: "application/json;charset=utf-8"
      });
      saveAs(blob, `${projectName}.json`);
    }
  };

  return (
    <Container>
      <Title>{projectName}</Title>
      <Button.Group>
        <OpenApiLoader></OpenApiLoader>
        <Button
          icon="download"
          disabled={document.status === "empty"}
          onClick={onDownloadClick}
        >
          {DOWNLOAD_SPEC_MSG}
        </Button>
      </Button.Group>
    </Container>
  );
};
