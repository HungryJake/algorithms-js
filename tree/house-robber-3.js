/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  //     console.log(root.left, root.right);

  //     console.log(root.right.left.right.val, root.right.right);

  function calculateMax(node) {
    let directChildrenSum = 0;
    let grandChildrenSum = 0;

    let lrlCrossChildrenSum = 0;
    let lrrCrossChildrenSum = 0;

    let rllCrossChildrenSum = 0;
    let rlrCrossChildrenSum = 0;

    if (node.left) {
      const leftMax = calculateMax(node.left);
      directChildrenSum += leftMax;
      lrlCrossChildrenSum += leftMax;
      lrrCrossChildrenSum += leftMax;

      if (node.left.left) {
        const leftLeftMax = calculateMax(node.left.left);
        grandChildrenSum += leftLeftMax;
        rllCrossChildrenSum += leftLeftMax;
      }
      if (node.left.right) {
        const leftRightMax = calculateMax(node.left.right);
        grandChildrenSum += leftRightMax;
        rlrCrossChildrenSum = leftRightMax;
      }
    }

    if (node.right) {
      const rightMax = calculateMax(node.right);
      directChildrenSum += rightMax;
      rllCrossChildrenSum += rightMax;
      rlrCrossChildrenSum += rightMax;

      if (node.right.left) {
        const rightLeftMax = calculateMax(node.right.left);
        grandChildrenSum += rightLeftMax;
        lrlCrossChildrenSum += rightLeftMax;
      }
      if (node.right.right) {
        const rightRightMax = calculateMax(node.right.right);
        grandChildrenSum += rightRightMax;
        lrrCrossChildrenSum += rightRightMax;
      }
    }
    return Math.max(
      node.val + grandChildrenSum,
      directChildrenSum,
      lrlCrossChildrenSum,
      lrrCrossChildrenSum,
      rllCrossChildrenSum,
      rlrCrossChildrenSum
    );
  }

  return calculateMax(root);
};
