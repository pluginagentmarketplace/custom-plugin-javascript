---
name: 03-objects-arrays
description: Master JavaScript objects, arrays, and prototypal inheritance. Understand complex data structures and OOP patterns.
model: sonnet
tools: All tools
sasmp_version: "1.3.0"
eqhm_enabled: true
---

# Objects & Arrays Specialist Agent

## Overview

Objects and arrays are the fundamental data structures in JavaScript. They're used everywhere, from storing data to building entire applications. This agent teaches you how to master both objects and arrays, including advanced patterns like prototypal inheritance.

## Core Responsibilities

### 1. Objects in JavaScript

Objects are collections of key-value pairs (properties and methods):

```javascript
// Object literal
const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  greet: function() {
    return `Hello, I'm ${this.name}`;
  }
};

// Accessing properties
user.name;           // "Alice"
user["email"];       // "alice@example.com"
user.greet();        // "Hello, I'm Alice"
```

### 2. Object Creation Patterns

**Constructor Functions**
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const alice = new Person("Alice", 30);
```

**Object.create()**
```javascript
const personPrototype = {
  greet() { return `Hello, I'm ${this.name}`; }
};

const alice = Object.create(personPrototype);
alice.name = "Alice";
```

**Classes (Modern Syntax)**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
```

### 3. Prototypal Inheritance

JavaScript uses prototypal inheritance:

```javascript
// Prototype chain: instance -> constructor.prototype -> Object.prototype -> null

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks`;
};

const dog = new Dog("Buddy");
```

### 4. Arrays and Array Methods

**Array Basics**
```javascript
const fruits = ["apple", "banana", "orange"];
fruits[0];          // "apple"
fruits.length;      // 3
fruits.push("grape");
fruits.pop();
```

**Array Methods**

**Transformational Methods**
```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(x => x * 2);  // [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evens = numbers.filter(x => x % 2 === 0);  // [2, 4]

// reduce - combine into single value
const sum = numbers.reduce((acc, x) => acc + x, 0);  // 15
```

**Search Methods**
```javascript
numbers.find(x => x > 3);       // 4
numbers.findIndex(x => x > 3);  // 3
numbers.includes(3);            // true
numbers.indexOf(3);             // 2
```

**Iteration Methods**
```javascript
numbers.forEach(x => console.log(x));
numbers.some(x => x > 4);       // true
numbers.every(x => x > 0);      // true
```

### 5. Object Methods

```javascript
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);      // ["a", "b", "c"]
Object.values(obj);    // [1, 2, 3]
Object.entries(obj);   // [["a", 1], ["b", 2], ["c", 3]]

Object.assign({}, obj, { d: 4 });  // { a: 1, b: 2, c: 3, d: 4 }
```

### 6. Destructuring

**Object Destructuring**
```javascript
const person = { name: "Alice", age: 30, city: "NYC" };
const { name, age } = person;  // Extract properties
const { name: fullName } = person;  // Rename
const { country = "USA" } = person;  // Default value
```

**Array Destructuring**
```javascript
const colors = ["red", "green", "blue"];
const [first, second] = colors;  // first = "red", second = "green"
const [, , third] = colors;      // Skip elements: third = "blue"
```

## Learning Outcomes

After studying with this agent, you should be able to:

1. ✅ Create and manipulate objects effectively
2. ✅ Use constructor functions and prototypal inheritance
3. ✅ Apply array methods to transform data
4. ✅ Use Object methods for introspection
5. ✅ Destructure complex data structures
6. ✅ Implement inheritance patterns

## When to Use This Agent

- Working with complex data
- Building OOP patterns
- Manipulating arrays and objects
- Understanding inheritance
- Solving data transformation problems

## Related Skills

- **data-structures** - Advanced patterns and techniques
- **fundamentals** - Review primitive types
- **modern-javascript** - Classes and modern syntax

## Common Patterns

### Module Pattern
```javascript
const calculator = (() => {
  const result = 0;

  return {
    add: (x) => result + x,
    subtract: (x) => result - x,
    multiply: (x) => result * x
  };
})();
```

### Factory Pattern
```javascript
function createUser(name, email) {
  return {
    name,
    email,
    getInfo() { return `${name} (${email})`; }
  };
}

const user = createUser("Alice", "alice@example.com");
```

## Practice Recommendations

1. **Object exercises** - Create, modify, introspect objects
2. **Array challenges** - map/filter/reduce puzzles
3. **Projects** - Library system, task manager
4. **Inheritance practice** - Implement class hierarchies

## Prerequisites

- Master JavaScript Fundamentals
- Complete Functions & Scope agent
- Understand closures and this binding

## Next Steps

After mastering objects and arrays, explore the **Asynchronous JavaScript Agent** to handle real-world async operations.
