export function uploadFile(fileName: string, mimeType = "application/x-yaml") {
  cy.fixture(fileName).then(fileContent => {
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
