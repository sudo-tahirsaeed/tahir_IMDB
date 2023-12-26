it('Should add comment on movie after logging in', () => {
  cy.visit('localhost:3000/login');
  // Fill in the email and password fields
  cy.get('input[name="email"]').type('tahir@gmail.com');
  cy.get('input[name="password"]').type('123');
  // Click on the login button
  cy.get('button[type="submit"]').click();
  cy.get('h3.movie-title').contains('Dunki').should('be.visible').click();
  let initialHeight, initialWidth;
  cy.get('.scrollable-container').then(($el) => {
    initialHeight = $el.height();
    initialWidth = $el.width();
    cy.get('textarea').type('cypress automated comment');
    cy.contains('button', 'Submit').click();
  });
});
