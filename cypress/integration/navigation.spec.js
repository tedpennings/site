context("Navigation", () => {
  beforeEach(() => {
    cy.visitSite();
  });

  it("landing age loads with heading and photo", () => {
    assertLandingPage();
  });

  it("navigates to Pablo's page by clicking the link", () => {
    cy.contains("a", "Pablo").click();
    assertPablosPage();
  });

  it("navigates to Pablo's page directly", () => {
    cy.visit("/pablo");
    assertPablosPage();
  });

  it("Pablo's page links back to landing page", () => {
    cy.visit("/pablo");
    cy.getByTestId("navigation-heading").click();
    assertLandingPage();
  });
});

function assertPablosPage() {
  cy.url().should("contain", "/pablo");
  cy.contains("h2", "Pablo Valentine Pennings");
  cy.contains("We had nine beautiful days with Pablo.");
}

function assertLandingPage() {
  cy.contains("Ted lives in Portland, Oregon");
  cy.getByTestId("root").should("be.visible");
  cy.getByTestId("heading").should("be.visible");
  cy.getByTestId("photo").should("be.visible");
}
