/* eslint-disable no-undef */
import { AUTH_TOKEN, USER } from '../../src/constants/localStorageConstants';

const accountsRegex = /accounts\/(\d+)/;
const messagesRegex = /accounts\/(\d+)\/messages\/(\d+)/;

describe('Navigation and basic access control', () => {
  it('visiting "/" returns login page when localStorage is clear', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('[data-cy="signin_button"]');
  });

  it('entering a bad login returns appropriate error message', () => {
    cy.visit('/');

    cy.location('pathname').should('eq', '/');

    cy.get('[data-cy="login_email"]').type('fakeUser');
    cy.get('[data-cy="login_password"]').type('password1');
    cy.get('[data-cy="signin_button"]').click();
    cy.contains('No active account found with the given credentials');
  });

  describe('after successful login', () => {
    it('navigating to "/" when `localStorage` contains `token` displays accounts list', () => {
      cy.login();
      cy.location('pathname').should('include', '/');

      cy.contains('My Accounts');
    });

    it('clicking on a `account` sends user to `Messages List`', () => {
      cy.wait(500); // Wait half a sec for the animations to finish.
      cy.get('[data-cy="accounts_list_item"]')
        .first()
        .click();

      cy.location('pathname').should('match', accountsRegex);
    });

    it('clicking a `message` sends user to `Message Detail`', () => {
      cy.get('[data-cy="keyword_search_input"]').type('test {enter} {shift}{enter}');
      cy.wait(500);
      cy.get('[data-cy="messages_list_item_view_button"]')
        .first()
        .click();

      cy.location('pathname').should('match', messagesRegex);
    });

    it('clicking the `Back Button` from `Message Detail` sends user back to `Messages List', () => {
      cy.wait(500);
      cy.get('[data-cy="back_button"]').click();

      cy.location('pathname').should('match', accountsRegex);
    });

    it('clicking the `Back Button` from `Messages List` sends user back to `Accounts List', () => {
      cy.wait(500);
      cy.get('[data-cy="back_button"]').click();

      cy.location('pathname').should('eq', '/');
    });
  });
});

describe('Explicit url access control', () => {
  before(() => {
    cy.clearLocalStorage();
  });

  it("unauthorized user attempting to access '/accounts/1' is redirected to login", () => {
    cy.visit('/accounts/1');
    cy.get('[data-cy="signin_button"]');
    cy.location('pathname').should('include', 'accounts/1');
  });

  it("unauthorized user attempting to access '/accounts/1/messages/1' is redirected to login", () => {
    cy.visit('/accounts/1/messages/1');
    cy.get('[data-cy="signin_button"]');
    cy.location('pathname').should('include', 'accounts/1/messages/1');
  });

  it("authorizing from '/accounts/1/messages/1' sends user to `Message Detail`, not '/'", () => {
    localStorage.setItem(AUTH_TOKEN, '1234.abcd.4321');
    localStorage.setItem(USER, JSON.stringify({ id: 1, firstName: 'Test', lastName: 'User' }));

    cy.reload();
    cy.location('pathname').should('include', '/accounts/1/messages/1');
  });
});
