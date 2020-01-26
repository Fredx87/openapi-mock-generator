import {
  generatedModelLabel,
  schemaEditorLabel,
  suggestionSelector
} from "../support/selectors";
import { treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

describe("Editor", () => {
  beforeEach(() => {
    cy.visit("/");
    uploadFile("pestore-expanded.yaml");
  });

  it("should load Error schema for /pets - get - default response", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets")
        .toggleTreeNode()
        .contains("li", /get.*findPets/)
        .toggleTreeNode()
        .contains("li", "responses")
        .toggleTreeNode()
        .contains("li", "default")
        .clickTreeNode();
    });

    cy.findByLabelText(schemaEditorLabel).should(el => {
      const value = JSON.parse(el.val() as string);
      expect(value).deep.equal({ $ref: "#/components/schemas/Error" });
    });
  });

  it("should load NewPet schema for /pets - post - requestBody", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets")
        .toggleTreeNode()
        .contains("li", /post.*addPet/)
        .toggleTreeNode()
        .contains("li", "requestBody")
        .clickTreeNode();
    });

    cy.findByLabelText(schemaEditorLabel).should(el => {
      const value = JSON.parse(el.val() as string);

      expect(value).deep.equal({ $ref: "#/components/schemas/NewPet" });
    });
  });

  it("should format current schema and generated model with 2 spaces", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "NewPet").clickTreeNode();
    });

    cy.findByLabelText(schemaEditorLabel).should(elem => {
      const rows = (elem.val() as string).split("\n");
      expect(rows).to.have.length(14);
      expect(rows[0]).to.be.equal(`{`);
      expect(rows[1]).to.be.equal(`  "type": "object",`);
      expect(rows[2]).to.be.equal(`  "required": [`);
      expect(rows[3]).to.be.equal(`    "name"`);
      expect(rows[4]).to.be.equal(`  ],`);
    });

    cy.findByLabelText(generatedModelLabel).should(elem => {
      const rows = (elem.val() as string).split("\n");
      expect(rows).to.have.length(4);
      expect(rows[0]).to.be.equal("{");
      expect(rows[1].substring(0, 9)).to.be.equal(`  "name":`);
    });
  });

  it("should show autocomplete box with OpenAPI Schema suggestions when CTRL + space pressed", () => {
    cy.findByLabelText(schemaEditorLabel)
      .focus()
      .type("{{}{enter}")
      .type("{ctrl} ");

    cy.get(suggestionSelector).within(() => {
      cy.contains("type").should("exist");
      cy.contains("additionalProperties").should("exist");
      cy.contains("allOf").should("exist");
    });
  });

  it("should show autocomplete values for type property", () => {
    cy.findByLabelText(schemaEditorLabel)
      .as("editor")
      .focus()
      .type(`{{}{enter}"t`)
      .type("{ctrl} ")
      .get(suggestionSelector)
      .as("suggestions")
      .within(() => {
        cy.contains("type").click();
      })
      .get("@editor")
      .type(`"`)
      .type("{ctrl} ");

    cy.get("@suggestions").within(() => {
      cy.contains("object").should("exist");
      cy.contains("array").should("exist");
      cy.contains("string").should("exist");
    });
  });
});
