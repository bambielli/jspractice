/*
I like parentheticals (a lot).
"Sometimes (when I nest them (my parentheticals) too much (like this (and this)))
they get confusing."

Write a function that, given a sentence like the one above, along with the position of an
opening parenthesis, finds the corresponding closing parenthesis.

Example: if the example string above is input with the number 10 (position of the first
parenthesis), the output should be 79 (position of the last parenthesis).

Initial thoughts, Can implement with a stack, that pops every time a matching paren is found.
This would require O(n) time in worst case, and O(n) space (since the string could be entirely parens)

Further thought:
Instead of a stack, since we know all parens are the same, we can just have a counter.
the counter starts at 1 initially, then increases every time it finds another open paren,
and decrements whenever it finds a close. This brings space down to O(1).
*/

function matchingParenthesis(inputString, openParenPosition) {
	var openCounter = 0;
	for(var i = openParenPosition+1; i < inputString.length; i++) {
		if (inputString[i] === ')') {
			if (openCounter === 0) {
				return i;
			}
			openCounter--;
		} else if (inputString[i] === '(') {
			openCounter++;
		}
	}
    throw new Error('No closing parenthesis :(');
}

///////////
// Tests //
///////////


var inputString = "(hello my name is bob)";
console.log(matchingParenthesis(inputString, 0));
inputString = "(((()((()(()(()(())))))())()))"
console.log(matchingParenthesis(inputString, 26));
