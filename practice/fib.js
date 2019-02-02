/**
 * retrieves the n'th fib number
 * @param {integer} n - which number is desired?
 * @returns {integer} the nth number
 */

function fib(n) {
  if (n < 1) {
    return -1
  }
  let prevVal = 0;
  let currentVal = 1;
  for (let i = 1; i < n; i++) {
    let temp = prevVal + currentVal;
    prevVal = currentVal;
    currentVal = temp;
  }
  return currentVal;
}

console.log(fib(0))
console.log(fib(1)) // 1
console.log(fib(2)) // 1
console.log(fib(3)) // 2
console.log(fib(4)) // 3
console.log(fib(5)) // 5
console.log(fib(6)) // 8
console.log(fib(7)) // 13
