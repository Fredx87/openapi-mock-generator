import { DB_NAME } from "src/features/project/database";
import {
  CREATE_PROJECT_MSG,
  NEW_PROJECT_NAME_PLACEHOLDER
} from "src/features/project/ProjectsList";
import { EMPTY_MSG } from "src/features/project/ProjectsListTable";

const click = ($el: any) => $el.click();

describe("Projects Management", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase(DB_NAME);
    cy.visit("/");
  });

  it("should show empty data message with empty database", () => {
    cy.findByText(EMPTY_MSG).should("exist");
  });

  it("should create a new project when enter pressed and name inserted", () => {
    cy.findByText(EMPTY_MSG).should("exist");

    cy.contains(CREATE_PROJECT_MSG)
      .pipe(click)
      .should("be.disabled");

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).type(
      "New Project{enter}"
    );

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByText("New Project").should("exist");
  });

  it("should create a new project when input blurred and name inserted", () => {
    cy.findByText(EMPTY_MSG).should("exist");

    cy.contains(CREATE_PROJECT_MSG)
      .pipe(click)
      .should("be.disabled");

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER)
      .type("New Project")
      .blur();

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByText("New Project").should("exist");
  });

  it("should not create a new project when enter pressed and name empty", () => {
    cy.findByText(EMPTY_MSG).should("exist");

    cy.contains(CREATE_PROJECT_MSG)
      .pipe(click)
      .should("be.disabled");

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).type("{enter}");

    cy.findByText(EMPTY_MSG).should("exist");

    cy.findByText("New Project").should("not.exist");
  });

  it("should not create a new project when input blurred and name empty", () => {
    cy.findByText(EMPTY_MSG).should("exist");

    cy.contains(CREATE_PROJECT_MSG)
      .pipe(click)
      .should("be.disabled");

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).blur();

    cy.findByText(EMPTY_MSG).should("exist");

    cy.findByText("New Project").should("not.exist");
  });

  it("should not permit to create multiple projects simultaneously", () => {
    cy.contains(CREATE_PROJECT_MSG)
      .pipe(click)
      .should("be.disabled");

    cy.findAllByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).should(
      "have.length",
      1
    );
  });

  it("should persists projects across page reloads", () => {
    cy.findByText(EMPTY_MSG)
      .should("exist")
      .wait(100);

    cy.findByText(CREATE_PROJECT_MSG).click({ force: true });

    cy.findByText(EMPTY_MSG).should("not.exist");

    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).type(
      "First Project{enter}"
    );

    cy.findByText("First Project").should("exist");

    cy.findByText(CREATE_PROJECT_MSG).click({ force: true });
    cy.findByPlaceholderText(NEW_PROJECT_NAME_PLACEHOLDER).type(
      "Second Project{enter}"
    );

    cy.findByText("Second Project").should("exist");

    cy.reload();

    cy.findByText("First Project").should("exist");
    cy.findByText("Second Project").should("exist");
  });
});
