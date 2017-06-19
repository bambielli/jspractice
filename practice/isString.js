/**
Write a function that detects whether a value is a string.
The string can be either primitive, or a string object. both should return true.
*/

const isString = (str) => {
  return typeof str === 'string' || str instanceof String
}

console.log(isString("primitive"));
console.log(isString(new String("string object")));
console.log(isString(1));
