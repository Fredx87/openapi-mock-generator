import { expectMessage } from "../support/message-checker";
import { toggleTreeNode } from "../support/tree";

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

  it("should return success message and build document tree when uploading valid YAML file", () => {
    cy.fixture("pestore-expanded.yaml").then(fileContent => {
      cy.contains(`[role="button"]`, /load openapi/i).within(() => {
        cy.get("input").upload({
          fileContent,
          fileName: "pestore-expanded.yaml",
          mimeType: "application/x-yaml",
          encoding: "utf8"
        });
      });
    });

    expectMessage("success", /loaded.*success/i);

    cy.findByTestId("document-tree").within(() => {
      cy.contains("li", "Paths").then(el => toggleTreeNode(el));
      cy.contains("li", "Schemas").then(el => toggleTreeNode(el));
      cy.findByText("Pet").should("exist");
    });
  });
});
