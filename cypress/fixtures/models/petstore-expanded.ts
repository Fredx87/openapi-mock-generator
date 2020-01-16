import { OpenAPIV3 } from "openapi-types";

export const petModel = {
  allOf: [
    {
      $ref: "#/components/schemas/NewPet"
    },
    {
      type: "object",
      required: ["id"],
      properties: {
        id: {
          type: "integer",
          format: "int64"
        }
      }
    }
  ]
};

export const newPetModel: OpenAPIV3.NonArraySchemaObject = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    },
    tag: {
      type: "string"
    }
  }
};

export const errorModel: OpenAPIV3.NonArraySchemaObject = {
  type: "object",
  required: ["code", "message"],
  properties: {
    code: {
      type: "integer",
      format: "int32"
    },
    message: {
      type: "string"
    }
  }
};
