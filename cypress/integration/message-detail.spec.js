describe('Message detail view', () => {
  before(() => {
    cy.login();
    cy.server();
    cy.initialize_account();
  });

  describe('filters set in message list view display as read-only text in detail view', () => {
    it('setting two keywords displays only two keywords in detail view', () => {
      const keywords = ['name', 'age'];
      cy.goToMessagesList();
      cy.enterKeywordFilters(keywords);
      cy.applySearch();
      cy.wait(500);
      cy.openNthMessage(0);
      cy.get('[data-cy="message-detail-filter__keywords"]').within(() => {
        cy.get('[data-cy="keyword"]').should('have.length', 2);
        for (let i = 0; i < keywords.length; i++) {
          const keyword = keywords[i];
          cy.contains(keyword);
        }
      });
    });
  });
});
