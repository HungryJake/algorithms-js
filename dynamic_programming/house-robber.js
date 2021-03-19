module.exports = function rob(houses = []) {
  // 1 house - rob that
  // 2 houses - rob max(current, current - 1);
  // 3 houses - rob max(current + (current - 2), current - 1)
  // 4 houses - rob max(current + (current - 2), (current - 1) + (current - 3))

  if (houses.length === 0) {
    return 0;
  } else if (houses.length === 1) {
    return houses[0];
  } else if (houses.length === 2) {
    return Math.max(houses[0], houses[1]);
  } else if (houses.length === 3) {
    return Math.max(houses[0] + houses[2], houses[1]);
  }
  let i, maxToRob = [
    houses[0],
    Math.max(houses[0], houses[1]),
    Math.max(houses[0] + houses[2], houses[1])
  ];
  for (i=3; i<houses.length; i++) {
    maxToRob.push(Math.max(houses[i] + maxToRob[i-2], houses[i-1] + maxToRob[i-3]));
    console.log('maxToRob', maxToRob);
  }
  return maxToRob.pop();
}
