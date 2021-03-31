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
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
    if (!root) {
        return false;
    }
    
    // let node = root;
    let pathSum;
    let found = false;
    function inspect(node, sum) {
        pathSum = sum + node.val; // 5 + 4 => 9 + 11 = 20 
        if (!node.left && !node.right) {
            if (pathSum === targetSum) {
                found = true;
            }
            return;
        }
        if (node.left) {  // yes, 11, 7
            inspect(node.left, pathSum);
        }
        if (node.right) {
            inspect(node.right, pathSum);
        }
    }
    inspect(root, 0);
    return found;
};


module.exports = { hasPathSum };
