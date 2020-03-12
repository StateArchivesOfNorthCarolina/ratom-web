describe('Export behavior', () => {
  before(() => {
    cy.login();
    cy.initialize_account();
    cy.goToMessagesList();
    cy.enterKeywordFilters(['send']);
    cy.server();
    cy.route('GET', `/api/v1/export/?account=1&`).as('filterMessages');
  });

  it('downloads a file', () => {
    cy.exportAsRecordsRequest();
    cy.server();
    cy.wait('@filterMessages').should(xhr => {
      const { status, response } = xhr;
      const contentType = response.headers['content-type'];
      const contentDisposition = response.headers['content-disposition'];
      expect(status).to.eq(200);
      expect(contentType).to.eq('application/x-gzip');
      expect(contentDisposition).to.include('.txt.gz');
      expect(contentDisposition).to.include('attachment;');
      expect(contentDisposition).to.include('filename=');
    });
  });
});
