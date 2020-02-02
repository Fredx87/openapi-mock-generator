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
