export function uploadFile(fileName: string, mimeType = "application/x-yaml") {
  cy.fixture(`specs/${fileName}`).then(fileContent => {
    cy.contains(`[role="button"]`, /load openapi/i).should("be.visible");
    cy.contains(`[role="button"]`, /load openapi/i).within(() => {
      cy.get("input").upload({
        fileContent,
        fileName,
        mimeType,
        encoding: "utf8"
      });
    });
  });
}
