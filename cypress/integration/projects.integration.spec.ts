import { EMPTY_MESSAGE } from "features/project/ProjectsList";

describe("Projects Management", () => {
  it("should show empty data message with empty database", () => {
    cy.visit("/");
    cy.findByText(EMPTY_MESSAGE).should("exist");
  });
});
