const numIslands = require('./island-count');
const { TreeNode, bfsTraverse, recursiveTraverse } = require('./tree-node');
const invertTree = require('./invert-tree');
const maxDepth = require('./max-depth');

// const grid1 = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ];

// const grid2 = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ];

// console.log('grid 1 count: ', numIslands(grid1)); // 1
// console.log('grid 2 count: ', numIslands(grid2)); // 3

let one = new TreeNode(1);
let three = new TreeNode(3);
let two = new TreeNode(2, one, three);
let nine = new TreeNode(9);
let six = new TreeNode(6);
let seven = new TreeNode(7, six, nine);
let root = new TreeNode(4, two, seven);

/*
       4
    /    \
   2      7
  / \    / \
 1   3  6   9

 */
// bfsTraverse(root);
// console.log(invertTree(root));
// console.log('---');
// bfsTraverse(root);

// console.log('max depth: ', maxDepth(root)); // 3
console.log('starting...');
recursiveTraverse(root);
