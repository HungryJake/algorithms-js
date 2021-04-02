const permMissingElm = require('../perm-missing-elm');

describe('test permutation missing element', () => {
  it('should return the missing element 4 for the normal case', () => {
    expect(permMissingElm([2, 3, 1, 5])).toEqual(4);
  });
  it('should return the missing element 1 for the normal case', () => {
    expect(permMissingElm([0, 3, 2, 4])).toEqual(1);
  });
  it('should handle empty array', () => {
    expect(permMissingElm([])).toEqual(0);
  });
  it('should handle array of length of 1', () => {
    expect(permMissingElm([2])).toEqual(0);
  });
});
