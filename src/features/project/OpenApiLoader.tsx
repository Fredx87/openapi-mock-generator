import Button from "antd/es/button";
import Icon from "antd/es/icon";
import Upload from "antd/es/upload";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { parseOpenApiFile } from "../document/document-slice";
import { UPLOAD_SPEC_MSG } from "./constants";

const StyledButton = styled(Button)`
  &&& {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

export const OpenApiLoader: React.FC = () => {
  const dispatch = useDispatch();

  function beforeUpload(file: File): boolean {
    dispatch(parseOpenApiFile(file));
    return false;
  }

  return (
    <Upload beforeUpload={beforeUpload} showUploadList={false}>
      <StyledButton type="primary">
        <Icon type="upload" /> {UPLOAD_SPEC_MSG}
      </StyledButton>
    </Upload>
  );
};
