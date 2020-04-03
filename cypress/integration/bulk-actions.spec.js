describe('Bulk actions', () => {
  before(() => {
    cy.login();
    cy.initialize_account();
    cy.goToMessagesList();
  });

  it('the bulk selection checkbox behaves as expected', () => {
    // assert that the checkbox starts unchecked
    cy.get('[data-cy="bulk-select-checkbox"]').then($checkbox => {
      expect($checkbox.is(':indeterminate')).to.be.false; //eslint-disable-line
      expect($checkbox.is(':checked')).to.be.false; //eslint-disable-line
    });

    cy.checkNthMessage(0);

    // assert that the checkbox is in "indeterminate" state when a single message is checked
    cy.get('[data-cy="bulk-select-checkbox"]').then($checkbox => {
      expect($checkbox.is(':checked')).to.be.false; //eslint-disable-line
      expect($checkbox.is(':indeterminate')).to.be.true; //eslint-disable-line
    });

    // assert that the checked messages uncheck when bulk select checkbox is clicked from an indeterminate state
    cy.assertCheckedStateOfNthMessage(0, true);
    cy.get('[data-cy="bulk-select-checkbox"]').click({ force: true });
    cy.assertCheckedStateOfNthMessage(0, false);
  });

  it('confirms action before taking it', () => {
    cy.checkNthMessage(0);
    cy.checkNthMessage(1);

    cy.get('[data-cy="bulk-selection-actions"]').click();
    cy.get('[data-cy="dropdown_action_item"]')
      .contains('non-record')
      .click();

    // Assert presence of expected messages in confirmation modal
    cy.contains('Change status of 2 messages');
    cy.contains('Set status to non-record?');
    cy.contains('Mark as non-record');
  });

  it('confirming action performs expected API call', () => {
    // Make assertions on request
    cy.server();
    cy.route('PUT', '/api/v1/messages/batch/').as('batchUpdateMessages');
    cy.contains('Mark as non-record').click();
    cy.wait('@batchUpdateMessages').should(xhr => {
      const { messages, action, effect } = xhr.request.body;
      expect(messages).to.have.lengthOf(2);
      expect(action).to.eq('record_status');
      expect(effect).to.eq('non-record');
      expect(xhr.status).to.eq(201);
    });
  });

  it('and the UI reflects the expected changes', () => {
    cy.assertRecordStatusOfNthMessage(0, 'Non-record');
    cy.assertRecordStatusOfNthMessage(1, 'Non-record');
  });
});
