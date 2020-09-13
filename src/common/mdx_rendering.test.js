import { renderWithReact } from "@mdx-js/test-util";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import mdxComponents from "./mdx_components";

async function renderMarkdown(markdown) {
  const html = await renderWithReact(markdown, { components: mdxComponents });
  document.body.innerHTML = html;
  return html;
}

describe("MDX rendering", () => {
  test.each([1, 2, 3, 4, 5, 6])(`renders h%i tags correctly`, async (level) => {
    await renderMarkdown(headingMarkdown(level));
    expect(screen.getByRole("heading", { level })).toHaveTextContent(
      `heading ${headingWords[level]}`
    );
    // Mui class is important for styling
    expect(screen.getByRole("heading", { level })).toHaveClass(
      `MuiTypography-h${level}`
    );
  });

  it("renders a paragraph with the appropriate styling", async () => {
    const html = await renderMarkdown(paragraph);
    expect(html).toMatchSnapshot();
  });
  it("renders lists with the appropriate styling", async () => {
    const html = await renderMarkdown(lists);
    expect(html).toMatchSnapshot();
  });
});

const headingWords = [null, "one", "two", "three", "four", "five", "six"];
const hashes = (count) => new Array(count).fill("#").join("");
const headingMarkdown = (level) =>
  [hashes(level), "heading", headingWords[level], "\n\n"].join(" ");

const paragraph = `
"But do you believe," said Candide, "that the earth was originally a sea, as we find it asserted in that large book belonging to the captain?"

"I do not believe a word of it," said Martin, "any more than I do of the many ravings which have been published lately."

"But for what end, then, has this world been formed?" said Candide.

"To plague us to death," answered Martin.
`;

const lists = `
In 2017, Jen I and I traveled to:

1. New Zealand
1. Australia
1. Indonesia
1. Taiwan
1. Malaysia
1. Thailand
1. India
1. Singapore
1. UAE
1. Egypt
1. Morocco
1. Spain

We brought with us:
* Backpacks
* Love
* Mini Bose speaker
* Warm weather clothes, which wasn't right for the Himalayas
`;
