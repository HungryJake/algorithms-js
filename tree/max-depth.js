var maxDepth = function(root) {
  if (!root) {
    return 0;
  } else if (!root.left && !root.right) {
    return 1;
  }

  let depth = 1;

  if (root.left && !root.right) {
    depth += maxDepth(root.left);
  } else if (root.right && !root.left) {
    depth += maxDepth(root.right);
  } else {
    depth += Math.max(maxDepth(root.left), maxDepth(root.right));
  }
  return depth
};

module.exports = maxDepth;
