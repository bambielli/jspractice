/*
	A priority queue is a data structure that deQueues values in order of a pre-defined priority.
	The priority for instances of this queue is determined by the passed comparator.

	The queue is implemented in theory as a heap. In practice it is implemented as an array
	where the indices correspond to the left and right children of each "node" of the heap.

	Remove and Add operations take O(logN), since we are effectively building a tree structure,
	and we need to re-organize nodes after each addition / removal.

	constructor for priorityQueue
	  pQ: the array that contains values in the queue. Initialized to an array with
	      index 0 as null, since this priorityQueue implementation should never have
	      a true value at index 0 of the internal array.
	  comparator: a function that returns a boolean when two values are compared.
	   			  this determines how the priority queue "heap" will be made valid.
*/

var priorityQueue = function(comparator) {
	this.pQ = [null]
	this.comparator = comparator || function (a, b) { return a > b; }
};

////////////////////
// Helper Methods //
////////////////////

/*
	priorityQueue.isEmpty() --> returns boolean representing if values have been added to PQ
*/
priorityQueue.prototype.isEmpty = function() {
	if (this.pQ.length <= 1) {
		return true;
	} else {
		return false;
	}
}
/*
	priorityQueue.getRootValue() --> returns the value of the root of the pQ if the pQ is not empty
*/
priorityQueue.prototype.getRootValue = function() {
	if (!this.isEmpty()) {
		return this.pQ[1];
	} else {
		console.log('priorityQueue is empty');
	}
}
/*
	priorityQueue.parentIndex(index) --> returns the value of the parent of the passed index,
								         or 0 if the passed index is the root (which is falsey).
*/
priorityQueue.prototype.parentIndex = function (index) {
	return Math.floor(index / 2);
};

/*
	priorityQueue.leftChildIndex(index) --> returns the index of the left child of the current index
*/
priorityQueue.prototype.leftChildIndex = function (index) {
	return index * 2;
};

/*
	priorityQueue.rightChildIndex(index) --> returns the index of the right child of the current index
*/
priorityQueue.prototype.rightChildIndex = function (index) {
	return index * 2 + 1;
};


/*
	priorityQueue.swap(index1, index2) --> swaps the values at indices 1 and 2.
										   Used by percolation methods
*/
priorityQueue.prototype.swap = function(index1, index2) {
	var temp = this.pQ[index1];
	this.pQ[index1] = this.pQ[index2];
	this.pQ[index2] = temp;
}

/*
	priorityQueue.percolateUp(index) --> makes pQ consistent per the comparator after an
									     element is enqueued.
*/
priorityQueue.prototype.percolateUp = function (index) {
	var parentIndex = this.parentIndex(index);

	if (parentIndex && this.comparator(this.pQ[parentIndex], this.pQ[index])) {
		this.swap(parentIndex, index);
		this.percolateUp(parentIndex);
	}

};

/*
	priorityQueue.percolateDown(index) --> makes pQ consistent per the comparator after an
									       element is dequeued.
*/
priorityQueue.prototype.percolateDown = function (index) {
	var leftChildIndex = this.leftChildIndex(index);
	var rightChildIndex = this.rightChildIndex(index);

	//used to track if the comparator returned true or not for these methods.
	var leftChildCompare = this.comparator(this.pQ[index], this.pQ[leftChildIndex]);
	var rightChildCompare = this.comparator(this.pQ[index], this.pQ[rightChildIndex]);

	//if both children compare true in relation to current index, compare them to each other
	//and swap with the one that returns true.
	if (leftChildCompare && rightChildCompare) {
		if (this.comparator(this.pQ[leftChildIndex], this.pQ[rightChildIndex])) {
			this.swap(rightChildIndex, index)
			this.percolateDown(rightChildIndex);
		} else {
			this.swap(leftChildIndex, index);
			this.percolateDown(leftChildIndex);
		}
	} else if (leftChildCompare) { //if left was true, swap it
		this.swap(leftChildIndex, index);
		this.percolateDown(leftChildIndex);
	} else if (rightChildCompare) { //if right was true, swap it
		this.swap(rightChildIndex, index);
		this.percolateDown(rightChildIndex);
	}
	//if none were true, then the item is in its correct place
}

/////////////////////////
// Enqueue and Dequeue //
/////////////////////////

/*
	priorityQueue.enqueue(val) --> adds a value to the pQ, and bubbles it to the correct position
*/
priorityQueue.prototype.enqueue = function (val) {
	this.pQ[this.pQ.length] = val;

	//now percolateUp to put it in the right place.
	this.percolateUp(this.pQ.length - 1);
};

/*
	priorityQueue.dequeue() --> removes the highest priority element from the pQ and
							    percolates the heap to make it consistent in relation to
							    the comparator.

							    return: the highest priority item from the pQ, or undefined if no item
*/
priorityQueue.prototype.dequeue = function() {
	var returnVal;
	if (!this.isEmpty()) {
		returnVal = this.pQ[1];
		this.pQ[1] = this.pQ[this.pQ.length - 1];
		this.pQ.pop(); //remove the last item from the pQ array, and discard.
		this.percolateDown(1);
	} else {
		console.log('Prioirty Queue is Empty');
	}

	return returnVal;
}

///////////////
// Test Code //
///////////////

var pQ = new priorityQueue(); //default comparator for min-heap construction

pQ.enqueue(2)
console.log(pQ.pQ); //should be [null, 2]

pQ.enqueue(5);
pQ.enqueue(3);
console.log(pQ.pQ); //should be [null, 2, 5, 3]

pQ.enqueue(1);
console.log(pQ.pQ); //should be [null, 1, 2, 3, 5]

//should log items in descending order, 1, 2, 3, 5
while (!pQ.isEmpty()) {
	console.log(pQ.dequeue());
	console.log(pQ.pQ);
}
//try a random case
console.log('|------------------------------------------------------------------|');
var randomVal = Math.ceil(Math.random() * 10);
for(var i = 1; i < 10; i++) {
	pQ.enqueue(i);
}
console.log('starting order is: ')
console.log(pQ.pQ)
while(!pQ.isEmpty()) {
	console.log(pQ.dequeue());
	console.log(pQ.pQ);
}

//Try some other random numbers, non sequential, some negative and zero.
console.log('|------------------------------------------------------------------|');
pQ.enqueue(7);
pQ.enqueue(3);
pQ.enqueue(12);
pQ.enqueue(0);
pQ.enqueue(1);
pQ.enqueue(6);
pQ.enqueue(-5);
pQ.enqueue(13);
pQ.enqueue(4);

while (!pQ.isEmpty()) {
	console.log(pQ.dequeue());
	console.log(pQ.pQ);
}

//make the comparator the max-heap version, put in duplicates
console.log('|------------------------------------------------------------------|');
pQ.comparator = function(a,b) {
	return a < b;
};

pQ.enqueue(9);
pQ.enqueue(3);
pQ.enqueue(2);
pQ.enqueue(8);
pQ.enqueue(8);
pQ.enqueue(10);
pQ.enqueue(-4);
pQ.enqueue(130);
pQ.enqueue(-4);

while (!pQ.isEmpty()) {
	console.log(pQ.dequeue());
	console.log(pQ.pQ);
}
