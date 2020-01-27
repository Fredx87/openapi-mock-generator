import {
  errorModel,
  newPetModel,
  petModel
} from "../fixtures/models/petstore-expanded";
import {
  generatedEditorTestId,
  schemaEditorTestId
} from "../support/selectors";
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

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        expect(JSON.parse(value)).deep.equal(newPetModel);
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoValue()
      .should(value => {
        const parsed = JSON.parse(value);

        expect(parsed)
          .to.have.property("name")
          .to.be.a("string");

        expect(parsed)
          .to.have.property("tag")
          .to.be.a("string");
      });
  });

  it("should generate JSON for Error model", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "Error").clickTreeNode();
    });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        expect(JSON.parse(value)).deep.equal(errorModel);
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoValue()
      .should(value => {
        const parsed = JSON.parse(value);

        expect(parsed)
          .to.have.property("code")
          .to.be.a("number");

        expect(parsed)
          .to.have.property("message")
          .to.be.a("string");
      });
  });

  it("should generate JSON for Pet model", () => {
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "Pet").clickTreeNode();
    });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        expect(JSON.parse(value)).deep.equal(petModel);
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoValue()
      .should(value => {
        const parsed = JSON.parse(value);

        expect(parsed)
          .to.have.property("id")
          .to.be.a("number");

        expect(parsed)
          .to.have.property("name")
          .to.be.a("string");

        expect(parsed)
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

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        expect(JSON.parse(value)).deep.equal({
          type: "array",
          items: {
            $ref: "#/components/schemas/Pet"
          }
        });
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoValue()
      .should(value => {
        const parsed = JSON.parse(value);

        expect(parsed).to.be.an("array");

        expect(parsed[0])
          .to.have.property("id")
          .to.be.a("number");

        expect(parsed[0])
          .to.have.property("name")
          .to.be.a("string");

        expect(parsed[0])
          .to.have.property("tag")
          .to.be.a("string");
      });
  });
});
