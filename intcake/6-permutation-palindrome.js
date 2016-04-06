/*
	Write an efficient function that checks whether any permutation of an input string is a palindrome.
	Examples:

	"civic" should return true
	"ivicc" should return true
	"civil" should return false
	"livci" should return false

	***But 'ivicc' isn't a palindrome!***
	If you had this thought, read the question again carefully.
	We're asking if any permutation of the string is a palindrome.
	Spend some extra time ensuring you fully understand the question before starting.
	Jumping in with a flawed understanding of the problem doesn't look good in an interview.
*/

/*
	Uses a javascript object to count the number of instances of each character in the input string.
	Then, examines the values of each of those keys to see if there exists more than 1 with an odd
	number of characters. A palindrome permutation can have 0 or 1 characters with an odd number.

	this algorithm isn't the best...runtime > O(N)
*/
function isPalindromePermutationDict(input) {
	//if input is null, undefined, or empty string
	if(!input || typeof input !== 'string') {
		return false;
	} else {
		//create an object with counts of letters.
		//if more than one odd exists, then it is not a palindrome.
		var charTracker = {};
		for(var i = 0; i < input.length; i++) {
			if (charTracker[input[i]]) {
				charTracker[input[i]] += 1;
			} else {
				charTracker[input[i]] = 1;
			}
		}

		var odd = false; //use as flag
		var props = Object.getOwnPropertyNames(charTracker);
		//iterate through keys and check each value to see if there exists more than 1 that has an odd count
		for (i = 0; i < props.length; i++) {
			if (charTracker[props[i]] % 2 !== 0) {
				//if string has a permuatation that is a palindrome, it should have a maximum
				//of one odd char count.
				if (!odd) {
					odd = true;
				} else {
					return false;
				}
			}
		}
		return true;
	}
}

/*
	This is better than the first example, since we are storing less information and need to do less
	post-processing to determine whether or not the input is a palindrom permutation.

	A palindrome can only have a max of 1 odd characters instances.

	Time complexity: O(N) <-- need to iterate through each character in the input string
	Space complexity: O(N)...although if we really think about it there are only SO MANY characters in the
		Ascii/unicode codecs. We could argue that it is O(k), where k is the number of max characters
		in those codecs...so the argument could be made for O(1) - constant time.
*/
function isPalindromePermutationSet (input) {
	//if input is null, undefined, or empty string
	if(!input || typeof input !== 'string') {
		return false;
	} else {
		//create a set. if the character is in the set, remove it (meaning it had a pair)
		//if it is not in the set, add it (it is currently odd)
		var trackOddChars = new Set();
		for(var i = 0; i < input.length; i++) {
			var char = input[i]

			if (trackOddChars.has(char)) {
				trackOddChars.delete(char);
			} else {
				trackOddChars.add(char);
			}
		}
		return trackOddChars.size <= 1
	}
}

///////////
// Tests //
///////////

//Dict method
console.log(isPalindromePermutationDict('civic') === true);
console.log(isPalindromePermutationDict('ivicc') === true);
console.log(isPalindromePermutationDict('civil') === false);
console.log(isPalindromePermutationDict('livci') === false);

//Set method
console.log(isPalindromePermutationSet('civic') === true);
console.log(isPalindromePermutationSet('ivicc') === true);
console.log(isPalindromePermutationSet('civil') === false);
console.log(isPalindromePermutationSet('livci') === false);
