const bitGaps = require('../bit-gaps');

describe('Test bit gaps function', () => {
  it('should return 0 for the number 15: 1111', () => {
    expect(bitGaps(15)).toEqual(0);
  });
  it('should return 0 for the number 22: 10110', () => {
    expect(bitGaps(22)).toEqual(1);
  });
  it('should return 0 for the number 1041', () => {
    expect(bitGaps(1041)).toEqual(5);
  });
  it("should return 0 for the number 32, doesn't count if missing a 1", () => {
    expect(bitGaps(32)).toEqual(0);
  });
});
