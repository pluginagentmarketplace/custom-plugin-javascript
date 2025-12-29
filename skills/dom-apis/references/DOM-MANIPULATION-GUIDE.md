# DOM Manipulation Complete Guide

> Master DOM manipulation for modern web applications

## Quick Reference

```javascript
// Create element
const div = document.createElement('div');
div.className = 'card';
div.textContent = 'Hello';

// Add to DOM
document.body.appendChild(div);

// Query elements
const cards = document.querySelectorAll('.card');

// Modify styles
div.style.cssText = 'color: blue; padding: 10px;';

// Event handling
div.addEventListener('click', (e) => console.log('Clicked!'));
```

---

## Element Creation & Insertion

### Creating Elements

```javascript
// Create element
const element = document.createElement('div');

// Create with attributes
const link = document.createElement('a');
link.href = 'https://example.com';
link.textContent = 'Click me';
link.setAttribute('target', '_blank');
link.setAttribute('rel', 'noopener');

// Create text node
const text = document.createTextNode('Hello World');

// Create document fragment (for batch operations)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment);
```

### Insertion Methods

```javascript
const parent = document.getElementById('container');
const newElement = document.createElement('div');
const referenceElement = document.getElementById('reference');

// Append (add to end)
parent.appendChild(newElement);
parent.append(newElement, 'text', anotherElement); // Multiple items

// Prepend (add to beginning)
parent.prepend(newElement);

// Insert before reference
parent.insertBefore(newElement, referenceElement);

// Insert adjacent (flexible positioning)
referenceElement.insertAdjacentElement('beforebegin', newElement); // Before element
referenceElement.insertAdjacentElement('afterbegin', newElement);  // First child
referenceElement.insertAdjacentElement('beforeend', newElement);   // Last child
referenceElement.insertAdjacentElement('afterend', newElement);    // After element

// Insert HTML string
element.insertAdjacentHTML('beforeend', '<span>Hello</span>');

// Replace element
parent.replaceChild(newElement, oldElement);
oldElement.replaceWith(newElement);
```

### Removal Methods

```javascript
// Remove element
element.remove();

// Remove child
parent.removeChild(child);

// Remove all children (efficient)
parent.innerHTML = '';

// Remove all children (preserves event listeners on parent)
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}

// Modern: replaceChildren (clears and optionally adds new)
parent.replaceChildren(); // Clear all
parent.replaceChildren(child1, child2); // Clear and add new
```

---

## Attribute Manipulation

### Standard Attributes

```javascript
// Get attribute
const value = element.getAttribute('data-id');
const href = link.getAttribute('href');

// Set attribute
element.setAttribute('data-id', '123');
element.setAttribute('aria-label', 'Close button');

// Check existence
if (element.hasAttribute('disabled')) {
  // ...
}

// Remove attribute
element.removeAttribute('disabled');

// Toggle attribute
element.toggleAttribute('hidden');
element.toggleAttribute('disabled', shouldBeDisabled);
```

### Dataset (data-* attributes)

```javascript
// HTML: <div data-user-id="123" data-user-name="John">

// Read
const userId = element.dataset.userId;     // "123"
const userName = element.dataset.userName; // "John"

// Write
element.dataset.role = 'admin';
// Results in: data-role="admin"

// Delete
delete element.dataset.userId;

// Check
if ('userId' in element.dataset) {
  // ...
}
```

### Class Manipulation

```javascript
// ClassList API (recommended)
element.classList.add('active');
element.classList.add('class1', 'class2', 'class3');
element.classList.remove('hidden');
element.classList.toggle('expanded');
element.classList.toggle('visible', isVisible); // Force add/remove
element.classList.replace('old-class', 'new-class');
element.classList.contains('active'); // Returns boolean

// Multiple classes
element.classList.add(...['class1', 'class2', 'class3']);

// Legacy (avoid)
element.className = 'class1 class2'; // Overwrites all classes
element.className += ' new-class';   // Append (clunky)
```

---

## Style Manipulation

### Inline Styles

```javascript
// Individual properties
element.style.color = 'blue';
element.style.backgroundColor = 'white'; // camelCase
element.style.fontSize = '16px';
element.style.marginTop = '10px';

// CSS custom properties
element.style.setProperty('--primary-color', '#007bff');
element.style.getPropertyValue('--primary-color');
element.style.removeProperty('--primary-color');

// Multiple styles at once
element.style.cssText = 'color: blue; font-size: 16px; margin: 10px;';

// Object assign pattern
Object.assign(element.style, {
  color: 'blue',
  fontSize: '16px',
  margin: '10px'
});

// Remove inline style
element.style.color = '';
element.style.removeProperty('color');
```

### Computed Styles

```javascript
// Get computed (actual) style
const styles = getComputedStyle(element);
const color = styles.color;
const fontSize = styles.fontSize;
const margin = styles.getPropertyValue('margin-top');

// Get pseudo-element styles
const beforeStyles = getComputedStyle(element, '::before');
const content = beforeStyles.content;
```

### CSS Classes vs Inline Styles

```javascript
// ✅ GOOD - Use classes for reusable styles
element.classList.add('btn-primary');
element.classList.toggle('loading');

// ⚠️ OK - Inline for dynamic values
element.style.transform = `translateX(${x}px)`;
element.style.setProperty('--progress', `${percent}%`);

// ❌ BAD - Inline for static styles
element.style.color = 'blue';
element.style.padding = '10px';
// Use CSS classes instead!
```

---

## Event Handling

### addEventListener

```javascript
// Basic usage
element.addEventListener('click', (event) => {
  console.log('Clicked!', event.target);
});

// With options
element.addEventListener('click', handler, {
  capture: false,  // Use capture phase
  once: true,      // Remove after first call
  passive: true,   // Won't call preventDefault
  signal: controller.signal // For removal via AbortController
});

// Remove listener
element.removeEventListener('click', handler);

// AbortController for cleanup
const controller = new AbortController();
element.addEventListener('click', handler, { signal: controller.signal });
// Later: remove all listeners with this signal
controller.abort();
```

### Event Delegation

```javascript
// ✅ GOOD - Single listener on parent
document.getElementById('list').addEventListener('click', (e) => {
  // Check if clicked element matches
  if (e.target.matches('.item')) {
    handleItemClick(e.target);
  }

  // Or closest for nested elements
  const item = e.target.closest('.item');
  if (item) {
    handleItemClick(item);
  }
});

// ❌ BAD - Listener on each item
items.forEach(item => {
  item.addEventListener('click', handleItemClick);
});
```

### Common Events

```javascript
// Mouse events
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mouseenter', handler); // No bubble
element.addEventListener('mouseleave', handler);
element.addEventListener('mouseover', handler);  // Bubbles
element.addEventListener('mouseout', handler);
element.addEventListener('contextmenu', handler); // Right-click

// Keyboard events
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    submit();
  }
  if (e.key === 'Escape') {
    close();
  }
});

// Form events
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Handle form
});
input.addEventListener('input', (e) => {
  // Fires on every change
  console.log(e.target.value);
});
input.addEventListener('change', (e) => {
  // Fires on blur after change
});

// Focus events
element.addEventListener('focus', handler);
element.addEventListener('blur', handler);
element.addEventListener('focusin', handler);  // Bubbles
element.addEventListener('focusout', handler);

// Scroll events
window.addEventListener('scroll', handler, { passive: true });

// Resize (use ResizeObserver for elements)
window.addEventListener('resize', handler);
```

### Event Object

```javascript
element.addEventListener('click', (event) => {
  // Target vs currentTarget
  event.target;        // Element that triggered event
  event.currentTarget; // Element with listener attached

  // Position
  event.clientX;  // Relative to viewport
  event.clientY;
  event.pageX;    // Relative to document
  event.pageY;
  event.offsetX;  // Relative to target element
  event.offsetY;

  // Modifiers
  event.shiftKey;
  event.ctrlKey;
  event.altKey;
  event.metaKey;  // Cmd on Mac, Windows key on Windows

  // Prevent default behavior
  event.preventDefault();

  // Stop propagation
  event.stopPropagation();
  event.stopImmediatePropagation(); // Stop other listeners too
});
```

---

## Performance Optimization

### Batch DOM Operations

```javascript
// ❌ BAD - Multiple reflows
for (let i = 0; i < 1000; i++) {
  list.innerHTML += `<li>Item ${i}</li>`; // Reflow each time!
}

// ✅ GOOD - DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
list.appendChild(fragment); // Single reflow

// ✅ GOOD - Build string, set once
const html = Array.from({ length: 1000 }, (_, i) =>
  `<li>Item ${i}</li>`
).join('');
list.innerHTML = html;
```

### Minimize Reflows

```javascript
// ❌ BAD - Forces reflow on each read
elements.forEach(el => {
  const height = el.offsetHeight; // Read (forces reflow)
  el.style.height = height + 10 + 'px'; // Write
});

// ✅ GOOD - Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight); // All reads
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px'; // All writes
});
```

### Use requestAnimationFrame

```javascript
// For visual updates
function animate() {
  element.style.transform = `translateX(${x}px)`;
  x += 1;

  if (x < 100) {
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);

// Debounce scroll/resize handlers
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
```

### Virtual Scrolling (Concept)

```javascript
// For large lists, only render visible items
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;

    this.container.style.height = `${items.length * itemHeight}px`;
    this.render();

    container.parentElement.addEventListener('scroll', () => {
      this.render();
    }, { passive: true });
  }

  render() {
    const scrollTop = this.container.parentElement.scrollTop;
    const viewportHeight = this.container.parentElement.clientHeight;

    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(viewportHeight / this.itemHeight) + 1,
      this.items.length
    );

    // Only render visible items
    const visibleItems = this.items.slice(startIndex, endIndex);
    // ... render visibleItems with absolute positioning
  }
}
```

---

## Modern APIs

### MutationObserver

```javascript
// Watch for DOM changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      console.log('Children changed');
      mutation.addedNodes.forEach(node => {
        console.log('Added:', node);
      });
    }
    if (mutation.type === 'attributes') {
      console.log(`Attribute ${mutation.attributeName} changed`);
    }
  });
});

observer.observe(element, {
  childList: true,    // Watch child additions/removals
  attributes: true,   // Watch attribute changes
  characterData: true, // Watch text content changes
  subtree: true,      // Watch all descendants
  attributeFilter: ['class', 'style'] // Only these attributes
});

// Stop observing
observer.disconnect();
```

### IntersectionObserver

```javascript
// Lazy loading, infinite scroll, analytics
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible
      loadImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,         // Viewport
  rootMargin: '100px', // Load 100px before visible
  threshold: 0.1      // 10% visible triggers callback
});

// Observe elements
document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
```

### ResizeObserver

```javascript
// Watch element size changes
const observer = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    const { width, height } = entry.contentRect;
    console.log(`Size: ${width}x${height}`);

    // Responsive behavior
    if (width < 600) {
      entry.target.classList.add('compact');
    } else {
      entry.target.classList.remove('compact');
    }
  });
});

observer.observe(element);

// Cleanup
observer.disconnect();
```

---

## Templates

### Template Element

```html
<template id="card-template">
  <div class="card">
    <h3 class="card-title"></h3>
    <p class="card-body"></p>
  </div>
</template>
```

```javascript
function createCard(title, body) {
  const template = document.getElementById('card-template');
  const clone = template.content.cloneNode(true);

  clone.querySelector('.card-title').textContent = title;
  clone.querySelector('.card-body').textContent = body;

  return clone;
}

// Usage
const card = createCard('Hello', 'World');
container.appendChild(card);
```

### Template Literals (JavaScript)

```javascript
function renderCard({ title, body, imageUrl }) {
  return `
    <div class="card">
      <img src="${escapeHtml(imageUrl)}" alt="">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(body)}</p>
    </div>
  `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Usage
container.innerHTML = data.map(renderCard).join('');
```

---

## Best Practices

| Practice | Reason |
|----------|--------|
| Use `querySelector`/`querySelectorAll` | Flexible CSS selectors |
| Prefer `classList` over `className` | Safer class manipulation |
| Use event delegation | Better performance, handles dynamic elements |
| Batch DOM operations | Minimize reflows |
| Use DocumentFragment | Efficient batch insertions |
| Cache DOM references | Avoid repeated queries |
| Use `passive: true` for scroll | Better scroll performance |
| Escape user content | Prevent XSS attacks |
| Clean up observers/listeners | Prevent memory leaks |

---

**Author:** Dr. Umit Kacar & Muhsin Elcicek
**Version:** 1.0.0
**Last Updated:** December 2025
