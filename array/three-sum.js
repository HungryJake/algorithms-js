/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// [-1,0,1,2,-1,-4] => [[-1,-1,2],[-1,0,1]]
var threeSum = function(nums) {
  if (nums < 3) {
    return [];
  }

  const ascSort = (left, right) => {
    return left - right;
  };
  const sorted = nums.sort(ascSort);
  // [-4, i:-1, -1, k:0, j:1, 2];
  // [k:0, i:0, j:0]

  // [-2,0,1,1,1,2] => [[-2,0,2], [-2,1,1]]
  let results = [];
  for (let k = 0; k < sorted.length; k++) {
    let i = 1; j = sorted.length - 1;
    if (k > 0 && sorted[k] === sorted[k-1]) {
      continue;
    }
    while (i < j) {
      // when k and i or j overlaps
      const sum = sorted[k] + sorted[i] + sorted[j];
      if (sum === 0) {

        sortedResult = [sorted[k], sorted[i], sorted[j]].sort(ascSort);      
        let isDup = false;
        results.every((resArray) => {
          if (JSON.stringify(sortedResult) === JSON.stringify(resArray)) {
            isDup = true;
          }
        });
        if (!isDup) {
          results.push(sortedResult);
          i++;
        }
        
        
        // results.push([sorted[k], sorted[i], sorted[j]]);
        do {
          i++;
        } while (sorted[i] === sorted[i-1] && i < j-1)
        while (sorted[j] === sorted[j+1] && i < j-1) {
          j--;
        }
      } else if (sum < 0) {
        i++;
      } else if (sum > 0) {
        j--;
      }
    }
  }
  return results;
};

module.exports = threeSum;
