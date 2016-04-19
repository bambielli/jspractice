/*
	I have an array where every number in the range 1....n appears once except
	for one number which appears twice.
	Write a function for finding the number that appears twice.

	initial thoughts:
	Well we could sum all of the numbers up in the series that we have,
	then subtract it from the supposed sum of 1 to n, and we will have our leftover.

	We can do this by iterating through n, and then iterating through the range of 1-n
	to create both sums.

	We can do this in one loop if we are smart, so the runtime would be O(n) and
	space would be O(1)

	Maybe we can do better?

	Additional thoughts:
	numbers from 1...n are a triangular series. this means that the sum of the numbers
	from 1 to n can be solved with the formula (Math.pow(n,2) + n) / 2. This is an O(1)
	time calculation to make. I can't really think of a better way to
	figure out what the sum of an array is without accessing each element and adding it
	to a sum...
*/

function whichAppearsTwice(array) {
	var supposedSum = (Math.pow(array.length-1, 2) + array.length-1) / 2;
	var actualSum = array.reduce(function(a, b) {
		return a + b;
	}, 0);

	return actualSum - supposedSum

}

////////////
// Tester //
////////////

console.log(whichAppearsTwice([1,2,3,4,4,5]));

//will not work with super large numbers (integer overflow)
