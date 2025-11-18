---
name: asynchronous
description: Master asynchronous JavaScript patterns including callbacks, promises, async/await, event loop mechanics, and real-world async patterns.
---

# Asynchronous JavaScript Skill

## Quick Start

Asynchronous code runs without blocking execution. Master three main patterns:

```javascript
// Callbacks (original approach)
function fetchUser(id, callback) {
  setTimeout(() => {
    callback({ id, name: "Alice" });
  }, 1000);
}

// Promises (better)
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve({ id: 1, name: "Alice" }), 1000);
});

// async/await (best)
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

## Understanding the Event Loop

JavaScript is single-threaded but handles async via event loop:

```
1. Execute Call Stack
2. Check Microtask Queue (Promises)
3. Check Macrotask Queue (setTimeout)
4. Render
5. Repeat
```

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");  // Macrotask (3rd)
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise");  // Microtask (2nd)
  });

console.log("End");  // Call stack (1st)

// Output:
// Start
// End
// Promise
// Timeout
```

## Callbacks

Original async pattern (now less preferred):

```javascript
// Reading a file
fs.readFile("data.txt", (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Data:", data);
  }
});

// Callback hell (nested callbacks)
fs.readFile("file1.txt", (err1, data1) => {
  if (err1) {
    console.error(err1);
  } else {
    fs.readFile("file2.txt", (err2, data2) => {
      if (err2) {
        console.error(err2);
      } else {
        // Deeply nested!
        console.log(data1, data2);
      }
    });
  }
});
```

## Promises

Better async pattern with better error handling:

```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Success!");
  } else {
    reject(new Error("Failed!"));
  }
});

// Consuming promise
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));

// Promise chain
fetch("/api/users")
  .then(response => response.json())
  .then(users => {
    console.log("Users:", users);
    return users[0].id;
  })
  .then(userId => fetch(`/api/users/${userId}/posts`))
  .then(response => response.json())
  .then(posts => console.log("Posts:", posts))
  .catch(error => console.error("Error:", error));
```

### Promise States

```javascript
// Pending → Fulfilled
const p1 = Promise.resolve("Success");

// Pending → Rejected
const p2 = Promise.reject(new Error("Failed"));

// Custom promise
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done after 1 second");
  }, 1000);
});
```

## async/await

Modern syntax that makes async code look synchronous:

```javascript
// Basic async function
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user;
}

// Using async function
const user = await getUser(1);
console.log(user);

// Error handling with try/catch
async function getAndProcessUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error:", error);
    return null;
  } finally {
    console.log("Request completed");
  }
}

// Parallel execution with async/await
async function getMultipleUsers(ids) {
  // Bad - sequential (slow)
  const users = [];
  for (const id of ids) {
    users.push(await getUser(id));  // Waits for each
  }

  // Good - parallel (fast)
  const users = await Promise.all(
    ids.map(id => getUser(id))
  );

  return users;
}
```

## Promise Utilities

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

// Promise.all - wait for all, reject if any fails
Promise.all([p1, p2, p3])
  .then(results => console.log(results));  // [1, 2, 3]

// Promise.race - return first settled
Promise.race([p1, p2, p3])
  .then(result => console.log(result));    // 1

// Promise.allSettled - all results, no rejection
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log(`${i}: ${result.value}`);
      }
    });
  });

// Promise.any - first fulfilled (v13+)
Promise.any([p1, p2, p3])
  .then(result => console.log(result))
  .catch(errors => console.log(errors));
```

## Async Iteration

```javascript
// Async iterator
async function* generateUsers() {
  for (let i = 1; i <= 3; i++) {
    const response = await fetch(`/api/users/${i}`);
    yield response.json();
  }
}

// Using async iterator
for await (const user of generateUsers()) {
  console.log(user);
}

// Creating async iterable
const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    for (let i = 1; i <= 3; i++) {
      yield i;
    }
  }
};

for await (const value of asyncIterable) {
  console.log(value);  // 1, 2, 3
}
```

## Real-World Patterns

### API Fetching Pattern

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      // Exponential backoff
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
}
```

### Timeout Pattern

```javascript
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);
}

// Usage
const data = await timeout(fetchUser(1), 5000);
```

### Sequential Operations

```javascript
async function processSequentially(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  return results;
}
```

### Parallel Operations

```javascript
async function processParallel(items) {
  return Promise.all(items.map(item => processItem(item)));
}
```

## Common Patterns & Pitfalls

### 1. Forgetting await

```javascript
// Bad - returns Promise
async function getUser(id) {
  const response = fetch(`/api/users/${id}`);  // No await!
  return response.json();  // Returns Promise
}

// Good
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### 2. Sequential instead of parallel

```javascript
// Bad - 3 seconds
const user = await getUser(1);
const posts = await getPosts(1);
const comments = await getComments(1);

// Good - 1 second
const [user, posts, comments] = await Promise.all([
  getUser(1),
  getPosts(1),
  getComments(1)
]);
```

### 3. Not handling rejections

```javascript
// Bad - unhandled rejection
promise.then(result => console.log(result));

// Good
promise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Or with async/await
try {
  const result = await promise;
  console.log(result);
} catch (error) {
  console.error(error);
}
```

## Practice Exercises

1. Chain promises to process data in sequence
2. Create parallel Promise.all operations
3. Handle errors with try/catch
4. Implement retry logic with exponential backoff
5. Use async/await for API integration

## Resources

- MDN: Promise
- MDN: async/await
- JavaScript.info: Promise
- JavaScript.info: async/await

## Next Steps

- Practice with real APIs
- Master error handling
- Learn reactive libraries
- Study performance optimization
