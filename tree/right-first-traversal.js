// two ways to solve this problem.
// - iteratively
// - recursively

// iterative solution
function rightFirstTraversal(root) {
  let result = [];
  let currNode = root;
  result.push(currNode.val);
  let queue = [];
  if (!root) {
    return [];
  } else if (!root.left && !root.right) {
    return [root.val];
  }
  while(currNode.left || currNode.right || queue.length > 0) {
    if (currNode.left) {
      queue.push(currNode.left);
    }
    if (currNode.right) {
      result.push(currNode.right.val);
      currNode = currNode.right;
    } else if (queue.length > 0) {
      currNode = queue.pop();
      result.push(currNode.val);
    }
  }
  return result;
}

// recursive solution
function rightFirstTraversalRecursive(root) {
  let result = [];
  let queue = [];
  
  if (!root) {
    return [];
  } else if (!root.left && !root.right) {
    return [root.val];
  }

  function visit(node) {
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      result.push(node.right.val);
      visit(node.right);
    } else if (queue.length > 0) {
      const nextNode = queue.pop();
      result.push(nextNode.val);
      visit(nextNode);
    }
    // end when both children are null
    // or queue length === 0
  }
  result.push(root.val);
  visit(root);
  return result;
}

module.exports = { rightFirstTraversal, rightFirstTraversalRecursive };
