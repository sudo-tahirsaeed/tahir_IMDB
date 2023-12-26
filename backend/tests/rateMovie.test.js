const request = require('supertest');
const app = require('../index'); 
describe('Rate Movie Endpoint', () => {
  let authToken; 
 //LOGIN IN FIRST TO OBTAIN AUTH TOKEN IN ORDER TO RATE
  beforeAll(async () => {
    const userCredentials = {
      email: 'tahir@gmail.com',
      password: '123',
    };
    const response = await request(app)
      .post('/login')
      .send(userCredentials)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
   authToken=response.body.token;
  });
  it('should rate a movie for a user', async () => {
    const movieToRate = 'Dunki'; 
    const rating = 1; 
    const response = await request(app)
      .post('/ratemovie')
      .set('Authorization', authToken)
      .send({ movie: movieToRate, user: 'tahir@gmail.com', rating });
    expect(response.status).toBe(200);
  });
  it('should handle rating errors for invalid movie/user', async () => {
    const invalidMovie = 'Pakistan'; 
    const invalidRating = 6; 
    const response = await request(app)
      .post('/ratemovie')
      .set('Authorization', authToken)
      .send({ movie: invalidMovie, user: 'testUser', rating: invalidRating });
    expect(response.status).toBe(400);
  });
});