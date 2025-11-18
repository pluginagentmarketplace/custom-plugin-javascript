---
name: dom-apis
description: Master DOM manipulation and browser APIs. Learn element selection, event handling, DOM traversal, and Web APIs like Fetch, LocalStorage, and more.
---

# DOM & Browser APIs Skill

## Quick Start

The DOM is how JavaScript interacts with HTML. Master element selection and manipulation:

```javascript
// Select elements
const elem = document.getElementById("myId");
const elems = document.querySelectorAll(".class-name");

// Manipulate content
elem.textContent = "New text";
elem.innerHTML = "<strong>HTML</strong>";

// Modify attributes
elem.setAttribute("data-id", "123");
elem.setAttribute("class", "active");

// Add event listener
elem.addEventListener("click", () => {
  console.log("Clicked!");
});
```

## DOM Selection

```javascript
// Single elements
document.getElementById("myId");           // By ID
document.querySelector(".class-name");      // By selector
document.querySelector("div > p");          // Complex selector

// Multiple elements
document.getElementsByClassName("className"); // HTMLCollection
document.querySelectorAll(".class-name");   // NodeList
document.querySelectorAll("div.item");      // Complex selector

// Accessing lists
const items = document.querySelectorAll(".item");
items[0];           // First item
items.length;       // Number of items
items.forEach(item => {  // Iterate items
  console.log(item);
});
```

## Manipulating Elements

```javascript
const elem = document.querySelector("#myElement");

// Text and HTML content
elem.textContent = "Plain text only";
elem.innerText = "Rendered text";  // Respects styling
elem.innerHTML = "<strong>HTML content</strong>";

// Attributes
elem.setAttribute("data-value", "123");
elem.getAttribute("data-value");        // "123"
elem.removeAttribute("data-value");
elem.hasAttribute("data-value");        // false

// Classes
elem.classList.add("active");
elem.classList.remove("active");
elem.classList.toggle("active");
elem.classList.contains("active");      // boolean

// Properties
elem.id = "newId";
elem.title = "Tooltip";
elem.disabled = true;  // For form elements
```

## Creating and Removing Elements

```javascript
// Create elements
const newDiv = document.createElement("div");
const newPara = document.createElement("p");

newPara.textContent = "Hello, World!";
newDiv.appendChild(newPara);
document.body.appendChild(newDiv);

// Remove elements
elem.remove();
elem.parentElement.removeChild(elem);

// Clone elements
const clone = elem.cloneNode(true);     // Deep clone (with children)
const shallow = elem.cloneNode(false);  // Shallow clone (no children)
document.body.appendChild(clone);
```

## DOM Traversal

```javascript
const elem = document.querySelector(".myClass");

// Parent navigation
elem.parentElement;      // Direct parent
elem.parentNode;         // Parent node
elem.parentElement?.parentElement;  // Grandparent

// Child navigation
elem.children;           // HTMLCollection of element children
elem.childNodes;         // NodeList of all children
elem.firstChild;         // First child node
elem.lastChild;          // Last child node
elem.firstElementChild;  // First element child
elem.lastElementChild;   // Last element child

// Sibling navigation
elem.nextElementSibling;    // Next element sibling
elem.previousElementSibling;  // Previous element sibling
elem.nextSibling;           // Next node (text, comment, etc)
elem.previousSibling;       // Previous node

// Find closest ancestor
elem.closest(".container");  // Find closest ancestor matching selector
```

## Style Manipulation

```javascript
const elem = document.querySelector("#myElement");

// Inline styles
elem.style.color = "red";
elem.style.backgroundColor = "blue";
elem.style.padding = "10px";
elem.style.display = "none";

// Get computed styles
const computedStyle = window.getComputedStyle(elem);
computedStyle.color;              // "#ff0000" (computed value)
computedStyle.display;            // "block"
computedStyle.getPropertyValue("padding");

// CSS classes (preferred approach)
elem.classList.add("highlight");
elem.classList.toggle("active");

// Inline style as string
elem.setAttribute("style", "color: red; background: blue;");
```

## Event Handling

### Adding Event Listeners

```javascript
const button = document.querySelector("#myButton");

// Basic event listener
function handleClick(event) {
  console.log("Button clicked!");
  console.log(event.target);  // Element that triggered event
  console.log(event.type);    // "click"
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// Anonymous function
button.addEventListener("click", (event) => {
  console.log("Clicked!");
  event.preventDefault();  // Prevent default behavior
  event.stopPropagation(); // Stop bubbling
});

// Options
button.addEventListener("click", handleClick, {
  once: true,       // Only fire once, then remove
  capture: false,   // Bubbling phase (default)
  passive: true     // Won't call preventDefault
});
```

### Common Events

```javascript
// Mouse events
elem.addEventListener("click", handler);
elem.addEventListener("dblclick", handler);
elem.addEventListener("mousedown", handler);
elem.addEventListener("mouseup", handler);
elem.addEventListener("mouseover", handler);
elem.addEventListener("mouseout", handler);
elem.addEventListener("mousemove", handler);

// Keyboard events
elem.addEventListener("keydown", (e) => {
  console.log(e.key);      // "a", "Enter", "ArrowUp"
  console.log(e.code);     // "KeyA", "Enter", "ArrowUp"
  console.log(e.shiftKey); // true if shift held
});
elem.addEventListener("keyup", handler);
elem.addEventListener("keypress", handler);  // Deprecated

// Form events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
});

input.addEventListener("change", handler);  // When focus lost
input.addEventListener("input", handler);   // As user types
input.addEventListener("focus", handler);
input.addEventListener("blur", handler);

// Window events
window.addEventListener("load", handler);    // Page loaded
window.addEventListener("resize", handler);  // Window resized
window.addEventListener("scroll", handler);  // Page scrolled
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "Are you sure?";
});
```

### Event Delegation

```javascript
// Instead of adding listener to each item
const list = document.querySelector("#myList");

list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log("Clicked:", event.target.textContent);
    event.target.classList.toggle("active");
  }
});

// Dynamically added items automatically have the listener
const newItem = document.createElement("li");
newItem.textContent = "New item";
list.appendChild(newItem);  // Click listener already works!
```

## Browser APIs

### Fetch API

```javascript
// GET request
fetch("/api/users")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
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

// With async/await
async function getUsers() {
  const response = await fetch("/api/users");
  const data = await response.json();
  return data;
}
```

### LocalStorage

```javascript
// Save data (string only)
localStorage.setItem("username", "alice");
localStorage.setItem("settings", JSON.stringify({
  theme: "dark",
  language: "en"
}));

// Retrieve data
const username = localStorage.getItem("username");
const settings = JSON.parse(localStorage.getItem("settings"));

// Remove data
localStorage.removeItem("username");
localStorage.clear();  // Remove all

// Check existence
if (localStorage.getItem("username")) {
  console.log("User is saved");
}
```

### Geolocation API

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    console.log(`Location: ${latitude}, ${longitude}`);
  },
  (error) => {
    console.error("Error:", error.message);
  },
  {
    timeout: 5000,
    enableHighAccuracy: true
  }
);

// Watch position
const watchId = navigator.geolocation.watchPosition(
  (position) => { /* handle updates */ },
  (error) => { /* handle error */ }
);

// Stop watching
navigator.geolocation.clearWatch(watchId);
```

### Window Object

```javascript
// Navigation
window.location.href = "/new-page";
window.location.pathname;   // "/page"
window.location.search;     // "?id=1"
window.history.back();
window.history.forward();

// Dimensions
window.innerWidth;
window.innerHeight;
window.outerWidth;
window.outerHeight;
window.scrollX;
window.scrollY;

// Timing
setTimeout(() => console.log("After 1 second"), 1000);
setInterval(() => console.log("Every 2 seconds"), 2000);
requestAnimationFrame(callback);  // Optimized animation

// Information
navigator.userAgent;
navigator.language;

// Dialogs
alert("Message");
const confirmed = confirm("Are you sure?");
const input = prompt("Enter your name:");
```

## Common Patterns

### Form Handling

```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log("Form submitted successfully");
      form.reset();
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
```

### Element Visibility Toggle

```javascript
const toggle = document.querySelector("#toggle");
const content = document.querySelector("#content");

toggle.addEventListener("click", () => {
  content.style.display = content.style.display === "none" ? "block" : "none";
  // Or use classList
  content.classList.toggle("hidden");
});
```

## Practice Exercises

1. Select elements and modify their content
2. Create event listeners for user interactions
3. Dynamically create and add elements to the DOM
4. Fetch data from an API and display it
5. Save and retrieve data from LocalStorage
6. Use event delegation for dynamic lists

## Resources

- MDN: DOM API
- MDN: Event API
- MDN: Fetch API
- MDN: Storage API

## Next Steps

- Build interactive web pages
- Master event handling patterns
- Learn DOM performance optimization
- Integrate with frameworks like React
