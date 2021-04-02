/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    if (m <= 0 && n <= 0) {
      return 0;
    } else if (m === 1 || n === 1) {
      return 1;
    }
    // setup
    let dpMatrix = new Array(m);

    for (i=0; i<m; i++) {
      dpMatrix[i] = new Array(n);
      for (j=0; j<n; j++) {
        if (i === 0 && j === 0) {
          dpMatrix[i][j] = 0;
        } else if (i === 0 || j === 0) {
          dpMatrix[i][j] = 1;
        } else {
          dpMatrix[i][j] = dpMatrix[i-1][j] + dpMatrix[i][j-1];
        }
      }
    }
    // build dp matrix up to mxn
    return dpMatrix[i-1][j-1];
};

module.exports = uniquePaths;
