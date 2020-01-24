import { OpenAPIV3 } from "openapi-types";
import {
  getOrResolveRef,
  isOpenApiComplexType,
  OperationMethod,
  operationMethods
} from "../../shared/utils";

interface BaseTreeNode {
  title: string;
  ref: string;
}

export interface LeafTreeNode extends BaseTreeNode {
  type: "Leaf";
}

export interface BranchTreeNode extends BaseTreeNode {
  type: "Branch";
  children: GeneralTreeNode[];
}

export type GeneralTreeNode = LeafTreeNode | BranchTreeNode;

const escapeRef = (ref: string): string =>
  ref.replace(/~/g, "~0").replace(/\//g, "~1");

const buildRequestBodyNode = (
  parentRef: string,
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
        ref: `${parentRef}/requestBody/content/application~1json/schema`
      };
    }
  }
};

const buildResponseNodes = (
  parentRef: string,
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
          ref: `${parentRef}/${code}/content/application~1json/schema`
        };
        res.push(node);
      }
    }
  }
  return res;
};

const buildOperationTree = (
  parentRef: string,
  method: OperationMethod,
  operation: OpenAPIV3.OperationObject,
  document: OpenAPIV3.Document
): BranchTreeNode => {
  const ref = `${parentRef}/${method}`;

  const children: GeneralTreeNode[] = [];

  const { responses, requestBody, operationId } = operation;

  if (responses) {
    const responsesRef = `${ref}/responses`;
    const responsesNodes = buildResponseNodes(
      responsesRef,
      responses,
      document
    );
    if (responsesNodes.length > 0) {
      children.push({
        type: "Branch",
        title: "responses",
        ref: responsesRef,
        children: responsesNodes
      });
    }
  }

  if (requestBody) {
    const requestBodyNode = buildRequestBodyNode(ref, requestBody, document);
    if (requestBodyNode) {
      children.push(requestBodyNode);
    }
  }

  const title = operationId ? `${method} - ${operationId}` : method;

  return {
    type: "Branch",
    title,
    ref,
    children
  };
};

const buildPathTree = (
  parentRef: string,
  pathObj: OpenAPIV3.PathItemObject,
  document: OpenAPIV3.Document
): BranchTreeNode[] => {
  const res: BranchTreeNode[] = [];
  for (const method of operationMethods) {
    const operation = pathObj[method];
    if (operation) {
      res.push(buildOperationTree(parentRef, method, operation, document));
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
      const ref = `#/paths/${escapeRef(path)}`;
      return {
        type: "Branch",
        title: path,
        ref,
        children: buildPathTree(ref, pathObj, document)
      };
    }
  );

const buildSchemasTree = (
  schemas: Record<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>
): LeafTreeNode[] =>
  Object.keys(schemas).map(
    (name): LeafTreeNode => ({
      type: "Leaf",
      title: name,
      ref: `#/components/schemas/${name}`
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
      ref: "#/paths",
      children: buildPathsTree(paths, document)
    });

    if (components && components.schemas) {
      res.push({
        type: "Branch",
        title: "Schemas",
        ref: "#/components/schemas",
        children: buildSchemasTree(components.schemas)
      });
    }
  }

  return res;
}
