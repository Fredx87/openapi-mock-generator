import { ANT_MESSAGE_ERROR_CLASS } from "../support/constants";

describe("OpenAPI file loading and parsing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should return error when uploading invalid file", () => {
    cy.fixture("openapi-invalid.json").then(fileContent => {
      cy.contains(".ant-upload", /load openapi/i).within(() => {
        cy.get("input").upload({
          fileContent,
          fileName: "openapi-invalid.json",
          mimeType: "application/json"
        });
      });
    });

    cy.get(ANT_MESSAGE_ERROR_CLASS)
      .contains(/invalid/i)
      .should("exist");
  });
});
