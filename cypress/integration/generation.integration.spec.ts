import {
  errorModel,
  newPetModel,
  petModel
} from "../fixtures/models/petstore-expanded";
import { generatedModelLabel, schemaEditorLabel } from "../support/selectors";
import { treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

describe("Generation", () => {
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
});
