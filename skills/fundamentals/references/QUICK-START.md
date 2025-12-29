# JavaScript Fundamentals Quick Start Guide

> Master the essential building blocks of JavaScript in 30 minutes

## Table of Contents

1. [Variables](#variables)
2. [Data Types](#data-types)
3. [Operators](#operators)
4. [Control Flow](#control-flow)
5. [Common Patterns](#common-patterns)
6. [Debugging Tips](#debugging-tips)

---

## Variables

### The Three Declaration Keywords

```javascript
// CONST - Use for values that never change (default choice!)
const PI = 3.14159;
const config = { apiUrl: 'https://api.example.com' };

// LET - Use for values that will be reassigned
let counter = 0;
let currentUser = null;

// VAR - AVOID! Legacy syntax with confusing scoping
var oldStyle = 'deprecated';  // Don't use this
```

### Quick Rules

| Keyword | Scope | Reassignable | Hoisted | TDZ |
|---------|-------|--------------|---------|-----|
| `const` | Block | No | No | Yes |
| `let` | Block | Yes | No | Yes |
| `var` | Function | Yes | Yes | No |

### Best Practice

```javascript
// Start with const, change to let only if needed
const name = 'Alice';
const numbers = [1, 2, 3];  // Array contents can change!
numbers.push(4);  // OK - const protects reference, not contents

let count = 0;
count++;  // OK - we need to reassign
```

---

## Data Types

### 7 Primitive Types

```javascript
// 1. String
const message = "Hello, World!";
const template = `Hello, ${name}!`;  // Template literal

// 2. Number (includes decimals)
const integer = 42;
const decimal = 3.14;
const scientific = 1e10;

// 3. Boolean
const isActive = true;
const isComplete = false;

// 4. Null (intentional absence)
const empty = null;

// 5. Undefined (not yet assigned)
let pending;  // undefined
const obj = {};
console.log(obj.missing);  // undefined

// 6. Symbol (unique identifier)
const id = Symbol('uniqueId');

// 7. BigInt (large integers)
const huge = 9007199254740992n;
```

### Reference Types

```javascript
// Objects
const user = {
  name: 'Alice',
  age: 30,
  isAdmin: false
};

// Arrays (special objects)
const colors = ['red', 'green', 'blue'];

// Functions (also objects!)
const greet = (name) => `Hello, ${name}!`;
```

### Type Checking Cheatsheet

```javascript
typeof 'hello'      // 'string'
typeof 42           // 'number'
typeof true         // 'boolean'
typeof undefined    // 'undefined'
typeof null         // 'object' (historical bug!)
typeof {}           // 'object'
typeof []           // 'object' (use Array.isArray())
typeof function(){} // 'function'

Array.isArray([])   // true - best way to check arrays
```

---

## Operators

### Comparison (ALWAYS use ===)

```javascript
// Strict equality (recommended)
5 === 5      // true
5 === '5'    // false - different types

// Loose equality (avoid!)
5 == '5'     // true - type coercion happens

// Strict inequality
5 !== '5'    // true

// Comparisons
5 > 3        // true
5 >= 5       // true
5 < 10       // true
```

### Logical Operators

```javascript
// AND - both must be true
true && true   // true
true && false  // false

// OR - at least one must be true
true || false  // true
false || false // false

// NOT - inverts boolean
!true          // false
!false         // true

// Nullish Coalescing (ES2020)
const name = null ?? 'Guest';  // 'Guest'
const count = 0 ?? 10;         // 0 (0 is not null/undefined)

// Optional Chaining (ES2020)
const city = user?.address?.city;  // Safe access
```

### Short-Circuit Evaluation

```javascript
// Default values with OR
const name = userInput || 'Anonymous';

// Guard with AND
isValid && doSomething();

// Nullish coalescing for 0/empty string
const count = input ?? 0;  // Use ?? when 0 is valid
```

---

## Control Flow

### Conditionals

```javascript
// if/else
if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else {
  grade = 'F';
}

// Ternary (for simple conditions)
const status = age >= 18 ? 'adult' : 'minor';

// Switch (for multiple exact matches)
switch (day) {
  case 'Monday':
  case 'Tuesday':
    console.log('Weekday');
    break;
  default:
    console.log('Weekend');
}
```

### Loops

```javascript
// for loop (traditional)
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

// for...of (iterate values)
const arr = [10, 20, 30];
for (const value of arr) {
  console.log(value);  // 10, 20, 30
}

// for...in (iterate keys/indices)
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key);  // 'a', 'b'
}

// while
let x = 0;
while (x < 5) {
  console.log(x++);
}

// Array methods (preferred!)
arr.forEach(value => console.log(value));
arr.map(x => x * 2);
arr.filter(x => x > 10);
```

---

## Common Patterns

### Destructuring

```javascript
// Object destructuring
const { name, age } = user;
const { name: userName } = user;  // Rename

// Array destructuring
const [first, second] = [1, 2, 3];
const [head, ...rest] = [1, 2, 3];  // rest: [2, 3]

// With defaults
const { role = 'user' } = user;
```

### Spread Operator

```javascript
// Clone array
const copy = [...original];

// Merge arrays
const merged = [...arr1, ...arr2];

// Clone object
const clone = { ...original };

// Merge objects
const combined = { ...defaults, ...overrides };
```

### Modern Patterns

```javascript
// Object shorthand
const name = 'Alice';
const user = { name };  // Same as { name: name }

// Computed properties
const key = 'dynamicKey';
const obj = { [key]: 'value' };

// Default parameters
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}
```

---

## Debugging Tips

### Console Methods

```javascript
console.log('Basic output');
console.warn('Warning message');
console.error('Error message');
console.table([{a: 1}, {a: 2}]);  // Table format
console.time('timer');
// ... code ...
console.timeEnd('timer');  // Shows elapsed time
```

### Type Debugging

```javascript
// Check type
console.log(typeof value);
console.log(Array.isArray(value));
console.log(value instanceof Date);

// Detailed object inspection
console.dir(object, { depth: null });

// JSON for complex objects
console.log(JSON.stringify(obj, null, 2));
```

### Common Gotchas

```javascript
// 1. typeof null
typeof null === 'object'  // true (historical bug)

// 2. NaN comparison
NaN === NaN  // false!
Number.isNaN(NaN)  // true (correct way)

// 3. Floating point
0.1 + 0.2 === 0.3  // false!
Math.abs(0.1 + 0.2 - 0.3) < 0.0001  // true (correct way)

// 4. Array/Object comparison
[1, 2] === [1, 2]  // false (different references)
JSON.stringify([1,2]) === JSON.stringify([1,2])  // true
```

---

## Next Steps

1. **Practice**: Try the exercises in SKILL.md
2. **Functions**: Move to the functions-scope skill
3. **Objects**: Explore object-oriented patterns
4. **Async**: Learn promises and async/await

---

**Author:** Dr. Umit Kacar & Muhsin Elcicek
**Version:** 1.0.0
**Last Updated:** December 2025
