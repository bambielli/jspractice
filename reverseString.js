/*
	Given a string, reverse it.
*/

function reverse (str) {

	//Since strings are immutable in Javascript, this does not work.
	// for(var i = 0; i < str.length / 2; i++) {
	// 	var temp = str[str.length - i];
	// 	str[str.length - i] = str[i];
	// 	str[i] = temp;
	// }

	//Instead, split the string in to an array of chars, reverse the array, then join.
	if(typeof(str) === 'string') {
		return str.split("").reverse().join("");
	} else {
		console.log('Not a String');
	}
}

var str1 = 'hello'
var str2 = 'well this is silly'
console.log(reverse(str1));
console.log(reverse(str2));
console.log(str1); //expect "olleh"
console.log(str2); //expect "yllis si siht llew"

//these are not strings and should hit the else case
reverse();
reverse(1);
reverse({force: 'be with you'});
reverse([1, 2, 3]);

/*
	given a string with words separated by spaces, reverse them in place
	without altering their position in the output
*/
function reverseWords (str) {
	if(typeof(str) === 'string') {
		var arr = str.split(" ");
		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].split("").reverse().join("");
		}
		return arr.join(" ");
	} else {
		console.log('Not a String');
	}
}

str3 = "A waCky Tester string!";
console.log(reverseWords(str3)) //expect "A ykCaw retseT !gnirts"
console.log(reverse(str3));

//these are not strings and should hit the else case
reverseWords();
reverseWords(1);
reverseWords({force: 'be with you'});
reverseWords([1, 2, 3]);


