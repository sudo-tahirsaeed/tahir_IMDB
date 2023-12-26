it('should not allow to Log in with Invalid credentials', () => {
  cy.visit('localhost:3000/login');
    cy.get('input[name="email"]').type('invalidemail@example.com');
  cy.get('input[name="password"]').type('wrongPassword123');
  // Click on the login button
  cy.get('button[type="submit"]').click();
  // Assert that an alert is displayed indicating invalid credentials
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Invalid Credentials!');
  });
});