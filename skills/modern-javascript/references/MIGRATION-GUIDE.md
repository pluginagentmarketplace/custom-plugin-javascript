# ES5 to ES6+ Migration Guide

> Step-by-step guide to modernize JavaScript code

## Quick Migration Checklist

```markdown
□ Replace var with let/const
□ Convert functions to arrow functions (where appropriate)
□ Use template literals for string interpolation
□ Apply destructuring for objects and arrays
□ Use spread operator instead of .apply() and .concat()
□ Convert callbacks to Promises/async-await
□ Replace require with import/export
□ Use optional chaining (?.) and nullish coalescing (??)
```

---

## 1. var → let/const

```javascript
// ❌ ES5
var name = 'John';
var PI = 3.14159;

// ✅ ES6+
let name = 'John';      // Reassignable
const PI = 3.14159;     // Constant
```

## 2. Functions → Arrow

```javascript
// ❌ ES5
var add = function(a, b) { return a + b; };
numbers.map(function(n) { return n * 2; });

// ✅ ES6+
const add = (a, b) => a + b;
numbers.map(n => n * 2);
```

## 3. String Concatenation → Template Literals

```javascript
// ❌ ES5
var msg = 'Hello, ' + name + '!';

// ✅ ES6+
const msg = `Hello, ${name}!`;
```

## 4. Object/Array Destructuring

```javascript
// ❌ ES5
var name = user.name;
var first = arr[0];

// ✅ ES6+
const { name } = user;
const [first] = arr;
```

## 5. Spread & Rest

```javascript
// ❌ ES5
var combined = arr1.concat(arr2);
var copy = Object.assign({}, obj);

// ✅ ES6+
const combined = [...arr1, ...arr2];
const copy = { ...obj };
```

## 6. Async/Await

```javascript
// ❌ Callbacks/Promises
fetch(url).then(r => r.json()).then(data => {});

// ✅ ES2017
const response = await fetch(url);
const data = await response.json();
```

## 7. Optional Chaining & Nullish Coalescing

```javascript
// ❌ ES5
var city = user && user.address && user.address.city;
var count = userCount || 10;

// ✅ ES2020
const city = user?.address?.city;
const count = userCount ?? 10;
```

---

**Author:** Dr. Umit Kacar & Muhsin Elcicek
**Version:** 1.0.0
