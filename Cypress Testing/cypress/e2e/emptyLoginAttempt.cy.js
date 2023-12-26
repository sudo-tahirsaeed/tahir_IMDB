it('Displays an alert for empty email or password', () => {
  cy.visit('localhost:3000/login');
  // Click on the login button without filling in the email and password fields
  cy.get('button[type="submit"]').click();
  // Assert that an alert is displayed indicating that email or password cannot be empty
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Email or Password cant be empty !');
  });
});
