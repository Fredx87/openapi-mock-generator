import { emptyProjects } from "cypress/fixtures/db/emptyProjects";
import { petStoreState } from "cypress/fixtures/db/petStore-state";
import { schemaEditorTestId } from "cypress/support/selectors";
import { DB_NAME } from "src/database/constants";
import { EMPTY_PROJECT_MSG } from "src/features/project/constants";
import { expectMessage } from "../support/message-checker";
import { treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

describe("OpenAPI file loading and parsing", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase(DB_NAME);
    cy.createProjects(emptyProjects);
  });

  it("should return error when uploading invalid file", () => {
    cy.visit("#/1/PetStore");

    cy.findByText(EMPTY_PROJECT_MSG);

    uploadFile("openapi-invalid.json");

    expectMessage("error", /invalid/i);
  });

  it("should return success message and build document tree when uploading valid YAML file", () => {
    cy.visit("#/1/PetStore");

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
      cy.visit("#/1/PetStore", {
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

  it("should merge new uploaded definition with previous one", () => {
    cy.setProjectState(1, petStoreState);

    cy.visit("#/1/PetStore/%23%2Fcomponents%2Fschemas%2FNewPet");

    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea")
          .type("{pagedown}{uparrow}{uparrow}{leftarrow}", {
            force: true
          })
          .type(`,{enter}"x-chance": "animal"{esc}`, { force: true });
      });

    uploadFile("pestore-expanded.yaml");

    expectMessage("success", /loaded.*success/i);

    cy.visit("#/1/PetStore/%23%2Fcomponents%2Fschemas%2FNewPet");

    const expected = {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string"
        },
        tag: {
          type: "string",
          "x-chance": "animal"
        }
      }
    };

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        expect(JSON.parse(value)).deep.equal(expected);
      });
  });
});
