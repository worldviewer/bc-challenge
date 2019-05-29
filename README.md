# Challenge

## Part 1: The Data Structure

Requirements:

1. each family member can have zero or more children
2. each family member can have an indefinite number of properties, e.g. name, gender, favorite color, etc.
3. there should not be a limit on the depth of the family tree

### The n-ary Approach

A common solution is the n-ary tree, which is a binary tree w a variable number of children.  In this case, I would separate out the node's properties and children into two separate arrays.

A typical Node would basically look like:

```
class Node {
    constructor(properties = []) {
        this.properties = properties;
        this.children = [];
    }

    // properties would be an array of key-value pairs (objects)
    // e.g. [{'favorite color': 'red'}, {gender: 'male'}]

    // children would be an array of other Nodes
    // e.g. [node1, node2, node3]
}
```

Right away, the third requirement is an important consideration, since our structure could easily become sufficiently large that for performance reasons, we might eventually choose to only render a section of the tree at a time.

Another important - and related - consideration is the time it takes to navigate this structure.  Ideally, we should have an ability to navigate both up *and down* the tree hierarchy.  And that raises the question of whether or not we should supply back-links from the children up to their parent.

### The Bi-directional n-ary Tree Approach

```
class Node {
    constructor(properties = []) {
        this.parent = null;
        this.properties = properties;
        this.children = [];
    }

    // properties would be an array of key-value pairs (objects)
    // e.g. [{'favorite color': 'red'}, {gender: 'male'}]

    // children would be an array of other Nodes
    // e.g. [node1, node2, node3]

    // parent would be a single Node
}
```

### The Array Approach

It is, in theory, possible to implement the entire structure as just an array, which could provide a performance advantage for accesses since the structure would then exist in a contiguous section of memory.  However, the fact that we need to be able to add and remove items creates serious questions about how long those changes would take for the data structure if it was large, since each change would necessarily involve a worse case scenario of O(n)-time operation for shifting the values in the array.

The advantage of the tree-based approach is that changes are much faster.  Also, the data structure is actually easier to conceptualize as a tree.

### The First Child / Next Sibling n-ary Structure

There is another possible implementation where the parent only stores a reference to one of the children (the "first"), and then the other children are then accessible as siblings of that child.  In this case, the parent node would have be identifiable as not having any siblings.

A person might argue that this reduces the size of our total data structure, but it seems to come at a performance cost: The problem with this approach is that it introduces an O(m) latency for traversing up our family tree, compared with the bi-directional n-ary tree approach.  In other words, if we have m siblings for a particular parent, then the only way to get to the parent from one of those siblings involves following some sort of backlinks, with a worst-case scenario of m jumps.

In a typical application, the navigation and render problems are going to represent critical paths.  In most applications, the small adantage provided by this smaller data structure are probably not going to make a huge difference for our application.

### Conclusion

I would personally go with the bi-directional n-ary tree approach, since it provides us with the best flexibility to optimize for performance in the event that we later decide that we need to display just a small portion of our graph.  To do that, we would need to be able to move up and down the hierarchy without having to start at the top each time.

## Part 2: Render the Family Tree

## Part 3: Implement UI to Add and Remove Tree Members

