const findUnpaired = require('../find-unpaired');

describe('Find unpaired array member value', () => {
  it('should find the normal unpaired value', () => {
    const array = [9, 3, 9, 3, 9, 7, 9];
    expect(findUnpaired(array)).toEqual(7);
  });
});
