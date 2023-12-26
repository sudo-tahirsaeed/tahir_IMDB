it('Should rate the movie after logging in', () => {
  cy.visit('localhost:3000/login');
  // Fill in the email and password fields
  cy.get('input[name="email"]').type('tahir@gmail.com');
  cy.get('input[name="password"]').type('123');
  // Click on the login button
  cy.get('button[type="submit"]').click();
  // Assert that the user is redirected to the home page or another expected location after successful login
  cy.url().should('include', '/');
  cy.get('h3.movie-title').contains('Dunki').should('be.visible').click();
  cy.get('.star-rating').find('.star').eq(3).click();
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('You have sucessfully rated this movie 4/5');
  });                                                  
});
