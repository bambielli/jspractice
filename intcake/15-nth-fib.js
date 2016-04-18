/*
compute nth fib.

There are a few ways to do this.

1) Can do it recursively, but that does a lot of computation over and over again. Space complexity
is much higher O(logN).

2) use memoization to compute the nth fib and store it in memory.
*/


function fib(n) {
	if(n === 0) {
		return 0;
	} else if (n === 1) {
		return 1;
	}
	var memo = [];
	memo[0] = 0;
	memo[1] = 1;
	for(var i = 2; i <= n; i++) {
		var temp = memo[0];
		memo[0] = memo[1]
		memo[1] = memo[0] + temp;
	}
	return memo[1];
}

console.log(fib(0)) //0
console.log(fib(1)) //1
console.log(fib(2)) //1
console.log(fib(3)) //2
console.log(fib(4)) //3
console.log(fib(5)) //5
console.log(fib(6)) //8
console.log(fib(7)) //13

