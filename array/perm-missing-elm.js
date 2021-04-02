function permMissingElm(arr) {
  if (arr.length < 2) {
    return 0;
  }
  const sortedArr = arr.sort((left, right) => {
    return left - right;
  });
  for (let i = 1; i < sortedArr.length; i++) {
    if (sortedArr[i] - sortedArr[i - 1] > 1) {
      return sortedArr[i] - 1;
    }
  }
  return 0;
}

module.exports = permMissingElm;
