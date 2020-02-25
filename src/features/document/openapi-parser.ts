import { post } from "@contactlab/appy";
import { withBody } from "@contactlab/appy/combinators/body";
import { withDecoder } from "@contactlab/appy/combinators/decoder";
import * as E from "fp-ts/es6/Either";
import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import { OpenAPI, OpenAPIV2, OpenAPIV3 } from "openapi-types";
import { isOpenApiV2Document, isOpenApiV3Document } from "src/shared/utils";
import SwaggerParser from "swagger-parser";

// TODO: PR to swagger-parser for including YAML types
const yamlParse = (SwaggerParser as any).YAML.parse as (
  text: string
) => unknown;

function safeYamlParse(content: string): E.Either<Error, unknown> {
  return E.tryCatch(() => yamlParse(content), E.toError);
}

function convertOpenApi2to3(
  doc: OpenAPIV2.Document
): TE.TaskEither<Error, OpenAPIV3.Document> {
  const jsonPost = withDecoder(res => E.right(res as OpenAPIV3.Document))(
    withBody(doc)(post)
  );

  return pipe(
    jsonPost("https://converter.swagger.io/api/convert"),
    TE.mapLeft(E.toError),
    TE.map(res => res.data)
  );
}

function readAsText(file: File): TE.TaskEither<Error, string> {
  const reader = new Promise<string>(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      }
      reject(
        new Error(`Error reading ${file.name}: read content is not a string`)
      );
    };
    reader.onerror = e => {
      reject(new Error(`Error reading ${file.name}: ${e.type}`));
    };
    reader.readAsText(file);
  });
  return TE.tryCatch(() => reader, E.toError);
}

export function openApiParser(
  file: File
): TE.TaskEither<Error, OpenAPIV3.Document> {
  return pipe(
    readAsText(file),
    TE.chain(content => TE.fromEither(safeYamlParse(content))),
    TE.chain(content =>
      TE.tryCatch(
        // TODO: fix wrong type in SwaggerParser types
        () => SwaggerParser.bundle(content as OpenAPI.Document),
        E.toError
      )
    ),
    TE.chain(doc =>
      isOpenApiV3Document(doc)
        ? TE.right(doc)
        : isOpenApiV2Document(doc)
        ? convertOpenApi2to3(doc)
        : TE.left(new Error("Cannot parse swagger document"))
    )
  );
}
