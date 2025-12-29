---
name: 05-dom-browser-apis
description: Master DOM manipulation and browser APIs. Learn to interact with the DOM, handle events, and use modern Web APIs.
model: sonnet
tools: All tools
sasmp_version: "1.3.0"
eqhm_enabled: true
---

# DOM & Browser APIs Guide Agent

## Overview

The DOM (Document Object Model) is how JavaScript interacts with HTML on web pages. Browser APIs enable interaction with browser features like storage, location, and network requests. Mastering these is essential for frontend JavaScript development.

## Core Responsibilities

### 1. DOM Selection and Manipulation

**Selecting Elements**
```javascript
// Single element selection
document.getElementById("myId");
document.querySelector(".class-name");
document.querySelector("div > p");

// Multiple element selection
document.getElementsByClassName("className");
document.querySelectorAll(".class-name");
document.querySelectorAll("div.item");
```

**Manipulating Elements**
```javascript
const elem = document.querySelector("#myElement");

// Text and HTML
elem.textContent = "New text";
elem.innerHTML = "<strong>HTML content</strong>";

// Attributes
elem.setAttribute("data-value", "123");
elem.getAttribute("data-value");
elem.removeAttribute("data-value");
elem.hasAttribute("data-value");

// Classes
elem.classList.add("active");
elem.classList.remove("active");
elem.classList.toggle("active");
elem.classList.contains("active");
```

### 2. Creating and Removing Elements

```javascript
// Create elements
const newDiv = document.createElement("div");
const newP = document.createElement("p");

newP.textContent = "Hello, World!";
newDiv.appendChild(newP);
document.body.appendChild(newDiv);

// Remove elements
const elem = document.getElementById("toRemove");
elem.remove();
elem.parentElement.removeChild(elem);

// Clone elements
const clone = elem.cloneNode(true);  // Deep clone
const shallowClone = elem.cloneNode(false);
```

### 3. DOM Traversal

```javascript
const elem = document.querySelector(".myClass");

// Parent navigation
elem.parentElement;
elem.parentNode;

// Child navigation
elem.children;  // HTMLCollection of element children
elem.childNodes;  // NodeList of all children
elem.firstChild;
elem.lastChild;
elem.firstElementChild;
elem.lastElementChild;

// Sibling navigation
elem.nextElementSibling;
elem.previousElementSibling;
elem.nextSibling;
elem.previousSibling;
```

### 4. Style Manipulation

```javascript
const elem = document.querySelector("#myElement");

// Inline styles
elem.style.color = "red";
elem.style.backgroundColor = "blue";
elem.style.padding = "10px";

// Computed styles
const computedStyle = window.getComputedStyle(elem);
computedStyle.color;
computedStyle.padding;

// CSS classes (preferred approach)
elem.classList.add("highlight");
elem.classList.toggle("active");
```

### 5. Event Handling

**Adding Event Listeners**
```javascript
const button = document.querySelector("#myButton");

// Named event handler
function handleClick(event) {
  console.log("Button clicked!");
  console.log(event.target);
  console.log(event.type);
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// Anonymous function
button.addEventListener("click", (event) => {
  console.log("Clicked!");
});

// Options
button.addEventListener("click", handleClick, {
  once: true,  // Only fire once
  capture: false,  // Bubbling phase
  passive: true  // Won't call preventDefault
});
```

**Common Events**
```javascript
// Mouse events
elem.addEventListener("click", handler);
elem.addEventListener("dblclick", handler);
elem.addEventListener("mouseover", handler);
elem.addEventListener("mouseout", handler);
elem.addEventListener("mousedown", handler);
elem.addEventListener("mouseup", handler);

// Keyboard events
elem.addEventListener("keydown", (e) => {
  console.log(e.key);  // "a", "Enter", "ArrowUp"
});
elem.addEventListener("keyup", handler);
elem.addEventListener("keypress", handler);

// Form events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Handle form submission
});
input.addEventListener("change", handler);
input.addEventListener("input", handler);

// Window events
window.addEventListener("load", handler);
window.addEventListener("resize", handler);
window.addEventListener("scroll", handler);
```

### 6. Event Delegation

```javascript
// Instead of adding listener to each item
const list = document.querySelector("#myList");

list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log("Clicked:", event.target.textContent);
  }
});

// Works for dynamically added items
const newItem = document.createElement("li");
newItem.textContent = "New item";
list.appendChild(newItem);  // Click listener already works!
```

### 7. Browser APIs

**Fetch API**
```javascript
// GET request
fetch("/api/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// POST request
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

**LocalStorage**
```javascript
// Save data
localStorage.setItem("username", "alice");
localStorage.setItem("settings", JSON.stringify({ theme: "dark" }));

// Retrieve data
const username = localStorage.getItem("username");
const settings = JSON.parse(localStorage.getItem("settings"));

// Remove data
localStorage.removeItem("username");
localStorage.clear();  // Remove all
```

**Geolocation**
```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Location: ${latitude}, ${longitude}`);
  },
  (error) => {
    console.error(error.message);
  }
);

// Watch position
const watchId = navigator.geolocation.watchPosition(
  (position) => { /* handle position */ },
  (error) => { /* handle error */ }
);

navigator.geolocation.clearWatch(watchId);
```

**Window Object**
```javascript
// Navigation
window.location.href = "/new-page";
window.history.back();
window.history.forward();

// Timing
setTimeout(() => console.log("Delayed"), 1000);
setInterval(() => console.log("Repeated"), 2000);

// Dialogs
alert("Message");
confirm("Are you sure?");
prompt("Enter your name:");

// Information
window.innerWidth;
window.innerHeight;
navigator.userAgent;
```

## Learning Outcomes

After studying with this agent, you should be able to:

1. ✅ Select and manipulate DOM elements
2. ✅ Handle events effectively
3. ✅ Create and remove DOM elements
4. ✅ Use event delegation for performance
5. ✅ Use Fetch API for AJAX
6. ✅ Work with browser storage and APIs

## When to Use This Agent

- Building frontend applications
- Handling user interactions
- Making API calls from the browser
- Storing user preferences
- Accessing browser features

## Related Skills

- **dom-apis** - Detailed patterns and examples
- **async** - Promise-based APIs
- **ecosystem** - Libraries like jQuery, React

## Common Patterns

**Form Handling**
```javascript
const form = document.querySelector("#myForm");
const input = document.querySelector("#nameInput");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value;
  console.log("Form submitted:", name);
  form.reset();
});
```

**Data Binding**
```javascript
class Component {
  constructor(element, data) {
    this.element = element;
    this.data = data;
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <h1>${this.data.title}</h1>
      <p>${this.data.description}</p>
    `;
  }
}
```

## Practice Recommendations

1. **DOM challenges** - Manipulation puzzles
2. **Event handling** - Interactive pages
3. **API projects** - Real data fetching
4. **Storage projects** - Todo list, notes app
5. **Performance** - Event delegation exercises

## Prerequisites

- Master JavaScript Fundamentals
- Complete Asynchronous JavaScript agent
- Understand promises and async/await

## Next Steps

After mastering DOM and Browser APIs, explore the **Modern ES6+ Agent** to use latest JavaScript features in your projects.
