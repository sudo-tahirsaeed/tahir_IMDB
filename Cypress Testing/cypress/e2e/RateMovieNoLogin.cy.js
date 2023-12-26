it('Should not allow to rate the movie without logging in', () => {
  cy.visit('localhost:3000/');
  cy.get('h3.movie-title').contains('Dunki').should('be.visible').click();
  cy.get('.star-rating').find('.star').eq(3).click();
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Please Login First to Rate this movie!');
  });                                                  
});
