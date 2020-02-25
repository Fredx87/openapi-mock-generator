import { render } from "@testing-library/react";
import React from "react";
import { MarkText } from "../MarkText";

describe("MarkText", () => {
  it("should return no marks when match are not found", () => {
    const { container } = render(
      <MarkText content="this is my awesome content!" mark="foo"></MarkText>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        this is my awesome content!
      </span>
    `);
  });

  it("should return a mark when a match is found", () => {
    const { container } = render(
      <MarkText content="this is my awesome content!" mark="some"></MarkText>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        this is my awe
        <mark>
          some
        </mark>
         content!
      </span>
    `);
  });

  it("should return multiple marks when multiple matches are found", () => {
    const { container } = render(
      <MarkText content="this is my awesome content!" mark="is"></MarkText>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        th
        <mark>
          is
        </mark>
         
        <mark>
          is
        </mark>
         my awesome content!
      </span>
    `);
  });

  it("should return multiple marks when multiple matches are found (case insensitive)", () => {
    const { container } = render(
      <MarkText
        content="Watch this! This is my awesome content!"
        mark="this"
      ></MarkText>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        Watch 
        <mark>
          this
        </mark>
        ! 
        <mark>
          This
        </mark>
         is my awesome content!
      </span>
    `);
  });
});
