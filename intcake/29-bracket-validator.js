
/*
	Problem 29:
	You're working with an intern that keeps coming to you with JavaScript code that won't run
	because the braces, brackets, and parentheses are off. To save you both some time,
	you decide to write a braces/brackets/parentheses validator.
	Let's say:

	'(', '{', '[' are called "openers."
	')', '}', ']' are called "closers."

	Write an efficient function that tells us whether or not an input string's
	openers and closers are properly nested.

	Examples:

	"{ [ ] ( ) }" should return true
	"{ [ ( ] ) }" should return false
	"{ [ }" should return false
*/

// object that defines mapping between openers and closers
var bracketMap = {
	"{" : "}",
	"[" : "]",
	"(" : ")"
};

/*
	bracketValidator --> String inputBrackets - string of brackets delimited by " "
		returns true if brackets are properly nested, and false otherwise

	runtime: O(n) since it only reuqires one pass through the string to determine its answer in worst case
		worstCase is when all items are "openers", since it will need to push everything on to the stack
		to determine whether or not the string is valid.

	Space: O(n) since in the worst case it will push the entire string on to the stack.

*/
function bracketValidator(inputBrackets) {
	//check if the input is null, empty, or empty string.
	if(!inputBrackets) {
		return false;
	}
	//split string on space delimiter.
	var arr = inputBrackets.split(" ");
	if (arr.length % 2 !== 0) {
		return false;
	}
	var stack = []
	for (var i = 0; i < arr.length; i++) {
		if(bracketMap[arr[i]]) {
			//push the CLOSER on to the stack, for easy comparison later
			stack.push(bracketMap[arr[i]]);
		} else {
			//this means it was not a key, so it must be a closer
			if (stack.pop() !== arr[i]) {
				return false;
			}
		}
	}
	if (stack.length === 0) {
		return true;
	} else {
		return false;
	}
}

///////////
// Tests //
///////////

console.log(bracketValidator("{ [ ] ( ) }") === true);
console.log(bracketValidator("{ [ ( ] ) }") === false);
console.log(bracketValidator("{ [ }") === false);
console.log(bracketValidator() === false);
console.log(bracketValidator("") === false);


