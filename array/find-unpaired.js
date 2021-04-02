function findUnpaired(arr) {
  let stack = [];
  for (let i = 0; i < arr.length; i++) {
    const foundIdx = stack.indexOf(arr[i]);
    if (foundIdx === -1) {
      stack.push(arr[i]);
    } else {
      // pick it out from array and remove
      stack.splice(foundIdx, 1);
    }
  }
  return stack.pop();
}

module.exports = findUnpaired;
