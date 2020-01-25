import {
  errorModel,
  newPetModel,
  petModel
} from "../fixtures/models/petstore-expanded";
import { treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

const schemaEditorLabel = "current schema editor";
const generatedModelLabel = "generated model";

describe("Editor", () => {
  beforeEach(() => {
    cy.visit("/");
    uploadFile("pestore-expanded.yaml");
  });

  it("should generate JSON for NewPet model", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "NewPet").clickTreeNode();
    });

    cy.findByLabelText(schemaEditorLabel).should(el => {
      const value = JSON.parse(el.val() as string);
      expect(value).deep.equal(newPetModel);
    });

    cy.findByLabelText(generatedModelLabel).should(elem => {
      const value = JSON.parse(elem.val() as string);

      expect(value)
        .to.have.property("name")
        .to.be.a("string");

      expect(value)
        .to.have.property("tag")
        .to.be.a("string");
    });
  });

  it("should generate JSON for Error model", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "Error").clickTreeNode();
    });

    cy.findByLabelText(schemaEditorLabel).should(el => {
      const value = JSON.parse(el.val() as string);
      expect(value).deep.equal(errorModel);
    });

    cy.findByLabelText(generatedModelLabel).should(elem => {
      const value = JSON.parse(elem.val() as string);

      expect(value)
        .to.have.property("code")
        .to.be.a("number");

      expect(value)
        .to.have.property("message")
        .to.be.a("string");
    });
  });

  it("should generate JSON for Pet model", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "Pet").clickTreeNode();
    });

    cy.findByLabelText(schemaEditorLabel).should(el => {
      const value = JSON.parse(el.val() as string);
      expect(value).deep.equal(petModel);
    });

    cy.findByLabelText(generatedModelLabel).should(elem => {
      const value = JSON.parse(elem.val() as string);

      expect(value)
        .to.have.property("id")
        .to.be.a("number");

      expect(value)
        .to.have.property("name")
        .to.be.a("string");

      expect(value)
        .to.have.property("tag")
        .to.be.a("string");
    });
  });

  it("should generate JSON for /pets - get - 200 response", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .toggleTreeNode()
        .contains("li", "/pets")
        .toggleTreeNode()
        .contains("li", /get.*findPets/)
        .toggleTreeNode()
        .contains("li", "responses")
        .toggleTreeNode()
        .contains("li", "200")
        .clickTreeNode();
    });

    cy.findByLabelText(schemaEditorLabel).should(el => {
      const value = JSON.parse(el.val() as string);

      expect(value).deep.equal({
        type: "array",
        items: {
          $ref: "#/components/schemas/Pet"
        }
      });
    });

    cy.findByLabelText(generatedModelLabel).should(elem => {
      const value = JSON.parse(elem.val() as string);

      expect(value).to.be.an("array");

      expect(value[0])
        .to.have.property("id")
        .to.be.a("number");

      expect(value[0])
        .to.have.property("name")
        .to.be.a("string");

      expect(value[0])
        .to.have.property("tag")
        .to.be.a("string");
    });
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
});
