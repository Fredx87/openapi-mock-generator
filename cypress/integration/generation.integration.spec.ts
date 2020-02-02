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
        .contains("li", "response - 200")
        .clickTreeNode();
    });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea")
          .focus()
          .type(`{rightarrow}{enter}"maxItems": 1,`);
      });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoValue()
      .should(value => {
        expect(JSON.parse(value)).deep.equal({
          maxItems: 1,
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

  it("should generate fake data with faker.js strings", () => {
    // @TODO: create a new schema instead of selecting Pet, when this is fixed: https://github.com/Fredx87/openapi-fake-generator/issues/23
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "Pet").clickTreeNode();
    });

    const model = {
      type: "object",
      properties: {
        id: {
          type: "string",
          "x-faker": "random.uuid"
        },
        name: {
          type: "string",
          "x-faker": "name.findName"
        },
        email: {
          type: "string",
          "x-faker": "internet.email"
        }
      },
      required: ["id", "name", "email"]
    };

    cy.findByTestId(schemaEditorTestId).setMonacoValue(
      JSON.stringify(model, null, 2)
    );

    cy.findByTestId(generatedEditorTestId)
      .getMonacoValue()
      .should(value => {
        const parsed = JSON.parse(value);

        expect(parsed)
          .to.have.property("id")
          .to.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          );

        expect(parsed)
          .to.have.property("name")
          .to.be.a("string");

        expect(parsed)
          .to.have.property("email")
          .to.match(/\S+@\S+\.\S+/);
      });
  });

  it("should generate fake data with Chance strings and objects", () => {
    // @TODO: create a new schema instead of selecting Pet, when this is fixed: https://github.com/Fredx87/openapi-fake-generator/issues/23
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "Pet").clickTreeNode();
    });

    const model = {
      type: "object",
      properties: {
        id: {
          type: "string",
          "x-chance": "guid"
        },
        name: {
          type: "string",
          "x-chance": "first"
        },
        email: {
          type: "string",
          "x-chance": {
            email: {
              domain: "fake.com"
            }
          }
        }
      },
      required: ["id", "name", "email"]
    };

    cy.findByTestId(schemaEditorTestId).setMonacoValue(
      JSON.stringify(model, null, 2)
    );

    cy.findByTestId(generatedEditorTestId)
      .getMonacoValue()
      .should(value => {
        const parsed = JSON.parse(value);

        expect(parsed)
          .to.have.property("id")
          .to.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          );

        expect(parsed)
          .to.have.property("name")
          .to.be.a("string");

        expect(parsed)
          .to.have.property("email")
          .to.match(/^\S+@fake.com$/);
      });
  });
});
