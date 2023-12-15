const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const app = require('../../server').app;

describe('UserRoutes', () => {
  describe('POST /user/admin/user', () => {
    it('should add a user successfully', async () => {
      const response = await request(app)
        .post('/user/admin/user')
        .send({
            "reqUserId": "657b7d28d15bc4a0d2ba2934",
            "userData": {
                "userName": "abc1",
                "email": "abc1@gmail.com",
                "userType": "DEFAULT"
            }
        });

      // Assert that the response is as expected
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'User created successfully!' });
    });

    it("shouldn't add a user", async () => {
        const response = await request(app)
          .post('/user/admin/user')
          .send({
              "reqUserId": "657b7de1805ba660be0f7997",
              "userData": {
                  "userName": "abc1",
                  "email": "abc1@gmail.com",
                  "userType": "DEFAULT"
              }
          });
  
        // Assert that the response is as expected
        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({ message: 'Not allowed!' });
      });
  });
});
