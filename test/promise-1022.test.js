const { expect } = require('chai');
const promiseAll = require('../src/practice/promise-1022');

describe('promiseAll', () => {
  it('should resolve with an array of resolved values when all promises resolve', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ];
    const result = await promiseAll(promises);
    expect(result).to.deep.equal([1, 2, 3]);
  });

  it('should reject when any promise rejects', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject('error'),
      Promise.resolve(3)
    ];
    try {
      await promiseAll(promises);
    } catch (error) {
      expect(error).to.equal('error');
    }
  });

  it('should resolve with an empty array when given an empty array', async () => {
    const promises = [];
    const result = await promiseAll(promises);
    expect(result).to.deep.equal([]);
  });

  it('should reject with "not arr" when input is not an array', async () => {
    try {
      await promiseAll('not an array');
    } catch (error) {
      expect(error).to.equal('not arr');
    }
  });

  it('should handle non-promise values in the array', async () => {
    const promises = [
      1,
      Promise.resolve(2),
      3
    ];
    const result = await promiseAll(promises);
    expect(result).to.deep.equal([1, 2, 3]);
  });
});