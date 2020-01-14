import { createSelector } from "@reduxjs/toolkit";
import { Tree } from "antd";
import { TreeNodeNormal } from "antd/lib/tree/Tree";
import { OpenAPIV3 } from "openapi-types";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import { getOrResolveRef, isOpenApiComplexType } from "../../shared/utils";

const operationMethods = ["get", "post", "put", "delete", "options"] as const;
type OperationMethod = typeof operationMethods[number];

const buildRequestBodyNode = (
  parentKey: string,
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  document: OpenAPIV3.Document
): TreeNodeNormal | undefined => {
  const resolved = getOrResolveRef(requestBody, document);
  const schema = resolved.content?.["application/json"]?.schema;
  if (schema) {
    const resolvedSchema = getOrResolveRef(schema, document);
    if (isOpenApiComplexType(resolvedSchema)) {
      return {
        title: "requestBody",
        key: `${parentKey}-requestBody`
      };
    }
  }
};

const buildResponseNodes = (
  parentKey: string,
  responses: OpenAPIV3.ResponsesObject,
  document: OpenAPIV3.Document
): TreeNodeNormal[] => {
  const res: TreeNodeNormal[] = [];

  for (const [code, response] of Object.entries(responses)) {
    const resolvedResponse = getOrResolveRef(response, document);
    const schema = resolvedResponse.content?.["application/json"]?.schema;
    if (schema) {
      const resolvedSchema = getOrResolveRef(schema, document);
      if (isOpenApiComplexType(resolvedSchema)) {
        const node: TreeNodeNormal = {
          title: code,
          key: `${parentKey}-${code}`
        };
        res.push(node);
      }
    }
  }
  return res;
};

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

const buildOperationTree = (
  parentKey: string,
  method: OperationMethod,
  operation: OpenAPIV3.OperationObject,
  document: OpenAPIV3.Document
): TreeNodeNormal => {
  const key = `${parentKey}-${method}`;

  const children: TreeNodeNormal[] = [];

  const { responses, requestBody } = operation;

  if (responses) {
    const responsesKey = `${key}-responses`;
    const responsesNodes = buildResponseNodes(
      responsesKey,
      responses,
      document
    );
    if (responsesNodes.length > 0) {
      children.push({
        title: "responses",
        key: responsesKey,
        children: responsesNodes
      });
    }
  }

  if (requestBody) {
    const requestBodyNode = buildRequestBodyNode(key, requestBody, document);
    if (requestBodyNode) {
      children.push(requestBodyNode);
    }
  }

  return {
    title: (
      <OperationNodeTitle
        method={method}
        operation={operation}
      ></OperationNodeTitle>
    ),
    key,
    children
  };
};

const buildPathTree = (
  parentKey: string,
  pathObj: OpenAPIV3.PathItemObject,
  document: OpenAPIV3.Document
): TreeNodeNormal[] => {
  const res: TreeNodeNormal[] = [];
  for (const method of operationMethods) {
    const operation = pathObj[method];
    if (operation) {
      res.push(buildOperationTree(parentKey, method, operation, document));
    }
  }
  return res;
};

const buildPathsTree = (
  paths: OpenAPIV3.PathsObject,
  document: OpenAPIV3.Document
): TreeNodeNormal[] =>
  Object.entries(paths).map(
    ([path, pathObj]): TreeNodeNormal => {
      const key = `path-${path}`;
      return {
        title: path,
        key,
        children: buildPathTree(key, pathObj, document)
      };
    }
  );

const buildSchemasTree = (schemas: Record<string, unknown>): TreeNodeNormal[] =>
  Object.keys(schemas).map(
    (name): TreeNodeNormal => ({ title: name, key: `schema-${name}` })
  );

const selectDocument = (state: RootState) =>
  state.document.status === "loaded" ? state.document.content : undefined;

const selectDocumentTree = createSelector(
  selectDocument,
  (document): TreeNodeNormal[] => {
    const res: TreeNodeNormal[] = [];

    if (document) {
      const { paths, components } = document;

      res.push({
        title: "Paths",
        key: "paths",
        children: buildPathsTree(paths, document)
      });

      if (components && components.schemas) {
        res.push({
          title: "Schemas",
          key: "schemas",
          children: buildSchemasTree(components.schemas)
        });
      }
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
