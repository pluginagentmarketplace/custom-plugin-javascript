<div align="center">

# JavaScript Developer Plugin

### Complete JavaScript Mastery for Claude Code

**Master JavaScript from fundamentals to advanced ecosystem with 7 specialized agents, 7 production-ready skills, and 1000+ hours of curated content**

[![Verified](https://img.shields.io/badge/Verified-Working-success?style=flat-square&logo=checkmarx)](https://github.com/pluginagentmarketplace/custom-plugin-javascript)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=flat-square)](https://github.com/pluginagentmarketplace/custom-plugin-javascript)
[![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=flat-square)](https://github.com/pluginagentmarketplace/custom-plugin-javascript)
[![Agents](https://img.shields.io/badge/Agents-7-orange?style=flat-square)](#agents-overview)
[![Skills](https://img.shields.io/badge/Skills-7-purple?style=flat-square)](#skills-reference)
[![SASMP](https://img.shields.io/badge/SASMP-v1.3.0-blueviolet?style=flat-square)](#)

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](skills/fundamentals/)
[![ES6+](https://img.shields.io/badge/ES6+-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](skills/modern-javascript/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](skills/ecosystem/)

[Quick Start](#quick-start) | [Agents](#agents-overview) | [Skills](#skills-reference) | [Commands](#commands)

</div>

---

## Verified Installation

> **This plugin has been tested and verified working on Claude Code.**
> Last verified: December 2025

---

## Quick Start

### Option 1: Install from GitHub (Recommended)

```bash
# Step 1: Add the marketplace from GitHub
/plugin add marketplace pluginagentmarketplace/custom-plugin-javascript

# Step 2: Install the plugin
/plugin install javascript-developer-plugin@pluginagentmarketplace-javascript

# Step 3: Restart Claude Code to load new plugins
```

### Option 2: Clone and Load Locally

```bash
# Clone the repository
git clone https://github.com/pluginagentmarketplace/custom-plugin-javascript.git

# Navigate to the directory in Claude Code
cd custom-plugin-javascript

# Load the plugin
/plugin load .
```

After loading, restart Claude Code.

### Verify Installation

After restarting Claude Code, verify the plugin is loaded. You should see these agents available:

```
custom-plugin-javascript:01-javascript-fundamentals
custom-plugin-javascript:02-functions-scope
custom-plugin-javascript:03-objects-arrays
custom-plugin-javascript:04-asynchronous-javascript
custom-plugin-javascript:05-dom-browser-apis
custom-plugin-javascript:06-modern-es6-advanced
custom-plugin-javascript:07-javascript-ecosystem
```

---

## Available Skills

Once installed, these 7 skills become available:

| Skill | Invoke Command | Description |
|-------|----------------|-------------|
| Fundamentals | `Skill("javascript-developer-plugin:fundamentals")` | Variables, data types, operators |
| Functions | `Skill("javascript-developer-plugin:functions")` | Functions, scope, closures |
| Data Structures | `Skill("javascript-developer-plugin:data-structures")` | Objects, arrays, inheritance |
| Asynchronous | `Skill("javascript-developer-plugin:asynchronous")` | Promises, async/await, event loop |
| DOM APIs | `Skill("javascript-developer-plugin:dom-apis")` | DOM manipulation, events |
| Modern JavaScript | `Skill("javascript-developer-plugin:modern-javascript")` | ES6+ features, modules |
| Ecosystem | `Skill("javascript-developer-plugin:ecosystem")` | npm, webpack, testing |

---

## What This Plugin Does

This plugin provides **7 specialized agents** and **7 production-ready skills** for complete JavaScript mastery:

| Agent | Purpose |
|-------|---------|
| **JavaScript Fundamentals** | Variables, data types, operators, control flow |
| **Functions & Scope** | Functions, scope chains, closures, hoisting |
| **Objects & Arrays** | Objects, arrays, prototypal inheritance |
| **Asynchronous JavaScript** | Callbacks, Promises, async/await, event loop |
| **DOM & Browser APIs** | DOM manipulation, events, Web APIs |
| **Modern ES6+** | Classes, destructuring, modules |
| **JavaScript Ecosystem** | npm, webpack, testing, deployment |

---

## Agents Overview

### 7 Implementation Agents

Each agent is designed to **do the work**, not just explain:

| Agent | Capabilities | Example Prompts |
|-------|--------------|-----------------|
| **Fundamentals** | Variables, operators, control flow | `"JavaScript basics"`, `"Data types"` |
| **Functions & Scope** | Closures, hoisting, this | `"Explain closures"`, `"Arrow functions"` |
| **Objects & Arrays** | Prototypes, classes | `"Array methods"`, `"Object patterns"` |
| **Asynchronous** | Promises, async/await | `"Promise chaining"`, `"Event loop"` |
| **DOM & APIs** | DOM, events, fetch | `"DOM manipulation"`, `"Event handling"` |
| **Modern ES6+** | Modules, destructuring | `"ES6 features"`, `"Module imports"` |
| **Ecosystem** | npm, build tools | `"Setup webpack"`, `"Testing with Jest"` |

---

## Commands

4 interactive commands for JavaScript workflows:

| Command | Usage | Description |
|---------|-------|-------------|
| `/learn` | `/learn` | Start guided learning path |
| `/browse-agent` | `/browse-agent` | Explore all 7 agents |
| `/assess` | `/assess` | Evaluate your JavaScript level |
| `/projects` | `/projects` | Browse 20+ hands-on projects |

---

## Skills Reference

Each skill includes **Golden Format** content:
- `assets/` - Configuration templates and setup files
- `scripts/` - Automation and validation scripts
- `references/` - Methodology guides and best practices

### All 7 Skills by Category

| Category | Skills |
|----------|--------|
| **Basics** | fundamentals |
| **Functions** | functions |
| **Data** | data-structures |
| **Async** | asynchronous |
| **Browser** | dom-apis |
| **Modern** | modern-javascript |
| **Tools** | ecosystem |

---

## Usage Examples

### Example 1: Learn Async/Await

```javascript
// Before: Callback hell

// After (with Async Agent):
Skill("javascript-developer-plugin:asynchronous")

// Teaches:
// - Promise fundamentals
// - async/await syntax
// - Error handling
// - Parallel execution
```

### Example 2: DOM Manipulation

```javascript
// Before: Manual DOM scripting

// After (with DOM Agent):
Skill("javascript-developer-plugin:dom-apis")

// Provides:
// - Element selection
// - Event handling
// - DOM traversal
// - Performance tips
```

### Example 3: Setup Build Tools

```javascript
// Before: No build process

// After (with Ecosystem Agent):
Skill("javascript-developer-plugin:ecosystem")

// Creates:
// - Webpack configuration
// - npm scripts
// - Testing setup
// - Linting rules
```

---

## Plugin Structure

```
custom-plugin-javascript/
├── .claude-plugin/
│   ├── plugin.json           # Plugin manifest
│   └── marketplace.json      # Marketplace config
├── agents/                   # 7 specialized agents
│   ├── 01-javascript-fundamentals.md
│   ├── 02-functions-scope.md
│   ├── 03-objects-arrays.md
│   ├── 04-asynchronous-javascript.md
│   ├── 05-dom-browser-apis.md
│   ├── 06-modern-es6-advanced.md
│   └── 07-javascript-ecosystem.md
├── skills/                   # 7 skills (Golden Format)
│   ├── asynchronous/SKILL.md
│   ├── data-structures/SKILL.md
│   ├── dom-apis/SKILL.md
│   ├── ecosystem/SKILL.md
│   ├── functions/SKILL.md
│   ├── fundamentals/SKILL.md
│   └── modern-javascript/SKILL.md
├── commands/                 # 4 slash commands
│   ├── assess.md
│   ├── browse-agent.md
│   ├── learn.md
│   └── projects.md
├── hooks/hooks.json
├── README.md
├── CHANGELOG.md
├── ARCHITECTURE.md
└── LICENSE
```

---

## Technology Coverage

| Category | Technologies |
|----------|--------------|
| **Core** | ES5, ES6+, ESNext |
| **Async** | Promises, async/await, Generators |
| **DOM** | DOM API, Events, Web APIs |
| **Tools** | npm, Webpack, Vite, Babel |
| **Testing** | Jest, Mocha, Cypress |
| **Frameworks** | React, Vue, Node.js |
| **Patterns** | Modules, Classes, Closures |
| **Build** | Bundlers, Transpilers, Linters |

---

## Learning Paths

| Path | Duration | Focus |
|------|----------|-------|
| **Beginner** | 4-6 weeks | Complete foundations |
| **Intermediate** | 2-3 weeks | Modernize skills |
| **Quick Refresh** | 1 week | Specific topics |

### Recommended Sequence
1. Fundamentals (Week 1-2)
2. Functions & Scope (Week 3)
3. Objects & Arrays (Week 4)
4. Asynchronous (Week 5)
5. DOM & APIs (Week 6)
6. Modern ES6+ (Week 7)
7. Ecosystem (Week 8)

---

## Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | 14+ |
| npm | 6+ |
| Modern Browser | Chrome/Firefox/Edge |

---

## Best Practices

- **Variables**: Use `const` by default, `let` when needed
- **Functions**: Prefer arrow functions for callbacks
- **Async**: Use async/await over callbacks
- **DOM**: Use event delegation for performance
- **Modules**: Use ES modules over CommonJS
- **Testing**: Write tests for all functions

---

## Metadata

| Field | Value |
|-------|-------|
| **Last Updated** | 2025-12-28 |
| **Maintenance Status** | Active |
| **SASMP Version** | 1.3.0 |
| **Support** | [Issues](../../issues) |

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Contributing

Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Follow the Golden Format for new skills
4. Submit a pull request

---

## Contributors

**Authors:**
- **Dr. Umit Kacar** - Senior AI Researcher & Engineer
- **Muhsin Elcicek** - Senior Software Architect

---

<div align="center">

**Master JavaScript with AI assistance!**

[![Made for JavaScript](https://img.shields.io/badge/Made%20for-JavaScript%20Developers-F7DF1E?style=for-the-badge&logo=javascript)](https://github.com/pluginagentmarketplace/custom-plugin-javascript)

**Built by Dr. Umit Kacar & Muhsin Elcicek**

*Based on [roadmap.sh/javascript](https://roadmap.sh/javascript)*

</div>
