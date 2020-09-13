import { renderWithReact } from "@mdx-js/test-util";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import mdxComponents from "./mdx_components";

async function renderMarkdown(markdown) {
  const html = await renderWithReact(markdown, { components: mdxComponents });
  document.body.innerHTML = html;
}

describe("MDX rendering", () => {
  describe("heading", () => {
    test.each([1, 2, 3, 4, 5, 6])(
      `renders h%i tags correctly`,
      async (level) => {
        await renderMarkdown(headingMarkdown(level));
        expect(screen.getByRole("heading", { level })).toHaveTextContent(
          `heading ${headingWords[level]}`
        );
        expect(screen.getByRole("heading", { level })).toHaveClass(
          `MuiTypography-h${level}`
        );
      }
    );
  });
});

const headingWords = [null, "one", "two", "three", "four", "five", "six"];
const hashes = (count) => new Array(count).fill("#").join("");
const headingMarkdown = (level) =>
  [hashes(level), "heading", headingWords[level], "\n\n"].join(" ");
