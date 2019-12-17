/* eslint-disable no-undef */
import { AUTH_TOKEN, USER } from "../../../../src/constants/auth";

describe('Navigation and basic access control', () => {
    before(() => {
      cy.clearLocalStorage();
    });

    it('visiting "/" returns login page when localStorage is clear', () => {
        cy.visit('/')
        cy.get('[data-cy="signin_button"]');
    })

    it('entering a bad login returns appropriate error message', () => {
        cy.visit('/')

        cy.url().should("include", "/");

        cy.get('[data-cy="login_email"]').type("fakeUser")
        cy.get('[data-cy="login_password"]').type("password1")
        cy.get('[data-cy="signin_button"]').click();
        cy.contains("Please, enter valid credentials");
    })

    it('navigating to "/" when `localStorage` contains `token` displays collections list', () => {
        localStorage.setItem(AUTH_TOKEN, "1234.abcd.4321")
        localStorage.setItem(USER, JSON.stringify({ id: 1, firstName: "Test", lastName: "User"}))

        cy.visit('/')

        cy.url().should("include", "/");

        cy.contains("My Collections")
    })

    it('clicking on a `collection` sends user to `Messages List`', () => {
        cy.wait(500) // Wait half a sec for the animations to finish.
        cy.get('[data-cy="collections_list_item"]')
          .first()
          .click();

        cy.url().should("include", "/collections/1")
        cy.contains('Filter Panel')
    })

    it('clicking a `message` sends user to `Message Detail`', () => {
        cy.wait(500);
        cy.get('[data-cy="messages_list_item"]')
          .first()
          .click();

        cy.url().should("include", "/collections/1/messages/1")
    })

    it('clicking the `Back Button` from `Message Detail` sends user back to `Messages List', () => {
        cy.wait(500);
        cy.get('[data-cy="back_button"]').click()

        cy.url().should("include", "/collections/1");
    })

    it("clicking the `Back Button` from `Messages List` sends user back to `Collections List", () => {
      cy.wait(500);
      cy.get('[data-cy="back_button"]').click();

      cy.url().should("include", "/");
    });
})

describe('Explicit url access control', () => {
    before(() => {
        cy.clearLocalStorage();
    })

    it("unauthorized user attempting to access '/collections/1' is redirected to login", () => {
        cy.visit('/collections/1')
        cy.get('[data-cy="signin_button"]');
        cy.url().should("include", "collections/1")
    });

    it("unauthorized user attempting to access '/collections/1/messages/1' is redirected to login", () => {
        cy.visit("/collections/1/messages/1");
        cy.get('[data-cy="signin_button"]');
        cy.url().should("include", "collections/1/messages/1")
    });

    it("authorizing from '/collections/1/messages/1' sends user to `Message Detail`, not '/'", () => {
        localStorage.setItem(AUTH_TOKEN, "1234.abcd.4321");
        localStorage.setItem(USER, JSON.stringify({ id: 1, firstName: "Test", lastName: "User" }));

        cy.reload();
        cy.url().should("include", "/collections/1/messages/1");
    });
})
