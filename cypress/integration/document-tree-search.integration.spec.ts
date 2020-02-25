import { emptyProjects } from "cypress/fixtures/db/emptyProjects";
import { petStoreState } from "cypress/fixtures/db/petStore-state";
import { DB_NAME } from "src/database/constants";
import { treeTestId } from "../support/tree";

describe("OpenAPI Document Tree / Search", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase(DB_NAME);
    cy.createProjects(emptyProjects);
    cy.setProjectState(1, petStoreState);
    cy.visit("#/1/PetStore");
  });

  it("should find matches", () => {
    cy.findByPlaceholderText("Search...").type("et");

    cy.findByTestId(treeTestId).within(() => {
      cy.get("mark").should("have.length", 12);

      cy.contains("/pets")
        .children("mark")
        .should("have.length", 1);

      cy.contains("get - findPets")
        .children("mark")
        .should("have.length", 2);

      cy.contains("post - addPet")
        .children("mark")
        .should("have.length", 1);
    });

    cy.findByPlaceholderText("Search...").clear();
    cy.findByTestId(treeTestId).within(() => {
      cy.get("mark").should("have.length", 0);
    });
  });
});
