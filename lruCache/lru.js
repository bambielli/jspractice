/*
	A Least Recently Used cache (LRU Cache) is a farily simple, but efficient cache implementation.
	I will be attempting to implement one from scratch, without any presumed available datastructures.

	A description of the functionality of an LRU cache is as follows:
	  1. The cache is of a determinate size (i.e. 5 pages or 1024 bytes long)
	  2. Elements are added to the cache in first in first out (FIFO) ordering.
	  3. O(1) lookup time should be preserved (a slow cache isn't very useful at all!)
	  4. If a client attempts to add an item to the cache, and the cache is already full,
	     The least recently used item from the cache is removed, and the new item is added as "most recently used".

	What sorts of datastructures would be useful here? Well the FIFO quality of the LRU cache behavior
	reminds me of a queue, but lookup in a queue is a very slow O(n) process...

	We could use a Hash Table to store key to value mappings of items in our queue, which has O(1) lookup time, on top of our queue
	for cache organization. The hash table would keep a reference to the node so we could jump right to it and get the value.
	Every time we access an item in our cache, we also want to re-order it's "priority" in the queue
	(move it to the head of the queue) so it becomes most recently used. When an item is removed from the cache, it should also be removed
	from the hash table as well, to keep the two consistent.

	We could choose to implement the queue as a doubly linked list instead of a singly linked list. This would provide faster re-ordering
	operations than a singly linked list would.

*/

function node(key, value, next, prev) {
	this.key = key;
	this.value = value;
	this.next = next || null;
	this.prev = prev || null;
}

var a = new node(1, 2);
console.log(a);


function LRU(capacity, lookup, head, end) {
	this.capacity = capacity || 0;
	this.lookup = lookup || {};
	this.head = queue || null;
	this.end = end || null;
}

LRU.prototype.get = function(key) {
	if (lookup.hasOwnProperty(key)) {
		//get the value out of the lookup, but also re-order the position in the cache to most recently used
		return lookup.key.value
	} else {
		//key does not exist in lookup... should add it to the cache
		//LRU.add(key)
	}
}

//adds an element to the head of the queue
LRU.prototype.add = function(node) {
	//defensive in case a node is passed with weird values.
	node.next = null;
	node.prev = null;
	if(this.head === null) {
		this.head = node;
		this.end = node;
	} else {
		node.next = this.head;
		this.head.prev = node;
		this.head = node;
	}
}

LRU.prototype.remove = function(node) {
	if(this.head === null || node === null) {
		return
	} else if (this.head === node && this.head === this.end) {
		this.head = null;
		this.end = null;

	}

}
