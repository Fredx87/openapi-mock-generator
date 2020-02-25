import { UPLOAD_SPEC_MSG } from "src/features/project/constants";

export function uploadFile(fileName: string) {
  const mimeType = fileName.endsWith("json")
    ? "application/json"
    : "application/x-yaml";

  cy.fixture(`specs/${fileName}`).then(fileContent => {
    const stringContent =
      typeof fileContent === "object"
        ? JSON.stringify(fileContent)
        : fileContent;

    cy.contains(`[role="button"]`, UPLOAD_SPEC_MSG).should("be.visible");
    cy.contains(`[role="button"]`, UPLOAD_SPEC_MSG).within(() => {
      cy.get("input").upload({
        fileContent: stringContent,
        fileName,
        mimeType,
        encoding: "utf8"
      });
    });
  });
}
