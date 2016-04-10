/*
	Implement a queue ↴ with 2 stacks ↴ .
	Your queue should have an enqueue and a dequeue function and it should be
	"first in first out" (FIFO).
	Optimize for the time cost of m function calls on your queue.
	These can be any mix of enqueue and dequeue calls.
	Assume you already have a stack implementation and it gives O(1) time push and pop.

	Initial thought is if both stacks are empty, enqueue in to inStack, then any more in to outStack
	dequeue off of 1 until 1 is empty, then pop everything off of 2 in to 1.


*/


function stackQueue () {
	this.inStack = [];
	this.outStack = [];
}

/*
	Should enqueue to the first stack if first stack.length === 0
	shoudl enqueue to the second stack after that.

	The below implementation is kind of unnecessary... we don't save that much time by
	sticking a value in the outStack on the first enqueue...

	The runtime of dequeue still going to be O(m), where M is the number of items that have been enqueued.
	O(m-1) turns in to O(m).

	We can examine the runtime by looking at the total cost per ITEM being dequeued.
	To make it through the stack, each item is at max operated on 4 times (one for enqueue in the in stack,
	one for pop off of the in stack, one for push into the out stack, one for pop out of the out stack) which
	is a constant number of operations.

	Might as well just go for the simpler algorithm
*/
// stackQueue.prototype.enqueueOld = function (val) {
// 	if (this.outStack.length === 0) {
// 		this.outStack.push(val);
// 	} else {
// 		this.inStack.push(val);
// 	}
// }

stackQueue.prototype.enqueue = function (val) {
	this.inStack.push(val);
}


/*
	dequeue only from the first stack.
*/
stackQueue.prototype.dequeue = function () {
	if (this.inStack.length === 0 && this.outStack.length === 0) {
		console.log('nothing in the queue');
	} else if (this.outStack.length) {
		return this.outStack.pop();
	} else {
		while(this.inStack.length > 1) {
			this.outStack.push(this.inStack.pop());
		}
		return this.inStack.pop();
	}
}

stackQueue.prototype.printQueue = function () {
	console.log('-----------------------')
	console.log('inStack:' + this.inStack);
	console.log('outStack:' + this.outStack);
	console.log('-----------------------')

}


//////////
// TEST //
//////////

var sQ = new stackQueue();
sQ.enqueue(1);
sQ.printQueue();
sQ.enqueue(2);
sQ.enqueue(3);
sQ.enqueue(4);
sQ.printQueue(); // should have 1 in inStack, 3 in outStack
console.log(sQ.dequeue()); // should dequeue 1, and leave the rest in the second stack
console.log(sQ.dequeue()); // should dequeue 2, and inStack shoudl ahve 3 and 4 in it (3 at top)
sQ.enqueue(5);
sQ.enqueue(6);
sQ.enqueue(7);
sQ.printQueue(); // should have 3 and 4 in inStack and 5 6 7 in outStack

while(sQ.inStack.length || sQ.outStack.length) {
	console.log(sQ.dequeue());
}
