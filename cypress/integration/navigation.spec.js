context("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads with a title, sidebar and photo", () => {
    cy.get("header").should("be.visible");
    cy.getByTestId("sidebar").should("be.visible");
    cy.getByTestId("photo").should("be.visible");
  });

  it("navigates to a page from the body links", () => {
    cy.get("[data-link-name=Heatmaps]").click();
    cy.get("h2").contains("Heatmaps").should("be.visible");
  });

  it("updates the breadcrumbs", () => {
    cy.get("[data-link-name=Heatmaps]").click();
    cy.getByTestId("breadcrumb")
      .filter("[data-breadcrumb-level=2][data-breadcrumb-name=Heatmaps]")
      .should("be.visible");
  });
});
