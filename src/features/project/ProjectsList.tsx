import Empty from "antd/es/empty";
import Layout from "antd/es/layout";
import React from "react";
import styled from "styled-components";

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 50px 0;
`;

export const EMPTY_MESSAGE = "No project found. Please create a new project.";

export const ProjectsList: React.FC = () => {
  return (
    <StyledContent>
      <Empty description={EMPTY_MESSAGE} />
    </StyledContent>
  );
};
