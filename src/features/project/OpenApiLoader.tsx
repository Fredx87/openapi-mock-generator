import Button from "antd/es/button";
import Icon from "antd/es/icon";
import Upload from "antd/es/upload";
import React from "react";
import { useDispatch } from "react-redux";
import { parseOpenApiFile } from "../document/document-slice";

export const OpenApiLoader: React.FC = () => {
  const dispatch = useDispatch();

  function beforeUpload(file: File): boolean {
    dispatch(parseOpenApiFile(file));
    return false;
  }
  return (
    <Upload beforeUpload={beforeUpload} showUploadList={false}>
      <Button type="primary">
        <Icon type="upload" /> Load OpenApi file
      </Button>
    </Upload>
  );
};
