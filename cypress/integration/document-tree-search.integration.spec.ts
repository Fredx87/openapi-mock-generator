import { treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

describe("OpenAPI Document Tree / Search", () => {
  beforeEach(() => {
    cy.visit("/");
    uploadFile("pestore-expanded.yaml");
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
