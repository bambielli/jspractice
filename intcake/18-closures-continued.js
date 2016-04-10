/*
	Some more fun with closures
*/

var globalValue = 0;
var globalObject = {hi: 'hello', wat: globalValue};

globalValue++;
console.log(globalObject.wat); //this is still 0

function closure1 () {
	var value = globalValue;
	return function() {
		return value;
	};
}
var c1 = closure1();
var c2 = closure1();

console.log(c1());
globalValue++;
console.log(c2());

console.log(globalValue) //should be 2

function closure2 (gv) {
	return function () {
		return gv + 1;
	}
};

var c3 = closure2(globalValue);
globalValue ++;
var c4 = closure2(globalValue);
console.log(c3());
console.log(c4());

console.log(globalValue);

function closure3 (obj) {
	return function() {
		obj.wat += 1;
	};
};

var o1 = closure3(globalObject);
var o2 = closure3(globalObject);

console.log(globalObject);

o1();
console.log(globalObject);
o2();
console.log(globalObject);

