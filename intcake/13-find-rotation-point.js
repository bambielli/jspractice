/*
I want to learn some big words so people think I'm smart.
I opened up a dictionary to a page in the middle and started flipping through, looking for words I didn't know. I put each word I didn't know at increasing indices in a huge array I created in memory. When I reached the end of the dictionary, I started from the beginning and did the same thing until I reached the page I started at.

Now I have an array of words that are mostly alphabetical, except they start somewhere in the middle of the alphabet, reach the end, and then start from the beginning of the alphabet. In other words, this is an alphabetically ordered array that has been "rotated." For example:

  var words = [
    'ptolemaic',
    'retrograde',
    'supplant',
    'undulate',
    'xenoepist',
    'asymptote', // <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
];

Write a function for finding the index of the "rotation point," which is where I started working from the beginning of the dictionary. This array is huge (there are lots of words I don't know) so we want to be efficient here.

initial thoughts:
it is "mostly sorted".

A brute force approach that would take O(n) time would be to scan the array and see if you can find the point
where the values become "inconsistent" which is when the value of index i is greater than index i+1.

Consistent --> index i is less than index i+1.
rotation point --> index i is greater than index i+1.
If you reach the end of the list and every value is consistent, then there is no rotation point (list was sorted)

This would take O(n) time and O(1) space (for the variables to comapre the various values);

Additional thoughts:
We can't do better than O(1) space, but maybe we could save some time...
There seem to be recursive like sub-problems in the list. it smells like recursion...

We could divide the array in two (down the middle) and compare the last element of the left half
to the first element of the right half. This actually isn't helpful, though... say the following is the array
var array = ['y' 'z' 'a' 'b' 'c' 'd' 'e' 'f' 'g' 'h' ]
say the division is between c and d. at this point, we don't know if the "inflection point" comes in the first
or second half! we just know that the two elements are consistent.

We can however, confirm that the first half does contain the reverse point, by examining the first element of the
first array and comparing to the last. since the first element is greater than the last element, we KNOW that
the reverse point has to be in that section!


Final thoughts:
we actually don't need to look at the first element of the second half... we just need to look
at the first and last element of one of the halfs, compare them for consistency, and if the
first element is greater than the last that means the reverse point happens in that section!

The base case will therefore be when we have 1 element or if first is greater than last and
length of the array is 2.

otherwise, make the comparison and throw out half of the array.

The space complexity goes up for this...if we slice, we are returning copies of the array each time.
if we don't care about modifying the input array, we can splice it and continue to recur down it.

We also need to return the INDEX so we need to keep track of what the original indices were and pass that
along with the array. Or we could sum it up in the return statements of the recursive calls.

I think summing it up might be better.

Duplicates:
we deal with duplicates in our consistency determination. two elements are consistent if the left elem
is less than or equal to the second element (since that does not denote a potential reverse point)

ISSUE:
var words2 = [
    'othellolagkage', 0
    'ptolemaic', 1
    'retrograde', 2
    'supplant', 3
    'undulate', 4
    'xenoepist', 5
    'asymptote',  6 // <-- rotates here!
    'babka', 7
    'banoffee', 8
    'engender', 9
    'karpatka', 10
];
In this case the first split we make winds up splitting right between the reverse point.
We check the first array, see that it is consistent, then throw the first away and deal with the second
the second by itself, however, IS CONSISTENT.

I think we also need to check as base case, if the first element of the second array is the inflection point, and
return that.

Issue 2:

var words = [
    'asymptote', // <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
    'ptolemaic',
    'retrograde',
    'supplant',
    'undulate',
    'xenoepist',
];
When the array is fully sorted, we return the second to last element in the array as the inflection point.

This is worse than an iterative method doing the same thing, because we are splitting our array each time.
the space complexity is O(nlog n) since we are slicing a copy of the array each time.

FINAL SOLUTION:
My algorithm was correct, but implementation was not. I was basically implementing a variation on
binary search, which uses logN space in the recursive solution. I should have used an iterative
solution, which just keeps track of indices, and accomplishes the problem in O(1) space.

The iterative solution also solves for the case where the list is completely sorted.
*/

function findRotation(words) {
	var mid = Math.floor(words.length / 2);
	if (words.length <= 2) {
		if(isConsistent(words[0], words[mid])) {
			return 0;
		} else {
			return 1;
		}
	} else if(!isConsistent(words[mid], words[mid+1])) { //checks if we are splitting on the reverse point
		return mid+1;
	} else if (isConsistent(words[0], words[mid])) {
		return mid+1 + findRotation(words.slice(mid+1, words.length));
	} else {
		return findRotation(words.slice(0, mid+1));
	}

}

/*
	a and b are consistent when a is less than or equal to b.
*/
function isConsistent(a, b) {
	return a <= b;
}

//time complexity = logN, space is O(1)...this is much better.
function findRotationIterative(array) {
	var floorIndex = 0;
	var ceilIndex = array.length - 1;
	if (isConsistent(array[0], array[array.length - 1])) {
		return 0; //just add a check to see if the array is copletely sorted before starting
	}
	while (floorIndex < ceilIndex) {
		var mid = Math.floor(floorIndex + ((ceilIndex - floorIndex) / 2));

		if (isConsistent(array[floorIndex], array[mid])) {
			//this part is consistent, and the rotation point can not be in the first half
			floorIndex = mid;
		} else {
			ceilIndex = mid;
		}

		if (floorIndex + 1 === ceilIndex) {
			break;
		}
	}
	return ceilIndex;
}

///////////
// Tests //
///////////

var words = [
    'ptolemaic',
    'retrograde',
    'supplant',
    'undulate',
    'xenoepist',
    'asymptote', // <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
];

var words2 = [
    'asymptote', // <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
    'ptolemaic',
    'retrograde',
    'supplant',
    'undulate',
    'xenoepist',
];

console.log(findRotation(words2));
console.log(findRotationIterative(words2))
