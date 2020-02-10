describe('Filter panel behavior', () => {
  const accountId = 1;
  const accountParam = `account=${accountId}&`;
  before(() => {
    cy.login();
    cy.server();
    cy.route('GET', `/api/v1/messages/?${accountParam}`).as('queryMessages');
  });

  describe('Limit to account', () => {
    it('having selected an account to view, filtering messages returns only messages from that account', () => {
      cy.goToMessagesList();
      cy.url().should('include', `/accounts/${accountId}`);
      cy.wait('@queryMessages');
      cy.get('@queryMessages').should(request => {
        const queryParams = request.url.split('?')[1];
        expect(queryParams).to.eq(accountParam);
      });
    });
  });

  describe('Keyword filter', () => {
    const keywordSearchTerm = 'test';
    const expectedQueryParams = accountParam + 'search=' + keywordSearchTerm;

    it('typing a keyword into the input and clicking the button adds a keyword to the list', () => {
      cy.get('[data-cy="keyword_search"]').within(() => {
        cy.get('[data-cy="keyword_search_input"]').type(keywordSearchTerm);
        cy.get('[data-cy="button_icon"]').click();
        cy.get('[data-cy="badge"]').contains(keywordSearchTerm);
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
        cy.get('[data-cy="keyword_search_input"]').type(`${keywordSearchTerm} {enter}`);
        cy.get('[data-cy="badge"]').contains(keywordSearchTerm);
        cy.get('[data-cy="badge_list"]')
          .children()
          .should('have.length', 1);
      });
    });

    it('pressing shift+backspace while focus is in keyword search removes last keyword entered', () => {
      cy.get('[data-cy="keyword_search"]').within(() => {
        cy.get('[data-cy="keyword_search_input"]').type(`${keywordSearchTerm} again {enter}`);
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
      cy.server();
      // Despite how this looks-- this actually sets up a "listener" for requests
      // made that fit the options given.
      cy.route('GET', `/api/v1/messages/?${expectedQueryParams}`).as('filterMessages');
      // hitting shift+enter actually executes the query
      cy.get('[data-cy="keyword_search_input"]').type('{shift}{enter}');
      cy.wait('@filterMessages');
      cy.get('@filterMessages').should(request => {
        const queryParams = request.url.split('?')[1];
        expect(queryParams).to.eq(expectedQueryParams);
      });
    });
  });

  describe('Processed status filter', () => {
    // grab '[data-cy="processed_status_count"]'
    it('contains the correct status filters, and filters work', () => {
      let unprocessedAmount;
      cy.get('[data-cy="processed_status_widget"]').within(() => {
        cy.contains('All');
        cy.contains('Processed');
        cy.contains('Unprocessed').within(() => {
          cy.get('[data-cy="processed_status_count"]').should($span => {
            // should have text
            const text = $span.text();
            expect(text);

            // text should have a number
            const matches = text.match(/(\d+)/);
            expect(matches);
            console.log('previous amount: ', matches[0]);
            unprocessedAmount = matches[0];
          });
        });
      });

      cy.get('[data-cy="keyword_search_input"]').type('try');
      cy.get('[data-cy="keyword_search_input"]').type('{enter}');
      cy.get('[data-cy="keyword_search_input"]').type('{shift}{enter}');
      cy.wait(500);

      cy.get('[data-cy="processed_status_widget"]').within(() => {
        cy.contains('Unprocessed').within(() => {
          cy.get('[data-cy="processed_status_count"]').should($span => {
            const text = $span.text();
            expect(text);
            const matches = text.match(/(\d+)/);
            expect(matches);
            // eventually, expect this to be less than, but for now not equal is fine.
            expect(matches[0]).not.to.equal(unprocessedAmount);
          });
        });
      });
    });
  });
});
