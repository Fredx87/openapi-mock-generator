export const treeTestId = "document-tree";

Cypress.Commands.add(
  "toggleTreeNode",
  { prevSubject: "element" },
  (subject: JQuery<HTMLElement>) => {
    cy.wrap(subject).within(() => {
      cy.findByLabelText(/caret-down/, { selector: "span" }).click();
    });
    cy.wrap(subject);
  }
);

Cypress.Commands.add(
  "clickTreeNode",
  { prevSubject: "element" },
  (subject: JQuery<HTMLElement>) => {
    cy.wrap(subject).within(() => {
      cy.get(".ant-tree-title").click();
    });
    cy.wrap(subject);
  }
);
