/*
	This doesn't work. Taking the weight to value ratio works in some cases,
	but really we want to find out what the OPT cake to put in is at all
	weights and construct using opts from previous.
*/

var cakeTypes = [
    {weight: 7, value: 160},
    {weight: 3, value: 90},
    {weight: 2, value: 15},
];
var bagWeight = 20;

function getMaxValue(cakeArray, bagWeight) {
	cakeArray.sort(function(a, b) {
		return (a.weight / a.value) > (b.weight / b.value);
	});

	var weightRemaining = bagWeight;
	var value = 0;
	if(cakeArray[0].weight === 0) {
		return Number.POSITIVE_INFINITY;
	}
	while (weightRemaining) {
		var notFound = true;
		for (var i = 0; i < cakeArray.length; i++) {
			if (cakeArray[i].weight <= weightRemaining) {
				notFound = false;
				value += cakeArray[i].value;
				weightRemaining -= cakeArray[i].weight;
				break;
			}
		}
		if(notFound) {
			break;
		}
	}
	return value;
}

console.log(getMaxValue(cakeTypes, bagWeight));

var cakeTypes2 = [
	{weight:1, value:100}, {weight:0, value:1}
];

console.log(getMaxValue(cakeTypes2, bagWeight));
