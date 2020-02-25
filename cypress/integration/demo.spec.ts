import { emptyProjects } from "cypress/fixtures/db/emptyProjects";
import { realWorldState } from "cypress/fixtures/db/realworld-state";
import {
  generatedEditorTestId,
  schemaEditorTestId
} from "cypress/support/selectors";
import { treeTestId } from "cypress/support/tree";
import { DB_NAME } from "src/database/constants";

describe.skip("Demo", () => {
  it("Should run demo", () => {
    indexedDB.deleteDatabase(DB_NAME);
    cy.createProjects(emptyProjects);
    cy.setProjectState(1, realWorldState);
    cy.viewport(1280, 720);
    cy.visit("#/1/Realworld");

    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Schemas").toggleTreeNode();
      cy.contains("li", "Profile").clickTreeNode();
    });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea")
          .focus()
          .type(
            "{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{leftarrow}",
            { force: true }
          )
          .type(",{enter}x-fa", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true })
          .type(": usern", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true });

        cy.get("textarea")
          .type("{downarrow}{downarrow}{downarrow}", { force: true })
          .type(",{enter}x-fa", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true })
          .type(": jobti", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true });

        cy.get("textarea")
          .type("{downarrow}{downarrow}{downarrow}", { force: true })
          .type(",{enter}x-fa", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true })
          .type(": avatar", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true });
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get(
          "textarea"
        ).type(
          "{shift}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}",
          { force: true }
        );
      });

    cy.wait(5000);

    cy.findByTestId(treeTestId)
      .scrollTo("top")
      .within(() => {
        cy.contains("li", "Article").clickTreeNode();
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea")
          .click({ force: true })
          .type("{esc}", { force: true });
      });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea")
          .type("{pagedown}{pagedown}{leftarrow}", { force: true })
          .type("{shift}{uparrow}{uparrow}{uparrow}{uparrow}", { force: true });
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea")
          .type("{pageup}", { force: true })
          .type(
            "{shift}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}",
            { force: true }
          );
      });

    cy.wait(5000);

    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea")
          .type("{uparrow}{uparrow}{end},{enter}minim", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true })
          .type("{rightarrow},{enter}maxim", { force: true })
          .type("{ctrl} ", { force: true })
          .type("{enter}", { force: true })
          .type("100", { force: true });
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea")
          .type("{pageup}{home}", {
            force: true
          })
          .type(
            "{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}",
            {
              force: true
            }
          )
          .type("{shift}{end}", { force: true });
      });

    cy.wait(5000);

    cy.findByTestId(treeTestId).within(() => {
      cy.contains("li", "Paths").toggleTreeNode();
      cy.contains("li", /\/articles$/).toggleTreeNode();
      cy.contains("li", "get").toggleTreeNode();
      cy.contains("li", "200").clickTreeNode();
      cy.contains("li", "Paths").scrollIntoView();
    });

    cy.findByTestId(schemaEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea").type("{pageup}", { force: true });
      });

    cy.findByTestId(generatedEditorTestId)
      .getMonacoEditor()
      .within(() => {
        cy.get("textarea").type("{pageup}", {
          force: true
        });
      });
  });
});
