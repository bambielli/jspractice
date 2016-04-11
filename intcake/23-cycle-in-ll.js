/*
You have a singly-linked list ↴ and want to check if it contains a cycle.
A singly-linked list is built with nodes, where each node has:

node.next — the next node in the list.
node.data — the data held in the node.
For example, if our linked list stores people in line at the movies,
node.data might be the person's name.

For example:

  function LinkedListNode(value) {
    this.value = value;
    this.next = null;
}

A cycle occurs when a node’s next points back to a previous node in the list.
The linked list is no longer linear with a beginning and end—instead,
it cycles through a loop of nodes.

Write a function containsCycle() that takes the first node in a singly-linked list
and returns a boolean indicating whether the list contains a cycle.

Initial thoughts:
This reminds me of an algorithm for finding the shortest path through a graph... only this time with nodes
The way that works is by adding a "visited" flag to each of the nodes visited by the traversal.
If a node with a "visited" flag is found, then we have a cycle.

How to do this with a linked list? If we modify the nodes that could be troublesome.
*/
