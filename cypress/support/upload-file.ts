export function uploadFile(fileName: string) {
  const mimeType = fileName.endsWith("json")
    ? "application/json"
    : "application/x-yaml";
  cy.readFile(`cypress/fixtures/specs/${fileName}`).then(fileContent => {
    const stringContent =
      typeof fileContent === "object"
        ? JSON.stringify(fileContent)
        : fileContent;

    cy.contains(`[role="button"]`, /load openapi/i).should("be.visible");
    cy.contains(`[role="button"]`, /load openapi/i).within(() => {
      cy.get("input").upload({
        fileContent: stringContent,
        fileName,
        mimeType,
        encoding: "utf8"
      });
    });
  });
}
