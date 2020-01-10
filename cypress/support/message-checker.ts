type NoticeType = "info" | "success" | "error" | "warning" | "loading";

export function expectMessage(
  type: NoticeType,
  content: string | RegExp
): void {
  cy.get(`.ant-message-${type}`)
    .contains(content)
    .should("exist");
}
