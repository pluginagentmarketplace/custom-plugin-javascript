---
name: data-structures
description: Master JavaScript objects and arrays including manipulation methods, prototypal inheritance, and complex data structure patterns.
sasmp_version: "1.3.0"
bonded_agent: 01-javascript-fundamentals
bond_type: PRIMARY_BOND
---

# Data Structures Skill

## Quick Start

Objects and arrays are the fundamental data structures:

```javascript
// Objects
const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Arrays
const colors = ["red", "green", "blue"];
const mixed = [1, "hello", true, { id: 1 }, [1, 2, 3]];

// Accessing values
user.name;        // "Alice"
user["email"];    // "alice@example.com"
colors[0];        // "red"
mixed[3].id;      // 1
```

## Objects

### Creating Objects

```javascript
// Object literal
const person = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

// Using constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const alice = new Person("Alice", 30);

// Using Object.create()
const proto = { greet() { return `Hello, ${this.name}`; } };
const person2 = Object.create(proto);
person2.name = "Bob";
```

### Object Methods

```javascript
const obj = { a: 1, b: 2, c: 3 };

// Get keys, values, entries
Object.keys(obj);       // ["a", "b", "c"]
Object.values(obj);     // [1, 2, 3]
Object.entries(obj);    // [["a", 1], ["b", 2], ["c", 3]]

// Merge objects
Object.assign({}, obj, { d: 4 });  // { a: 1, b: 2, c: 3, d: 4 }

// Create with prototype
Object.create(proto);

// Freeze/Seal
Object.freeze(obj);     // No changes allowed
Object.seal(obj);       // No add/delete, but modify allowed

// Getters and setters
const user = {
  _age: 0,
  get age() { return this._age; },
  set age(val) { if (val >= 0) this._age = val; }
};

user.age = 30;
console.log(user.age);  // 30
```

### Object Destructuring

```javascript
const user = { name: "Alice", age: 30, city: "NYC" };

// Extract properties
const { name, age } = user;

// Rename properties
const { name: fullName, age: userAge } = user;

// Default values
const { country = "USA" } = user;  // country = "USA"

// Nested destructuring
const person = {
  name: "Alice",
  address: { city: "NYC", zip: "10001" }
};

const { address: { city } } = person;  // city = "NYC"

// Rest properties
const { name, ...rest } = user;
// rest = { age: 30, city: "NYC" }
```

## Arrays

### Array Basics

```javascript
const arr = [1, 2, 3, 4, 5];

// Access elements
arr[0];         // 1
arr[arr.length - 1];  // 5

// Modify elements
arr[0] = 10;
arr.push(6);    // Add to end
arr.pop();      // Remove from end
arr.unshift(0); // Add to beginning
arr.shift();    // Remove from beginning
```

### Array Transformational Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(x => x * 2);
// [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evens = numbers.filter(x => x % 2 === 0);
// [2, 4]

// reduce - combine into single value
const sum = numbers.reduce((acc, x) => acc + x, 0);
// 15

// reduceRight - reduce from right to left
const result = numbers.reduceRight((acc, x) => acc - x, 0);
// 0 - 5 - 4 - 3 - 2 - 1 = -15

// flat - flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
nested.flat();        // [1, 2, 3, 4, [5, 6]]
nested.flat(2);       // [1, 2, 3, 4, 5, 6]

// flatMap - map then flatten
const result = [1, 2, 3].flatMap(x => [x, x * 2]);
// [1, 2, 2, 4, 3, 6]
```

### Array Search Methods

```javascript
const numbers = [1, 5, 10, 15, 20];
const fruits = ["apple", "banana", "cherry"];

// find - return first element that passes test
numbers.find(x => x > 10);    // 15

// findIndex - return index of first match
numbers.findIndex(x => x > 10);  // 3

// includes - check if array contains value
fruits.includes("banana");   // true

// indexOf - find index of value
fruits.indexOf("cherry");    // 2

// lastIndexOf - find last occurrence
[1, 2, 3, 2, 1].lastIndexOf(2);  // 3
```

### Array Iteration Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach - execute function for each element
numbers.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// some - check if any element passes test
numbers.some(x => x > 3);    // true

// every - check if all elements pass test
numbers.every(x => x > 0);   // true

// for...of - iterate over values
for (const num of numbers) {
  console.log(num);
}
```

### Array Manipulation

```javascript
const arr = [1, 2, 3, 4, 5];

// splice - add/remove elements (modifies original)
arr.splice(2, 2, "a", "b");  // Remove 2, insert "a", "b"
// arr = [1, 2, "a", "b", 5]

// slice - create copy (doesn't modify original)
arr.slice(1, 3);             // [2, "a"]

// concat - combine arrays
[1, 2].concat([3, 4]);       // [1, 2, 3, 4]

// reverse - reverse in place
[1, 2, 3].reverse();         // [3, 2, 1]

// sort - sort in place
["c", "a", "b"].sort();      // ["a", "b", "c"]
[3, 1, 2].sort((a, b) => a - b);  // [1, 2, 3]

// join - create string from array
["a", "b", "c"].join("-");   // "a-b-c"

// Array.from - create array from iterable
Array.from("hello");         // ["h", "e", "l", "l", "o"]
Array.from({ length: 3 }, (_, i) => i);  // [0, 1, 2]

// Array.isArray - check if value is array
Array.isArray([1, 2, 3]);    // true
```

### Array Destructuring

```javascript
const colors = ["red", "green", "blue"];

// Extract elements
const [first, second] = colors;  // first = "red", second = "green"

// Skip elements
const [, , third] = colors;      // third = "blue"

// Rest elements
const [primary, ...others] = colors;
// primary = "red", others = ["green", "blue"]

// Default values
const [a = 0, b = 0, c = 0, d = 0] = [1, 2];
// a = 1, b = 2, c = 0, d = 0

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x];  // x = 2, y = 1
```

## Prototypal Inheritance

### Prototype Chain

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks`;
};

const dog = new Dog("Buddy");
console.log(dog.name);     // "Buddy"
console.log(dog.speak());  // "Buddy makes a sound"
console.log(dog.bark());   // "Buddy barks"
```

### Classes (Modern Syntax)

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    return `${this.name} barks`;
  }

  speak() {
    return `${this.name} barks loudly`;  // Override
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
```

## Complex Patterns

### Nested Data Structures

```javascript
const company = {
  name: "Tech Corp",
  departments: [
    {
      name: "Engineering",
      employees: [
        { name: "Alice", salary: 80000 },
        { name: "Bob", salary: 75000 }
      ]
    },
    {
      name: "Sales",
      employees: [
        { name: "Charlie", salary: 70000 }
      ]
    }
  ]
};

// Access nested data
company.departments[0].employees[1].name;  // "Bob"
```

### Spread Operator

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  // { a: 1, b: 2, c: 3 }

// Shallow copy
const copy = { ...obj1 };
```

## Practice Exercises

1. Create a complex object representing a student with nested data
2. Use array methods to transform arrays (map, filter, reduce)
3. Implement object and array destructuring in functions
4. Build a simple class hierarchy with inheritance
5. Work with nested data structures

## Resources

- MDN: Working with Objects
- MDN: Array methods
- JavaScript.info: Objects and arrays

## Next Steps

- Master array methods with practice
- Deep dive into prototype chain
- Learn advanced OOP patterns
- Explore class syntax features
