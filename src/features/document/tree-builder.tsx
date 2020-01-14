import { OpenAPIV3 } from "openapi-types";
import {
  getOrResolveRef,
  isOpenApiComplexType,
  OperationMethod,
  operationMethods
} from "../../shared/utils";

interface BaseTreeNode {
  title: string;
  key: string;
}

export interface LeafTreeNode extends BaseTreeNode {
  type: "Leaf";
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
}

export interface BranchTreeNode extends BaseTreeNode {
  type: "Branch";
  children: GeneralTreeNode[];
}

export type GeneralTreeNode = LeafTreeNode | BranchTreeNode;

const buildRequestBodyNode = (
  parentKey: string,
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  document: OpenAPIV3.Document
): LeafTreeNode | undefined => {
  const resolved = getOrResolveRef(requestBody, document);
  const schema = resolved.content?.["application/json"]?.schema;
  if (schema) {
    const resolvedSchema = getOrResolveRef(schema, document);
    if (isOpenApiComplexType(resolvedSchema)) {
      return {
        type: "Leaf",
        title: "requestBody",
        key: `${parentKey}-requestBody`,
        schema: resolvedSchema
      };
    }
  }
};

const buildResponseNodes = (
  parentKey: string,
  responses: OpenAPIV3.ResponsesObject,
  document: OpenAPIV3.Document
): LeafTreeNode[] => {
  const res: LeafTreeNode[] = [];

  for (const [code, response] of Object.entries(responses)) {
    const resolvedResponse = getOrResolveRef(response, document);
    const schema = resolvedResponse.content?.["application/json"]?.schema;
    if (schema) {
      const resolvedSchema = getOrResolveRef(schema, document);
      if (isOpenApiComplexType(resolvedSchema)) {
        const node: LeafTreeNode = {
          type: "Leaf",
          title: code,
          key: `${parentKey}-${code}`,
          schema: resolvedSchema
        };
        res.push(node);
      }
    }
  }
  return res;
};

const buildOperationTree = (
  parentKey: string,
  method: OperationMethod,
  operation: OpenAPIV3.OperationObject,
  document: OpenAPIV3.Document
): BranchTreeNode => {
  const key = `${parentKey}-${method}`;

  const children: GeneralTreeNode[] = [];

  const { responses, requestBody, operationId } = operation;

  if (responses) {
    const responsesKey = `${key}-responses`;
    const responsesNodes = buildResponseNodes(
      responsesKey,
      responses,
      document
    );
    if (responsesNodes.length > 0) {
      children.push({
        type: "Branch",
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

  const title = operationId ? `${method} - ${operationId}` : method;

  return {
    type: "Branch",
    title,
    key,
    children
  };
};

const buildPathTree = (
  parentKey: string,
  pathObj: OpenAPIV3.PathItemObject,
  document: OpenAPIV3.Document
): BranchTreeNode[] => {
  const res: BranchTreeNode[] = [];
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
): BranchTreeNode[] =>
  Object.entries(paths).map(
    ([path, pathObj]): BranchTreeNode => {
      const key = `path-${path}`;
      return {
        type: "Branch",
        title: path,
        key,
        children: buildPathTree(key, pathObj, document)
      };
    }
  );

const buildSchemasTree = (
  schemas: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>
): LeafTreeNode[] =>
  Object.entries(schemas).map(
    ([name, schema]): LeafTreeNode => ({
      type: "Leaf",
      title: name,
      key: `schema-${name}`,
      schema
    })
  );

export function buildDocumentTree(
  document?: OpenAPIV3.Document
): BranchTreeNode[] {
  const res: BranchTreeNode[] = [];

  if (document) {
    const { paths, components } = document;

    res.push({
      type: "Branch",
      title: "Paths",
      key: "paths",
      children: buildPathsTree(paths, document)
    });

    if (components && components.schemas) {
      res.push({
        type: "Branch",
        title: "Schemas",
        key: "schemas",
        children: buildSchemasTree(components.schemas)
      });
    }
  }

  return res;
}
