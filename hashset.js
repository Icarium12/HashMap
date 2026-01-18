class HashSet {
    constructor(loadFactor) {
        this.loadFactor = loadFactor;
        this.array = new Array(16).fill(null);
        this.capacity = this.array.length;
    }

    checkBounds(index, length) {
        if(index < 0 || index >= length) {
            console.log("ran");
            throw new Error("Trying to access index out of bounds");
        }
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key) {
        const hashCode = this.hash(key);
        this.checkBounds(hashCode, this.array.length);
        const node = new Node(key);
        if (this.array[hashCode] === null) {
            this.array[hashCode] = new LinkedList(key);
        }
        else {
            if(this.array[hashCode].headNode.key !== node.value) {
                this.array[hashCode].headNode.nextNode = node;
            }
        }

        if (Math.round(this.capacity * this.loadFactor) <= this.length()) {
            const currentArray = this.array;
            const newBucket = new Array(currentArray.length * 2).fill(null);
            currentArray.forEach(item => {
                const index = currentArray.indexOf(item);
                newBucket[index] = item;
            })
            this.array = newBucket; 
            this.capacity = this.array.length;
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        this.checkBounds(hashCode, this.array.length);
        if (this.array[hashCode] === null) {
            return null;
        }
        else {
            return searchList(this.array[hashCode].headNode, key);
            function searchList(node, key) {
                if (node.value === key) {
                    return node.value;
                }
                else if (node.nextNode === null) {
                    return;
                }
                return searchList(node.nextNode, key);
            }
        }
    }

    has(key) {
        const hashCode = this.hash(key);
        this.checkBounds(hashCode, this.array.length);
        if (this.array[hashCode] === null) {
            return false;
        }
        else {
            return searchKey(this.array[hashCode].headNode, key);
            function searchKey(node, key) {
                if (node.value === key) {
                    return true;
                }
                else if (node.nextNode === null) {
                    return;
                }
                return searchKey(node.nextNode, key);
            }   
        }
    }

    remove(key) {
        const hashCode = this.hash(key);
        this.checkBounds(hashCode, this.array.length);
        if (this.array[hashCode] === null) {
            return false;
        }
        else {
            const index =  removeKey(this.array[hashCode].headNode, key);
            this.array[hashCode].removeAt(index);
            return true;
            function removeKey(node, key, count = 0) {
                if (node.value === key) {
                    return count;
                }
                else if (node.nextNode === null) {
                    return;
                }
                count++
                return removeKey(node.nextNode, key, count);
            }  
        }
    }

    length() {
        let length = 0;
        this.array.forEach(item => {
            if (item !== null) {
                length += item.size();
            }
        });
        return length;
    }

    clear() {
        this.array = new Array(16).fill(null);
    }

    keys() {
        if (this.length() === 0) {
            return [];
        }
        else {
            const keys = [];
            this.array.forEach(item => {
                if (item !== null) {
                    printKeys(item.headNode, keys);
                }
            });
            return keys;


            function printKeys(node, keys = []) {
                if (node.nextNode === null) {
                    keys.push(node.value);
                    return keys
                }
                keys.push(node.value);
                return printKeys(node.nextNode, keys); 
            }
        }
    }
}









class LinkedList {
    constructor(key) {
        this.headNode = new Node(key);
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
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}


const test = new HashSet(0.8);


test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.keys());