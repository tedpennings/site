import React from "react";
import { renderWithReact } from "@mdx-js/test-util";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import mdxComponents from "./mdx_components";

describe("MDX rendering", () => {
  it("renders h1 tags correctly", async () => {
    const jsx = await renderWithReact(
      `# hello

      `,
      { components: mdxComponents }
    );
    render(jsx);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "hello"
    );
  });
});
