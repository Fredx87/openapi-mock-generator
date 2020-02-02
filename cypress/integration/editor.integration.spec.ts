import {
  generatedEditorTestId,
  schemaEditorTestId,
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
        .contains("li", "response - default")
        .clickTreeNode();
    });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        expect(JSON.parse(value)).deep.equal({
          $ref: "#/components/schemas/Error"
        });
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

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        expect(JSON.parse(value)).deep.equal({
          $ref: "#/components/schemas/NewPet"
        });
      });
  });

  it("should format current schema and generated model with 2 spaces", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "NewPet").clickTreeNode();
    });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        const rows = value.split("\n");
        expect(rows).to.have.length(14);
        expect(rows[0]).to.be.equal(`{`);
        expect(rows[1]).to.be.equal(`  "type": "object",`);
        expect(rows[2]).to.be.equal(`  "required": [`);
        expect(rows[3]).to.be.equal(`    "name"`);
        expect(rows[4]).to.be.equal(`  ],`);
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoValue()
      .should(value => {
        const rows = value.split("\n");
        expect(rows).to.have.length(4);
        expect(rows[0]).to.be.equal("{");
        expect(rows[1].substring(0, 9)).to.be.equal(`  "name":`);
      });
  });

  it("should show autocomplete box with OpenAPI Schema suggestions when CTRL + space pressed", () => {
    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .within(() =>
        cy
          .get("textarea")
          .type("{{}{enter}")
          .type("{ctrl} ")
      );

    cy.get(suggestionSelector).within(() => {
      cy.contains("type").should("exist");
      cy.contains("additionalProperties").should("exist");
      cy.contains("allOf").should("exist");
    });
  });

  it("should show autocomplete values for type property", () => {
    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .type("{ctrl}a")
      .within(() =>
        cy
          .get("textarea")
          .as("textarea")
          .type("{{}")
          .type("{enter}")
          .type("t")
          .type("{ctrl} ")
          .get(suggestionSelector)
          .as("suggestions")
          .within(() => {
            cy.contains("type").click();
          })
          .get("@textarea")
          .type(`"`)
          .type("{ctrl} ")
      );

    cy.get("@suggestions").within(() => {
      cy.contains("object").should("exist");
      cy.contains("array").should("exist");
      cy.contains("string").should("exist");
    });
  });

  it("should show autocomplete values for x-faker string", () => {
    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .type("{ctrl}a")
      .within(() =>
        cy
          .get("textarea")
          .as("textarea")
          .type(`{{}{enter}"x-fa`)
          .type("{ctrl} ")
          .get(suggestionSelector)
          .as("suggestions")
          .within(() => {
            cy.contains("x-faker").click();
          })
          .get("@textarea")
          .type(`: "nam`)
          .type("{ctrl} ")
      );

    cy.get("@suggestions").within(() => {
      cy.contains("name.firstName").should("exist");
      cy.contains("name.lastName").should("exist");
      cy.contains("internet.userName").should("exist");
      cy.contains("system.fileName").should("exist");
    });
  });

  it("should show autocomplete values for x-faker object", () => {
    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .type("{ctrl}a")
      .within(() =>
        cy
          .get("textarea")
          .as("textarea")
          .type(`{{}{enter}"x-fa`)
          .type("{ctrl} ")
          .get(suggestionSelector)
          .as("suggestions")
          .within(() => {
            cy.contains("x-faker").click();
          })
          .get("@textarea")
          .type(`: {{}{enter}`)
          .type("{ctrl} ")
      );

    cy.get("@suggestions").within(() => {
      cy.contains("address.city").should("exist");
      cy.contains("address.country").should("exist");
      cy.contains("address.latitude").should("exist");
    });
  });

  it("should show autocomplete values for x-chance string", () => {
    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .type("{ctrl}a")
      .within(() =>
        cy
          .get("textarea")
          .as("textarea")
          .type(`{{}{enter}"x-ch`)
          .type("{ctrl} ")
          .get(suggestionSelector)
          .as("suggestions")
          .within(() => {
            cy.contains("x-chance").click();
          })
          .get("@textarea")
          .type(`: "lo`)
          .type("{ctrl} ")
      );

    cy.get("@suggestions").within(() => {
      cy.contains("locale").should("exist");
      cy.contains("locales").should("exist");
      cy.contains("loremPicsum").should("exist");
      cy.contains("longitude").should("exist");
    });
  });

  it("should show autocomplete values for x-chance object", () => {
    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .type("{ctrl}a")
      .within(() =>
        cy
          .get("textarea")
          .as("textarea")
          .type(`{{}{enter}"x-ch`)
          .type("{ctrl} ")
          .get(suggestionSelector)
          .as("suggestions")
          .within(() => {
            cy.contains("x-chance").click();
          })
          .get("@textarea")
          .type(`: {{}{enter}`)
          .type("{ctrl} ")
      );

    cy.get("@suggestions").within(() => {
      cy.contains("address").should("exist");
      cy.contains("age").should("exist");
      cy.contains("altitude").should("exist");
    });
  });
});
