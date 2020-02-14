import { emptyProjects } from "cypress/fixtures/db/emptyProjects";
import {
  DB_NAME,
  EMPTY_PROJECT_MSG
} from "src/features/project/project-constants";
import { expectMessage } from "../support/message-checker";
import { treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

describe("OpenAPI file loading and parsing", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase(DB_NAME);
    cy.createProjects(emptyProjects);
    cy.visit("/1");
  });

  it("should return error when uploading invalid file", () => {
    cy.findByText(EMPTY_PROJECT_MSG);

    uploadFile("openapi-invalid.json", "application/json");

    expectMessage("error", /invalid/i);
  });

  it("should return success message and build document tree when uploading valid YAML file", () => {
    cy.findByText(EMPTY_PROJECT_MSG);

    uploadFile("pestore-expanded.yaml");

    expectMessage("success", /loaded.*success/i);

    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths").toggleTreeNode();
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.findByText("Pet").should("exist");
    });
  });
});
