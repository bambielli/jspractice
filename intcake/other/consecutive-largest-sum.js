/*
	Given an array of ints, find the consecutive ints that give the largest sum

	Initial thoughts:

	If all of the values were guaranteed to be positive (or at least non-negative), we could safely say
	that the answer was just the entire array (especially because the problem doesn't say anything)
	about returning the SHORTEST set of integers that give the largest sum.

	one way to do this would be to write a brute force n^2 program that iterates through each item
	and sums it to every other item, and finds the maximum value possible. It might be difficult to track
	the integers summed as well as the value, but maybe not.

	This would be O(n^2) time, and O(1) space (for tracking the max and other temp variables along the way)

	Instead we write a function that keeps track of the maximum value if we were
	to end at the current index of the array. We compare that to the maximum value
	so far that we have found, and if it is more, then we change.

	returns 0 if all numbers are negative
	returns an error if the value passed is not an array or an array like object.

	This requires O(n) time and O(1) space.

	The second method consecutiveSumArray keeps track of the starting and ending indices
	for a subarray. We still keep thes space complexity at O(1), since a constant
	number of pointers are required to keep track of the indices.
	which would keep the space complexity at O(1)

	It returns the subArray of values for the max found,
	otherwise it returns an empty array, indicating no max subarray was found.
*/

var testArray1 = [1, 5, -50, 6, 10]; //should return 16
var testArray2 = [1, -2, 3, -1, 5, -1, 2, -30, 7] //should return 8
var testArray3 = [1, 2, -1] //should return 3
var testArray4 = [4, 5, -10, 1, 2] //should return 9
var testArray5 = [1, 2, -40, 5, 6, -50, 3, 4] //should return 11
var testArray6 = [-1, -2, -3, -4];


function consecutiveSum(array) {
	if (!array || typeof array !== 'object' || !array.length) {
		return new Error('Input array must have at least one element');
	}

	var maxEndingHere = 0;
	var maxSoFar = 0;
	//want to be able to iterate through the array
	for (var i = 0; i < array.length; i++) {
		//maxEndingHere is reset back to 0 if a large enough negative number
		//is added that makes the max go negative. This allows us to check
		//and see what would have happened if we sum through the
		maxEndingHere = Math.max(0, maxEndingHere + array[i]);
		maxSoFar = Math.max(maxSoFar, maxEndingHere);
	}
	return maxSoFar
}

function consecutiveSumArray(array) {
	if (!array || typeof array !== 'object' || !array.length) {
		return new Error('Input array must have at least one element');
	}

	var maxEndingHere = 0;
	var maxSoFar = 0;
	var startingIndex = 0;
	var endingIndex = 0;
	var potentialStartingIndex = 0;
	//want to be able to iterate through the array
	for (var i = 0; i < array.length; i++) {
		//maxEndingHere is reset back to 0 if a large enough negative number
		//is added that makes the max go negative. This allows us to check
		//and see what would have happened if we sum through the
		maxEndingHere = Math.max(0, maxEndingHere + array[i]);
		if(maxEndingHere === 0) {
			// this means the maxEndingHere went negative.
			// a new potential starting position for a max subarray
			// is the one after this.

			//NOTE we keep track of this separately (and do not immediately overwrite)
			//startingIndex) because the next potential subArray might not wind up being
			//greater than the one we have already found.
			potentialStartingIndex = i+1;

		}
		var newMaxSoFar = Math.max(maxSoFar, maxEndingHere);
		//I only want to update the array pointers if the value is greater than the previous max
		if (newMaxSoFar > maxSoFar) {
			maxSoFar = newMaxSoFar;
			startingIndex = potentialStartingIndex;
			endingIndex = i;
		}
	}

	//if maxSoFar is still 0, that means we did not find a max subarray
	//I guess this doesn't really work if the arrays are all zero.
	if (maxSoFar) {
		return array.slice(startingIndex, endingIndex+1);
	} else {
		return [];
	}
}

console.log(consecutiveSumArray(testArray1));
console.log(consecutiveSumArray(testArray2));
console.log(consecutiveSumArray(testArray3));
console.log(consecutiveSumArray(testArray4));
console.log(consecutiveSumArray(testArray5));
console.log(consecutiveSumArray(testArray6));
