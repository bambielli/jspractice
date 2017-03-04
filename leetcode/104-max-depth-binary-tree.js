/**
 * Max depth of a binary tree
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {
  // need to do a traversal of the whole tree
  // make an inner function that traverses the tree
  // closure variable that keeps track of max depth

  if (root === null) {
    return 0
  }

  let max = 0

  const traverseAndCount = function (node, cd) {
    // traverse the tree, every time you go down a path, first check to see if the
    // currentDepth is greater than the maxDepth. If so, set it to the maxDepth.

    if (node.left) {
      traverseAndCount(node.left, 1 + cd)
    }
    if (node.right) {
      traverseAndCount(node.right, 1 + cd)
    }
    max = Math.max(max, cd)
  }

  traverseAndCount(root, 1)
  return max
}
