const chai = require('chai');
const { expect } = chai;
// const sinon = require('sinon');
const validateIsUserAdmin = require("../../server").validateIsUserAdmin;

describe('validateIsUserAdmin', () => {
  describe('adminValidation', () => {
    it('should be an admin', async () => {
      const isAdmin = await validateIsUserAdmin("657b7d28d15bc4a0d2ba2934");
      expect(isAdmin).to.be.true;
    });

    it("shouldn't be an admin", async () => {
        const isAdmin = await validateIsUserAdmin("657b7de1805ba660be0f7997");
        expect(isAdmin).to.be.false;
      });
  });
});
