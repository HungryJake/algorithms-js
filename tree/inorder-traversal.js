// tree
/*
        4
      /   \
     2     7
          / \
         6   9
2 -> 4 -> 6 -> 7 -> 9

        4
      /   \
     2     7
    / \   / \
   1  3  6   9

1 -> 2 -> 3 -> 4 -> 6 -> 7 -> 9
*/
function inorderTraversalIterative(root) {
  if (!root) {
    return [];
  } else if (!root.left && !root.right) {
    return [root.val];
  }
  let result = [];
  let currNode = root;
  let queue = [];

  while (true) {
    if (currNode.left) {
      queue.push(currNode); // not visit current and right yet
      currNode = currNode.left;
      continue;
    } else {
      // no more left child
      result.push(currNode.val); // current
      if (queue.length > 0) {
        currNode = queue.pop();
      } else if (!currNode.left && !currNode.right) {
        // done
        break;
      }
    }
    result.push(currNode.val); // center
    if (currNode.right) {
      currNode = currNode.right;
      continue;
    }
    if (!currNode.left && !currNode.right && queue.length === 0) {
      // done
      break;
    }
  }
  return result;
}

function inorderTraversalRecursive(root) {
  if (!root) {
    return [];
  } else if (!root.left && !root.right) {
    return [root.val];
  }
  let result = [];
  function visit(node) {
    if (node.left) {
      visit(node.left);
    }
    result.push(node.val);
    if (node.right) {
      visit(node.right);
    }
  }
  visit(root);
  return result;
}

module.exports = { inorderTraversalIterative, inorderTraversalRecursive};
