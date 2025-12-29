#!/usr/bin/env node

/**
 * JavaScript Promise Utilities
 * Useful async patterns and helpers for production use
 *
 * @author Dr. Umit Kacar & Muhsin Elcicek
 * @version 1.0.0
 */

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Add timeout to any promise
 * @param {Promise} promise - Promise to add timeout to
 * @param {number} ms - Timeout in milliseconds
 * @param {string} message - Custom timeout message
 * @returns {Promise}
 */
function withTimeout(promise, ms, message = 'Operation timed out') {
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(message));
    }, ms);
  });

  return Promise.race([promise, timeout]);
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {Object} options - Retry options
 * @returns {Promise}
 */
async function retry(fn, options = {}) {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    factor = 2,
    onRetry = () => {}
  } = options;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        throw lastError;
      }

      const delay = Math.min(baseDelay * Math.pow(factor, attempt - 1), maxDelay);
      onRetry({ attempt, delay, error });

      await sleep(delay);
    }
  }

  throw lastError;
}

/**
 * Run promises in parallel with concurrency limit
 * @param {Array<Function>} tasks - Array of async functions
 * @param {number} limit - Maximum concurrent tasks
 * @returns {Promise<Array>}
 */
async function parallelLimit(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const [index, task] of tasks.entries()) {
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

/**
 * Run promises in batches
 * @param {Array<Function>} tasks - Array of async functions
 * @param {number} batchSize - Size of each batch
 * @returns {Promise<Array>}
 */
async function batchProcess(tasks, batchSize) {
  const results = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn => fn()));
    results.push(...batchResults);
  }

  return results;
}

/**
 * Sequential promise execution
 * @param {Array<Function>} tasks - Array of async functions
 * @returns {Promise<Array>}
 */
async function sequential(tasks) {
  const results = [];

  for (const task of tasks) {
    results.push(await task());
  }

  return results;
}

/**
 * Debounce async function
 * @param {Function} fn - Async function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function}
 */
function debounceAsync(fn, delay) {
  let timeoutId;
  let pendingResolve;
  let pendingReject;

  return function (...args) {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);

      pendingResolve = resolve;
      pendingReject = reject;

      timeoutId = setTimeout(async () => {
        try {
          const result = await fn.apply(this, args);
          pendingResolve(result);
        } catch (error) {
          pendingReject(error);
        }
      }, delay);
    });
  };
}

/**
 * Throttle async function
 * @param {Function} fn - Async function to throttle
 * @param {number} limit - Minimum time between calls
 * @returns {Function}
 */
function throttleAsync(fn, limit) {
  let inThrottle = false;
  let lastResult;

  return async function (...args) {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = await fn.apply(this, args);
      setTimeout(() => { inThrottle = false; }, limit);
    }
    return lastResult;
  };
}

/**
 * Create a deferred promise (externally resolvable)
 * @returns {Object} { promise, resolve, reject }
 */
function deferred() {
  let resolve, reject;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

/**
 * Wrap callback-based function to return Promise
 * @param {Function} fn - Callback-based function
 * @returns {Function}
 */
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

/**
 * Create a mutex/lock for async operations
 * @returns {Object} { acquire, release }
 */
function createMutex() {
  let locked = false;
  const queue = [];

  return {
    async acquire() {
      if (!locked) {
        locked = true;
        return;
      }

      return new Promise(resolve => {
        queue.push(resolve);
      });
    },

    release() {
      if (queue.length > 0) {
        const next = queue.shift();
        next();
      } else {
        locked = false;
      }
    }
  };
}

/**
 * Create an async queue with concurrency limit
 */
class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.process();
    });
  }

  async process() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const { fn, resolve, reject } = this.queue.shift();
      this.running++;

      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        this.running--;
        this.process();
      }
    }
  }
}

/**
 * Poll until condition is met
 * @param {Function} conditionFn - Function that returns boolean
 * @param {Object} options - Polling options
 * @returns {Promise}
 */
async function poll(conditionFn, options = {}) {
  const {
    interval = 1000,
    timeout = 30000,
    message = 'Polling timeout'
  } = options;

  const startTime = Date.now();

  while (true) {
    if (await conditionFn()) {
      return true;
    }

    if (Date.now() - startTime >= timeout) {
      throw new Error(message);
    }

    await sleep(interval);
  }
}

/**
 * Safe async wrapper (Go-style error handling)
 * @param {Promise} promise - Promise to wrap
 * @returns {Promise<[Error|null, any]>}
 */
async function safe(promise) {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error, null];
  }
}

// Export all utilities
module.exports = {
  sleep,
  withTimeout,
  retry,
  parallelLimit,
  batchProcess,
  sequential,
  debounceAsync,
  throttleAsync,
  deferred,
  promisify,
  createMutex,
  AsyncQueue,
  poll,
  safe
};

// Example usage when run directly
if (require.main === module) {
  async function demo() {
    console.log('Promise Utilities Demo\n');

    // Sleep example
    console.log('1. Sleep for 1 second...');
    await sleep(1000);
    console.log('   Done!\n');

    // Retry example
    console.log('2. Retry with backoff...');
    let attempts = 0;
    try {
      await retry(
        async () => {
          attempts++;
          if (attempts < 3) throw new Error('Not yet');
          return 'Success!';
        },
        {
          maxAttempts: 5,
          baseDelay: 500,
          onRetry: ({ attempt, delay }) => {
            console.log(`   Attempt ${attempt} failed, retrying in ${delay}ms`);
          }
        }
      );
      console.log(`   Succeeded after ${attempts} attempts\n`);
    } catch (e) {
      console.log('   Failed:', e.message);
    }

    // Parallel limit example
    console.log('3. Parallel with limit (3 concurrent)...');
    const tasks = Array.from({ length: 10 }, (_, i) => async () => {
      await sleep(500);
      return `Task ${i + 1} done`;
    });

    const start = Date.now();
    await parallelLimit(tasks, 3);
    console.log(`   Completed in ${Date.now() - start}ms\n`);

    // Safe wrapper example
    console.log('4. Safe error handling...');
    const [error1, result1] = await safe(Promise.resolve('Success'));
    console.log(`   Success case: error=${error1}, result=${result1}`);

    const [error2, result2] = await safe(Promise.reject(new Error('Failed')));
    console.log(`   Error case: error=${error2?.message}, result=${result2}\n`);

    console.log('Demo complete!');
  }

  demo().catch(console.error);
}
