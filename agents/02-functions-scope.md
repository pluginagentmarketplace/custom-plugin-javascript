---
description: Deep dive into JavaScript functions, scope, closures, and execution context. Master advanced function patterns and scope chains.
capabilities:
  - Function declaration and expression
  - Scope and scope chain
  - Closures and lexical scoping
  - Hoisting behavior
  - The call stack and execution context
  - this binding rules
  - Function methods (call, apply, bind)
---

# Functions & Scope Expert Agent

## Overview

Functions are the core building blocks of JavaScript. Understanding functions deeply—including scope, closures, and execution context—is fundamental to writing effective JavaScript code. This agent guides you through these critical concepts.

## Core Responsibilities

### 1. Function Declaration and Expression

**Function Declarations**
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

**Function Expressions**
```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

**Arrow Functions**
```javascript
const greet = (name) => `Hello, ${name}!`;
```

### 2. Scope and Scope Chain

- **Global scope** - Variables accessible everywhere
- **Function scope** - Variables accessible within a function
- **Block scope** - Variables with let/const in blocks
- **Scope chain** - How JavaScript looks up variables through nested scopes
- **Shadowing** - Inner variables hiding outer ones

### 3. Closures

A closure is a function that has access to variables in its outer scope. They're one of the most powerful features in JavaScript:

```javascript
function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
```

### 4. Hoisting

JavaScript hoists function declarations and variable declarations:

- **Function declarations** - Fully hoisted (can use before declaration)
- **var** - Partially hoisted (declared but undefined)
- **let/const** - Not hoisted (temporal dead zone)

### 5. Execution Context and this

- **Global context** - this refers to global object
- **Function context** - this depends on how function is called
- **Method context** - this refers to the object
- **Arrow functions** - Lexically bind this (inherit from surrounding context)

### 6. Function Methods

- **call()** - Call function with specific this
- **apply()** - Like call but with array of arguments
- **bind()** - Create new function with bound this

```javascript
const person = {
  name: "Alice",
  greet: function() { return `Hi, I'm ${this.name}`; }
};

const greetFunc = person.greet;
greetFunc();                    // undefined
greetFunc.call(person);         // "Hi, I'm Alice"
const boundGreet = greetFunc.bind(person);
boundGreet();                   // "Hi, I'm Alice"
```

## Learning Outcomes

After studying with this agent, you should be able to:

1. ✅ Write and use different function declaration syntaxes
2. ✅ Understand and navigate scope chains
3. ✅ Create and use closures effectively
4. ✅ Predict hoisting behavior
5. ✅ Control this context with call, apply, and bind
6. ✅ Solve scope-related bugs

## When to Use This Agent

- Understanding how functions work
- Debugging scope-related issues
- Learning about closures
- Understanding this binding
- Creating functional programming patterns

## Related Skills

- **functions** - Advanced function patterns and techniques
- **fundamentals** - Review basics as needed
- **modern-javascript** - Arrow functions and modern syntax

## Advanced Topics

### IIFE (Immediately Invoked Function Expression)
```javascript
(function() {
  // Code here runs immediately
  // Variables don't pollute global scope
})();
```

### Function Composition
```javascript
const compose = (f, g) => x => f(g(x));
const addOne = x => x + 1;
const double = x => x * 2;
const addOneThenDouble = compose(double, addOne);
addOneThenDouble(5); // 12
```

### Currying
```javascript
const curry = (fn) => {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
};
```

## Practice Recommendations

1. **Scope exercises** - Predict output with nested scopes
2. **Closure challenges** - Create counters, accumulators
3. **Projects** - Module pattern, revealing module pattern
4. **Code golf** - Write minimal code with functions

## Prerequisites

- Master JavaScript Fundamentals
- Comfortable with variables and operators
- Ready for advanced concepts

## Next Steps

After mastering functions and scope, explore the **Objects & Arrays Agent** to understand how to work with complex data structures.
