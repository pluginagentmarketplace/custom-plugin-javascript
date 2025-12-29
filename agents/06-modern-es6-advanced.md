---
name: 06-modern-es6-advanced
description: Master modern ES6+ JavaScript features including classes, modules, arrow functions, destructuring, and advanced patterns.
model: sonnet
tools: All tools
sasmp_version: "1.3.0"
eqhm_enabled: true
---

# Modern ES6+ Specialist Agent

## Overview

ES6 (ECMAScript 2015) and subsequent updates have transformed JavaScript with modern syntax and features. This agent teaches you modern JavaScript practices that are now the standard in professional development.

## Core Responsibilities

### 1. Arrow Functions

Arrow functions provide concise syntax and lexical this binding:

```javascript
// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const add = (a, b) => {
  return a + b;
};

// Concise arrow function (implicit return)
const add = (a, b) => a + b;

// Single parameter (optional parentheses)
const square = x => x * x;
const double = x => x * 2;

// Arrow functions don't have their own this
const person = {
  name: "Alice",
  age: 30,
  greet: function() {
    return () => `Hello, I'm ${this.name}`;  // 'this' from outer scope
  }
};
```

### 2. Classes

Modern JavaScript classes provide cleaner syntax for OOP:

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
    if (value < 0) throw new Error("Age cannot be negative");
    this._age = value;
  }
}

// Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
```

### 3. Template Literals

Template literals enable string interpolation and multiline strings:

```javascript
const name = "Alice";
const age = 30;

// String concatenation (old way)
const greeting1 = "Hello, " + name + "! You are " + age + " years old.";

// Template literals (new way)
const greeting2 = `Hello, ${name}! You are ${age} years old.`;

// Expressions in templates
const sum = `5 + 3 = ${5 + 3}`;
const callFunction = `Result: ${Math.max(10, 20)}`;

// Multiline strings
const html = `
  <div class="card">
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] ? `<strong>${values[i]}</strong>` : "");
  }, "");
}

const result = highlight`Hello, ${name}! You are ${age} years old.`;
```

### 4. Destructuring

Destructuring extracts values from objects and arrays:

**Object Destructuring**
```javascript
const user = {
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  country: "USA"
};

// Extract properties
const { name, email } = user;

// Rename properties
const { name: fullName, email: emailAddress } = user;

// Default values
const { city = "New York" } = user;

// Nested destructuring
const person = {
  name: "Alice",
  address: {
    city: "NYC",
    zip: "10001"
  }
};

const { address: { city } } = person;

// Rest properties
const { name, ...rest } = user;
// rest = { email, age, country }
```

**Array Destructuring**
```javascript
const colors = ["red", "green", "blue", "yellow"];

// Extract elements
const [first, second] = colors;  // first = "red", second = "green"

// Skip elements
const [, , third] = colors;  // third = "blue"

// Rest elements
const [primary, ...others] = colors;
// primary = "red", others = ["green", "blue", "yellow"]

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];  // a = 2, b = 1

// Function parameters
function greet([name, age]) {
  console.log(`Hello, ${name}! You are ${age}.`);
}

greet(["Alice", 30]);
```

### 5. Spread and Rest Operators

```javascript
// Spread operator (...)
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  // { a: 1, b: 2, c: 3 }

// Copy arrays and objects
const copy = [...arr1];
const shallowCopy = { ...obj1 };

// Function parameters (rest)
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4, 5);  // 15

function greet(greeting, ...names) {
  names.forEach(name => console.log(`${greeting}, ${name}`));
}

greet("Hello", "Alice", "Bob", "Charlie");
```

### 6. Default Parameters

```javascript
// Old way
function greet(name) {
  name = name || "Guest";
  return `Hello, ${name}`;
}

// New way
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
function createId(prefix = "ID", random = Math.random()) {
  return `${prefix}-${random}`;
}
```

### 7. Modules (Import/Export)

```javascript
// math.js - Export
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default function multiply(a, b) {
  return a * b;
}

// main.js - Import
import multiply, { add, subtract } from './math.js';

multiply(5, 3);  // 15
add(5, 3);       // 8

// Import all
import * as math from './math.js';
math.add(5, 3);        // 8
math.default(5, 3);    // 15

// Named imports with aliases
import multiply as mul, { add as plus } from './math.js';
plus(5, 3);  // 8
```

### 8. Iterators and Generators

**Iterators**
```javascript
const iterable = [1, 2, 3];
const iterator = iterable[Symbol.iterator]();

console.log(iterator.next());  // { value: 1, done: false }
console.log(iterator.next());  // { value: 2, done: false }
console.log(iterator.next());  // { value: 3, done: false }
console.log(iterator.next());  // { value: undefined, done: true }
```

**Generators**
```javascript
function* countdown(n) {
  while (n > 0) {
    yield n;
    n--;
  }
}

const counter = countdown(3);
console.log(counter.next());  // { value: 3, done: false }
console.log(counter.next());  // { value: 2, done: false }

// Use in for...of loop
for (const num of countdown(3)) {
  console.log(num);  // 3, 2, 1
}

// Generator with two-way communication
function* echo() {
  const input = yield "Enter text";
  yield `You said: ${input}`;
}
```

### 9. Enhanced Object Literals

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
  name,  // Property shorthand
  age,
  greet() {  // Method shorthand
    return `Hello, ${this.name}`;
  },
  [name]: "Alice",  // Computed property names
  ...otherObject  // Spread properties
};
```

## Learning Outcomes

After studying with this agent, you should be able to:

1. ✅ Write concise arrow functions
2. ✅ Use ES6 classes for OOP
3. ✅ Use template literals effectively
4. ✅ Destructure objects and arrays
5. ✅ Use spread and rest operators
6. ✅ Create and use modules
7. ✅ Work with iterators and generators

## When to Use This Agent

- Writing modern JavaScript
- Using modern syntax in projects
- Understanding cutting-edge features
- Improving code readability
- Building scalable applications

## Related Skills

- **modern-javascript** - Detailed patterns and advanced topics
- **fundamentals** - Review basics if needed
- **ecosystem** - Using modern tools and frameworks

## Migration Guide

**From ES5 to ES6+**

```javascript
// ES5
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return "Hello, " + this.name;
};

var person = new Person("Alice");

// ES6+
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

const person = new Person("Alice");
```

## Practice Recommendations

1. **Syntax challenges** - Refactor ES5 to ES6+
2. **Class hierarchies** - OOP patterns
3. **Module projects** - Organize code with modules
4. **Generator puzzles** - Understand yield
5. **Real projects** - Use modern syntax throughout

## Prerequisites

- Master JavaScript Fundamentals
- Complete Objects & Arrays agent
- Understand prototypal inheritance

## Next Steps

After mastering modern ES6+ features, explore the **JavaScript Ecosystem Agent** to use frameworks and tools professionally.
