/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  let result = [];
  if (matrix.length === 0) {
    return [];
  } else if (matrix[0].length === 1) {
    for (let j=0; j<matrix.length; j++) {
      result.push(matrix[j][0]);
    }
    return result;
  }

  const [m, n] = [matrix[0].length, matrix.length];
  // result.push(matrix[0][0]);

  // current position and boundaries
  top = 0;
  left = 0;
  right = m - 1;
  bottom = n - 1;

  while (top <= bottom && left <= right) {
    // console.log(top, bottom, left, right);
    // go right
    for (let i=left; i<=right; i++) {
      // console.log('top: ', matrix[top][i]);
      result.push(matrix[top][i]);
    }

    // go down
    for (let j=top+1; j<=bottom; j++) {
      // console.log('down: ', matrix[j][right]);
      result.push(matrix[j][right]);
    }

    // go left
    for (let i=right-1; i>=left && top !== bottom; i--) {
      // console.log('left: ', matrix[bottom][i]);
      result.push(matrix[bottom][i]);
    }
    
    // go up
    for (let j=bottom-1; j>top && left !== right; j--) {
      // console.log('up: ', matrix[j][left]);
      result.push(matrix[j][left]);
    }

    top++;
    right--;
    bottom--;
    left++;
  }
  return result;
};
// [2,5,8 ]
// [4,0,-1]

// input: 
//  [1,2,3],
//  [4,5,6],
//  [7,8,9];

// [1,2,3,6,9,8,7,4,5]

module.exports = spiralOrder;

