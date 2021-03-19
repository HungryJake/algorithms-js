// const productExceptSelf = require('./products-except-self.js');
// console.log(productExceptSelf([1, 2, 3, 4]));

const threeSum = require('./three-sum.js');
console.log('three sum: ', threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]
console.log('three sum: ', threeSum([0,0,0])); // [[0, 0, 0]]
console.log('three sum: ', threeSum([0,0,0,0])); // [[0,0,0]]
console.log('three sum: ', threeSum([-2,0,1,1,2])); // [[0,0,0]]
