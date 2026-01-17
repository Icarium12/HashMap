class LinkedList {
    constructor(key, value) {
        this.headNode = new Node(key, value);
    }

    append(value) {
        if (this.headNode.value === null) {
            this.headNode = new Node(value)
        }
        else {
            addNode(this.headNode)
        }
        function addNode(node) {
            if (node.nextNode === null) {
                node.nextNode = new Node(value);
                return;
            }
            return addNode(node.nextNode);
        }

    }

    prepend(value) {
        if(this.headNode.value === null) {
            this.headNode = new Node(value);
        }
        else {
            let current  = this.headNode;
            const newNode = new Node(value);
            this.headNode = newNode;
            this.headNode.nextNode = current; 
        }
    }

    size() {
        if (this.headNode.value === null) {
            return 0;
        }
        else {
            return count(this.headNode);
        }
        function count(node, counter = 1) {
            if (node.nextNode === null) {
                return counter;
            }
            counter++;
            return count(node.nextNode, counter);
        }
    }

    head() {
        if (this.headNode.value === null) {
            return undefined;
        }
        else {
            return this.headNode.value;
        }
    }

    tail() {
        if (this.headNode.value === null) {
            return undefined
        }
        else {
            return tailNode(this.headNode.nextNode);
        }
        function tailNode(node) {
            if (node.nextNode === null) {
                return node.value;
            }
            return tailNode(node.nextNode);
        }
    }

    at(index) {
        if (this.headNode.value === null) {
            return undefined;
        }
        else {
            return loop(this.headNode, index)
        }

        function loop(node, index, count = 0) {
            if (count === index) {
                return node.value;
            }
            else if (node.nextNode === null) {
                return undefined;
            }
            count ++
            return loop(node.nextNode, index, count);
        }
    }

    pop() {
        if (this.headNode.value === null) {
            return undefined;
        }
        else {
            const value = this.headNode.value;
            this.headNode = this.headNode.nextNode;
            return value;
        }
    }

    contains(value) {
        if (this.headNode.value === null) {
            return false;
        }
        else {
            return searchValue(this.headNode, value);
        }
        function searchValue(node, value) {
            if (node.value === value) {
                return true
            }
            else if (node.nextNode === null) {
                return false;
            }
            return searchValue(node.nextNode, value);
        }
    }

    findIndex(value) {
        if (this.headNode.value === null) {
            return -1;
        }
        else {
            return searchIndex(this.headNode, value);
        }
        function searchIndex(node, value, count = 0) {
            if (node.value === value) {
                return count;
            }
            else if (node.nextNode === null) {
                count = -1;
                return count;
            }
            count+=1;

            return searchIndex(node.nextNode, value, count);
        }
    }

    toString() {
        if (this.headNode.value === null) {
            return "";
        }
        else {
            return printString(this.headNode);
        }
        function printString(node, string = "") {
            if (node.nextNode === null) {
                string += `(${node.value}) -> `;
                string += "null";
                return string;
            }
            string += `(${node.value}) -> `;
            return printString(node.nextNode, string); 
        }
    }

    insertAt(index, ...values) {
        if (index < 0 || index > this.size(this.headNode)) {
            throw new RangeError();
        }
        else if (index === 0) {
            values.forEach(value => {
                let current  = this.headNode;
                const newNode = new Node(value);
                this.headNode = newNode;
                this.headNode.nextNode = current; 
            })
        }
        else {
            let count = 0;
            const previousNodes = [];
            insert(this.headNode, index, count, previousNodes, ...values);
        }
        function insert(node, index, count, previousNodes, ...values) {
            if (index === count) {

                values.forEach(value => {
                    const current = new Node(value);
                    current.nextNode = node;
                    previousNodes[previousNodes.length -1].nextNode =current;
                    previousNodes.push(current);
                });
                return;
            }
            else if (node.nextNode === null) {
                return;
            }
            count++;
            previousNodes.push(node);
            return insert(node.nextNode, index, count, previousNodes, ...values);
        }
    }

    removeAt(index) {
        if (index < 0 || index > this.size(this.headNode)) {
            throw new RangeError();
        }
        else if (index === 0) {
            this.headNode = this.headNode.nextNode
        }
        else {
            let count = 0;
            const previousNodes = []
            remove(this.headNode, index, count, previousNodes);
        }
        function remove(node, index, count, previousNodes) {
            if (index === count) {
                previousNodes[previousNodes.length -1].nextNode = node.nextNode;
                return;
            }
            count++
            previousNodes.push(node);
            return remove(node.nextNode, index, count, previousNodes)
        }
    }
}

class Node {
    constructor(key = null, value = null, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

export {LinkedList, Node};