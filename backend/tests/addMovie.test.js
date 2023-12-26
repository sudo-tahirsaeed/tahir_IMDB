const request = require('supertest');
const app = require('../index'); 
describe('Add New Movie Endpoint', () => {
  it('should add a new movie with valid details', async () => {
    const newMovie = {
      movieName: 'Testing Movie5',
      movieDescription: 'Testing to Add movie',
      posterUrl: 'https://ih1.redbubble.net/image.3658479866.3563/fposter,small,wall_texture,square_product,600x600.jpg',
    };
    const response = await request(app)
      .post('/addnewmovie')
      .send(newMovie)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Movie Added Sucessfully');
  });
  it('should return an error with missing details', async () => {
    const incompleteMovie = {
      movieName: 'Incomplete Movie',
      // Missing other details
    };
    const response = await request(app)
      .post('/addnewmovie')
      .send(incompleteMovie)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
  });
  it('should not allow to add dublicate movie', async () => {
    const newMovie = {
      movieName: 'Testing Movie',
      movieDescription: 'Testing to Add movie',
      posterUrl: 'https://ih1.redbubble.net/image.3658479866.3563/fposter,small,wall_texture,square_product,600x600.jpg',
    };
    const response = await request(app)
      .post('/addnewmovie')
      .send(newMovie)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe('Movie already exists.');
  });
});
