/*
	Constructor for node object
	  value: the value of the node
	  next: pointer to the next node in the list. if not provided, is set to null.

	NOTE: I don't want to re-define the node class inside of each linked list instance,
	      since that would be a waste of memory! Declaring as a global seems to be the
	      best course of action for my set up here. If I could add it as a private member
	      of the LinkedList.prototype that would be the dream...
*/
function Node(value, next) {
	this.value = value;
	this.next = next || null;
};

/*
	Constructor for LinkedList object
	  front: keeps track of the node at the front of the list. Defaults to null.
	  size: keeps track of how many items are in the list.
*/
function LinkedList() {
	this.front = null;
	this.size = 0;
};

///////////////////////
// Prototype Methods //
///////////////////////

// NOTE: Add common LinkedList methods to the LinkedList.prototype, to ensure they are not
//       re-defined with each construction of a new LinkedList object (saves memory)

/*
	LinkedList.addFront(val) --> adds a new node with value val to the front of the linked list

	This happens in O(1) time, since we always know where the front
	of the list is via the LinkedList.front field
*/
LinkedList.prototype.addFront = function(val) {
	this.front = new node(val, this.front);
	this.size += 1;
};

/*
	LinkedList.addEnd(val) --> adds a new node with value val to the end of the linked list

	This happens in O(n) time, where n is the size of the linked list,
	because we need to traverse the entire list from front to end to find the end node.
*/
LinkedList.prototype.addEnd = function(val) {
	var current = this.front;
	while (current.next !== null) {
		current = current.next;
	}
	// at this point we have found the last item in the list.
	current.next = new node(val);
	this.size += 1;
};

/*
	LinkedList.remove --> removes the first instance found of val from the LinkedList.
	                      if no value matching val is found in the list, the list is unaltered.

	This happens in O(n) time, where n is the size of the list, since worst case we need
	to traverse the entire list from front to end to find the val to remove, or to determine
	that there is no value matching val to remove.
*/
LinkedList.prototype.remove = function(val){
	var current = this.front;
	var prev;
	while (current !== null) {
		if (current.value === val) {
			//since prev is initially undefined, if the item is the first in the list
			//we should just change the pointer to front to be current.next
			if (prev) {
				prev.next = current.next;
			} else {
				this.front = current.next;
			}
			this.size -= 1;
			break;
		}
		prev = current;
		current = current.next;
	}
};

/*
	LinkedList.printList() --> Prints the values of the nodes currently in the list,
	          			       along with the size
*/
LinkedList.prototype.printList = function() {
	var current = this.front;
	var list = []; //use this to track the values in the linked list
	while (current !== null) {
		list.push(current.value)
		current = current.next;
	}
	console.log(list, "size: " + this.size);
};

//reverses the linked list in place. destroys the original list.
LinkedList.prototype.LinkedListReverse = function (headOfList) {
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

};


/////////////////////////
// Testing the methods //
/////////////////////////

// Construct a list
var ll = new LinkedList();

// Add some items
ll.addFront(1);
ll.addFront(2);
ll.addEnd(3);
ll.printList();//should result in [2, 1, 3]

// Remove the middle item
ll.remove(1);
ll.printList(); //should result in [2, 3]

// Remove the end item
ll.remove(3);
ll.printList(); //should result in [2]

// Remove the first item (only item)
ll.remove(2);
ll.printList(); //should result in '[]'
