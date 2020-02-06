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
      cy.contains("/pets").should("have.html", "/p<mark>et</mark>s");
      cy.contains("get - findPets").should(
        "have.html",
        "g<mark>et</mark> - findP<mark>et</mark>s"
      );
      cy.contains("post - addPet").should(
        "have.html",
        "post - addP<mark>et</mark>"
      );
    });

    cy.findByPlaceholderText("Search...").clear();
    cy.findByTestId(treeTestId).within(() => {
      cy.get("mark").should("have.length", 0);
    });
  });
});
