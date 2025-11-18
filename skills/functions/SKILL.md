---
name: functions
description: Advanced function patterns including declaration styles, closures, scope chains, hoisting, and this binding. Master function composition and advanced techniques.
---

# Functions & Scope Skill

## Quick Start

Functions are reusable blocks of code. Master different declaration styles and understand how scope works:

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Calling functions
greet("Alice");      // "Hello, Alice!"
add(5, 3);          // 8
multiply(4, 5);     // 20
```

## Function Declaration vs Expression

### Function Declaration

```javascript
function sayHello() {
  return "Hello!";
}

// Can be called before declaration (hoisting)
console.log(sayHello());  // "Hello!"

function sayHello() {
  return "Hello!";
}
```

### Function Expression

```javascript
const sayHello = function() {
  return "Hello!";
};

// Cannot be called before assignment
// console.log(sayHello());  // Error!
const sayHello = function() {
  return "Hello!";
};
```

### Named Function Expression

```javascript
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);  // Can call itself
};

factorial(5);   // 120
// fact(5);     // Error: 'fact' not accessible outside
```

## Arrow Functions

```javascript
// Regular arrow function
const add = (a, b) => {
  return a + b;
};

// Concise arrow function (implicit return)
const add = (a, b) => a + b;

// Single parameter (optional parentheses)
const square = x => x * x;
const double = x => x * 2;

// No parameters
const getRandom = () => Math.random();

// Arrow functions don't have their own 'this'
const person = {
  name: "Alice",
  greet: function() {
    return () => `Hello, I'm ${this.name}`;  // 'this' from outer
  }
};

const greet = person.greet();
greet();  // "Hello, I'm Alice"
```

## Understanding Scope

### Global Scope

```javascript
const globalVar = "I'm global";

function showVar() {
  console.log(globalVar);  // Can access
}

showVar();  // "I'm global"
```

### Function Scope

```javascript
function outer() {
  const outerVar = "outer";

  function inner() {
    const innerVar = "inner";
    console.log(outerVar);  // Can access outer
    console.log(innerVar);  // Can access own
  }

  inner();
  // console.log(innerVar);  // Error: innerVar not accessible
}

outer();
```

### Block Scope (let/const)

```javascript
if (true) {
  const blockVar = "block";
  let blockLet = "let";
  console.log(blockVar);  // "block"
}

// console.log(blockVar);  // Error!
// console.log(blockLet);  // Error!

// var ignores block scope
if (true) {
  var globalLikeVar = "global-like";
}
console.log(globalLikeVar);  // "global-like"
```

## Closure

A closure is a function that has access to variables from its outer scope:

```javascript
// Simple closure
function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3

// Each counter has its own scope
const counter2 = createCounter();
console.log(counter2());  // 1
```

### Closure with Multiple Functions

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500));      // 1500
console.log(account.withdraw(200));     // 1300
console.log(account.getBalance());      // 1300
```

## Hoisting

### Function Declaration Hoisting

```javascript
console.log(greet("Alice"));  // "Hello, Alice!" (works!)

function greet(name) {
  return `Hello, ${name}!`;
}
```

### Variable Hoisting

```javascript
console.log(x);  // undefined (not ReferenceError)
var x = 5;
console.log(x);  // 5

// With let/const (Temporal Dead Zone)
// console.log(y);  // ReferenceError
let y = 10;
console.log(y);  // 10
```

## The 'this' Context

### this in Different Contexts

```javascript
// Global context
function showThis() {
  console.log(this);  // Window object (browser)
}

// Method context
const person = {
  name: "Alice",
  greet() {
    console.log(this);  // person object
    console.log(this.name);  // "Alice"
  }
};

person.greet();

// Constructor context
function Person(name) {
  this.name = name;
}

const alice = new Person("Alice");
console.log(alice.name);  // "Alice"
```

## Function Methods: call, apply, bind

```javascript
const person = {
  name: "Alice",
  greet(greeting) {
    return `${greeting}, ${this.name}!`;
  }
};

// call - invoke with specific 'this'
person.greet.call({ name: "Bob" }, "Hello");  // "Hello, Bob!"

// apply - like call, but array of args
person.greet.apply({ name: "Charlie" }, ["Hi"]);  // "Hi, Charlie!"

// bind - create new function with fixed 'this'
const greetBob = person.greet.bind({ name: "Bob" });
greetBob("Hey");  // "Hey, Bob!"
```

## Advanced Function Patterns

### Immediately Invoked Function Expression (IIFE)

```javascript
(function() {
  const privateVar = "private";
  console.log(privateVar);
})();

// console.log(privateVar);  // Error: not accessible
```

### Function Composition

```javascript
const compose = (f, g) => x => f(g(x));

const addOne = x => x + 1;
const double = x => x * 2;

const addOneThenDouble = compose(double, addOne);
addOneThenDouble(5);  // double(addOne(5)) = double(6) = 12
```

### Currying

```javascript
// Transform function to take args one at a time
const curry = (fn) => {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return (...nextArgs) => $curry(...args, ...nextArgs);
    }
    return fn(...args);
  };
};

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3);    // 6
curriedAdd(1, 2)(3);    // 6
```

### Memoization

```javascript
function memoize(fn) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveSum = (a, b) => {
  console.log("Computing...");
  return a + b;
};

const memoizedSum = memoize(expensiveSum);
memoizedSum(2, 3);  // "Computing..." → 5
memoizedSum(2, 3);  // 5 (from cache, no log)
```

## Practice Exercises

1. Create a closure that tracks how many times a function was called
2. Write a function that returns an object with methods that share private state
3. Implement a simple currying function
4. Create an IIFE that initializes application state

## Common Pitfalls

**1. Lost 'this' context**
```javascript
const obj = {
  name: "Alice",
  getGreeting: function() {
    return () => this.name;  // Use arrow function to capture 'this'
  }
};
```

**2. Callback hell**
```javascript
// Instead of nested callbacks, use promises or async/await
fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => renderPosts(posts))
  .catch(error => console.error(error));
```

## Resources

- MDN: Functions
- JavaScript.info: Functions
- Eloquent JavaScript: Functions chapter

## Next Steps

- Master closures through exercises
- Study scope chain deeply
- Learn callback functions
- Move to async patterns
