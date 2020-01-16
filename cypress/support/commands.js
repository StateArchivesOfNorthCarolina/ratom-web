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

Cypress.Commands.add('login', () => {
  cy.clearLocalStorage();
  cy.visit('/');
  cy.get('[data-cy="login_email"]').type('test_user');
  cy.get('[data-cy="login_password"]').type('testing');
  cy.get('[data-cy="signin_button"]').click();
});

Cypress.Commands.add('goToMessagesList', () => {
  cy.get('[data-cy="collections_list_item"]')
    .first()
    .click();
});
