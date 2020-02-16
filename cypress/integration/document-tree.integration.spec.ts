import { emptyProjects } from "cypress/fixtures/db/emptyProjects";
import { petStoreState } from "cypress/fixtures/db/petStore-state";
import { DB_NAME } from "src/database/constants";
import { treeTestId } from "../support/tree";

describe("OpenAPI Document Tree", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase(DB_NAME);
    cy.createProjects(emptyProjects);
    cy.setProjectState(1, petStoreState);
    cy.visit("/1/PetStore");
  });

  it("pestore-expanded.yaml - should build /pets - get tree correctly", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets")
        .toggleTreeNode()
        .contains("li", /get.*findPets/)
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("apiChildren");
        });

      cy.get("@apiChildren").should("have.length", 2);

      cy.get("@apiChildren")
        .eq(0)
        .should("contain.text", "response - 200");

      cy.get("@apiChildren")
        .eq(1)
        .should("contain.text", "response - default");
    });
  });

  it("pestore-expanded.yaml - should build /pets - post tree correctly", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets")
        .toggleTreeNode()
        .contains("li", /post.*addPet/)
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("apiChildren");
        });

      cy.get("@apiChildren").should("have.length", 3);

      cy.get("@apiChildren")
        .eq(0)
        .should("contain.text", "requestBody");

      cy.get("@apiChildren")
        .eq(1)
        .should("contain.text", "response - 200");

      cy.get("@apiChildren")
        .eq(2)
        .should("contain.text", "response - default");
    });
  });

  it("pestore-expanded.yaml - should build /pets/{id} - get tree correctly", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets/{id}")
        .toggleTreeNode()
        .contains("li", /get.*find pet by id/)
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("apiChildren");
        });

      cy.get("@apiChildren").should("have.length", 2);
      cy.get("@apiChildren")
        .eq(0)
        .should("contain.text", "response - 200");
      cy.get("@apiChildren")
        .eq(1)
        .should("contain.text", "response - default");
    });
  });

  it("pestore-expanded.yaml - should build /pets/{id} - delete tree correctly", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets/{id}")
        .toggleTreeNode()
        .contains("li", /delete.*deletePet/)
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("apiChildren");
        });

      cy.get("@apiChildren").should("have.length", 1);
      cy.get("@apiChildren")
        .eq(0)
        .should("contain.text", "response - default");
    });
  });

  it("pestore-expanded.yaml - should build Schemas tree correctly", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas")
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("schemasNodes");
        });

      cy.get("@schemasNodes").should("have.length", 3);

      cy.get("@schemasNodes")
        .eq(0)
        .should("contain.text", "Error");

      cy.get("@schemasNodes")
        .eq(1)
        .should("contain.text", "NewPet");

      cy.get("@schemasNodes")
        .eq(2)
        .should("contain.text", "Pet");
    });
  });

  it("should have Playground item in the tree", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Playground").should("exist");
    });
  });

  it("should open and close nodes", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas")
        .as("schemasNode")
        .toggleTreeNode();

      cy.get("li").should("have.length", 6);
      cy.contains("li", "Pet").click();

      cy.get("@schemasNode").toggleTreeNode();

      cy.get("li").should("have.length", 3);
    });
  });
});
