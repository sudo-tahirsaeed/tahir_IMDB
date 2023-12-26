const request = require('supertest');
const app = require('../index');
describe('User Registration Endpoint', () => {
  // Test successful user registration
  it('registers a new user with valid credentials', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testPassword'
    };
    const response = await request(app)
      .post('/register')
      .send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Registration Successful');
  });
  // Test registration with missing fields
  it('returns an error with missing user information', async () => {
    const incompleteUser = {
      name: 'Incomplete User',
      // Missing 'email' and 'password'
    };
    const response = await request(app)
      .post('/register')
      .send(incompleteUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Please fill all fields.');
  });
  // Test registration with an existing email
  it('returns an error when registering with an existing email', async () => {
    const existingUser = {
      name: 'Existing User',
      email: 'test@example.com', // Same email as in the first test
      password: 'existingPassword'
    };
    const response = await request(app)
      .post('/register')
      .send(existingUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Email already exists.');
  });
});
