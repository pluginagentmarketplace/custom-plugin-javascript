# JavaScript Closures: The Complete Guide

> Understanding closures is essential for mastering JavaScript

## What is a Closure?

A **closure** is a function that "remembers" variables from its outer (enclosing) scope, even after that scope has finished executing.

```javascript
function outer() {
  const secret = 'I am a secret';

  return function inner() {
    return secret;  // inner "closes over" secret
  };
}

const getSecret = outer();
console.log(getSecret());  // 'I am a secret'
// outer() has finished, but inner still has access to 'secret'
```

---

## How Closures Work

### The Scope Chain

When a function is created, it saves a reference to its **lexical environment** (the scope where it was defined):

```
                    ┌─────────────────┐
                    │  Global Scope   │
                    │  • outer = fn   │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │  outer() Scope  │
                    │  • secret = '...'│
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │  inner() Scope  │
                    │  (closes over   │
                    │   outer scope)  │
                    └─────────────────┘
```

### Memory Model

```javascript
function createMultiplier(multiplier) {
  // 'multiplier' is captured in closure
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

// Each closure has its own captured 'multiplier'
double(5);  // 10 (multiplier = 2)
triple(5);  // 15 (multiplier = 3)
```

---

## Common Closure Patterns

### 1. Private Variables (Data Encapsulation)

```javascript
function createBankAccount(initialBalance) {
  // Private variable - cannot be accessed directly
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited $${amount}. Balance: $${balance}`;
      }
      return 'Invalid amount';
    },

    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `Withdrew $${amount}. Balance: $${balance}`;
      }
      return 'Insufficient funds or invalid amount';
    },

    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);    // "Deposited $50. Balance: $150"
account.withdraw(30);   // "Withdrew $30. Balance: $120"
account.getBalance();   // 120
account.balance;        // undefined (private!)
```

### 2. Function Factories

```javascript
function createLogger(prefix) {
  return function(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${prefix}: ${message}`);
  };
}

const infoLog = createLogger('INFO');
const errorLog = createLogger('ERROR');
const debugLog = createLogger('DEBUG');

infoLog('Application started');
// [2025-01-15T10:30:00.000Z] INFO: Application started

errorLog('Connection failed');
// [2025-01-15T10:30:01.000Z] ERROR: Connection failed
```

### 3. Memoization (Caching)

```javascript
function memoize(fn) {
  const cache = new Map();  // Closed over by returned function

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }

    console.log('Computing...');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: Expensive fibonacci calculation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);
memoizedFib(40);  // Computing... (slow first time)
memoizedFib(40);  // Cache hit! (instant)
```

### 4. Event Handlers

```javascript
function setupCounter(buttonId) {
  let count = 0;  // Closed over by click handler

  const button = document.getElementById(buttonId);

  button.addEventListener('click', function() {
    count++;
    button.textContent = `Clicked ${count} times`;
  });
}

setupCounter('myButton');
// Each click increments the private 'count' variable
```

### 5. Module Pattern (IIFE)

```javascript
const Calculator = (function() {
  // Private variables and functions
  let result = 0;

  function validate(num) {
    return typeof num === 'number' && !isNaN(num);
  }

  // Public interface
  return {
    add(num) {
      if (validate(num)) result += num;
      return this;
    },
    subtract(num) {
      if (validate(num)) result -= num;
      return this;
    },
    multiply(num) {
      if (validate(num)) result *= num;
      return this;
    },
    getResult() {
      return result;
    },
    reset() {
      result = 0;
      return this;
    }
  };
})();

Calculator.add(10).multiply(2).subtract(5).getResult();  // 15
```

### 6. Currying with Closures

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Return new function that closes over current args
    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
curriedAdd(1)(2)(3);     // 6
curriedAdd(1, 2)(3);     // 6
curriedAdd(1)(2, 3);     // 6
curriedAdd(1, 2, 3);     // 6
```

---

## Common Pitfalls

### 1. Loop Variable Closure Bug

```javascript
// WRONG - Classic closure bug
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // All print 3!
  }, 100);
}

// FIX 1: Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // 0, 1, 2
  }, 100);
}

// FIX 2: Create new scope with IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);  // 0, 1, 2
    }, 100);
  })(i);
}
```

### 2. Memory Leaks

```javascript
// WRONG - Closure keeps large object alive
function createHandler(largeData) {
  // largeData is captured even if not used
  return function() {
    // ... does something that doesn't use largeData
  };
}

// FIX - Only capture what you need
function createHandler(largeData) {
  const neededValue = largeData.specificProperty;
  return function() {
    console.log(neededValue);
  };
}
```

### 3. Accidental Shared State

```javascript
// WRONG - All functions share the same 'handlers' array
function EventEmitter() {
  const handlers = [];

  return {
    on: (handler) => handlers.push(handler),
    emit: () => handlers.forEach(h => h()),
    clear: () => handlers.length = 0  // Affects all instances!
  };
}

// FIX - Use constructor pattern
function EventEmitter() {
  this.handlers = [];
}

EventEmitter.prototype.on = function(handler) {
  this.handlers.push(handler);
};
```

---

## Performance Considerations

### When Closures are Efficient

```javascript
// Good: Reusing shared logic
function createValidator(rules) {
  // Rules parsed once, reused many times
  const parsedRules = parseRules(rules);

  return function(data) {
    return validate(data, parsedRules);
  };
}
```

### When to Avoid Closures

```javascript
// Unnecessary closure - creates new function each time
function processItems(items) {
  return items.map(item => {
    return function() {  // New closure for each item
      return item * 2;
    };
  });
}

// Better - use direct values
function processItems(items) {
  return items.map(item => item * 2);
}
```

---

## Debugging Closures

### In Chrome DevTools

1. Set a breakpoint inside the inner function
2. Look at the "Scope" panel in Sources tab
3. You'll see "Closure" section with captured variables

```javascript
function outer() {
  const x = 10;
  const y = 20;

  return function inner() {
    debugger;  // Set breakpoint here
    return x + y;
  };
}

outer()();  // Inspect closure in DevTools
```

### Inspecting Closure Variables

```javascript
// Use console.dir to see closure scope
const fn = outer();
console.dir(fn);  // Shows [[Scopes]] with closure variables
```

---

## Real-World Applications

| Pattern | Use Case |
|---------|----------|
| Private state | Data encapsulation, module pattern |
| Factory functions | Creating specialized functions |
| Memoization | Caching expensive computations |
| Event handlers | Maintaining state across events |
| Partial application | Pre-configuring function arguments |
| Decorators | Wrapping functions with additional behavior |
| Async patterns | Maintaining context in callbacks |

---

## Summary

1. **Closures** = Function + its lexical environment
2. **Created** when inner function references outer scope
3. **Persist** even after outer function returns
4. **Use for**: Data privacy, factories, memoization
5. **Beware**: Memory leaks, loop bugs, shared state

---

**Author:** Dr. Umit Kacar & Muhsin Elcicek
**Version:** 1.0.0
**Last Updated:** December 2025
