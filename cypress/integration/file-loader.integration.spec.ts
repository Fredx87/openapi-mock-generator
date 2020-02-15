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
  });

  it("should return error when uploading invalid file", () => {
    cy.visit("/1/PetStore");

    cy.findByText(EMPTY_PROJECT_MSG);

    uploadFile("openapi-invalid.json");

    expectMessage("error", /invalid/i);
  });

  it("should return success message and build document tree when uploading valid YAML file", () => {
    cy.visit("/1/PetStore");

    cy.findByText(EMPTY_PROJECT_MSG);

    uploadFile("pestore-expanded.yaml");

    expectMessage("success", /loaded.*success/i);

    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths").toggleTreeNode();
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.findByText("Pet").should("exist");
    });
  });

  it("should return success message and build document tree when uploading valid OpenAPI 2.0 file", () => {
    // TODO: convert to cypress native mock when this bug is fixed: https://github.com/cypress-io/cypress/issues/95
    cy.fixture("specs/petstore-2.0-converted.json").then(mocked => {
      cy.visit("/1/PetStore", {
        onBeforeLoad(win) {
          cy.stub(win, "fetch").resolves({
            ok: true,
            text: () => JSON.stringify(mocked)
          });
        }
      });
    });

    cy.findByText(EMPTY_PROJECT_MSG);

    uploadFile("petstore-2.0.json");

    expectMessage("success", /loaded.*success/i);

    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths").toggleTreeNode();
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.findByText("Pet").should("exist");
      cy.findByText("Pets").should("exist");
      cy.findByText("Error").should("exist");
    });
  });
});
