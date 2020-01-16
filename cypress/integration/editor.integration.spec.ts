import {
  errorModel,
  newPetModel,
  petModel
} from "../fixtures/models/petstore-expanded";
import { clickTreeNode, toggleTreeNode, treeTestId } from "../support/tree";
import { uploadFile } from "../support/upload-file";

const schemaEditorTestId = "schema-editor";
const generatedEditorTestId = "generated-editor";

describe("Editor", () => {
  beforeEach(() => {
    cy.visit("/");
    uploadFile("pestore-expanded.yaml");
  });

  it("should generate JSON for NewPet model", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").then(el => toggleTreeNode(el));
      cy.contains("li", "NewPet").then(el => clickTreeNode(el));
    });

    cy.findAllByTestId(schemaEditorTestId).then(elem => {
      const value = JSON.parse(elem.val() as string);
      expect(value).deep.equal(newPetModel);
    });

    cy.findAllByTestId(generatedEditorTestId).then(elem => {
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
      cy.contains("li", "Schemas").then(el => toggleTreeNode(el));
      cy.contains("li", "Error").then(el => clickTreeNode(el));
    });

    cy.findAllByTestId(schemaEditorTestId).then(elem => {
      const value = JSON.parse(elem.val() as string);
      expect(value).deep.equal(errorModel);
    });

    cy.findAllByTestId(generatedEditorTestId).then(elem => {
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
      cy.contains("li", "Schemas").then(el => toggleTreeNode(el));
      cy.contains("li", "Pet").then(el => clickTreeNode(el));
    });

    cy.findAllByTestId(schemaEditorTestId).then(elem => {
      const value = JSON.parse(elem.val() as string);
      expect(value).deep.equal(petModel);
    });

    cy.findAllByTestId(generatedEditorTestId).then(elem => {
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
        .then(el => toggleTreeNode(el))
        .contains("li", "/pets")
        .then(el => toggleTreeNode(el))
        .contains("li", /get.*findPets/)
        .then(el => toggleTreeNode(el))
        .contains("li", "responses")
        .then(el => toggleTreeNode(el))
        .contains("li", "200")
        .then(el => clickTreeNode(el));
    });

    cy.findAllByTestId(schemaEditorTestId).then(elem => {
      const value = JSON.parse(elem.val() as string);

      expect(value).deep.equal({
        type: "array",
        items: {
          $ref: "#/components/schemas/Pet"
        }
      });
    });

    cy.findAllByTestId(generatedEditorTestId).then(elem => {
      const value = JSON.parse(elem.val() as string);

      expect(value).to.be.an("array");

      expect(value)
        .to.have.deep.property("id")
        .to.be.a("number");

      expect(value)
        .to.have.deep.property("name")
        .to.be.a("string");

      expect(value)
        .to.have.deep.property("tag")
        .to.be.a("string");
    });
  });

  it("should load Error schema for /pets - get - default response", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .then(el => toggleTreeNode(el))
        .contains("li", "/pets")
        .then(el => toggleTreeNode(el))
        .contains("li", /get.*findPets/)
        .then(el => toggleTreeNode(el))
        .contains("li", "responses")
        .then(el => toggleTreeNode(el))
        .contains("li", "default")
        .then(el => clickTreeNode(el));
    });

    cy.findAllByTestId(schemaEditorTestId).then(elem => {
      const value = JSON.parse(elem.val() as string);

      expect(value).deep.equal(errorModel);
    });
  });

  it("should load NewPet schema for /pets - post - requestBody", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths")
        .then(el => toggleTreeNode(el))
        .contains("li", "/pets")
        .then(el => toggleTreeNode(el))
        .contains("li", /get.*findPets/)
        .then(el => toggleTreeNode(el))
        .contains("li", "responses")
        .then(el => toggleTreeNode(el))
        .contains("li", "default")
        .then(el => clickTreeNode(el));
    });

    cy.findAllByTestId(schemaEditorTestId).then(elem => {
      const value = JSON.parse(elem.val() as string);

      expect(value).deep.equal(newPetModel);
    });
  });
});
