Cypress.Commands.add(
  "monacoGetValue",
  { prevSubject: "element" },
  (subject: JQuery<HTMLElement>) => {
    cy.wrap(subject)
      .within(() => cy.get("textarea"))
      .then(elem => elem.val());
  }
);
