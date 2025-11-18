---
name: modern-javascript
description: Master modern ES6+ JavaScript features including classes, arrow functions, destructuring, modules, iterators, and advanced patterns.
---

# Modern JavaScript Skill

## Quick Start

ES6+ brings modern syntax and features. Master these essential patterns:

```javascript
// Arrow functions
const add = (a, b) => a + b;

// Template literals
const name = "Alice";
const greeting = `Hello, ${name}!`;

// Destructuring
const { name, age } = person;
const [first, second] = array;

// Classes
class User {
  constructor(name) {
    this.name = name;
  }
}

// Modules
export const func = () => {};
import { func } from './module.js';
```

## Arrow Functions

Arrow functions provide concise syntax and lexical `this`:

```javascript
// Regular function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const add = (a, b) => {
  return a + b;
};

// Concise arrow (implicit return)
const add = (a, b) => a + b;

// Single parameter (optional parentheses)
const square = x => x * x;

// No parameters
const getRandom = () => Math.random();

// Arrow functions don't have their own 'this'
const person = {
  name: "Alice",
  greetAfter1s: function() {
    // Regular function: can use this
    setTimeout(() => {
      // Arrow function: 'this' from outer scope
      console.log(`Hello, ${this.name}`);
    }, 1000);
  }
};
```

## Template Literals

String interpolation and multiline strings:

```javascript
const name = "Alice";
const age = 30;

// String concatenation (old)
const msg = "Hello, " + name + "! You are " + age + " years old.";

// Template literals (modern)
const msg = `Hello, ${name}! You are ${age} years old.`;

// Expressions
const sum = `5 + 3 = ${5 + 3}`;
const max = `Max: ${Math.max(1, 2, 3)}`;

// Multiline
const html = `
  <div class="card">
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] ? `<mark>${values[i]}</mark>` : "");
  }, "");
}

const result = highlight`Hello, ${name}!`;
// "Hello, <mark>Alice</mark>!"
```

## Classes

Modern object-oriented programming:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }

  static info() {
    return "I am an animal";
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (value < 0) throw new Error("Age can't be negative");
    this._age = value;
  }
}

// Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;  // Override method
  }
}

const dog = new Dog("Buddy", "Golden");
console.log(dog.speak());        // "Buddy barks"
console.log(Dog.info());         // "I am an animal"
```

## Destructuring

Extract values from objects and arrays:

```javascript
// Object destructuring
const user = { name: "Alice", age: 30, city: "NYC" };
const { name, age } = user;

// Rename properties
const { name: fullName, age: userAge } = user;

// Default values
const { country = "USA" } = user;  // country = "USA"

// Nested destructuring
const data = {
  person: { name: "Alice", address: { city: "NYC" } }
};
const { person: { address: { city } } } = data;

// Rest properties
const { name, ...rest } = user;
// rest = { age: 30, city: "NYC" }

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second] = colors;  // first = "red", second = "green"

// Skip elements
const [, , third] = colors;  // third = "blue"

// Rest elements
const [primary, ...others] = colors;
// primary = "red", others = ["green", "blue"]

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];  // a = 2, b = 1

// Function parameters
function displayUser({ name, age, city = "Unknown" }) {
  console.log(`${name}, ${age}, ${city}`);
}

displayUser({ name: "Alice", age: 30 });
```

## Spread and Rest Operators

```javascript
// Spread operator (...)
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];     // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };   // { a: 1, b: 2, c: 3 }

// Copy with spread
const copy = [...arr1];            // Shallow copy
const objCopy = { ...obj1 };       // Shallow copy

// Rest operator (...) in function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4, 5);  // 15

// Rest in destructuring
const { a, ...rest } = { a: 1, b: 2, c: 3 };
// a = 1, rest = { b: 2, c: 3 }
```

## Default Parameters

```javascript
// Old way (with || operator)
function greet(name) {
  name = name || "Guest";
  return `Hello, ${name}`;
}

// Modern way
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

// Arrow functions
const multiply = (a, b = 1) => a * b;

// Complex defaults
function createUser(name, role = "user", permissions = []) {
  return { name, role, permissions };
}

// Defaults can use other parameters
function createId(prefix = "ID", id = Math.random()) {
  return `${prefix}-${id}`;
}

// Defaults with destructuring
function displayUser({ name = "Unknown", age = 0 } = {}) {
  console.log(`${name}, ${age}`);
}

displayUser();  // "Unknown, 0"
displayUser({ name: "Alice" });  // "Alice, 0"
```

## Modules

Organize code into reusable modules:

```javascript
// math.js - Exporting
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default function multiply(a, b) {
  return a * b;
}

// main.js - Importing
import multiply, { add, subtract } from './math.js';

multiply(5, 3);    // 15
add(5, 3);         // 8

// Import all
import * as math from './math.js';
math.add(5, 3);         // 8
math.default(5, 3);     // 15

// Named imports with aliases
import multiply as mul, { add as plus } from './math.js';
plus(5, 3);  // 8
mul(5, 3);   // 15

// Dynamic imports
const module = await import('./math.js');
module.add(5, 3);

// Lazy loading
async function loadModule() {
  const { default: multiply } = await import('./math.js');
  return multiply(5, 3);
}
```

## Enhanced Object Literals

```javascript
const name = "Alice";
const age = 30;

// Old way
const user = {
  name: name,
  age: age,
  greet: function() {
    return `Hello, ${this.name}`;
  }
};

// Modern way
const user = {
  name,    // Property shorthand
  age,
  greet() {  // Method shorthand
    return `Hello, ${this.name}`;
  },
  [name]: "value",  // Computed property names
  ...otherObject    // Spread properties
};
```

## Iterators and Generators

```javascript
// Generator function
function* countdown(n) {
  while (n > 0) {
    yield n;
    n--;
  }
}

const counter = countdown(3);
console.log(counter.next());  // { value: 3, done: false }
console.log(counter.next());  // { value: 2, done: false }
console.log(counter.next());  // { value: 1, done: false }
console.log(counter.next());  // { value: undefined, done: true }

// Using in for...of loop
for (const num of countdown(3)) {
  console.log(num);  // 3, 2, 1
}

// Generator with two-way communication
function* echo() {
  const input1 = yield "Enter value 1";
  const input2 = yield `You said: ${input1}`;
  return `Received: ${input1}, ${input2}`;
}

// Using with values
const gen = echo();
console.log(gen.next());        // { value: "Enter value 1", ... }
console.log(gen.next("hello"));  // { value: "You said: hello", ... }
console.log(gen.next("world"));  // { value: "Received: ...", done: true }
```

## Optional Chaining and Nullish Coalescing

```javascript
// Optional chaining (?.)
const user = { name: "Alice", address: { city: "NYC" } };

user.address?.city;          // "NYC"
user.phone?.number;          // undefined (safe)
user.greet?.();              // undefined (safe function call)

// Optional with arrays
const items = user.items?.[0];  // undefined (safe)

// Nullish coalescing (??)
const name = null ?? "Guest";   // "Guest"
const count = 0 ?? 10;          // 0 (not nullish)
const age = undefined ?? 18;    // 18

// Combining both
const city = user?.address?.city ?? "Unknown";
```

## Practice Exercises

1. Refactor ES5 code to ES6+ syntax
2. Build class hierarchies with inheritance
3. Create and export modules
4. Use destructuring in functions
5. Work with generators and iterators
6. Practice optional chaining and nullish coalescing

## Common Patterns

### ES5 to ES6+ Migration

```javascript
// ES5
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return "Hello, " + this.name;
};
var p = new Person("Alice");

// ES6+
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}`;
  }
}
const p = new Person("Alice");
```

## Resources

- MDN: ES6 Guide
- JavaScript.info: Modern JavaScript
- Exploring ES6+ by Axel Rauschmayer

## Next Steps

- Use modern syntax in all projects
- Master class hierarchies and composition
- Learn async/await and promises
- Explore modern frameworks (React, Vue)
