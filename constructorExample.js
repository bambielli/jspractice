function Pie (size, toppings) {
  this.size = size
  this.toppings = toppings
}

// add method to the prototype so it is not re-defined by each object instance,
// and is available to sub-classes on the Pie prototype chain.
Pie.prototype.getDescription = function () {
  console.log(`Pie is ${this.size} inches large and has the following toppings: ${this.toppings.join(', ')}`)
}

const pie = new Pie(11, ['cheese'])

pie.getDescription()

function Pizza (size, toppings, isDeepDish) {
  Pie.call(this, size, toppings) // calls the Pie constructor with the new Pizza `this`
  this.isDeepDish = isDeepDish
}

// this line sets the prototype of Pizza to the prototype of Pie,
// but overwrites the constructor of Pizza in the process.
Pizza.prototype = Object.create(Pie.prototype)

// this fixes the constructor of Pizza.
Pizza.prototype.constructor = Pizza

const pizza = new Pizza(12, ['pepperoni', 'cheese'], true)

console.log(Pizza.prototype.constructor)
pizza.getDescription() // we've successfully inherited a prototype method from Pie!
