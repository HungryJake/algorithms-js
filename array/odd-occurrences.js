function OddOccur(arr) {
  if (arr.length === 0) {
    return -1;
  } else if (arr.length === 1) {
    return arr[0];
  }
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    const foundIdx = stack.indexOf(arr[i]);
    if (foundIdx === -1) {
      stack.push(arr[i]);
    } else {
      stack.splice(foundIdx, 1);
    }
  }
  return stack.pop();
}

module.exports = OddOccur;
