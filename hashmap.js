import { LinkedList, Node } from "./list.js";

class HashMap {
    constructor(loadFactor) {
        this.loadFactor = loadFactor,
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

    set(key, value) {
        const hashCode = this.hash(key);
        this.checkBounds(hashCode, this.array.length);
        const node = new Node(key, value);
        if (this.array[hashCode] === null) {
            this.array[hashCode] = new LinkedList(key, value);
        }
        else {
            if (this.array[hashCode].headNode.key === node.key) {
                this.array[hashCode].headNode.value = node.value;
            }
            else if(this.array[hashCode].headNode.key !== node.key) {
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
                if (node.key === key) {
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
                if (node.key === key) {
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
                if (node.key === key) {
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
                    keys.push(node.key);
                    return keys
                }
                keys.push(node.key);
                return printKeys(node.nextNode, keys); 
            }
        }
    }

    values() {
        if (this.length() === 0) {
            return [];
        }
        else {
            const values = [];
            this.array.forEach(item => {
                if (item !== null) {
                    printVals(item.headNode, values);
                }
            });
            return values;


            function printVals(node, values = []) {
                if (node.nextNode === null) {
                    values.push(node.value);
                    return values
                }
                values.push(node.value);
                return printVals(node.nextNode, values); 
            }
        }
    }

    entries() {
        if (this.length() === 0) {
            return [];
        }
        else {
            const entries = [];
            this.array.forEach(item => {
                if (item !== null) {
                    getEntries(item.headNode, entries);
                }
                
            });
            return entries;


            function getEntries(node, entries) {
                if (node.nextNode === null) {
                    entries.push(`${node.key}, ${node.value}`);
                    return entries;
                }
                entries.push(`${node.key}, ${node.value}`);
                return getEntries(node.nextNode, entries);
            }
        }
    }
}

export {HashMap};


