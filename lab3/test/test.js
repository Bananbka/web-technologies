const { expect } = require('chai');

describe('Failing test example', () => {
    it('this test should fail', () => {
        expect(2 + 2).to.equal(4); // Це провалиться
    });
});