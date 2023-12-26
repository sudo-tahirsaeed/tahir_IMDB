it('should not allow dublicate registrations on same email', () => {
  cy.visit('http://localhost:3000/register');
  // Retry finding the input element with a longer timeout
  cy.get('input[name="name"]', { timeout: 10000 }).should('be.visible').type('John Doe');
  cy.get('input[name="email"]').type('ali@example.com');
  cy.get('input[name="password"]').type('pakpak1122');
  cy.contains('button', 'Signup').click();
  // Assert that after successful registration, the user is redirected to the login page
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Email Already Exists !');
  });
});
