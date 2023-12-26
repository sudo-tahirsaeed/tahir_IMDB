it('Search Movie', () => {
  cy.visit('localhost:3000/login');
  // Fill in the email and password fields
  cy.get('input[name="email"]').type('tahir@gmail.com');
  cy.get('input[name="password"]').type('123');
  // Click on the login button
  cy.get('button[type="submit"]').click();
  cy.get('.search-input').type('Dun');
  cy.get('h3.movie-title').contains('Dunki').should('be.visible').click();
  cy.url().should('include', '/movies/Dunki');
});
