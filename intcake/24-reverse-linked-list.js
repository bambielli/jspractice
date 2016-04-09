/*
	Write a function for reversing a linked list. Do it in-place.
	Your function will have one input: the head of the list.
	Your function should return the new head of the list.
*/

function LinkedListNode(value) {
    this.value = value;
    this.next = null;
}

var head = new LinkedListNode(1);
head.next = new LinkedListNode(2);
head.next.next = new LinkedListNode(3);
head.next.next.next = new LinkedListNode(4);

console.log(head);

/*
	Reverse happens in place in O(n) time, and O(1) space
*/
function linkedListReverse(headOfList) {
    var current  = headOfList;
    var previous = null;
    var nextNode = null;

    // until we have 'fallen off' the end of the list
    while (current) {

        // copy a pointer to the next element
        // before we overwrite current.next
        nextNode = current.next;

        // reverse the 'next' pointer
        current.next = previous;

        // step forward in the list
        previous = current;
        current = nextNode;
    }

    return previous;

}

console.log(linkedListReverse(head));
linkedListReverse();
console.log(linkedListReverse(new LinkedListNode(1)));
var head1 = new LinkedListNode(1);
head1.next = new LinkedListNode(2);
console.log(linkedListReverse((head1)));
