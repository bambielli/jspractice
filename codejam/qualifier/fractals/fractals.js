/*
	fractals
	initial sequence of N tiles of combination L or G
	Combination squares the tiles
	Go N combinations out. figure out if it is possible to determine with S checks
	if there is a G in the

*/
var fr = require('filereader');
var fapi = require('file-api');
var File = fapi.File;
var reader = new fr();
function fractal(testCase, K, C, S) {
	console.log('CASE' + testCase);
	console.log(K);
	console.log(C);
	console.log(S);
}

//reads the file
reader.onload = function(e) {
	var result = reader.result.split('\n');
	result.pop();
	result.shift();
	for (var i = 0; i < result.length; i++) {
		var parse = result[i].split(' ');
		fractal(i+1, Number(parse[0]), Number(parse[1]), Number(parse[2]));
	}

}

//initializes the files
reader.readAsText(new File('fractalInput.txt'));

