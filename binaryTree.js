/*
	binaryTrees are tree structures created out of nodes. Similar to a linkedList each node has a value,
	but binaryTree nodes have both a left and right pointer instead of just a "next" pointer like in a LL.
	A tree is a binaryTree if each node has a maximum of 2 children (a left and a right child).

	A tree is a binarySEARCHtree if the tree is sorted, where all values less than the value at root
	are to the left of root, and all values greater than the value of root are to the right of root.

	Finding a value in a balanced binarySearchTree is on the order of O(logN). If the tree
	is not balanced, worst case could be O(N) (e.g. largest value pushed on to the tree first,
	then smaller values all pushed on in sequence after). This shows how important
	initial root selection can be when constructing a BST.

	It is important to periodically balance your binarySearchTree for the reason mentioned above.
*/

//////////////////
// Constructors //
//////////////////

/*
	node(value, left, right) --> value: value of the node
								 left: pointer to left node. defaults to null if not defined
								 right: pointer to right node. defaults to null if not defined
*/
function node(value, left, right) {
	this.value = value;
	this.left = left || null;
	this.right = right || null;
}

/*
	binarySearchTree(rootNode) --> root: the root of the tree. defaults to null if not defined.
*/

function binarySearchTree(rootNode) {
	this.root = rootNode || null;
}

/////////////////////
// Push and Remove //
/////////////////////

/*
	binarySearchTree.push(val) --> adds a value to the tree in its correct sorted order
		in reference to the root node.
*/
binarySearchTree.prototype.push = function(val) {
	if (!this.root) {
		this.root = new node(val);
	} else {
		var current = this.root;
		while (current) {
			if (val < current.value) {
				if (current.left) {
					current = current.left;
				} else {
					current.left = new node(val);
					break;
				}
			} else if (val > current.value) {
				if (current.right) {
					current = current.right;
				} else {
					current.right = new node(val);
					break;
				}
			}
		}
	}
}

////////////////
// Traversals //
////////////////

/*
	binarySearchTree.preOrder() --> preOrder traverses the tree following a preOrder traversal
	    algorithm. which visits the root, then left sub-tree, then right sub-tree

	    stores the preOrder traversal list in the collection array
*/
binarySearchTree.prototype.preOrder = function(node, collection) {
	if (node) {
		collection.push(node.value);
		this.preOrder(node.left, collection);
		this.preOrder(node.right, collection);
	}
};

/*
	binarySearchTree.inOrder() --> inOrder traverses the tree following a inOrder traversal
	    algorithm. which visits the left sub-tree, then root, then right sub-tree

	    returns the inOrder traversal list as an array
*/
binarySearchTree.prototype.inOrder = function(node, collection) {
	if (node) {
		this.inOrder(node.left, collection);
		collection.push(node.value);
		this.inOrder(node.right, collection);
	}
}

/*
	binarySearchTree.postOrder() --> postOrder traverses the tree following a postOrder traversal
	    algorithm. which visits the left sub-tree, then right sub-tree, then root

	    returns the postOrder traversal list as an array
*/
binarySearchTree.prototype.postOrder = function(node, collection) {
	if (node) {
		this.postOrder(node.left, collection);
		this.postOrder(node.right, collection);
		collection.push(node.value);
	}
}

/////////////////
// PrettyPrint //
/////////////////
/*
	NOTE: Printing code was borrowed from Buliding Java Programs 3rd Edition, chapter 17,
		  by authors Stuart Reges and Marty Stepp. http://www.buildingjavaprograms.com/

		  I needed to modify it slightly for the translation to javascript, but the core mechanic
		  for prettyPrinting sideways was borrowed from the authors mentioned above!
*/

/*
	printSideways(node, level) --> private helper method that does the in-order traversal and printing of nodes
	    at the correct level of indentation. Used the Array.join(' ') trick to space it out.
*/
var printSideways = function (node, level) {
	if (node) {
		printSideways(node.right, level + 1)
		console.log(Array(level * 4 + 1).join(' ') + node.value)
		printSideways(node.left, level + 1)
	}
}

/*
	prettyPrintSideways() --> prints the bST sideways, so we can visualize it easier.
*/
binarySearchTree.prototype.prettyPrintSideways = function() {
	printSideways(this.root, 0);
	console.log();
}

///////////
// Tests //
///////////

var bST = new binarySearchTree();
bST.push(5);
bST.push(3);
bST.push(2);
bST.push(4);
bST.push(7);
bST.push(6);
bST.push(8);

/*
	bST should looks like this:
				(5)
		(3)				(7)
	(2) 	(4) 	(6) 	(8)
*/

bST.prettyPrintSideways();

// Traversal tests
var preOrder = [];
bST.preOrder(bST.root, preOrder);
console.log("preOrder: " + preOrder); //should be [5, 3, 2, 4, 7, 6, 8]

var inOrder = [];
bST.inOrder(bST.root, inOrder)
console.log("inOrder: " + inOrder); //should be [2, 3, 4, 5, 6, 7, 8]


var postOrder = [];
bST.postOrder(bST.root, postOrder);
console.log("postOrder: " + postOrder); //should be [2, 4, 3, 6, 8, 7, 5]
