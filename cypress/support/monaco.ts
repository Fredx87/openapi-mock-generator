Cypress.Commands.add(
  "getMonacoEditor",
  { prevSubject: "element" },
  (subject: JQuery<HTMLElement>) => {
    Cypress.log({ name: "Get Monaco Editor" });

    return cy
      .wrap(subject, { log: false })
      .within({ log: false }, () =>
        cy
          .get(".monaco-editor.vs", { log: false })
          .first({ log: false })
          .as("editor")
      )
      .get("@editor", { log: false });
  }
);

Cypress.Commands.add(
  "getMonacoValue",
  { prevSubject: "element" },
  (subject: JQuery<HTMLElement>) => {
    Cypress.log({ name: "Get Monaco Value" });

    return cy
      .wrap(subject, { log: false })
      .getMonacoEditor()
      .as("editor")
      .type("{ctrl}a", { log: false })
      .within({ log: false }, () => {
        cy.get("textarea", { log: false })
          .then(el => el.val())
          .as("value");
      })
      .get("@editor", { log: false })
      .type("{esc}", { log: false })
      .get("@value", { log: false });
  }
);

Cypress.Commands.add(
  "setMonacoValue",
  { prevSubject: "element" },
  (subject: JQuery<HTMLElement>, value: string) => {
    Cypress.log({ name: "Set Monaco Value", consoleProps: () => ({ value }) });

    return cy
      .wrap(subject, { log: false })
      .getMonacoEditor()
      .as("editor")
      .type("{ctrl}a", { log: false })
      .within({ log: false }, () => {
        cy.get("textarea", { log: false })
          .clear({ log: false })
          .invoke({ log: false }, "val", value)
          .trigger("input", { log: false });
      })
      .get("@editor", { log: false })
      .type("{esc}", { log: false });
  }
);
