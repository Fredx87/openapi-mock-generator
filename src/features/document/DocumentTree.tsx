import { createSelector } from "@reduxjs/toolkit";
import { Tree } from "antd";
import { TreeNodeNormal } from "antd/lib/tree/Tree";
import { OpenAPIV3 } from "openapi-types";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";

const operationMethods = ["get", "post", "put", "delete", "options"] as const;
type OperationMethod = typeof operationMethods[number];

interface OperationNodeTitleProps {
  method: OperationMethod;
  operation: OpenAPIV3.OperationObject;
}

const OperationNodeTitle: React.FC<OperationNodeTitleProps> = props => {
  const { operationId } = props.operation;
  return (
    <div>
      {props.method} {operationId && <span> - {operationId}</span>}
    </div>
  );
};

const buildOperationNode = (
  path: string,
  method: OperationMethod,
  operation: OpenAPIV3.OperationObject
): TreeNodeNormal => {
  return {
    title: (
      <OperationNodeTitle
        method={method}
        operation={operation}
      ></OperationNodeTitle>
    ),
    key: `path-${path}-${method}`
  };
};

const buildPathTree = (
  path: string,
  pathObj: OpenAPIV3.PathItemObject
): TreeNodeNormal[] => {
  const res: TreeNodeNormal[] = [];
  for (const method of operationMethods) {
    const operation = pathObj[method];
    if (operation) {
      res.push(buildOperationNode(path, method, operation));
    }
  }
  return res;
};

const buildPathsTree = (paths: OpenAPIV3.PathsObject): TreeNodeNormal[] =>
  Object.entries(paths).map(
    ([path, pathObj]): TreeNodeNormal => ({
      title: path,
      key: `path-${path}`,
      children: buildPathTree(path, pathObj)
    })
  );

const buildSchemasTree = (schemas: Record<string, unknown>): TreeNodeNormal[] =>
  Object.keys(schemas).map(
    (name): TreeNodeNormal => ({ title: name, key: `schema-${name}` })
  );

const selectPaths = (state: RootState) =>
  state.document.status === "loaded" ? state.document.content.paths : undefined;

const selectSchemas = (state: RootState) =>
  state.document.status === "loaded"
    ? state.document.content.components?.schemas
    : undefined;

const selectDocumentTree = createSelector(
  selectPaths,
  selectSchemas,
  (paths, schemas): TreeNodeNormal[] => {
    const res: TreeNodeNormal[] = [];
    if (paths) {
      res.push({
        title: "Paths",
        key: "paths",
        children: buildPathsTree(paths)
      });
    }
    if (schemas) {
      res.push({
        title: "Schemas",
        key: "schemas",
        children: buildSchemasTree(schemas)
      });
    }
    return res;
  }
);

export const DocumentTree: React.FC = () => {
  const treeData = useSelector(selectDocumentTree);

  return (
    <div data-testid="document-tree">
      <Tree treeData={treeData}></Tree>
    </div>
  );
};
