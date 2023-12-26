const request = require('supertest');
const app = require('../index'); 
describe('Fetch Movie Details Endpoint', () => {
    it('should retrieve movie details when a valid movie name is provided', async () => {
      const movieName = 'Dunki'; // Providing an existing movie name in your database
      const response = await request(app)
        .post('/fetchmovie')
        .send({ movieName })
        .set('Accept', 'application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });
    it('should return an error when an invalid movie name is provided', async () => {
      const invalidMovieName = 'Pakistan'; 
      const response = await request(app)
        .post('/fetchmovie')
        .send({ movieName: invalidMovieName })
        .set('Accept', 'application/json');
      expect(response.statusCode).toBe(401); 
    });
  });