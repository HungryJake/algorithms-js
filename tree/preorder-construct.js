function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function preorderConstructBst(preorder) {
  if (!preorder || preorder.length === 0) {
    return null;
  } else if (preorder.length === 1) {
    return preorder;
  }

  let root = new TreeNode(preorder[0]);
  let currNode = root;
  if (preorder.length > 1) {
    for  (let i=1; i<preorder.length; i++) {
      currNode.left = preorder[i];
    }
  }
  
  return root;
}

module.exports = { preorderConstructBst };
