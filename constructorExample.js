/*
  This file demonstrates how prototypal inheritance works.
  It is referenced by my blog:
*/

// Parent class
function Pie (size, toppings) {
  this.size = size
  this.toppings = toppings
}

// add method to the prototype so it is not re-defined by each object instance,
// and is available to sub-classes on the Pie prototype chain.
Pie.prototype.getDescription = function () {
  console.log(`Pie is ${this.size} inches large and has the following toppings: ${this.toppings.join(', ')}`)
}

// creates an instance of a Pie
const pie = new Pie(11, ['cheese'])

// This works because when a method isn't defined on an object directly, javascript will
// delegate the lookup of the method to the prototype chain.
pie.getDescription()

// sub-class of Pie
function Pizza (size, toppings, deepDish) {
  Pie.call(this, size, toppings) // calls the Pie constructor with the new Pizza `this`
  this.deepDish = deepDish
}

// Defining a function on Pizza.prototype at this point in the file won't work,
// since we are overwriting the prototype to inherit from Pie on line 30.

// Pizza.prototype.test = function () {
//   console.log('this won't work, because we overwrite the prototype in the next line!')
// }
//

// this line sets the prototype of Pizza to the prototype of Pie,
// but overwrites the constructor of Pizza in the process...
// we use Object.create to get a deep copy of the Pie.prototype object,
// so any methods we add to Pizza.prototype won't affect Pie.prototype.
Pizza.prototype = Object.create(Pie.prototype)

// this updates the constructor of Pizza from Pie back to Pizza
Pizza.prototype.constructor = Pizza

// we can define new Pizza prototype methods now, if we want.
Pizza.prototype.isDeepDish = function () {
  console.log(this.deepDish)
}

const pizza = new Pizza(12, ['pepperoni', 'cheese'], true)

console.log(Pizza.prototype.constructor)
pizza.getDescription() // we've successfully inherited a prototype method from Pie!
pizza.isDeepDish() // method exists on pizza's prototype.
console.log(`The following should be undefined: ${pie.isDeepDish}`) // method should not exist on pie

// checking that the prototype chain is linked up as expected
console.log(`Pizza should be a prototype of the pizza instance (the following should be true): ${Pizza.prototype.isPrototypeOf(pizza)}`)
console.log(`Pie should be a prototype of the pizza instance (the following should be true): ${Pie.prototype.isPrototypeOf(pizza)}`)
console.log(`Pizza should NOT be a prototype of the pie instance (the following should be false): ${Pizza.prototype.isPrototypeOf(pie)}`)
