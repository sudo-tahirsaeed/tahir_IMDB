const request = require('supertest');
const app = require('../index'); 
describe('GET /api/movies', () => {
  it('responds with JSON and status code 200', async () => {
    const response = await request(app).get('/getmovies');
    expect(response.status).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});
