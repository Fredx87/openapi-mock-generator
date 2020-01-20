import * as A from "fp-ts/es6/Array";
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import * as t from "io-ts/es6";
import get from "lodash-es/get";
import { OpenAPI, OpenAPIV3 } from "openapi-types";

export const operationMethods = [
  "get",
  "post",
  "put",
  "delete",
  "options"
] as const;
export type OperationMethod = typeof operationMethods[number];

export function isOpenApiV3Document(
  doc: OpenAPI.Document
): doc is OpenAPIV3.Document {
  return "openapi" in doc;
}

export function convertRefToPath(ref: string): O.Option<string> {
  return pipe(
    ref.split("/"),
    A.map(el => el.replace(/~1/g, "/").replace(/~0/g, "~")),
    A.tail,
    O.map(chunks => chunks.join("."))
  );
}

export function getObjectByRef(
  ref: string,
  document: OpenAPIV3.Document
): any | undefined {
  return pipe(
    convertRefToPath(ref),
    O.map(path => get(document, path)),
    O.getOrElse(() => undefined)
  );
}

export const jsonSchemaRef = t.exact(t.type({ $ref: t.string }));

export function getOrResolveRef<T>(
  obj: OpenAPIV3.ReferenceObject | T,
  document: OpenAPIV3.Document
): T {
  return jsonSchemaRef.is(obj)
    ? (getObjectByRef(obj.$ref, document) as T)
    : obj;
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

export function safeJsonParse(input: string): O.Option<any> {
  return O.tryCatch(() => JSON.parse(input));
}
