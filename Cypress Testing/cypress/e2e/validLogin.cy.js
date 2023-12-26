it('Logs in with valid credentials', () => {
  cy.visit('localhost:3000/login');
  // Fill in the email and password fields
  cy.get('input[name="email"]').type('tahir@gmail.com');
  cy.get('input[name="password"]').type('123');
  // Click on the login button
  cy.get('button[type="submit"]').click();
  // Assert that the user is redirected to the home page or another expected location after successful login
  cy.url().should('include', '/');
});
