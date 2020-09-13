import { renderWithReact } from "@mdx-js/test-util";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import mdxComponents from "./mdx_components";

async function renderMarkdown(markdown) {
  const html = await renderWithReact(markdown, { components: mdxComponents });
  document.body.innerHTML = html;
}

describe("MDX rendering", () => {
  describe("headings", () => {
    it("renders h1 tags correctly", async () => {
      await renderMarkdown(headingMarkdown(1));
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "heading one"
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
        "MuiTypography-h1"
      );
    });

    it("renders h2 tags correctly", async () => {
      await renderMarkdown(headingMarkdown(2));
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "heading two"
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveClass(
        "MuiTypography-h2"
      );
    });
  });
});

const headingWords = [null, "one", "two", "three", "four", "five", "six"];
const hashes = (count) => new Array(count).fill("#").join("");
const headingMarkdown = (level) =>
  [hashes(level), "heading", headingWords[level], "\n\n"].join(" ");
