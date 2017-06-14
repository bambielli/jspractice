/* Write a function that accepts an expression written in postfix notation (space separated string) and returns
the computed value of the expression.

e.g. "3 4 +" --> 7
     "5 3 + 12 * 3 /" --> 32


push to stack until you reach an operator.
once an operator is reached, pop two values off of the stack, perform the operation, and push the result back to the stack.
When you reach the end of the input array, return the final value on the stack.

ASSUMPTIONS: postfix expr is correctly written (balanced) and has no operators other than the core 5 "+ - * / ^"
postfix expr only contains integers and operators.
*/
const {infixToPostfix} = require('./infix-to-postfix')

console.log(infixToPostfix);

const operatorFunctions = {
    '+': (a, b) => {
        return a + b;
    },
    '-': (a, b) => {
        return a - b;
    },
    '*': (a, b) => {
        return a * b;
    },
    '/': (a, b) => {
        return a / b;
    },
    '^': (a, b) => {
        return Math.pow(a, b)
    }
}

const calculatePostfix = (postfixExpr) => {
    const accumulator = []; // contains numbers
    const postfixArray = postfixExpr.split(' ');

    postfixArray.forEach((item, index) => {
        if (isOperator(item)) {
            // since we are popping from the stack, the first pop returns b, the second returns a
            // use parseFloat so we don't get rounding errors with integers
            const b = accumulator.pop();
            const a = accumulator.pop();
            const computedValue = operatorFunctions[item](a, b);
            accumulator.push(computedValue);
        } else if (!isNaN(item)) {
            accumulator.push(parseFloat(item));
        } else {
            throw Error(`${item} at index ${index} in postfixExpr was neither a recognized operator nor a number`)
        }
    })
    return accumulator.pop();
}

/**
 * @function isOperator - Tests if the item passed is one of the operators for our calculator
 * @param {string} item
 * @return {boolean}
 * */
const isOperator = (item) => {
    const operators = Object.keys(operatorFunctions);
    return operators.indexOf(item) > -1;
}

const convertedValue = calculatePostfix(infixToPostfix("3 + 4 * 2 / ( 1 - 5 ) + 2 * 3")); // should be 7
console.log('CONVERTED VALUE IS:', convertedValue);

const newVal = calculatePostfix(infixToPostfix("3 + 4 * ( 2 * ( 1 / 2 ) ^ 2 ) ^ 3")); // should be 3.5
console.log('NEW VALUE IS:', newVal);

console.log("TEST 1:", "EXPECTED 7", "Actual:", calculatePostfix("3 4 +"));
console.log("TEST 1:", "EXPECTED 32", "Actual:", calculatePostfix("5 3 + 12 * 3 /"));
console.log("TEST 1:", "EXPECTED 3", "Actual:", calculatePostfix("1 2 + 3 * 6 + 2 3 + /"));
