describe('Filter panel behavior', () => {
  before(() => {
    cy.login();
  });

  describe('Keyword search', () => {
    before(() => {
      cy.goToMessagesList();
    });

    it('typing a keyword into the input and clicking the button adds a keyword to the list', () => {
      cy.get('[data-cy="keyword_search"]').within(() => {
        cy.get('[data-cy="keyword_search_input"]').type('test');
        cy.get('[data-cy="button_icon"]').click();
        cy.get('[data-cy="badge"]').contains('test');
      });
    });

    it('clicking the "x" on a badge removes it from the list', () => {
      cy.get('[data-cy="keyword_search"]').within(() => {
        cy.get('[data-cy="badge_list"]')
          .children()
          .should('have.length', 1);
        cy.get('[data-cy="badge_close"]').click();
        cy.get('[data-cy="badge_list"]')
          .children()
          .should('have.length', 0);
      });
    });

    it('typing a keyword into the input and hitting enter adds one keyword to the list', () => {
      cy.get('[data-cy="keyword_search"]').within(() => {
        cy.get('[data-cy="keyword_search_input"]').type('test {enter}');
        cy.get('[data-cy="badge"]').contains('test');
        cy.get('[data-cy="badge_list"]')
          .children()
          .should('have.length', 1);
      });
    });

    it('pressing shift+backspace while focus is in keyword search removes last keyword entered', () => {
      cy.get('[data-cy="keyword_search"]').within(() => {
        cy.get('[data-cy="keyword_search_input"]').type('test again {enter}');
        cy.get('[data-cy="badge_list"]')
          .children()
          .should('have.length', 2);
        cy.get('[data-cy="keyword_search_input"]').type('{shift}{backspace}');
        cy.get('[data-cy="badge_list"]')
          .children()
          .should('have.length', 1);
      });
    });

    it('pressing shift+enter with keywords in the list queries the API with correct query', () => {
      const expectedQueryParams = 'search=test';
      cy.server();
      cy.route('GET', '/api/v1/messages/?search=test').as('queryMessages');
      cy.get('[data-cy="keyword_search_input"]').type('{shift}{enter}');
      cy.wait('@queryMessages');
      cy.get('@queryMessages').should(request => {
        const queryParams = request.url.split('?')[1];
        expect(queryParams).to.eq(expectedQueryParams);
        //WIP store expected query elsewhere to check against in in next thing
      });
    });

    it('last executed query is stored so that leaving the page and returning executes the last made query', () => {});
  });
});
