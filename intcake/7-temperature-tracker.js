/*
	You decide to test if your oddly-mathematical heating company is fulfilling its All-Time
	Max, Min, Mean and Mode Temperature Guarantee™.
	Write a class TempTracker with these methods:

	insert()—records a new temperature
	getMax()—returns the highest temp we've seen so far
	getMin()—returns the lowest temp we've seen so far
	getMean()—returns the mean ↴ of all temps we've seen so far
	getMode()—returns the mode ↴ of all temps we've seen so far
	Optimize for space and time.

	Favor speeding up the getter functions (getMax(), getMin(), getMean(), and getMode())
	over speeding up the insert() function.

	getMean() should return a float, but the rest of the getter functions can return integers.
	Temperatures will all be inserted as integers.
	We'll record our temperatures in Fahrenheit, so we can assume they'll
	all be in the range 0...110.

	If there is more than one mode, return any of the modes.
*/


function TempTracker () {
	this.max = null;
	this.min = null;

	//this is used for calculating the mean
	this.sumVals = 0;
	this.numVals = 0;

	this.modeKeys = {};
}

/*
	insert() --> float newTemp - new temperature value to record
	  sticks values in to the fields we track in the object (min and max, plus
	  sum of the vals inserted and number of vals, and a dictionary of the
	  keys and their counts for the mode)
*/
TempTracker.prototype.insert = function(newTemp) {

	if (this.max === null || newTemp > this.max) {
		this.max = newTemp;
	}
	if (this.min === null || newTemp < this.min) {
		this.min = newTemp;
	}

	//used for calculating mean
	this.sumVals += newTemp;
	this.numVals += 1;


	//used for mode
	if (this.modeKeys[newTemp]) {
		this.modeKeys[newTemp] += 1;
	} else {
		this.modeKeys[newTemp] = 1;
	}
};

TempTracker.prototype.getMax = function() {
	return this.max;
};

TempTracker.prototype.getMin = function() {
	return this.min;
};

TempTracker.prototype.getMean = function() {
	if (this.numVals) {
		return this.sumVals / this.numVals
	} else {
		console.log('no values added to tempTracker yet!');
	}
};

TempTracker.prototype.getMode = function() {
	var keys = Object.getOwnPropertyNames(this.modeKeys);

	var highestCount = null;
	var highestVal = null;
	for(var i = 0; i < keys.length; i++) {
		var count = this.modeKeys[keys[i]];
		if (count > highestCount) {
			highestCount = count;
			highestVal = keys[i]
		}
	}
	//keys are strings...need to return a Number version
	return Number(highestVal);
};

///////////
// Tests //
///////////

var TT = new TempTracker();
TT.insert(1);
TT.insert(2);
TT.insert(3);
TT.insert(4);
TT.insert(5);
TT.insert(6);
console.log(TT.getMin() === 1);
console.log(TT.getMax() === 6);
console.log(TT.getMean() === ((1+2+3+4+5+6) / 6));
console.log(typeof TT.getMean() === 'float');
console.log(typeof TT.getMean());
console.log(TT.getMode() === 1);

//mode tests
TT.insert(6); //mode should not be 6
console.log(TT.getMode() === 6);
TT.insert(6); //mode still 6
TT.insert(5); //mode still 6
console.log(TT.getMode() === 6)
TT.insert(5); //mode should be 5 now (since it ties with 6, but comes first in keys array)
console.log(TT.getMode() === 5);
TT.insert(1);
TT.insert(1); //now mode should be 1
console.log(TT.getMode() === 1);


//mean edge case
var TT2 = new TempTracker();
TT2.getMean(); //should return the string error message
