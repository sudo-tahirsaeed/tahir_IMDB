it('Should not add comment without logging in', () => {
  cy.visit('localhost:3000/');
  cy.get('h3.movie-title').contains('Pathaan').should('be.visible').click();
  cy.get('textarea').should('be.disabled');
});
