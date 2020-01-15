import { toggleTreeNode, treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

describe("OpenAPI Document Tree", () => {
  beforeEach(() => {
    cy.visit("/");
    uploadFile("pestore-expanded.yaml");
  });

  it("pestore-expanded.yaml - should build /pets - get tree correctly", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .then(el => toggleTreeNode(el))
        .contains("li", "/pets")
        .then(el => toggleTreeNode(el))
        .contains("li", /get.*findPets/)
        .then(el => toggleTreeNode(el))
        .contains("li", "responses")
        .then(el => toggleTreeNode(el))
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
        .then(el => toggleTreeNode(el))
        .contains("li", "/pets")
        .then(el => toggleTreeNode(el))
        .contains("li", /post.*addPet/)
        .as("apiNode")
        .then(el => toggleTreeNode(el))
        .contains("li", "responses")
        .then(el => toggleTreeNode(el))
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
        .then(el => toggleTreeNode(el))
        .contains("li", "/pets/{id}")
        .then(el => toggleTreeNode(el))
        .contains("li", /get.*find pet by id/)
        .then(el => toggleTreeNode(el))
        .contains("li", "responses")
        .then(el => toggleTreeNode(el))
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
        .then(el => toggleTreeNode(el))
        .contains("li", "/pets/{id}")
        .then(el => toggleTreeNode(el))
        .contains("li", /delete.*deletePet/)
        .then(el => toggleTreeNode(el))
        .contains("li", "responses")
        .then(el => toggleTreeNode(el))
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
        .then(el => toggleTreeNode(el))
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
