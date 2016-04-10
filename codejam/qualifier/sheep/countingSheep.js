/*
	the sheep problem
	count the first occurrence of the digits 0 - 9
	in the multiplication of the sequence
	N, 2N, 3N, 4N .....
	if the digits 0-9 will never occur, print INSOMNIA
*/
var fr = require('filereader');
var fapi = require('file-api');
var File = fapi.File;
var reader = new fr();
function countSheep(testCase, n) {
	if(n === 0) {
		console.log('Case #'+testCase+': INSOMNIA');
	} else {
		var tracker = new Set();
		for(var i = 1; i < 100; i++) {
			var result = i * n;
			var thing = result; //make a copy of the result
			while(thing >= 10) {
				tracker.add(thing%10);
				thing = Math.floor(thing / 10);
			}
			tracker.add(thing);
			if (tracker.size === 10) {
				console.log('Case #'+testCase+': '+result);
				return;
			}
		}
	}
}

reader.onload = function(e) {
	var result = reader.result.split('\n');
	result.pop();
	result.shift();
	for (var i = 0; i < result.length; i++) {
		countSheep(i+1, Number(result[i]));
	}

}

reader.readAsText(new File('A-large.txt'));

