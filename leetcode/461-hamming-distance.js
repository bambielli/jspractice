/**
 * The Hamming distance between two integers is the number of positions at which the corresponding
 * bits are different.
 *
 * The function below calculates the Hamming distance between two integers
 *
 * We can do this quickly by performing an XOR on the bits, which will result in a new integer whose
 * bits are 1 if the position between the two original integers was different.
 *
 * The set bits in the resulting number are summed in the counter by doing a bitwise & 1
 * which will result in 1 if the last set bit is a 1, and will result in a 0
 * if the last set bit is a 0. The loop is incremented by doing a right shift of
 * the XOR number by 1 position on each iteration. This allows us to check all of the bits
 */

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let count = 0
  for (let i = x ^ y; i > 0; i >>= 1) {
    count += i & 1
  }
  return count
}
