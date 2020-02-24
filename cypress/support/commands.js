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
  cy.get('[data-cy="login_email"]').type('test@user.com');
  cy.get('[data-cy="login_password"]').type('testing');
  cy.get('[data-cy="signin_button"]').click();
});

Cypress.Commands.add('initialize_account', () => {
  cy.contains('Bill Rapp [Sample Data]')
    .parent()
    .parent()
    .as('b_rapp');
  cy.get('@b_rapp').within(() => {
    cy.get('[data-cy=account-detail-account-title]').then($h4 => {
      Cypress.env('accountId', $h4.attr('id'));
      Cypress.env('accountParam', `account=${$h4.attr('id')}&`);
    });
  });
});

Cypress.Commands.add('goToMessagesList', () => {
  cy.contains('Bill Rapp [Sample Data]')
    .parent()
    .parent()
    .as('b_rapp');
  cy.get('@b_rapp').within(() => {
    cy.get('[data-cy="account-detail-dot-menu"]').click();
    cy.wait(200);
    cy.contains('View').click({ force: true });
  });
});

Cypress.Commands.add('enterKeywordFilters', keywords => {
  cy.get('[data-cy="keyword_search"]').within(() => {
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      cy.get('[data-cy="keyword_search_input"]').type(`${keyword} {enter}`);
    }
  });
});

Cypress.Commands.add('applySearch', () => {
  cy.get('[data-cy="apply-search-button"]').click();
});

Cypress.Commands.add('selectFirstMessage', () => {
  cy.get('[data-cy="messages_list_item"]')
    .first()
    .within(() => {
      cy.contains('View').click();
    });
});
