---
name: fundamentals
description: Core JavaScript fundamentals including variables, data types, operators, control flow, and basic syntax. Essential foundation for all JavaScript development.
---

# JavaScript Fundamentals Skill

## Quick Start

JavaScript has 8 data types: 7 primitives (string, number, boolean, null, undefined, symbol, bigint) and 1 object type.

```javascript
// Variables
const x = 10;           // constant
let y = 20;             // reassignable
var z = 30;             // function scoped (avoid)

// Data types
const str = "hello";    // string
const num = 42;         // number
const bool = true;      // boolean
const obj = {};         // object
const arr = [];         // array (object)
const fn = () => {};    // function (object)
```

## Variables and Data Types

### Variable Declaration

```javascript
// const - preferred choice
const PI = 3.14159;
// PI = 3.14;  // Error: assignment to constant

// let - for reassignable variables
let count = 0;
count = 1;  // OK

// var - old way, function scoped
var name = "Alice";  // Avoid in modern code
```

### Primitive Data Types

```javascript
// String
const message = "Hello";
const template = `Hello, ${name}!`;

// Number (includes Infinity, NaN)
const integer = 42;
const decimal = 3.14;
const infinity = Infinity;
const notANumber = NaN;

// Boolean
const isActive = true;
const isCompleted = false;

// Symbol
const unique = Symbol("id");

// BigInt (for large integers)
const big = 100n;

// undefined (uninitialized)
let x;
console.log(x);  // undefined

// null (intentional absence)
const empty = null;
```

### Type Checking

```javascript
typeof "hello"        // "string"
typeof 42             // "number"
typeof true           // "boolean"
typeof {}             // "object"
typeof []             // "object" (arrays are objects!)
typeof undefined      // "undefined"
typeof (() => {})     // "function"

// instanceof for objects
[] instanceof Array   // true
{} instanceof Object  // true
```

## Operators

### Arithmetic Operators

```javascript
10 + 5    // 15
10 - 5    // 5
10 * 5    // 50
10 / 5    // 2
10 % 3    // 1 (modulo)
2 ** 3    // 8 (exponentiation)
```

### Comparison Operators

```javascript
5 == "5"      // true (loose equality, coerces types)
5 === "5"     // false (strict equality)
5 != "5"      // false
5 !== "5"     // true
5 > 3         // true
5 >= 5        // true
5 < 10        // true
5 <= 5        // true
```

### Logical Operators

```javascript
true && true      // true (AND)
true || false     // true (OR)
!true             // false (NOT)

// Short-circuit evaluation
const name = userInput || "Guest";
const result = isValid && performAction();
```

### Assignment Operators

```javascript
let x = 5;
x += 3;   // x = x + 3 = 8
x -= 2;   // x = x - 2 = 6
x *= 2;   // x = x * 2 = 12
x /= 4;   // x = x / 4 = 3

// Increment/Decrement
let count = 0;
count++;  // 1
++count;  // 2
count--;  // 1
```

### Ternary Operator

```javascript
const age = 20;
const status = age >= 18 ? "adult" : "minor";

// Nested
const category = age < 13 ? "child" : age < 18 ? "teen" : "adult";
```

## Control Flow

### Conditional Statements

```javascript
// if statement
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: F");
}

// switch statement
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Weekend");
}
```

### Loops

```javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

// while loop
let x = 0;
while (x < 5) {
  console.log(x);
  x++;
}

// do...while (always runs at least once)
let y = 0;
do {
  console.log(y);
  y++;
} while (y < 5);

// for...of (iterate values)
const arr = [10, 20, 30];
for (const value of arr) {
  console.log(value);  // 10, 20, 30
}

// for...in (iterate keys)
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key);  // "a", "b"
}
```

### Break and Continue

```javascript
// break exits loop
for (let i = 0; i < 5; i++) {
  if (i === 3) break;
  console.log(i);  // 0, 1, 2
}

// continue skips iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);  // 0, 1, 3, 4
}
```

## Type Coercion

### Implicit Coercion

```javascript
// String concatenation
"5" + 3         // "53"
"5" - 3         // 2 (converts to numbers)
"5" * 2         // 10
"5" / 2         // 2.5

// Boolean to number
true + 1        // 2
false + 1       // 1
true - false    // 1

// Nullish values
null + 5        // 5
undefined + 5   // NaN

// Truthy and falsy
if ("hello") {}     // truthy
if ("") {}          // falsy
if (0) {}           // falsy
if (1) {}           // truthy
if (null) {}        // falsy
if (undefined) {}   // falsy
if (false) {}       // falsy
```

### Explicit Coercion

```javascript
// To string
String(123)           // "123"
(123).toString()      // "123"
123 + ""              // "123"

// To number
Number("123")         // 123
parseInt("123px")     // 123
parseFloat("3.14")    // 3.14
+"123"                // 123

// To boolean
Boolean(0)            // false
Boolean(1)            // true
!!0                   // false
!!1                   // true
```

## Error Handling

```javascript
try {
  // Code that might throw error
  throw new Error("Something went wrong");
} catch (error) {
  // Handle error
  console.error(error.message);
} finally {
  // Always executes
  console.log("Cleanup");
}
```

## Common Patterns

### Nullish Coalescing (??)

```javascript
const name = null ?? "Guest";  // "Guest"
const count = 0 ?? 10;         // 0 (0 is not nullish)
const age = undefined ?? 18;   // 18
```

### Optional Chaining (?.)

```javascript
const user = { name: "Alice", address: { city: "NYC" } };

user.address?.city;      // "NYC"
user.phone?.number;      // undefined (safe)
user.greet?.();          // undefined (safe function call)
```

## Debugging

```javascript
console.log("Message");     // Log value
console.warn("Warning");    // Warning message
console.error("Error");     // Error message
console.table({a: 1, b: 2});  // Table format

// Debugging
debugger;  // Set breakpoint
```

## Practice Exercises

1. Create variables for your name, age, and favorite color
2. Use operators to calculate your age in days
3. Use conditionals to create a grading system
4. Use loops to print multiplication tables
5. Write a function that checks if a number is prime

## Resources

- MDN: Data Types and Operators
- JavaScript.info: Variables and Basic Operators
- Exercism: JavaScript track

## Next Steps

- Move to the **Functions & Scope** skill
- Practice with coding challenges
- Build small projects using these fundamentals
