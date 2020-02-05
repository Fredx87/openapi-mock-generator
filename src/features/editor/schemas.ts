import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import chanceMethods from "./chance-methods";
import fakerMethods from "./faker-methods";

const fakerObjProperties = fakerMethods.reduce((acc, current) => {
  return {
    ...acc,
    [current]: {
      type: "array"
    }
  };
}, {});

const chanceObjProperties = chanceMethods.reduce((acc, current) => {
  return {
    ...acc,
    [current]: {
      oneOf: [{ type: "array" }, { type: "object" }]
    }
  };
}, {});

export const jsonDiagnosticOptions: monacoEditor.languages.json.DiagnosticsOptions = {
  validate: true,
  schemas: [
    {
      uri:
        "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/SchemaOrReference",
      fileMatch: ["*"],
      schema: {
        oneOf: [
          {
            $ref:
              "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema"
          },
          {
            $ref:
              "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference"
          }
        ]
      }
    },
    {
      uri:
        "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema",
      schema: {
        type: "object",
        properties: {
          "x-faker": {
            $ref: "https://github.com/Marak/faker.js/Schema"
          },
          "x-chance": {
            $ref: "https://chancejs.com/Schema"
          },
          title: {
            type: "string"
          },
          multipleOf: {
            type: "number",
            minimum: 0,
            exclusiveMinimum: true
          },
          maximum: {
            type: "number"
          },
          exclusiveMaximum: {
            type: "boolean",
            default: false
          },
          minimum: {
            type: "number"
          },
          exclusiveMinimum: {
            type: "boolean",
            default: false
          },
          maxLength: {
            type: "integer",
            minimum: 0
          },
          minLength: {
            type: "integer",
            minimum: 0,
            default: 0
          },
          pattern: {
            type: "string",
            format: "regex"
          },
          maxItems: {
            type: "integer",
            minimum: 0
          },
          minItems: {
            type: "integer",
            minimum: 0,
            default: 0
          },
          uniqueItems: {
            type: "boolean",
            default: false
          },
          maxProperties: {
            type: "integer",
            minimum: 0
          },
          minProperties: {
            type: "integer",
            minimum: 0,
            default: 0
          },
          required: {
            type: "array",
            items: {
              type: "string"
            },
            minItems: 1,
            uniqueItems: true
          },
          enum: {
            type: "array",
            items: {},
            minItems: 1,
            uniqueItems: false
          },
          type: {
            type: "string",
            enum: ["array", "boolean", "integer", "number", "object", "string"]
          },
          not: {
            oneOf: [
              {
                $ref:
                  "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema"
              },
              {
                $ref:
                  "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference"
              }
            ]
          },
          allOf: {
            type: "array",
            items: {
              oneOf: [
                {
                  $ref:
                    "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema"
                },
                {
                  $ref:
                    "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference"
                }
              ]
            }
          },
          oneOf: {
            type: "array",
            items: {
              oneOf: [
                {
                  $ref:
                    "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema"
                },
                {
                  $ref:
                    "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference"
                }
              ]
            }
          },
          anyOf: {
            type: "array",
            items: {
              oneOf: [
                {
                  $ref:
                    "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema"
                },
                {
                  $ref:
                    "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference"
                }
              ]
            }
          },
          items: {
            oneOf: [
              {
                $ref:
                  "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema"
              },
              {
                $ref:
                  "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference"
              }
            ]
          },
          properties: {
            type: "object",
            additionalProperties: {
              oneOf: [
                {
                  $ref:
                    "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema"
                },
                {
                  $ref:
                    "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference"
                }
              ]
            }
          },
          additionalProperties: {
            oneOf: [
              {
                $ref:
                  "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Schema"
              },
              {
                $ref:
                  "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference"
              },
              {
                type: "boolean"
              }
            ],
            default: true
          },
          description: {
            type: "string"
          },
          format: {
            type: "string"
          },
          default: {},
          nullable: {
            type: "boolean",
            default: false
          },
          discriminator: {
            $ref:
              "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Discriminator"
          },
          readOnly: {
            type: "boolean",
            default: false
          },
          writeOnly: {
            type: "boolean",
            default: false
          },
          example: {},
          externalDocs: {
            $ref:
              "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/ExternalDocumentation"
          },
          deprecated: {
            type: "boolean",
            default: false
          },
          xml: {
            $ref:
              "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/XML"
          }
        },
        patternProperties: {
          "^x-": {}
        },
        additionalProperties: false
      }
    },
    {
      uri:
        "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Reference",
      schema: {
        type: "object",
        required: ["$ref"],
        patternProperties: {
          "^\\$ref$": {
            type: "string",
            format: "uri-reference"
          }
        }
      }
    },
    {
      uri:
        "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/Discriminator",
      schema: {
        type: "object",
        required: ["propertyName"],
        properties: {
          propertyName: {
            type: "string"
          },
          mapping: {
            type: "object",
            additionalProperties: {
              type: "string"
            }
          }
        }
      }
    },
    {
      uri:
        "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/ExternalDocumentation",
      schema: {
        type: "object",
        required: ["url"],
        properties: {
          description: {
            type: "string"
          },
          url: {
            type: "string",
            format: "uri-reference"
          }
        },
        patternProperties: {
          "^x-": {}
        },
        additionalProperties: false
      }
    },
    {
      uri:
        "https://spec.openapis.org/oas/3.0/schema/2019-04-02/definitions/XML",
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          namespace: {
            type: "string",
            format: "uri"
          },
          prefix: {
            type: "string"
          },
          attribute: {
            type: "boolean",
            default: false
          },
          wrapped: {
            type: "boolean",
            default: false
          }
        },
        patternProperties: {
          "^x-": {}
        },
        additionalProperties: false
      }
    },
    {
      uri: "https://github.com/Marak/faker.js/Schema",
      schema: {
        oneOf: [
          {
            type: "string",
            enum: fakerMethods
          },
          {
            type: "object",
            properties: {
              fake: {
                type: "string"
              },
              ...fakerObjProperties
            }
          }
        ]
      }
    },
    {
      uri: "https://chancejs.com/Schema",
      schema: {
        oneOf: [
          {
            type: "string",
            enum: chanceMethods
          },
          {
            type: "object",
            properties: chanceObjProperties
          }
        ]
      }
    }
  ]
};
