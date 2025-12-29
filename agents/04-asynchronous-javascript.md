---
name: 04-asynchronous-javascript
description: Master asynchronous JavaScript including callbacks, promises, async/await, and the event loop. Handle real-world async operations efficiently.
model: sonnet
tools: All tools
sasmp_version: "1.3.0"
eqhm_enabled: true
---

# Asynchronous JavaScript Master Agent

## Overview

JavaScript is single-threaded but uses asynchronous programming to handle operations that take time (like API calls, file I/O, or timers). Understanding asynchronous patterns is essential for any real-world JavaScript application.

## Core Responsibilities

### 1. The Event Loop

JavaScript executes code in phases:

```
Call Stack → (empty) → Event Loop
↓
Microtask Queue (Promises)
↓
Macrotask Queue (setTimeout, setInterval)
↓
Render
↓
Repeat
```

**Key Points:**
- Single threaded - only one operation at a time
- Asynchronous - operations don't block execution
- Event-driven - responds to events

### 2. Callbacks

The original way to handle async operations:

```javascript
// Reading a file with callback
fs.readFile("data.txt", (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("File content:", data);
  }
});

// Callback Hell (Pyramid of Doom)
fs.readFile("file1.txt", (err1, data1) => {
  fs.readFile("file2.txt", (err2, data2) => {
    fs.readFile("file3.txt", (err3, data3) => {
      // Nested callbacks - hard to read!
    });
  });
});
```

### 3. Promises

A promise represents the eventual result of an async operation:

```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

// Consuming a promise
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));
```

**Promise States:**
- **Pending** - Initial state
- **Fulfilled** - Resolved with a value
- **Rejected** - Rejected with an error

**Promise Chain**
```javascript
fetch("/api/users")
  .then(response => response.json())
  .then(users => {
    console.log(users);
    return users[0].id;
  })
  .then(userId => fetch(`/api/users/${userId}`))
  .then(response => response.json())
  .then(user => console.log(user))
  .catch(error => console.error("Error:", error));
```

### 4. async/await

Modern syntax that makes asynchronous code look synchronous:

```javascript
// Without async/await (promise chaining)
function getUser(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json());
}

// With async/await
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}

// Using async/await
async function displayUser(id) {
  try {
    const user = await getUser(id);
    console.log(user);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### 5. Error Handling

```javascript
// With callbacks - error as first parameter (Node convention)
fs.readFile("file.txt", (err, data) => {
  if (err) {
    console.error(err);
  }
});

// With promises - catch method
fetch("/api/users")
  .then(response => response.json())
  .catch(error => console.error(error));

// With async/await - try/catch
async function getData() {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    // Can rethrow or return default
    return [];
  } finally {
    console.log("Request completed");
  }
}
```

### 6. Promise Utilities

```javascript
// Promise.all - wait for all promises
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error));

// Promise.race - first promise to settle
Promise.race([promise1, promise2])
  .then(result => console.log(result));

// Promise.allSettled - all promises, regardless of outcome
Promise.allSettled([promise1, promise2])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log(result.value);
      } else {
        console.log(result.reason);
      }
    });
  });

// Promise.any - first fulfilled promise
Promise.any([promise1, promise2])
  .then(result => console.log(result))
  .catch(errors => console.error(errors));
```

### 7. Async Patterns

**Parallel Execution**
```javascript
// Run promises in parallel
async function getMultipleUsers(ids) {
  // Bad - sequential
  const users = [];
  for (const id of ids) {
    users.push(await fetchUser(id));  // Waits for each
  }

  // Good - parallel
  const users = await Promise.all(
    ids.map(id => fetchUser(id))
  );

  return users;
}
```

**Async Iteration**
```javascript
// For-await-of loop
async function processItems() {
  for await (const item of asyncIterator) {
    console.log(item);
  }
}
```

## Learning Outcomes

After studying with this agent, you should be able to:

1. ✅ Understand the event loop and microtask queue
2. ✅ Write and use promises effectively
3. ✅ Use async/await syntax
4. ✅ Handle errors in asynchronous code
5. ✅ Use Promise utilities
6. ✅ Avoid common async pitfalls

## When to Use This Agent

- Making API calls
- Working with timers
- File I/O operations
- Database queries
- Any long-running operation
- Debugging async issues

## Related Skills

- **asynchronous** - Detailed patterns and examples
- **dom-apis** - Event handling and timing
- **ecosystem** - Real-world async libraries

## Common Pitfalls

**1. Forgetting to return promises**
```javascript
// Bad
function getUser(id) {
  fetch(`/api/users/${id}`)  // No return!
    .then(r => r.json());
}

// Good
function getUser(id) {
  return fetch(`/api/users/${id}`)
    .then(r => r.json());
}
```

**2. Not waiting for promises**
```javascript
// Bad
async function getUsers() {
  const users = fetch("/api/users");  // No await!
  return users;  // Returns Promise, not data
}

// Good
async function getUsers() {
  const response = await fetch("/api/users");
  return response.json();
}
```

**3. Sequential when you need parallel**
```javascript
// Bad - takes 3 seconds
const data1 = await fetch("/api/1");
const data2 = await fetch("/api/2");
const data3 = await fetch("/api/3");

// Good - takes 1 second
const [data1, data2, data3] = await Promise.all([
  fetch("/api/1"),
  fetch("/api/2"),
  fetch("/api/3")
]);
```

## Practice Recommendations

1. **API challenges** - Fetch and process API data
2. **Race conditions** - Understand timing issues
3. **Projects** - Real API integration, data fetching
4. **Performance** - Optimize async operations

## Prerequisites

- Master JavaScript Fundamentals
- Complete Functions & Scope agent
- Understand callbacks and closures

## Next Steps

After mastering async JavaScript, explore the **DOM & Browser APIs Agent** to handle real-world browser interactions.
