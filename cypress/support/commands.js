import "@testing-library/cypress/add-commands";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("getByTestId", (testId, options = {}) =>
  cy.get(`[data-test-id=${testId}]`, options)
);

Cypress.Commands.add("visitSite", () => {
  cy.visit("/");
  // Allow addition time for the page to load in a PR check
  cy.getByTestId("root", { timeout: 15 * 1000 });
});
