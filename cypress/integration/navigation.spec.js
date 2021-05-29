context.skip("Navigation", () => {
  beforeEach(() => {
    cy.visitSite();
  });

  it("loads with a title, sidebar and photo", () => {
    cy.get("header").should("be.visible");
    cy.getByTestId("sidebar").should("be.visible");
    cy.getByTestId("photo").should("be.visible");
  });

  it("navigates to a page from the body links", () => {
    cy.get("[data-link-name=Heatmaps]").click();
    cy.url().should("contain", "/dataviz/heatmaps");
    cy.contains("h2", "Heatmaps");
  });

  it("updates the breadcrumbs", () => {
    cy.getByTestId("breadcrumb").should("have.length", 1);

    cy.get("[data-link-name=Heatmaps]").click();
    cy.contains("[data-breadcrumb-level=0]", "Home");
    cy.contains("[data-breadcrumb-level=1]", "Data Visualization");
    cy.contains("[data-breadcrumb-level=2]", "Heatmaps");
    cy.getByTestId("breadcrumb").should("have.length", 3);

    cy.contains("[data-breadcrumb-level=1]", "Data Visualization").click();
    cy.get("[data-breadcrumb-level=2]").should("not.exist"); // Heatmaps is gone
    cy.getByTestId("breadcrumb").should("have.length", 2);
  });
});
