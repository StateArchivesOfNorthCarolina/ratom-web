describe('Label behavior', () => {
  before(() => {
    cy.login();
    cy.server();
    cy.initialize_account();
  });

  describe('Limit to account', () => {
    it('having selected an account to view, filtering messages returns only messages from that account', () => {
      const accountId = Cypress.env('accountId');
      const accountParam = Cypress.env('accountParam');
      cy.route('GET', `/api/v1/messages/?${accountParam}`).as('queryMessages');
      cy.goToMessagesList();
      cy.url().should('include', `/accounts/${accountId}`);
      cy.wait('@queryMessages');
      cy.get('@queryMessages').should(request => {
        const queryParams = request.url.split('?')[1];
        expect(queryParams).to.eq(`${accountParam}`);
      });
    });

    describe('in the message detail view', () => {
      const testLabelOne = 'test one';
      const testLabelTwo = 'test two';
      it('you can add arbitrary labels', () => {
        cy.openNthMessage(0);
        cy.addArbitraryLabels(['test one', 'test two']);
        cy.get('[data-cy="message_labels_list"]').contains(testLabelOne);
        cy.get('[data-cy="message_labels_list"]').contains(testLabelTwo);
        cy.goBack();
        cy.contains(testLabelOne);
        cy.contains(testLabelTwo);
      });

      it('newly added labels are available in autosuggest if not already assigned to message', () => {
        cy.openNthMessage(1);
        cy.get('[data-cy="add_label_button"]').click();
        cy.get('[data-cy="add_label_input"]').type(testLabelOne.slice(0, 2));
        cy.contains(testLabelOne);
        cy.contains(testLabelTwo);
      });
    });
  });
});
