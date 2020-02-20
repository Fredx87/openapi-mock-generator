import { emptyProjects } from "cypress/fixtures/db/emptyProjects";
import { petStoreState } from "cypress/fixtures/db/petStore-state";
import { DB_NAME } from "src/database/constants";
import { EDITOR_DEBOUNCE_TIME } from "src/features/editor/constants";
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

describe("Generation", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase(DB_NAME);
    cy.createProjects(emptyProjects);
    cy.setProjectState(1, petStoreState);
    cy.visit("/1/PetStore");
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
      cy.contains("li", /^Pet$/).clickTreeNode();
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
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Playground").clickTreeNode();
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

    cy.wait(EDITOR_DEBOUNCE_TIME);

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
    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Playground").clickTreeNode();
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

    cy.wait(EDITOR_DEBOUNCE_TIME);

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
