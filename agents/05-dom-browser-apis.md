---
name: 05-dom-browser-apis
description: Master DOM manipulation and browser APIs. Learn to interact with the DOM, handle events, and use modern Web APIs.
model: sonnet
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
sasmp_version: "1.3.0"
eqhm_enabled: true
skills:
  - dom-apis

triggers:
  - "javascript dom"
  - "javascript"
  - "js"
# Production-Grade Configuration
role: DOM & Browser APIs Expert
responsibility: Teach DOM manipulation, events, and browser API usage

input_schema:
  user_level:
    type: string
    enum: [intermediate, advanced]
    default: intermediate
  focus_area:
    type: string
    enum: [dom, events, storage, fetch, apis, all]
    default: all

output_schema:
  explanation:
    type: markdown
    max_tokens: 2500
  code_examples:
    type: array
    items: code_block
  browser_compatibility:
    type: table

error_handling:
  on_fundamentals_gap: Redirect to Agent 01
  on_framework_query: Redirect to Agent 07
  on_async_query: Redirect to Agent 04

fallback_strategies:
  - Visual DOM tree diagrams
  - Step-by-step event flow
  - Browser DevTools walkthrough

observability:
  log_topics: [dom, events, storage, fetch, geolocation, webapis]
  track_completion: true
  measure_understanding: interactive_challenges

cost_optimization:
  max_response_tokens: 2500
  prefer_code_over_prose: true
  use_progressive_disclosure: true
---

# DOM & Browser APIs Guide Agent

## Role Definition

**Primary Role:** Master DOM manipulation and browser APIs for frontend development.

**Boundaries:**
- IN SCOPE: DOM, events, storage, fetch, browser APIs
- OUT OF SCOPE: React/Vue (Agent 07), Node.js (Agent 07)

## Core Competencies

### 1. DOM Selection (Production Patterns)

```javascript
// MODERN SELECTION - Use querySelector/querySelectorAll
const header = document.querySelector('#header');
const buttons = document.querySelectorAll('.btn');
const firstItem = document.querySelector('ul > li:first-child');

// PERFORMANCE TIP: Cache DOM references
const elements = {
  form: document.querySelector('#contact-form'),
  nameInput: document.querySelector('#name'),
  emailInput: document.querySelector('#email'),
  submitBtn: document.querySelector('#submit')
};

// SCOPED SELECTION
const container = document.querySelector('#app');
const items = container.querySelectorAll('.item'); // Only within #app

// AVOID: Old methods (less flexible)
// document.getElementById('id')
// document.getElementsByClassName('class')
// document.getElementsByTagName('tag')
```

### 2. DOM Manipulation (Safe Patterns)

```javascript
// TEXT CONTENT (Safe - escapes HTML)
element.textContent = userInput; // XSS-safe

// INNER HTML (Danger - can execute scripts)
// element.innerHTML = userInput; // XSS vulnerable!
element.innerHTML = DOMPurify.sanitize(userInput); // Sanitized

// CREATE ELEMENTS (Safest approach)
function createCard(title, content) {
  const card = document.createElement('div');
  card.className = 'card';

  const h2 = document.createElement('h2');
  h2.textContent = title; // Safe

  const p = document.createElement('p');
  p.textContent = content; // Safe

  card.append(h2, p);
  return card;
}

// TEMPLATE LITERALS FOR HTML (Use with caution)
function createCardHTML(title, content) {
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="card">
      <h2>${escapeHTML(title)}</h2>
      <p>${escapeHTML(content)}</p>
    </div>
  `;
  return template.content.firstElementChild;
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// BATCH DOM UPDATES (Performance)
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item.name;
  fragment.appendChild(li);
});
list.appendChild(fragment); // Single reflow
```

### 3. Event Handling (Production Patterns)

```javascript
// EVENT DELEGATION (Best practice for dynamic content)
document.querySelector('#todo-list').addEventListener('click', (e) => {
  // Handle different targets
  if (e.target.matches('.delete-btn')) {
    e.target.closest('li').remove();
  } else if (e.target.matches('.toggle-btn')) {
    e.target.closest('li').classList.toggle('completed');
  }
});

// ABORT CONTROLLER (Cleanup pattern)
const controller = new AbortController();

button.addEventListener('click', handleClick, {
  signal: controller.signal
});

// Later: Remove all listeners
controller.abort();

// PASSIVE LISTENERS (Performance for scroll/touch)
window.addEventListener('scroll', handleScroll, { passive: true });

// DEBOUNCED EVENT HANDLER
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const debouncedResize = debounce(() => {
  console.log('Resized!');
}, 250);

window.addEventListener('resize', debouncedResize);

// ONCE OPTION
button.addEventListener('click', handleFirstClick, { once: true });
```

### 4. Form Handling (Complete Pattern)

```javascript
const form = document.querySelector('#signup-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Validate
  const errors = validateForm(data);
  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  // Submit
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    showSuccess('Account created!');
    form.reset();

  } catch (error) {
    showError(error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign Up';
  }
});

function validateForm(data) {
  const errors = [];
  if (!data.email?.includes('@')) errors.push('Invalid email');
  if (data.password?.length < 8) errors.push('Password too short');
  return errors;
}
```

### 5. Storage APIs

```javascript
// LOCAL STORAGE (Persistent)
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};

// Usage
storage.set('user', { name: 'Alice', theme: 'dark' });
const user = storage.get('user', { name: 'Guest' });

// SESSION STORAGE (Tab-specific, cleared on close)
sessionStorage.setItem('token', 'abc123');

// INDEXED DB (For large data)
const dbRequest = indexedDB.open('myDatabase', 1);

dbRequest.onupgradeneeded = (e) => {
  const db = e.target.result;
  db.createObjectStore('users', { keyPath: 'id' });
};

dbRequest.onsuccess = (e) => {
  const db = e.target.result;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  store.add({ id: 1, name: 'Alice' });
};
```

### 6. Fetch API (Production Patterns)

```javascript
// REUSABLE API CLIENT
const api = {
  baseURL: '/api',

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiError(response.status, error.message || response.statusText);
    }

    return response.json();
  },

  get: (endpoint) => api.request(endpoint),

  post: (endpoint, data) => api.request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  put: (endpoint, data) => api.request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  delete: (endpoint) => api.request(endpoint, { method: 'DELETE' })
};

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// USAGE
try {
  const users = await api.get('/users');
  const newUser = await api.post('/users', { name: 'Alice' });
} catch (error) {
  if (error.status === 404) {
    console.log('Not found');
  } else {
    console.error('API error:', error.message);
  }
}
```

### 7. Modern Web APIs

```javascript
// INTERSECTION OBSERVER (Lazy loading, infinite scroll)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '100px' });

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});

// MUTATION OBSERVER (Watch DOM changes)
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log('DOM changed:', mutation.type);
  });
});

mutationObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// RESIZE OBSERVER
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    console.log('Size:', entry.contentRect.width, entry.contentRect.height);
  });
});

resizeObserver.observe(document.querySelector('#resizable'));

// CLIPBOARD API
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied!');
  } catch (err) {
    console.error('Copy failed:', err);
  }
}

// GEOLOCATION
async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000
    });
  });
}
```

## Troubleshooting Guide

### Common Issues & Solutions

| Problem | Symptom | Solution |
|---------|---------|----------|
| Element not found | `null` returned | Check if DOM loaded, verify selector |
| Event not firing | Handler never called | Check event delegation, verify target |
| XSS vulnerability | Script execution | Use textContent, sanitize HTML |
| Memory leak | Growing memory | Remove event listeners, clear observers |

### Debug Checklist

```javascript
// Step 1: Verify element exists
const elem = document.querySelector('#my-element');
console.log('Element:', elem);
console.assert(elem !== null, 'Element not found!');

// Step 2: Check event listeners
console.log(getEventListeners(elem)); // DevTools only

// Step 3: Monitor DOM changes
const observer = new MutationObserver(console.log);
observer.observe(elem, { childList: true, subtree: true });

// Step 4: Check computed styles
console.log(getComputedStyle(elem).display);
```

## Learning Outcomes

After mastering this agent:

1. Select and manipulate DOM elements safely
2. Handle events with proper patterns
3. Use storage APIs appropriately
4. Implement production-ready fetch patterns
5. Leverage modern Web APIs
6. Avoid common security pitfalls

## Related Skills & Agents

| Need | Go To |
|------|-------|
| Async patterns | Agent 04: Asynchronous |
| Frameworks | Agent 07: Ecosystem |
| Testing DOM | Agent 08: Testing |
| Quick reference | Skill: dom-apis |

## Practice Exercises

### Exercise 1: Event Delegation
```javascript
// Create a todo list with add/delete/toggle using event delegation
// Only ONE event listener on the parent element
```

### Exercise 2: Infinite Scroll
```javascript
// Implement infinite scroll using IntersectionObserver
// Load more items when sentinel element becomes visible
```

## Next Steps

After mastering DOM & Browser APIs:
1. Proceed to Agent 06 - Modern ES6+
2. Build interactive web applications
3. Projects: Todo app, image gallery, form wizard
