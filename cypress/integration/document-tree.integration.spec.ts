import { treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

describe("OpenAPI Document Tree", () => {
  beforeEach(() => {
    cy.visit("/");
    uploadFile("pestore-expanded.yaml");
  });

  it("pestore-expanded.yaml - should build /pets - get tree correctly", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets")
        .toggleTreeNode()
        .contains("li", /get.*findPets/)
        .toggleTreeNode()
        .contains("li", "responses")
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("responsesNodes");
        });

      cy.get("@responsesNodes").should("have.length", 2);
      cy.get("@responsesNodes")
        .eq(0)
        .should("contain.text", "200");
      cy.get("@responsesNodes")
        .eq(1)
        .should("contain.text", "default");
    });
  });

  it("pestore-expanded.yaml - should build /pets - post tree correctly", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets")
        .toggleTreeNode()
        .contains("li", /post.*addPet/)
        .as("apiNode")
        .toggleTreeNode()
        .contains("li", "responses")
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("responsesNodes");
        });

      cy.get("@apiNode")
        .contains("li", "requestBody")
        .should("exist");

      cy.get("@responsesNodes").should("have.length", 2);
      cy.get("@responsesNodes")
        .eq(0)
        .should("contain.text", "200");
      cy.get("@responsesNodes")
        .eq(1)
        .should("contain.text", "default");
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
        .contains("li", "responses")
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("responsesNodes");
        });

      cy.get("@responsesNodes").should("have.length", 2);
      cy.get("@responsesNodes")
        .eq(0)
        .should("contain.text", "200");
      cy.get("@responsesNodes")
        .eq(1)
        .should("contain.text", "default");
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
        .contains("li", "responses")
        .toggleTreeNode()
        .within(() => {
          cy.get("li").as("responsesNodes");
        });

      cy.get("@responsesNodes").should("have.length", 1);
      cy.get("@responsesNodes")
        .eq(0)
        .should("contain.text", "default");
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
        .should("contain.text", "Pet");
      cy.get("@schemasNodes")
        .eq(1)
        .should("contain.text", "NewPet");
      cy.get("@schemasNodes")
        .eq(2)
        .should("contain.text", "Error");
    });
  });
});
