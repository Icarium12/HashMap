import { HashMap } from "./hashmap.js";

const test = new HashMap(0.75);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');

console.log(test.entries());