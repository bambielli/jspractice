/* Write a converter that takes an infix expression and converts it to postfix

Assumption: values in string are separated by spaces, so we can split on spaces.
Assumption: expression is valid (i.e. has the appropraite number of operators / operands, correct paren matching)

examples:
"2 + 3" --> "2 3 +"

"10 - ( 4 + 3 ) * 2" --> "10 4 3 + 2 * -"

Shunting yard algorithm: created by Djikstra for converting from infix to postfix notation.

Keep track of 2 stacks, one that will be returned (elements joined with spaces) another for keeping track of operators that have been encountered.
- When you encounter a number, push it to the return stack.
- When you encounter an operator, check to see if an operator with GTE precedence is at the top of the operator stack.
    - if operator with GTE precedence is on stack, pop the operator stack and push that operator to the return stack.
    - Continue this until operator stack is empty or you reach a lower precedence value on the operator stack. At this point, push current operator on to the operator stack
    - NOTE: that a left parenthesis is equivalent to an operator not being on the stack.
- When you encounter a left parenthesis, push it to the operator stack and continue
- When you encounter a right parenthesis, pop the operator stack and push operators on to the return stack until you reach a left paren.
    - discard the left paren, and move on.

Join with spaces and return the values stack.

*/

const operatorPrecedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3
};

/**
 * @function withPrecedence - Implements "shunting yard" algorithm (Djikstra) to convert infix to postfix notation
 * @param {string} infixExpr - Infix expression separated by spaces
 * @return {string} - a postfix representation of the infixExpr
*/
const infixToPostfix = (infixExpr) => {
    const accumulator = [];
    const operatorStack = [];
    const infixArray = infixExpr.split(' ');

    infixArray.forEach((value) => {
        if (Number.isInteger(parseInt(value))) {
            accumulator.push(value);
        } else if (isOperator(value)) {
            const operatorsToPush = checkPrecedenceAlgorithm(value, operatorStack);
            Array.prototype.push.apply(accumulator, operatorsToPush);
            operatorStack.push(value);
        } else if (isLeftParen(value)) {
            operatorStack.push(value);
        } else if (isRightParen(value)) {
            const operatorsToPush = closingParenthesisAlgorithm(operatorStack);
            Array.prototype.push.apply(accumulator, operatorsToPush);
        }
    });

    // make sure to reverse the operatorStack when you concat, which emulates pushing
    return accumulator.concat(operatorStack.reverse()).join(' ');
}

/**
 * @function checkPrecedenceAlgorithm - performs the precedence checking algorithm on the operatorStack
 * @param {string} operator
 * @param {Array} operatorStack
 * @return {Array} operatorsToPush - the set of operators to push to the accumulator. This function also mutates the operatorStack.
*/
const checkPrecedenceAlgorithm = (operator, operatorStack) => {
    const operatorsToPush = [];
    while (operatorStack.length) {
        const operatorOnStack = operatorStack[operatorStack.length - 1];
        if (operatorOnStack !== '(' && operatorPrecedence[operatorOnStack] >= operatorPrecedence[operator]) {
            operatorsToPush.push(operatorStack.pop());
        }
        else {
            break;
        }
    }
    return operatorsToPush;
}

/**
 * @function closingParenthesisAlgorithm - performs the closing parenthesis algorithm on the operatorStack
 * @param {Array} operatorStack
 * @return {Array} operatorsToPush - the set of operators to push to the accumulator. This function also mutates the operatorStack.
*/

const closingParenthesisAlgorithm = (operatorStack) => {
    const operatorsToPush = [];
    while(operatorStack.length) {
        const operator = operatorStack.pop();
        if (isLeftParen(operator)) {
            break;
        }
        operatorsToPush.push(operator);
    }
    return operatorsToPush;
}

/**
 * @function isOperator - Tests if the value passed is one of the operators for our calculator
 * @param {string} value
 * @return {boolean}
 * */
const isOperator = (value) => {
    const operators = Object.keys(operatorPrecedence);
    return operators.indexOf(value) > -1;
}

const isLeftParen = (value) => {
    return value === '(';
}

const isRightParen = (value) => {
    return value === ')';
}



// console.log('TEST 1 -', 'EXPECT: 10 4 3 + 2 * -', 'GOT:', infixToPostfix('10 - ( 4 + 3 ) * 2'));
// console.log('TEST 2 -', 'EXPECT: 5 3 + 12 * 3 /', 'GOT:', infixToPostfix('( 5 + 3 ) * 12 / 3 '));
// console.log('TEST 2 -', 'EXPECT: 3 4 2 * 1 5 - 2 ^ 3 ^ / +', 'GOT:', infixToPostfix('3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3'));

module.exports = {infixToPostfix}