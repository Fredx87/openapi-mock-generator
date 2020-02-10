import {
  CREATE_PROJECT_MSG,
  EMPTY_MSG,
  NEW_PROJECT_NAME_PLACEHOLDER
} from "src/features/project/ProjectsList";

describe("Projects Management", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show empty data message with empty database", () => {
    cy.findByText(EMPTY_MSG).should("exist");
  });

  it("should create a new project when enter pressed and name inserted", () => {
    cy.findByText(CREATE_PROJECT_MSG).click({ force: true });

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).type(
      "New Project{enter}"
    );

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByText("New Project").should("exist");
  });

  it("should create a new project when input blurred and name inserted", () => {
    cy.findByText(CREATE_PROJECT_MSG).click({ force: true });

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER)
      .type("New Project")
      .blur();

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByText("New Project").should("exist");
  });

  it("should not create a new project when enter pressed and name empty", () => {
    cy.findByText(CREATE_PROJECT_MSG).click({ force: true });

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).type("{enter}");

    cy.findByText(EMPTY_MSG).should("exist");

    cy.findByText("New Project").should("not.exist");
  });

  it("should not create a new project when input blurred and name empty", () => {
    cy.findByText(CREATE_PROJECT_MSG).click({ force: true });

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).blur();

    cy.findByText(EMPTY_MSG).should("exist");

    cy.findByText("New Project").should("not.exist");
  });
});
