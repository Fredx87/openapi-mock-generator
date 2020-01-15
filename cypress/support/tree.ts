export function toggleTreeNode(element: JQuery<HTMLElement>) {
  cy.wrap(element)
    .within(() => {
      cy.findByLabelText(/caret-down/, { selector: "span" }).click();
    })
    .wrap(element);
}
