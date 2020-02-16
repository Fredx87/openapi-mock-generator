import React from "react";
import styled from "styled-components";
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
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = props => {
  return (
    <Container>
      <Title>{props.projectName}</Title>
      <OpenApiLoader></OpenApiLoader>
    </Container>
  );
};
