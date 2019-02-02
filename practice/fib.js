/**
 * retrieves the n'th fib number
 * @param {integer} n - which number is desired?
 * @returns {integer} the nth number
 */

 // this solution is suboptimal because is utses O(n) memory in call stack
 // it also performs redundant computation on values of fib that were previously calculated.
 // this is O(2^n) of time complexity based on the redundant calculations that are performed.
 // you wind up calling recursiveFib(1) 2^n-1 times.
 // it is O(n) in space (based on solving a max depth call stack all the way down to n)
function recursiveFib(n) {
  if (n <= 1) {
    return n;
  }
  return recursiveFib(n - 2) + recursiveFib(n - 1);
}

console.log(recursiveFib(0))
console.log(recursiveFib(1)) // 1
console.log(recursiveFib(2)) // 1
console.log(recursiveFib(3)) // 2
console.log(recursiveFib(4)) // 3
console.log(recursiveFib(5)) // 5
console.log(recursiveFib(6)) // 8
console.log(recursiveFib(7)) // 13

// this has a time complexity of O(n) and space of O(n)
// the time is now On since we only perform computation once
// space is also O(n) because we are just creating one single array
function memoFib(n) {
  if (n <= 1) {
    return n;
  }
  const memoTable = [1, 1];

  for(let i = 2; i < n; i++) {
    memoTable.push(memoTable[i-2] + memoTable[i-1])
  }
  return memoTable[n-1]
}

console.log(memoFib(0))
console.log(memoFib(1)) // 1
console.log(memoFib(2)) // 1
console.log(memoFib(3)) // 2
console.log(memoFib(4)) // 3
console.log(memoFib(5)) // 5
console.log(memoFib(6)) // 8
console.log(memoFib(7)) // 13

// low mem fib is useful because it uses memoization (so O(n) time complexity)
// but also is sensitive to the amount of memory it uses
// it does not store EVERY precomputed value in an array (it doesnt need to)
// it just stores the previous two.
function lowMemFib(n) {
  if (n <= 1) {
    return n
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

console.log(lowMemFib(0))
console.log(lowMemFib(1)) // 1
console.log(lowMemFib(2)) // 1
console.log(lowMemFib(3)) // 2
console.log(lowMemFib(4)) // 3
console.log(lowMemFib(5)) // 5
console.log(lowMemFib(6)) // 8
console.log(lowMemFib(7)) // 13


// this leverages an equation about fib that makes it calculable in constant time and space.
// you can use the "golden ratio" to calculate the n-th number of fib
function constantTimeFib(n) {
  const phi = (1 + Math.sqrt(5)) / 2;
  return Math.round(Math.pow(phi, n) / Math.sqrt(5))
}

console.log(constantTimeFib(0))
console.log(constantTimeFib(1)) // 1
console.log(constantTimeFib(2)) // 1
console.log(constantTimeFib(3)) // 2
console.log(constantTimeFib(4)) // 3
console.log(constantTimeFib(5)) // 5
console.log(constantTimeFib(6)) // 8
console.log(constantTimeFib(7)) // 13