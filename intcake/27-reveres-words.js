/*
You're working on a secret team solving coded transmissions.
Your team is scrambling to decipher a recent message, worried it's a plot to break
into a major European National Cake Vault. The message has been mostly deciphered,
but all the words are backwards! Your colleagues have handed off the last step to you.

Write a function reverseWords() that takes a string message and reverses
the order of the words in-place.

Since strings in JavaScript are immutable, we'll first convert the string into an array
of characters, do the in-place word reversal on that array, and re-join that array into
a string before returning it. But keep in mind that this isn't technically "in-place,"
and the array of characters will cost O(n)O(n) additional space! If you're comfortable
coding in a language with mutable strings, that'd be even better!

For example:

  var message = 'find you will pain only go you recordings security the into if';

reverseWords(message);
// returns: 'if into the security recordings you go only pain will you find'

When writing your function, assume the message contains only letters and spaces,
and all words are separated by one space.
*/

function reverseWords(message) {
	return message.split(' ').reverse().join(' ');
}

function reverseWords2 (message) {
	if (message === undefined) {
		return null;
	}
	var array = message.split(' ');
	var startIndex = 0;
	var endIndex = array.length - 1;

	while(startIndex < endIndex) {
		var temp = array[startIndex];
		array[startIndex] = array[endIndex];
		array[endIndex] = temp;
		startIndex++;
		endIndex--;
	}
	return array.join(' ');
}

var message = 'find you will pain only go you recordings security the into if';
console.log(reverseWords(message));
console.log(reverseWords2(message));


