const request = require('supertest');
const app = require('../index'); 
describe('POST /newcomment', () => {
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
  it('should add a new comment', async () => {
    const newComment = {
      movie: 'Dunki',
      user: 'tahir@gmail.com',
      comment: 'This is a great movie! -TESTING',
    };
    const response = await request(app)
      .post('/newcomment')
      .set('Authorization', authToken)
      .send(newComment);
    expect(response.status).toBe(200);
    // Add any additional assertions based on your requirements
  });
  it('should return a 400 status for invalid data', async () => {
    const invalidComment = {
      // Provide incomplete or invalid data
    };
    const response = await request(app)
      .post('/newcomment')
      .set('Authorization', authToken)
      .send(invalidComment);
    expect(response.status).toBe(400);
    // Add any additional assertions based on your requirements
  });
  // Add more test cases as needed
});
