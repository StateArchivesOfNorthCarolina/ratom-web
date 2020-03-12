describe('Functionality around record status', () => {
  before(() => {
    cy.login();
    cy.goToMessagesList();
  });

  it('record status filter is displayed', () => {
    cy.contains('Processed status');
  });

  it('selecting a status from record status widget changes messasge detail record status', () => {
    cy.get('[data-cy="keyword_search"]').within(() => {
      cy.get('[data-cy="keyword_search_input"]')
        .type('computer {enter}')
        .type('{shift} {enter}');
    });

    cy.get('[data-cy="messages_list_item"]')
      .first()
      .within(() => {
        cy.get('[data-cy="record_status_widget"]').click();
        cy.get('[data-cy="dropdown_action_item"]')
          .contains('non-record')
          .click();
        cy.get('[data-cy="messages_list_item_view_button"]').click();
      });
    cy.wait(300);
    cy.contains('Non-record');
  });
});
