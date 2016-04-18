/*
	Write a program that returns true if a linked list contains a cycle
	and returns false if it does not.


	Initial thoughts:
	expensiveCycle:
	We can do this in O(n) time and space, by storing a copy of each node
	in an array as we visit it. Each time before inserting the node we check
	to see if it is already in the list. If so, we have a cycle!

	If we were allowed to add a "flag" on each node (modifying each node in the array as we go)
	we could detect whether or not we had visited it already. This is worse, though,
	since we are modifying our source (javascript passes object by reference) and we would
	have to go back and reverse everything after we were done which would take another pass of the list.

	fastCycle
	Better way: we are stuck with O(n) in worst case, since the cycle
	might be the tail pointing to the head of the list. We can move the
	space down to O(1) if we have two pointers that scan the list at the same time
	but one moves slower than the other...if the fast and slow runners are pointing
	at the same node, that means we have a cycle.
*/

function fastCycle(headNode) {
	if(!headNode || typeof headNode !== 'object' || !headNode.hasOwnProperty('next')) {
		throw new Error("Please enter a linked list of Node objects");
	}

	var slowRunner = headNode;
	var fastRunner = headNode.next
	if (fastRunner) {
		//because we do next.next to advance it to positions,
		//we need to check that fastRunner exists each time we loop.
		//otherwise the next.next could have caused it to become null, and
		//trying to take the next of null will error.
		while (fastRunner && fastRunner.next) {
			if (slowRunner === fastRunner) {
				return true;
			} else {
				slowRunner = slowRunner.next;
				fastRunner = fastRunner.next.next;
			}
		}
	}
	return false;
}

function expensiveCycle(headNode) {
	if(!headNode || typeof headNode !== 'object' || !headNode.hasOwnProperty('next')) {
		throw new Error("Please enter a list");
	}
	var nodeList = [];
	var currentNode = headNode;
	while(currentNode.next) {
		if (nodeList.indexOf(currentNode) > -1) {
			return true;
		} else {
			nodeList.push(currentNode);
			currentNode = currentNode.next;
		}
	}
	return false;
}

function Node(val) {
	this.value = val;
	this.next = null;
}

////////////////
// Test Cases //
////////////////

var a = new Node(1);
var b = new Node(2);
var c = new Node(3);
var d = new Node(4);
var e = new Node(5);

/*
list is: a-->b-->c-->d-->e-->b...
*/
a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = b;

console.log(fastCycle(a));
console.log(expensiveCycle(a));

/*
list is: aa-->bb-->cc-->null;
*/
var aa = new Node(1);
var bb = new Node(2);
var cc = new Node(3);
var dd = new Node(4);
var ee = new Node(5);
aa.next = bb;
bb.next = cc;
cc.next = dd;
dd.next = ee;
console.log(fastCycle(aa));
console.log(expensiveCycle(aa));

var superShortA = new Node(1);
console.log(fastCycle(superShortA));
console.log(expensiveCycle(superShortA));

var shortA = new Node(1);
var shortB = new Node(2);
shortA.next = shortB;
console.log(fastCycle(shortA));
console.log(expensiveCycle(shortA));

try {
	fastCycle();
} catch (err) {
	console.log(err.message);
}

try {
	expensiveCycle();
} catch (err) {
	console.log(err.message);
}

try {
	fastCycle({wat:'hi'});
} catch (err) {
	console.log(err.message);
}

try {
	expensiveCycle({wat:'hi'});
} catch (err) {
	console.log(err.message);
}

try {
	fastCycle(1);
} catch (err) {
	console.log(err.message);
}

try {
	expensiveCycle(1);
} catch (err) {
	console.log(err.message);
}
