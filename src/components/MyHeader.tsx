import { PageHeader } from "antd";
import React from "react";
import { OpenApiLoader } from "./OpenApiLoader";

export const MyHeader: React.FC = () => (
  <PageHeader
    backIcon={false}
    title="OpenApi Fake Generator"
    extra={[<OpenApiLoader></OpenApiLoader>]}
  ></PageHeader>
);
