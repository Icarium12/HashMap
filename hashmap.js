import { LinkedList, Node } from "./list.js";

class HashMap {
    constructor(loadFactor) {
        this.loadFactor = loadFactor,
        this.array = new Array(16).fill(null);
        this.capacity = this.array.length();
    }

    checkBounds(index, length) {
        if(index < 0 || index >= length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    grow() {
        if ((this.capacity * this.loadFactor) > this.length()) {
            const currentArray = this.array;
            const newBucket = new Array(currentArray.length * 2).fill(null);
            for (let i = 0; i < currentArray.length; i++) {
                newBucket[i] = currentArray[i];
            }
            this.array = newBucket; 
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
        this.grow();
        const hashCode = this.hash(key);
        this.checkBounds();
        const node = new Node(key, value);
        if (this.array[hashCode] === null) {
            this.array[hashCode] = new LinkedList();
            this.array[hashCode].append(node);
        }
        else {
            if (this.array[hashCode].key === node.key) {
                this.array[hashCode].value = node.value;
            }
            else if(this.array[hashCode].key !== node.key) {
                this.array[hashCode].nextNode = node;
            }
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        this.checkBounds(hashCode, this.array.length);
        if (this.array[hashCode] === null) {
            return null;
        }
        else {
            return searchList(this.array[hashCode, key]);
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
        if (this.array[hashCode] === null) {
            return false;
        }
        else {
            return searchKey(this.array[hashCode]);
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
        if (this.array[hashCode] === null) {
            return false;
        }
        else {
            return removeKey(this.array[hashCode], key);
            function removeKey(node, key, count = 0) {
                if (node.key === key) {
                    this.array[hashCode].removeAt(count);
                    return true;
                }
                else if (node.nextNode === null) {
                    return;
                }
                count++
                return searchKey(node.nextNode, key);
            }  
        }
    }

    length() {
        if (this.array.length === 0) {
            return 0
        }
        else {
            let length;
            this.array.forEach(item => {
                if (item !== null) {
                    length += item.size;
                }
            });
            return length;
        }
    }

    clear() {
        this.array = new Array(16);
    }

    keys() {
        if (this.array.length === 0) {
            return [];
        }
        else {
            const keys = [];
            this.array.forEach(item => {
                if (item !== null) {
                    printKeys(item, keys);
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
        if (this.array.length === 0) {
            return [];
        }
        else {
            const values = [];
            this.array.forEach(item => {
                if (item !== null) {
                    printVals(item, values);
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
        if (this.array.length === 0) {
            return [];
        }
        else {
            const entries = [];
            this.array.forEach(item => {
                if (item !== null) {
                    getEntries(item, entries);
                }
                
            });
            return entries;


            function getEntries(node, entries = [], entry = `${node.key}, ${node.value}`) {
                if (node.nextNode === null) {
                    entries.push(entry);
                    return entries;
                }
                entries.push(entry);
                return(node.nextNode, entries);
            }
        }
    }
}

export {HashMap};


