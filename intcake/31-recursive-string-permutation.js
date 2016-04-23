/*
	Write a recursive function for generating all permutations of an input string.
	Return them as a set.
	Don't worry about time or space complexity—if we wanted efficiency we'd write
	an iterative version.

	To start, assume every character in the input string is unique.

	Your function can have loops—it just needs to also be recursive.

	Initial thoughts:
	This is actually a lot harder as a recursive problem than it would be as an
	iterative problem...

	The first step of any recursive problem is determining the sub-problems that
	will solve your problem.

	A letter in a string is "done" in a position if every other letter to the right of it
	has been in each other position.

	To get a permutation of the letters if a position is frozen, we
*/

function getPermutations(string) {
	console.log(string);
    // base case
    if (string.length <= 1) { //if the string is one character (or 0) return a set of the string
        return new Set(string);
    }

    var allCharsExceptLast = string.slice(0, -1); // he // h
    var lastChar = string[string.length - 1]; // y // e (the last char is the thing we are going to be placing in the array)

    // recursive call: get all possible permutations for all chars except last
    var permutationsOfAllCharsExceptLast = getPermutations(allCharsExceptLast);

    // put the last char in all possible positions for each of the above permutations
    var permutations = new Set();
    permutationsOfAllCharsExceptLast.forEach(function(permutationOfAllCharsExceptLast) {
    	// this iterates through each item in the set that was returned from the recursive call
    	// and sticks the "lastChar" at each possible position in each item in the set.
    	// on first go around, there is only one letter in the set ('h' in this case)
    	// we stick the letter e before the h and after the h, creating a set of 2 items that we return.
    	// this 2 size set gets returned for the first recursive call, and then the final last letter 'y'
    	// gets stuck in each position (3 positions a piece) for each letter in the 2 item set.

    	//the first argument passed to the forEach callback is just the value of the current item in the set.
    	//we loop through each character and place the "lastChar" at all positions in the string.
    	//we then add this to the new permutations set that we are constructing.

        for (var position = 0; position <= allCharsExceptLast.length; position++) {
            var permutation = permutationOfAllCharsExceptLast.slice(0, position) + lastChar + permutationOfAllCharsExceptLast.slice(position);
            permutations.add(permutation);
        }
    });
    console.log(permutations);
    return permutations;
}

////////////
// Tester //
////////////

var permutations = getPermutations('hey'); //returns Set(hey, hye, yeh, yhe, ehy, eyh)
var context = {};
//can pass a context to a forEach loop
permutations.forEach(function(wat, the, heck) {

	this[wat] = wat;
	if (this.hasOwnProperty('count')) {
		this.count++
	} else {
		this.count = 1;
	}
}, context);

console.log(context);
