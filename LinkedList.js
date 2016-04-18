/*
	This is an alternate linkedList implementation that what is found
	in linkedListWrapper.js.

	linkedListWrappper also implemented a wrapper class for a LinkedList that contained
	the "head" node pointer, and also the size of the list. This is not really necessary, though,
	and was just a conveninent container to store the linkedList methods (via the LinkedList.prototype)

	In this implementation I will just build linkedLists with a Node class, and no wrapper.

	I will implement:
	addNodeHead --> adds a node to the Head of the list (new head) (O(1) time and space)
	addNodeTail --> adds a node to the Tail of the list (O(n) time and O(1) space)
	reverseList --> Reverses the LinkedList
	removeNodePointer --> removes a node from the list with just a pointer to the node to be deleted
	removeValueFromList --> removes all nodes with a specific value from the list, with a pointer to the head as input
	containsCycle --> determins if the list has a cycle (O(n) time and O(1) space)
	containsCycleExpensive --> determines if the list has a cycle in O(n) time and O(n) space

*/

function Node(val) {
	this.value = val;
	this.next = null;
}

function addNodeHead(oldHeadNode, val) {
	var newHeadNode = new Node(val);
	newHeadNode.next = oldHeadNode;
	return newHeadNode;
}

function addNodeTail(headNode, val) {
	if(!headNode || typeof headNode !== 'object' || !headNode.hasOwnProperty('next')) {
		throw new Error('please include a valid headNode for the list to which you want to add a node');
	}
	var previousNode = headNode
	while(previousNode.next) {
		previousNode = previousNode.next;
	}
	//at this point, previousNode is the last node in the list;
	previousNode.next = new Node(val);
}

/*
	Note, this will not work if hte nodeToRemove is the last item in a linkedList
	This will also mutate any other references to nodeToRemove in the program.
	Any references to nodeToRemove.next will be pointing to a dangling node, which is bad as well.
*/
function removeNodePointer(nodeToRemove) {
	if(!nodeToRemove || typeof nodeToRemove !== 'object' || !nodeToRemove.hasOwnProperty('next')) {
		throw new Error ('please include a valid node that you would like to remove from the list')
	} else if (!nodeToRemove.next) {
		throw new Error ('sorry, cant remove node from the end of the list without pointer to headNode!');
	}

	//make the value of the nodeToRemove the value of its next node
	//make the next pointer of the nodeToRemove the next pointer of its next node.
	nodeToRemove.value = nodeToRemove.next.value;
	nodeToRemove.next = nodeToRemove.next.next;
}

//this doesn't work if the reference to the head node changes (because it was removed)
//need to have some sort of wrapper that keeps track of the head, and can update the head
//can't update the head here to something new, because the reference will be reset at the end
//of the procedure.
function removeValueFromList(headNode, value) {
	if(!headNode || typeof headNode !== 'object' || !headNode.hasOwnProperty('next')) {
		throw new Error('please include a valid headNode for the list to which you want to add a node');
	}

	var currentNode = headNode;
	var previousNode = headNode;
	while(currentNode) {
		var nextNode = currentNode.next;
		if (currentNode.value === value) {
			//remove the node from the list
			previousNode.next = currentNode.next
			currentNode.next = null;
			currentNode = nextNode;
			break;
		} else {
			previousNode = currentNode;
			currentNode = nextNode;
		}
	}
}

/*
	Used by test methods to generate lists of size "size" with nodes of random integer values
*/
function generateList(size) {
	//if size is 0, just return null;
	if(!size) {
		return null;
	}
	var currentHeadNode = new Node(0);
	for (var i = 1; i < size; i++) {
		addNodeTail(currentHeadNode, i);
	}
	return currentHeadNode;
}


var headNode1 = generateList(3);
console.log(headNode1);

removeValueFromList(headNode1, 1);
console.log(headNode1);
console.log(removeValueFromList(headNode1, 0));
