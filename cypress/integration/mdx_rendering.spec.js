describe("MDX rendering", () => {
  beforeEach(() => {
    cy.visit("/mdx-fixture");
  });

  it("renders heading tags correctly", () => {
    within("headings", () => {
      [1, 2, 3, 4, 5, 6].map((level) => {
        cy.findByRole("heading", { level }).contains(
          `heading ${headingWords[level]}`
        );
        cy.findByRole("heading", { level })
          .invoke("attr", "class")
          // Mui class is important for styling
          .should("contain", `MuiTypography-h${level}`);
      });
    });
  });

  it("renders a paragraph with the appropriate styling", () => {
    within("prose", () => {
      cy.findByText(/I do not believe a word of it/)
        .invoke("attr", "class")
        .should("contain", "MuiTypography-body1");
      cy.findByText(/I do not believe a word of it/)
        .invoke("attr", "class")
        .should("contain", "MuiTypography-paragraph");
    });
  });

  it("renders ordered lists", () => {
    within("ordered-list", () => {
      cy.findByRole("list");
      cy.findAllByRole("listitem").should("have.length", 12);
      cy.findByText("UAE", { selector: "li:nth-of-type(9)" });
    });
  });

  it("renders unordered lists", () => {
    within("unordered-list", () => {
      cy.findAllByRole("listitem").should("have.length", 4);
      cy.findByText("Love", { selector: "li:nth-of-type(2)" });
    });
  });

  it("renders a separator", () => {
    cy.findAllByRole("separator").should("have.length", 3);
  });
});

const headingWords = [null, "one", "two", "three", "four", "five", "six"];

function within(name, fn) {
  return cy.get(`[data-test-id=${name}]`).within(fn);
}
