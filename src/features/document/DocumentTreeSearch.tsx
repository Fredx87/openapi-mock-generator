import Input from "antd/es/input";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

interface DocumentTreeSearchProps {
  searchTerm: string;
  onChange: (value: string) => void;
}

export const DocumentTreeSearch: React.FC<DocumentTreeSearchProps> = props => {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.value);
  };

  return (
    <Container>
      <Input
        allowClear
        placeholder="Search..."
        value={props.searchTerm}
        onChange={onChange}
      ></Input>
    </Container>
  );
};
