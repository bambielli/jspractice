/*
Writing programming interview questions hasn't made me rich. Maybe trading Apple stocks will.
Suppose we could access yesterday's stock prices as an array, where:

The indices are the time in minutes past trade opening time, which was 9:30am local time.
The values are the price in dollars of Apple stock at that time.
So if the stock cost $500 at 10:30am, stockPricesYesterday[60] = 500.

Write an efficient function that takes stockPricesYesterday and returns the best profit
I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday.

For example:

  var stockPricesYesterday = [10, 7, 5, 8, 11, 9];

getMaxProfit(stockPricesYesterday);
// returns 6 (buying for $5 and selling for $11)

No "shorting"—you must buy before you sell. You may not buy and sell in the same time step
(at least 1 minute must pass).
*/

/*
	This is a greedy algorithm that works in O(n) time and O(1) space
*/
function getMaxProfit(stockPricesYesterday) {
	if (stockPricesYesterday.length < 2) {
		throw new Error('You need to have 2 prices in order to make a profit!');
	}

	var minPrice = stockPricesYesterday[0]
	var maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0] //selling on second day

	for (var i = 1; i < stockPricesYesterday.length; i++) {
		var currentPrice = stockPricesYesterday[i];
		var currentProfit = currentPrice - minPrice;

		maxProfit = Math.max(maxProfit, currentProfit);
		minPrice = Math.min(minPrice, currentPrice);
	}

	return maxProfit;
}

var stockPricesYesterday = [10, 7, 5, 8, 11, 9];
console.log(getMaxProfit(stockPricesYesterday) === 6); // should be true

var stockPricesYesterday = [1];
try {
	getMaxProfit(stockPricesYesterday)
} catch (err) {
	console.log(err.message); //should log the error message
};

var stockPricesYesterday = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log(getMaxProfit(stockPricesYesterday) === -1);

var stockPricesYesterday = [1, 2];
console.log(getMaxProfit(stockPricesYesterday) === 1);
