/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    function checkBst(node, min, max) {
        if (node.left && node.left.val >= node.val) {
            return false;
        }
        if (node.right && node.right.val <= node.val) {
            isValid = false;
            return false;
        }
        if (node.val <= min || node.val >= max) {
            return false;
        }
        let leftValid = true, rightValid = true;
        if (node.left) {
            leftValid = checkBst(node.left, min, node.val < max ? node.val : max);
        }
        if (node.right) {
            rightValid = checkBst(node.right, node.val > min ? node.val : min, max);
        }
        return leftValid && rightValid;
    }
    return checkBst(root, -Infinity, Infinity);
};

module.exports = isValidBST;
