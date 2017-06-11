/*
They found out you're a programmer and asked you to solve something they've been wondering for a long time.

Write a function that, given:

an amount of money
an array of coin denominations
computes the number of ways to make the amount of money with coins of the available denominations.

*/

/*
    What does sub-problem look like?
    minimum number of coins to sum up to the values before S.

    var sums = [] <-- each index is the minimum number of coins necessary to sum to that value.
*/

const sum = 4;
const coins = [2, 3];

// computer the number of ways to make change with these denominations.
// need to find the number of ways to reach empty coinage from the number of coins we have available

function makeChange(coins, amountLeft, currentIndex) {
    if (amountLeft === 0) {
        return 1;
    }

    if (amountLeft < 0) {
        return 0;
    }

    if (currentIndex === coins.length) {
        return 0;
    }

    console.log('checking ways to make ' + amountLeft + ' with ' + coins.slice(currentIndex));

    var currentCoin = coins[currentIndex];

    var numPossibilities = 0;
    while (amountLeft >= 0) {
        numPossibilities += makeChange(coins, amountLeft, currentIndex + 1)
        amountLeft -= currentCoin;
    }

    return numPossibilities;
}


console.log(makeChange(coins, sum, 0));



function dynamicChange(coins, sum) {
    // calculate the number of ways to make cents with
    const waysToMakeNCents = [0, 0, 0, 0, 0] // 0 ways to make 0 cents;

    for (var currentSum = 1; currentSum <= sum; currentSum++) {
        // for each amount from 1 to sum, figure out how many ways there are to make change for that value,
        // with the change provided. store that value in the waysToMakeNCents array.

        for (var coinIndex = 0; coinIndex < coins.length; coinIndex++) {
            var currentCoin = coins[coinIndex];

            if (currentCoin === currentSum) {
                waysToMakeNCents[currentSum] += 1;
            } else if (currentCoin < currentSum) {
                // only if there is a way to make n cents with the sum - coin index does it count.
                if (waysToMakeNCents[currentSum - currentCoin]) {
                    waysToMakeNCents[currentSum] += 1;
                }
            } else {
                break;
            }
        }

    }
    console.log(waysToMakeNCents);
    return waysToMakeNCents[sum - 1];
}

console.log(dynamicChange(coins, sum));


function dynamicCorrectChange(coins, sum) {
    const waysOfDoingNCents = [];

    for (var i = 0; i <= sum; i++) {
        waysOfDoingNCents[i] = 0;
    }

    waysOfDoingNCents[0] = 1;

    coins.forEach((coin) => {
        console.log('coin is', coin);
        console.log(waysOfDoingNCents);
        for (var higherAmount = coin; higherAmount <= sum; higherAmount++) {
            console.log('higherAmount is', higherAmount);
            var higherAmountRemainder = higherAmount - coin;
            waysOfDoingNCents[higherAmount] += waysOfDoingNCents[higherAmountRemainder];
        }
    })
    return waysOfDoingNCents[sum];
}

console.log('return value is', dynamicCorrectChange(coins, sum));


function calculateDynamicChange(coins, amount) {
    const waysToMakeNCents = [];

    for (var i = 0; i <= amount; i++) {
        waysToMakeNCents.push(0);
    }

    waysToMakeNCents[0] = 1; //initialize this to 1, since there is 1 way to make 0 cents.

    // iterate through coins, and build out the waysToMakeNCents array at each index,
    // by using values from the previous index.

    coins.forEach((coin) => {
        for (var higherAmount = coin; higherAmount < amount; higherAmount++) {
            var remainder = higherAmount - coin;
            waysToMakeNCents[higherAmount] += waysToMakeNCents[remainder];
        }
    })

    return waysToMakeNCents[amount];
}

console.log(calculateDynamicChange(coins, sum));