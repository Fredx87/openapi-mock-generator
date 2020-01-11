import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import { OpenAPIV2, OpenAPIV3 } from "openapi-types";
import SwaggerParser from "swagger-parser";
import { readAsText } from "../../shared/file-reader";
import { isOpenApiV3Document } from "../../shared/utils";

// TODO: PR to swagger-parser for including YAML types
const yamlParse = (SwaggerParser as any).YAML.parse as (
  text: string
) => OpenAPIV3.Document | OpenAPIV2.Document;

export function openApiParser(
  file: File
): TE.TaskEither<string, OpenAPIV3.Document> {
  return pipe(
    readAsText(file),
    TE.map(content => yamlParse(content)),
    TE.chain(content =>
      TE.tryCatch(
        () => SwaggerParser.bundle(content),
        e => String(e)
      )
    ),
    TE.chain(doc =>
      isOpenApiV3Document(doc)
        ? TE.right(doc)
        : TE.left("Cannot parse swagger document")
    )
  );
}
