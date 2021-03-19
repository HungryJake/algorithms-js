const productsExceptSelf = (nums) => {
  if (nums.length === 0) {
    return 1;
  } else if (nums.length === 1) {
    return nums;
  }

  let resultL = new Array(nums.length).fill(1);
  let resultR = resultL.slice(0);
  // from left to right
  let i;
  for (i=1; i<nums.length; i++) {
    resultL[i] = nums[i-1] * resultL[i-1];
  }
  // [1, 2, 3, 4] nums
  // [1, 1, 1, 1] => [1, 1, 2, 6];

  // from right to left;
  for (i=nums.length-2; i>=0; i--) {
    resultR[i] = nums[i+1] * resultR[i+1];
  }

  let result = [];
  console.log('resultL', resultL, 'resultR', resultR);
  for (i=0; i<nums.length; i++) {
    result.push(resultL[i] * resultR[i]);
  }
  // [1, 2, 3, 4]
  // [1, 1, 2, 6] => [ 2, 3, 8, 6]
  return result;
};

module.exports = productsExceptSelf;
