function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const bfsTraverse = function (node) {
  let queue = [node];
  let currNode;
  while (queue.length > 0) {
    currNode = queue.shift();
    console.log(currNode.val);
    if (currNode.left) {
      queue.push(currNode.left);
    }
    if (currNode.right) {
      queue.push(currNode.right);
    }
  }
}

const recursiveTraverse = function (node) {
  const currNode = node;
  // console.log(node.val); // dfs
  if (currNode.left) {
    console.log(node.left.val);
    recursiveTraverse(currNode.left);
  }
  if (currNode.right) {
    console.log(node.right.val);
    recursiveTraverse(currNode.right);
  }
  if (currNode.left) {
    recursiveTraverse(currNode.left);
  }
  if (currNode.right) {
    recursiveTraverse(currNode.right);
  }
}

module.exports = {
  TreeNode,
  bfsTraverse,
  recursiveTraverse
};
