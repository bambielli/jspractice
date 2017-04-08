/*
	coins
	input of length of string and number of coins to generate
	start with string of 1 and 0
	needs to start with 1 and end with 1
	determine if all base values from base 2 through 10 are NOT prime
	if so, output the string, and a non-trivial divisor of each base interpretation

	N is the length of the potential coins
	J is the number of coins to generate
	for the small input we are guaranteed to have a number of coins that are jamcoins.

*/
var fr = require('filereader');
var fapi = require('file-api');
var File = fapi.File;
var reader = new fr();

function coins(N, J) {
	var startJamVal = Math.pow(2,N-1) + 1; //starting val, since jamcoin always has 1 at both ends;
	var max = Math.pow(2, N) - 1; //maximum value obtainable by N bits
	var jamCoinArray = []; //where valid jams will be stored
	for(coin = startJamVal; coin <= max; coin += 2) {
		var binaryCoin = coin.toString(2);
		console.log('coin ' + binaryCoin);

		//find J potential coins of length N
		//we were told by the problem that we are guaranteed to find J coins
		//so using a while loop is ok.
		//check all of the bases using parseInt
		var coinVals = []; //keep track of coinVals, so we don't have to re-calculate
		for (var i = 2; i < 11; i++) {
			var int = parseInt(binaryCoin, i);
			if(probablyNotPrime(int)) {
				coinVals.push(int);
			} else {
				break;
			}
		}
		//only push to jamCoinArray if we successfully checked each power.
		if (coinVals.length === 9) {
			console.log('pushing to array');
			jamCoinArray.push([binaryCoin, coinVals]);
		}
		if (jamCoinArray.length === J) {
			break;
		}
	}
	//after finding J potential coins
	//find non-trivial divisors for each
	console.log('Case #1:');
	for (i = 0; i < jamCoinArray.length; i++) {
		nonTrivialDivisors(jamCoinArray[i][1]); //mutates the values array
		console.log(jamCoinArray[i][0] + ' ' + jamCoinArray[i][1].join(' '));
	}
}

/*
	This detects things that are probably not prime... by setting an upper limit to check
*/
function probablyNotPrime(num) {
	//we are trying to detect not primes
	for (var i = 2; i < Math.floor(num / 2); i++) {
		if (num % i === 0) {
			return true;
		} else if (i > 10000000) {
			//if i gets this large, that means it is probably a prime number...
			return false;
		}
	}
	return false;
}

/*
	Takes an input array and finds non-trivial divisors for each value.
	values passed should not be prime
	Mutates the input array.
*/
function nonTrivialDivisors(array) {
	for(var i = 0; i < array.length; i++) {
		for(var j = 2; j < Math.floor(array[i]/2); j++) {
			if (array[i] % j === 0) {
				array[i] = j
				break;
			}
		}
	}
}

reader.onload = function(e) {
	var result = reader.result.split('\n');
	result.pop();
	result.shift();
	var parsed = result[0].split(' ');

	coins(Number(parsed[0]), Number(parsed[1]));
}

reader.readAsText(new File('C-large.txt'));

