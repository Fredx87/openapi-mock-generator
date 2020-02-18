import { emptyProjects } from "cypress/fixtures/db/emptyProjects";
import { petStoreState } from "cypress/fixtures/db/petStore-state";
import { DB_NAME } from "src/database/constants";
import {
  DOWNLOAD_SPEC_MSG,
  EMPTY_PROJECT_MSG
} from "src/features/project/constants";

describe("Spec Download", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase(DB_NAME);
    cy.createProjects(emptyProjects);
  });

  it("should have download button disabled when spec file not uploaded", () => {
    cy.visit("/1/PetStore");

    cy.findByText(EMPTY_PROJECT_MSG);

    cy.contains("button", DOWNLOAD_SPEC_MSG).should("be.disabled");
  });

  it("should have download button disabled when spec file uploaded", () => {
    cy.setProjectState(1, petStoreState);
    cy.visit("/1/PetStore");

    cy.contains("button", DOWNLOAD_SPEC_MSG).should("be.enabled");
  });

  // TODO: Test downloaded file when this issue is fixed: https://github.com/cypress-io/cypress/issues/949
});
