const CyclicRotation = require('../cyclic-rotation');

describe('test cyclic rotation problem', () => {
  it('should rotate a typical 2d array', () => {
    expect(CyclicRotation([3, 8, 9, 7, 6], 1)).toEqual([6, 3, 8, 9, 7]);
  });

  it('should rotate a typical 2d array', () => {
    expect(CyclicRotation([6, 3, 8, 9, 7], 1)).toEqual([7, 6, 3, 8, 9]);
  });

  it('should rotate a typical 2d array', () => {
    expect(CyclicRotation([9, 7, 6, 3, 8], 1)).toEqual([8, 9, 7, 6, 3]);
  });

  it('should rotate a typical 2d array with a rotation of 2', () => {
    expect(CyclicRotation([9, 7, 6, 3, 8], 2)).toEqual([3, 8, 9, 7, 6]);
  });

  it('should have no changes on a full cycle rotation', () => {
    expect(CyclicRotation([[1, 2, 3, 4]], 4)).toEqual([[1, 2, 3, 4]]);
  });
});
