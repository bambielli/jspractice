/*

	In order to win the prize for most cookies sold, my friend Alice and I are going to merge our
	Girl Scout Cookies orders and enter as one unit. Each order is represented by an "order id" (an integer).

	We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays
	of orders into one sorted array.

	For example:

	var myArray     = [3, 4, 6, 10, 11, 15];
	var alicesArray = [1, 5, 8, 12, 14, 19];

	console.log(mergeArrays(myArray, alicesArray));
	// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]

*/

function mergeArrays(arr1, arr2) {
	var returnArray = [];
	var count1 = 0;
	var count2 = 0;

	while(count1 < arr1.length || count2 < arr2.length) {
		var num1 = arr1[count1];
		var num2 = arr2[count2];
		if (num1 < num2) {
			returnArray.push(num1);
			count1++;
		} else {
			returnArray.push(num2);
			count2++;
		}
	}
	return returnArray;
}


var myArray     = [3, 4, 6, 10, 11, 15];
var alicesArray = [1, 5, 8, 12, 14, 19];

console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
var myArray1 = [];
var myArray2 = [];
console.log(mergeArrays(myArray1, myArray2));
