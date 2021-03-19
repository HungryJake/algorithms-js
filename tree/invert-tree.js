const TreeNode = require('./tree-node');

// inverse binary tree
function invertTree(root) {
  if (!root) {
    return null;
  } else if (!root.left && !root.right) {
    return root;
  }

  // bottom up
  if (root.left) {
    invertTree(root.left);
  }
  
  if (root.right) {
    invertTree(root.right);
  }

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  return root;
}

module.exports = invertTree;
