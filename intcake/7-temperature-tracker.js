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


/*
	Time complexity of getting the min max mean and mode are O(1) since they are pre-computed

	Space complexity is O(1) since the only data structure we need is an array of ints from 0-110
	which is a constant scale.
*/

function TempTracker () {
	this.max = null;
	this.min = null;

	//this is used for calculating the mean
	this.sumVals = 0;
	this.numVals = 0;
	this.numVals = 0;

	//this is used for tracking the mode
	//need to initialize the array to all 0s first, otherwise incrementing it in the insert method will not work
	this.occurrences = [];
	for (var i = 0; i < 111; i++) {
		this.occurrences[i] = 0;
	}
	this.maxCount = 0;
	this.mode = null;
}

/*
	insert() --> float newTemp - new temperature value to record
	  sticks values in to the fields we track in the object (min and max, plus
	  sum of the vals inserted and number of vals, and an array indexed with the temperatur value)
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
	this.mean = this.sumVals / this.numVals

	//increment the occurrences index
	this.occurrences[newTemp]++;
	console.log(this.occurrences[newTemp]);
	if(this.occurrences[newTemp] > this.maxCount) {
		this.maxCount = this.occurrences[newTemp];
		this.mode = newTemp;
	}
};

TempTracker.prototype.getMax = function() {
	return this.max;
};

TempTracker.prototype.getMin = function() {
	return this.min;
};

TempTracker.prototype.getMean = function() {
	return this.mean
}

TempTracker.prototype.getMode = function() {
	return this.mode;
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
console.log(TT.getMode() === 1);

