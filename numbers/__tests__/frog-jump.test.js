const FrogJump = require('../frog-jump');

describe('Test frog jump', () => {
  it('should jump 3 times', () => {
    expect(FrogJump(10, 85, 30)).toEqual(3);
  });

  it('should jump 4 times', () => {
    expect(FrogJump(5, 105, 30)).toEqual(4);
  });

  it('should handle invalid cases', () => {
    expect(FrogJump(105, 5, 30)).toEqual(0);
  });

  it('should handle negative values', () => {
    expect(FrogJump(105, -5, 30)).toEqual(0);
  });
});
