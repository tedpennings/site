import React from "react";
import { renderWithReact } from "@mdx-js/test-util";
import mdxComponents from "./mdx_components";

describe("MDX rendering", () => {
  it("renders h1 tags correctly", async () => {
    const jsx = await renderWithReact(
      `# hello

    `,
      { components: mdxComponents }
    );
    expect(jsx).toEqual(true);
  });
});
