# Async/Await Complete Guide

> Master asynchronous JavaScript for production applications

## Quick Reference

```javascript
// Basic async function
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// Error handling
async function safeFetch() {
  try {
    const data = await fetchData();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Parallel execution
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
```

---

## Understanding the Event Loop

```
┌─────────────────────────────────────────────────┐
│                  Call Stack                      │
│         (Synchronous code execution)            │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│              Microtask Queue                    │
│    (Promise callbacks, queueMicrotask)          │
│         ⚡ Highest priority                     │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│               Task Queue                        │
│   (setTimeout, setInterval, I/O callbacks)      │
│         📋 Lower priority                       │
└─────────────────────────────────────────────────┘
```

### Execution Order Example

```javascript
console.log('1. Sync');

setTimeout(() => console.log('4. Timeout'), 0);

Promise.resolve().then(() => console.log('3. Microtask'));

console.log('2. Sync');

// Output: 1, 2, 3, 4
// Microtasks always run before timeout callbacks
```

---

## Async Function Patterns

### Basic Pattern

```javascript
// Declaration
async function getData() {
  return 'data';  // Automatically wrapped in Promise
}

// Arrow function
const getData = async () => {
  return 'data';
};

// Method
const obj = {
  async getData() {
    return 'data';
  }
};

// Class method
class DataService {
  async getData() {
    return 'data';
  }
}
```

### Return Values

```javascript
// These are equivalent:
async function fn1() {
  return 'value';
}

async function fn2() {
  return Promise.resolve('value');
}

// Both return Promise<string>
```

---

## Error Handling Strategies

### 1. Try/Catch (Recommended)

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;  // Re-throw or handle
  } finally {
    // Always runs
    cleanup();
  }
}
```

### 2. Catch at Call Site

```javascript
async function riskyOperation() {
  // May throw
  return await externalAPI();
}

// Handle at call site
riskyOperation()
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Or with await
try {
  const result = await riskyOperation();
} catch (error) {
  handleError(error);
}
```

### 3. Go-Style Error Handling

```javascript
// Wrapper function
async function safe(promise) {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error, null];
  }
}

// Usage
const [error, user] = await safe(fetchUser(123));

if (error) {
  console.error('Failed:', error);
} else {
  console.log('User:', user);
}
```

### 4. Error Boundaries (React Pattern)

```javascript
class AsyncBoundary {
  constructor() {
    this.errors = [];
  }

  async run(fn) {
    try {
      return await fn();
    } catch (error) {
      this.errors.push(error);
      return null;
    }
  }

  hasErrors() {
    return this.errors.length > 0;
  }
}

// Usage
const boundary = new AsyncBoundary();
const user = await boundary.run(() => fetchUser(1));
const posts = await boundary.run(() => fetchPosts(1));

if (boundary.hasErrors()) {
  handleErrors(boundary.errors);
}
```

---

## Parallel vs Sequential Execution

### Sequential (Slow)

```javascript
// ❌ BAD - Each await blocks the next
async function sequential() {
  const users = await fetchUsers();     // Wait...
  const posts = await fetchPosts();     // Then wait...
  const comments = await fetchComments(); // Then wait...

  return { users, posts, comments };
}
// Total time: T(users) + T(posts) + T(comments)
```

### Parallel (Fast)

```javascript
// ✅ GOOD - All requests start immediately
async function parallel() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);

  return { users, posts, comments };
}
// Total time: max(T(users), T(posts), T(comments))
```

### Parallel with Error Handling

```javascript
// Promise.all fails fast - one rejection fails all
async function parallelFailFast() {
  try {
    const results = await Promise.all([
      fetchUsers(),
      fetchPosts()
    ]);
    return results;
  } catch (error) {
    // First rejection caught
    throw error;
  }
}

// Promise.allSettled - always get all results
async function parallelAllResults() {
  const results = await Promise.allSettled([
    fetchUsers(),
    fetchPosts()
  ]);

  const successes = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);

  const failures = results
    .filter(r => r.status === 'rejected')
    .map(r => r.reason);

  return { successes, failures };
}
```

---

## Controlled Concurrency

### Batch Processing

```javascript
async function batchProcess(items, batchSize, processor) {
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);

    // Optional: Progress callback
    console.log(`Processed ${Math.min(i + batchSize, items.length)}/${items.length}`);
  }

  return results;
}

// Usage: Process 100 items, 10 at a time
const results = await batchProcess(items, 10, async (item) => {
  return await processItem(item);
});
```

### Concurrency Pool

```javascript
async function parallelLimit(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const promise = Promise.resolve().then(() => task());
    results.push(promise);
    executing.add(promise);

    const cleanup = () => executing.delete(promise);
    promise.then(cleanup, cleanup);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// Usage: Max 3 concurrent requests
const tasks = urls.map(url => () => fetch(url));
const responses = await parallelLimit(tasks, 3);
```

---

## Common Patterns

### Retry with Backoff

```javascript
async function retry(fn, options = {}) {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    factor = 2,
    shouldRetry = () => true
  } = options;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      const delay = Math.min(
        baseDelay * Math.pow(factor, attempt - 1),
        maxDelay
      );

      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms`);
      await sleep(delay);
    }
  }

  throw lastError;
}

// Usage
const data = await retry(
  () => fetchFromUnreliableAPI(),
  {
    maxAttempts: 5,
    baseDelay: 1000,
    shouldRetry: (error) => error.status !== 404
  }
);
```

### Timeout Wrapper

```javascript
function withTimeout(promise, ms, message = 'Operation timed out') {
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(message));
    }, ms);
  });

  return Promise.race([promise, timeout]);
}

// Usage
try {
  const data = await withTimeout(
    fetch('/api/slow-endpoint'),
    5000,
    'API request timed out after 5 seconds'
  );
} catch (error) {
  if (error.message.includes('timed out')) {
    // Handle timeout
  }
}
```

### Debounce Async

```javascript
function debounceAsync(fn, delay) {
  let timeoutId;
  let pendingPromise = null;

  return function (...args) {
    // Cancel previous
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Return new promise
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn.apply(this, args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

// Usage: Debounced search
const debouncedSearch = debounceAsync(async (query) => {
  const response = await fetch(`/api/search?q=${query}`);
  return response.json();
}, 300);

// Only last call within 300ms executes
input.addEventListener('input', async (e) => {
  const results = await debouncedSearch(e.target.value);
  displayResults(results);
});
```

### Polling

```javascript
async function poll(fn, options = {}) {
  const {
    interval = 1000,
    timeout = 30000,
    validate = (result) => result !== null
  } = options;

  const startTime = Date.now();

  while (true) {
    const result = await fn();

    if (validate(result)) {
      return result;
    }

    if (Date.now() - startTime >= timeout) {
      throw new Error('Polling timeout');
    }

    await sleep(interval);
  }
}

// Usage: Wait for job completion
const result = await poll(
  async () => {
    const status = await checkJobStatus(jobId);
    return status === 'completed' ? status : null;
  },
  { interval: 2000, timeout: 60000 }
);
```

---

## Async Iteration

### for await...of

```javascript
async function* generateNumbers() {
  for (let i = 1; i <= 5; i++) {
    await sleep(1000);
    yield i;
  }
}

// Consume async generator
for await (const num of generateNumbers()) {
  console.log(num);  // 1, 2, 3, 4, 5 (1 second apart)
}
```

### Async Iterator Pattern

```javascript
class AsyncQueue {
  constructor() {
    this.items = [];
    this.waiting = [];
  }

  push(item) {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve({ value: item, done: false });
    } else {
      this.items.push(item);
    }
  }

  async next() {
    if (this.items.length > 0) {
      return { value: this.items.shift(), done: false };
    }

    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }

  [Symbol.asyncIterator]() {
    return this;
  }
}

// Usage
const queue = new AsyncQueue();

// Producer
setTimeout(() => queue.push('a'), 100);
setTimeout(() => queue.push('b'), 200);

// Consumer
for await (const item of queue) {
  console.log(item);  // 'a', 'b', ...
}
```

---

## AbortController for Cancellation

```javascript
async function fetchWithAbort(url, options = {}) {
  const controller = new AbortController();
  const { timeout = 5000 } = options;

  // Auto-abort after timeout
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request was cancelled');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Manual cancellation
const controller = new AbortController();

const fetchPromise = fetch('/api/data', {
  signal: controller.signal
});

// Cancel after 2 seconds
setTimeout(() => controller.abort(), 2000);

try {
  const response = await fetchPromise;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Fetch was cancelled');
  }
}
```

---

## Common Pitfalls

### 1. Forgetting await

```javascript
// ❌ BAD - Returns Promise, not result
async function bad() {
  const data = fetchData();  // Missing await!
  console.log(data);  // Promise { <pending> }
}

// ✅ GOOD
async function good() {
  const data = await fetchData();
  console.log(data);  // Actual data
}
```

### 2. forEach Doesn't Wait

```javascript
// ❌ BAD - forEach doesn't await
async function bad(items) {
  items.forEach(async (item) => {
    await process(item);  // Doesn't wait!
  });
  console.log('Done');  // Runs immediately
}

// ✅ GOOD - Use for...of
async function good(items) {
  for (const item of items) {
    await process(item);
  }
  console.log('Done');  // Runs after all items
}

// ✅ GOOD - Use Promise.all for parallel
async function goodParallel(items) {
  await Promise.all(items.map(item => process(item)));
  console.log('Done');
}
```

### 3. Unhandled Rejections

```javascript
// ❌ BAD - Unhandled rejection
async function bad() {
  riskyOperation();  // No await, no catch
}

// ✅ GOOD
async function good() {
  try {
    await riskyOperation();
  } catch (error) {
    handleError(error);
  }
}

// Or at top level
riskyOperation().catch(handleError);
```

### 4. Sequential When Parallel Possible

```javascript
// ❌ SLOW - Sequential for independent operations
const user = await getUser(id);
const posts = await getPosts(id);
const comments = await getComments(id);

// ✅ FAST - Parallel for independent operations
const [user, posts, comments] = await Promise.all([
  getUser(id),
  getPosts(id),
  getComments(id)
]);
```

---

## Testing Async Code

### Jest Example

```javascript
// Testing async functions
describe('fetchUser', () => {
  test('returns user data', async () => {
    const user = await fetchUser(1);
    expect(user).toHaveProperty('name');
  });

  test('throws on invalid id', async () => {
    await expect(fetchUser(-1)).rejects.toThrow('Invalid ID');
  });

  test('handles timeout', async () => {
    jest.useFakeTimers();

    const promise = fetchWithTimeout(slowAPI, 1000);
    jest.advanceTimersByTime(1001);

    await expect(promise).rejects.toThrow('timeout');

    jest.useRealTimers();
  });
});
```

---

## Best Practices Summary

| Practice | Description |
|----------|-------------|
| **Always handle errors** | Use try/catch or .catch() |
| **Parallel when possible** | Use Promise.all for independent operations |
| **Use for...of** | Not forEach for async iteration |
| **Add timeouts** | Prevent hanging on slow operations |
| **Implement retry** | For unreliable external services |
| **Use AbortController** | For cancellable operations |
| **Avoid callback mixing** | Stick to async/await or Promises |
| **Test edge cases** | Timeouts, rejections, race conditions |

---

**Author:** Dr. Umit Kacar & Muhsin Elcicek
**Version:** 1.0.0
**Last Updated:** December 2025
