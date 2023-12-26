const request = require('supertest');
const app = require('../index'); 
describe('Login Endpoint', () => {
  it('logs in a user with valid credentials', async () => {
    const userCredentials = {
      email: 'tahir@gmail.com',
      password: '123',
    };
    const response = await request(app)
      .post('/login')
      .send(userCredentials)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
  it('returns an error with invalid credentials', async () => {
    const invalidCredentials = {
      email: 'abc@gmail.com',
      password: '431',
    };
    const response = await request(app)
      .post('/login')
      .send(invalidCredentials)
      .set('Accept', 'application/json');
    expect(response.status).toBe(401);
  });
});
