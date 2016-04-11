/*
Delete a node from a singly-linked list ↴ , given only a variable pointing to that node.
The input could, for example, be the variable b below:

function LinkedListNode(value) {
    this.value = value;
    this.next = null;
}

var a = new LinkedListNode('A');
var b = new LinkedListNode('B');
var c = new LinkedListNode('C');

a.next = b;
b.next = c;

deleteNode(b);

Initial Thoughts:
I looked at the solution to this one because I thought I had it... apparently we do NOT have reference
to the head node of the list. We just have reference to the node we want to "Delete".

The suggested implementation is to modify the node that is passed in to be the value of its next node.
and then point its next value to the next of its next. This effectively removes the node passed in from the list
by swapping its value and next Pointer with its next.

This does the deletion in O(1) time and O(1) space. Pretty nifty.

This does NOT work when the node we are trying to delete is the last node, though... since the "next"
of the last node in a list doesn't have a value, we have nothing to set it to. The previous node should
point to null in this case, but since we don't have the previous pointer (and we can't change it), we would have
to set the current node to have a value of null.

Actually now that I've written it...i'm not sure why that wouldn't work... I want to try it out.

Nevermind it doesn't work, because we can't change an object reference that is passed as a parameter
to a function to a different object (null is an object). The original reference will persist. We can
still MUTATE that reference, but we can't change it to a completely different object.

Another side effect, as described in the problem solution, is that if there are references to the node we "deleted"
elsewhere in our code, and we are expecting it to have a certain value, the value will now be changed.
Also, if we had references to node "c", since it is now dangling we will never be able to reach it agian.


*/

function Node (val) {
	this.value = val || null;
	this.next = null;
}

var a = new Node(1);
var b = new Node(2);
var c = new Node(3);

a.next = b;
b.next = c;

function deleteNode(node) {
	var nextNode = node.next
	if(nextNode) {
		node.value = nextNode.value;
		node.next = nextNode.next;
	} else {
		//THIS WON'T WORK for the last node in the array
		//Since we can't change the reference to an object parameter.
		// node = null;
		console.log('cant delete the last node');
	}
}
