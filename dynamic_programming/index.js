//const { fib, fibTab } = require('./fibonacci.js');

// console.log(fib(1));
// console.log(fib(2));
// console.log(fib(3));
// console.log(fib(4));
// console.log(fib(5));
// console.log(fib(6));
// console.log(fib(1000));

// console.log(fibTab(1));
// console.log(fibTab(2));
// console.log(fibTab(3));
// console.log(fibTab(4));
// console.log(fibTab(5));
// console.log(fibTab(6));
// console.log(fibTab(30));
// console.log(fibTab(1000));

// const rob = require('./house-robber.js');
// console.log(rob([1,2,3,1])); // 4 
// console.log(rob([2,7,9,3,1])); // 12
// console.log(rob([2,1,1,2])); // 4

// const coinChange = require('./coin-change.js');
// console.log(coinChange([1, 2, 5], 11)); // 3
// console.log(coinChange([1, 2, 5], 5)); // 1
// console.log(coinChange([2], 3)); // -1
// console.log(coinChange([1], 0)); // 0
// console.log(coinChange([1], 1)); // 1
// console.log(coinChange([1], 2)); // 2

const uniquePaths = require('./unique-paths');
console.log("unique paths: ", uniquePaths(7, 3)); // 28
console.log("unique paths: ", uniquePaths(3, 3)); // 6
