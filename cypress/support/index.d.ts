/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    toggleTreeNode(): Chainable<JQuery<HTMLElement>>;
    clickTreeNode(): Chainable<JQuery<HTMLElement>>;
  }
}
