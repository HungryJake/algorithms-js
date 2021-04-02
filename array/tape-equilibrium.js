function tapeEquilibrium(arr) {
  // 1. get left sum
  // 2. get right sum
  // 3. find min

  let leftSum = [];
  let rightSum = new Array(arr.length);
  let min = Infinity;
  for (let i = 0; i < arr.length; i++) {
    const myLeftSum = i === 0 ? 0 : leftSum[i - 1];
    leftSum.push(arr[i] + myLeftSum);
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const myRightSum = i === arr.length - 1 ? 0 : rightSum[i + 1];
    rightSum[i] = arr[i] + myRightSum;
  }

  // console.log('left sum: ', leftSum, 'right sum: ', rightSum);
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(leftSum[i - 1] - rightSum[i]);
    if (diff < min) {
      min = diff;
    }
  }
  return min;
}

module.exports = tapeEquilibrium;
