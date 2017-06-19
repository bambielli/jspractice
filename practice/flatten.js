/*
Write code to flatten an object: in other words, print out each of the
'leaf' values of a nested object.

I learned the difference between `instanceof` and `typeof` by studying this problem.

`typeof` returns a string to indicate what type the value is

`instanceof` returns a boolean indicating that the left operand has a constructor
in its prototype chain that matches the right operand.

A good example of this behavior comes from studying the primitive string type
and the String object type in javascript.

const a = "i am a primitive string";
const b = new String("I am a string object");

typeof a; --> 'string'
typeof b; --> 'object'

b instanceof String; --> true
a instanceof String; --> false

*/

const a = {
  a: '1',
  b: {
     c: {
        d: '2'
      },
     e: '3'
  },
  f: '4'
};

const printValues = (obj) => {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const value = obj[key];
    if (typeof value ===  'object') {
      printValues(value);
    } else {
      console.log(value);
    }
  });
}

printValues(a);
