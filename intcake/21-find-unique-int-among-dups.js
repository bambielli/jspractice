/*
UNIQUE INTEGER AMONG DUPS
Your company delivers breakfast via autonomous quadcopter drones. And something mysterious has happened.
Each breakfast delivery is assigned a unique ID, a positive integer.
When one of the company's 100 drones takes off with a delivery,
the delivery's ID is added to an array, deliveryIdConfirmations.
When the drone comes back and lands, the ID is again added to the same array.

After breakfast this morning there were only 99 drones on the tarmac.
One of the drones never made it back from a delivery.
We suspect a secret agent from Amazon placed an order and stole one of our patented drones.
To track them down, we need to find their delivery ID.

Given the array of IDs, which contains many duplicate integers and one unique integer,
find the unique integer.

The IDs are not guaranteed to be sorted or sequential.
Orders aren't always fulfilled in the order they were received,
and some deliveries get cancelled before takeoff.
*/

/*
	Initial thoughts:
	A brute force sort of algorithm could iterate through the array, and add each integer key to a
	object that would store the count for each
	then we could iterate through all of the counts, and return whichever one only has a count of 1.

	This would take O(n) time, though, and O(n) space (for the object). Maybe we can do better?

	O(n) seems like the best runtime we can possibly get for finding the duplicate value...in order
	to find out if a value is a duplicate or not, we will have to check the entire array. But maybe
	we can do better when it comes to space.

	Eliminating duplicates would be easy, we could just iterate through the values and stick them in a set,
	then return that set. This doesn't tell us what we want, though...we want to find the single element
	that is NOT a duplicate, so eliminating duplicates does not help us. How could we do this?

	The answer was to XOR each number in to one value that starts at 0.
	Excluisve OR only changes bits IFF the bit only appears in either operand.
	By XORing each value in to this single value, we will be left with the value that remains.

	This accomplishes the task with O(1) space complexity, which is great.
*/

/*
	Returns the unique number in an array, if there is one.
	Returns 0 otherwise.
*/
function uniqueNum (arr) {
	var unique = 0;
	for (var i = 0; i < arr.length; i++) {
		unique ^= arr[i];
	}
	return unique;
}

var arr = [1, 2, 2, 3, 3, 4, 5, 1, 4, 6, 7, 7, 6]

console.log(uniqueNum(arr));

var arr = [1,1]
console.log(uniqueNum(arr));
