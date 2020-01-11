export function openTreeNode(content: string | RegExp) {
  cy.contains("li", content).within(() =>
    cy.findByLabelText(/caret-down/, { selector: "span" }).click()
  );
}
