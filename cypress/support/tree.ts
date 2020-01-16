export const treeTestId = "document-tree";

export function toggleTreeNode(element: JQuery<HTMLElement>) {
  cy.wrap(element)
    .within(() => {
      cy.findByLabelText(/caret-down/, { selector: "span" }).click();
    })
    .wrap(element);
}

export function clickTreeNode(element: JQuery<HTMLElement>) {
  cy.wrap(element)
    .within(() => {
      cy.get(".ant-tree-title").click();
    })
    .wrap(element);
}
