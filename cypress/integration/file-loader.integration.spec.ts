import { expectMessage } from "../support/message-checker";
import { toggleTreeNode, treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

describe("OpenAPI file loading and parsing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should return error when uploading invalid file", () => {
    uploadFile("openapi-invalid.json", "application/json");
    expectMessage("error", /invalid/i);
  });

  it("should return success message and build document tree when uploading valid YAML file", () => {
    uploadFile("pestore-expanded.yaml");

    expectMessage("success", /loaded.*success/i);

    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths").then(el => toggleTreeNode(el));
      cy.contains("li", "Schemas").then(el => toggleTreeNode(el));
      cy.findByText("Pet").should("exist");
    });
  });
});
