/*
I'm making a search engine called MillionGazillion™.
I wrote a crawler that visits web pages, stores a few keywords in a database,
and follows links to other web pages. I noticed that my crawler was wasting a lot of
time visiting the same pages over and over, so I made an object visited where I'm
storing URLs I've already visited. Now the crawler only visits a URL if it hasn't already
been visited.

Thing is, the crawler is running on my old desktop computer in my parents' basement
(where I totally don't live anymore), and it keeps running out of memory because visited
is getting so huge.

How can I trim down the amount of space taken up by visited?

initial thoughts:
could compress the urls somehow, to shorten up the actual amount of space necessary to store
each of the urls. strip off http:// for sure, things like that.

The answer was to use a trie structure, which removes an extra factor of n from the space complexity
the space complexity is still large, though, O(26^n) in the worst case, since each trie node
has 26 potential characters attached to it to store various values.
*/
