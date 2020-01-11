import { expectMessage } from "../support/message-checker";

describe("OpenAPI file loading and parsing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should return error when uploading invalid file", () => {
    cy.fixture("openapi-invalid.json").then(fileContent => {
      cy.contains(`[role="button"]`, /load openapi/i).within(() => {
        cy.get("input").upload({
          fileContent,
          fileName: "openapi-invalid.json",
          mimeType: "application/json",
          encoding: "utf8"
        });
      });
    });

    expectMessage("error", /invalid/i);
  });

  it("should return success message when uploading valid YAML file", () => {
    cy.fixture("petstore.yaml").then(fileContent => {
      debugger;
      cy.contains(`[role="button"]`, /load openapi/i).within(() => {
        cy.get("input").upload({
          fileContent,
          fileName: "petstore.yaml",
          mimeType: "application/x-yaml",
          encoding: "utf8"
        });
      });
    });

    expectMessage("success", /loaded.*success/i);
  });
});
