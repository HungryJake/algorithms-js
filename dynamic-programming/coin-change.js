
// [1, 2, 5], 11 => 3
var coinChange = function(coins, amount) {
  if (coins.length === 0) {
    return -1;
  } else if (amount <= 0) {
    return 0;
  }

  let minCoins = new Array(amount+1);
  minCoins[0] = 0;
  minCoins.fill(Infinity, 1);

  let i, j;
  for (i = 1; i <= amount; i++) {
    let min = Infinity;
    for (j=0; j<coins.length; j++) {
      if (coins[j] > i) {
        break;
      }
      const prevMin = minCoins[i-coins[j]];
      if (prevMin < min) {
        min = prevMin;
      }
    }
    minCoins[i] = min + 1;
  }
  const result = minCoins.pop();
  return result === Infinity ? -1 : result;
};

module.exports = coinChange;
