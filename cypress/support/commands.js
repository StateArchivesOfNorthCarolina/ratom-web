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

Cypress.Commands.add('goBack', () => {
  cy.get('[data-cy="back_button"]').click();
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

Cypress.Commands.add('clearKeywords', numToClear => {
  for (let i = 0; i < numToClear; i++) {
    cy.get('[data-cy="keyword_close"]').each($keyword => {
      $keyword.click();
    });
  }
});

Cypress.Commands.add('resetFilters', () => {
  cy.get('[data-cy="reset-filters"]').click();
});

Cypress.Commands.add('enterDateFilters', dateRange => {
  cy.get('[data-cy="date_to_input"]').type('{shift}{backspace}'.repeat(10));
  cy.get('[data-cy="date_from_input"]').type('{shift}{backspace}'.repeat(10));
  cy.get('[data-cy="date_range_filter_input"]').within(() => {
    cy.get('[data-cy="date_from_input"]').type(dateRange[0]);
    cy.get('[data-cy="date_to_input"]').type(dateRange[1]);
    cy.get('[data-cy="apply_date_range_filter"]').click();
  });
});

Cypress.Commands.add('applySearch', () => {
  cy.get('[data-cy="apply-search-button"]').click();
});

Cypress.Commands.add('openNthMessage', n => {
  cy.get('[data-cy="messages_list_item"]')
    .eq(n)
    .within(() => {
      cy.contains('View').click();
    });
});

Cypress.Commands.add('assertMessageCountEquals', assertedTotal => {
  cy.get('[data-cy="search-results__count"]').should($countEl => {
    const count = $countEl.text();
    expect(count).to.eq(assertedTotal);
  });
});

Cypress.Commands.add('addArbitraryLabels', labels => {
  cy.get('[data-cy="add_label_button"]').click();
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    cy.get('[data-cy="add_label_input"]').type(`${label} {enter}`);
  }
});
