/*
	Use this stack class to implement a new class called MaxStack.
	MaxStack should implement a function called getMax() that returns
	but does not pop the max value off of the stack.

	Initial Thoughts:
	we can keep track of the max value currently in the stack using a different stack.
	we add this as the maxStack field to the MaxStack class.
	This field is pushed to if the value being added to the stack is greater than or equal to
	the value being added to the top of the stack.

	A lazy implementation could just be to walk the stack every time we want to find the max,
	and return what we find. This is O(n) from a time complexity standpoint, but it is more
	space efficient than our chosen implementation with dual stacks.

	I guess when implementing a problem like this, we should first ask what the constraints are
	and design appropriately.

*/

function Stack() {
    // initialize an empty array
    this.items = [];
}

// push a new item to the last index
Stack.prototype.push = function(item) {
    this.items.push(item);
};

// remove the last item
Stack.prototype.pop = function() {

    // if the stack is empty, return null
    // (it would also be reasonable to throw an exception)
    if (!this.items.length) return null;

    return this.items.pop();
};

// see what the last item is
Stack.prototype.peek = function() {
    if (!this.items.length) return null;
    return this.items[this.items.length -1];
};

function MaxStack() {
	this.stack = new Stack();
	this.maxStack = new Stack();
}

MaxStack.prototype.getMax = function () {
	return this.maxStack.peek();
}

MaxStack.prototype.push = function(val) {
	this.stack.push(val);
	if (!this.maxStack.length || this.getMax() <= val) this.maxStack.push(val);
}

MaxStack.prototype.pop = function () {
	if (this.stack.peek() === this.getMax()) {
		this.maxStack.pop();
	}
	return this.stack.pop();
}

///////////
// Tests //
///////////

var ms = new MaxStack();
ms.push(1);
console.log(ms.maxStack);
console.log(ms.stack.items);
ms.push(5);
console.log(ms.maxStack);
console.log(ms.stack.items);
ms.push(2);
console.log(ms.maxStack);
console.log(ms.stack.items);
console.log(ms.getMax());
console.log(ms.pop());
console.log(ms.maxStack);
console.log(ms.stack.items);
console.log(ms.pop());
console.log(ms.maxStack);
console.log(ms.stack.items);
console.log(ms.pop());
console.log(ms.maxStack);
console.log(ms.stack.items);
console.log(ms.pop());
ms.push(1);
ms.push(1);
console.log(ms.maxStack);
console.log(ms.stack.items);
console.log(ms.pop());
console.log(ms.maxStack);
console.log(ms.stack.items);
