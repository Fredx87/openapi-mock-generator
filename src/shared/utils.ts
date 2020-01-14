import * as t from "io-ts/es6";
import get from "lodash-es/get";
import { OpenAPI, OpenAPIV3 } from "openapi-types";

export function isOpenApiV3Document(
  doc: OpenAPI.Document
): doc is OpenAPIV3.Document {
  return "openapi" in doc;
}

export function getObjectByRef(
  ref: OpenAPIV3.ReferenceObject,
  document: OpenAPIV3.Document
) {
  const chunks = ref.$ref.split("/");
  const path = chunks.splice(1, chunks.length).join(".");
  return get(document, path);
}

export const jsonSchemaRef = t.exact(t.type({ $ref: t.string }));

export function getOrResolveRef<T>(
  obj: OpenAPIV3.ReferenceObject | T,
  document: OpenAPIV3.Document
): T {
  return jsonSchemaRef.is(obj) ? (getObjectByRef(obj, document) as T) : obj;
}

export function isOpenApiComplexType(schema: OpenAPIV3.SchemaObject) {
  return (
    schema.allOf ||
    schema.anyOf ||
    schema.oneOf ||
    schema.type === "array" ||
    schema.type === "object"
  );
}
