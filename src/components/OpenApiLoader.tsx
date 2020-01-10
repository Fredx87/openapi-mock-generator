import { Button, Icon, message, Upload } from "antd";
import React from "react";

export const OpenApiLoader: React.FC = () => {
  function beforeUpload(file: File): boolean {
    message.error("Invalid OpenApi file");
    return false;
  }
  return (
    <Upload beforeUpload={beforeUpload} showUploadList={false}>
      <Button>
        <Icon type="upload" /> Load OpenApi file
      </Button>
    </Upload>
  );
};
