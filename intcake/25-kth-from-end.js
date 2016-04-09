/*
	You have a linked list ↴ and want to find the kkth to last node.
	Write a function kthToLastNode() that takes an integer kk and the headNode
	of a singly linked list, and returns the kkth to last node in the list.
*/

/*

*/

function LinkedListNode(value) {
    this.value = value;
    this.next = null;
}

var a = new LinkedListNode("Angel Food");
var b = new LinkedListNode("Bundt");
var c = new LinkedListNode("Cheese");
var d = new LinkedListNode("Devil's Food");
var e = new LinkedListNode("Eccles");

a.next = b;
b.next = c;
c.next = d;
d.next = e;

function kthFromEnd(headNode) {
	//if we know the length of the list, we can figure out
}
