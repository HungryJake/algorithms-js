function CyclicRotation(arr, k) {
  if (arr.length === 0) {
    return [];
  } else if (k >= arr.length && k % arr.length === 0) {
    return arr.slice();
  }

  let result = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    let d = i + k;
    if (d >= arr.length) {
      d = d % arr.length;
      if (d === i) {
        continue;
      }
    }
    result[d] = arr[i];
  }
  return result;
}

module.exports = CyclicRotation;
