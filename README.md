<div align="center">

<!-- Animated Typing Banner -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=2E9EF7&center=true&vCenter=true&multiline=true&repeat=true&width=600&height=100&lines=Javascript+Assistant;7+Agents+%7C+7+Skills;Claude+Code+Plugin" alt="Javascript Assistant" />

<br/>

<!-- Badge Row 1: Status Badges -->
[![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge)](https://github.com/pluginagentmarketplace/custom-plugin-javascript/releases)
[![License](https://img.shields.io/badge/License-Custom-yellow?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production-brightgreen?style=for-the-badge)](#)
[![SASMP](https://img.shields.io/badge/SASMP-v1.3.0-blueviolet?style=for-the-badge)](#)

<!-- Badge Row 2: Content Badges -->
[![Agents](https://img.shields.io/badge/Agents-7-orange?style=flat-square&logo=robot)](#-agents)
[![Skills](https://img.shields.io/badge/Skills-7-purple?style=flat-square&logo=lightning)](#-skills)
[![Commands](https://img.shields.io/badge/Commands-4-green?style=flat-square&logo=terminal)](#-commands)

<br/>

<!-- Quick CTA Row -->
[📦 **Install Now**](#-quick-start) · [🤖 **Explore Agents**](#-agents) · [📖 **Documentation**](#-documentation) · [⭐ **Star this repo**](https://github.com/pluginagentmarketplace/custom-plugin-javascript)

---

### What is this?

> **Javascript Assistant** is a Claude Code plugin with **7 agents** and **7 skills** for javascript development.

</div>

---

## 📑 Table of Contents

<details>
<summary>Click to expand</summary>

- [Quick Start](#-quick-start)
- [Features](#-features)
- [Agents](#-agents)
- [Skills](#-skills)
- [Commands](#-commands)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

</details>

---

## 🚀 Quick Start

### Prerequisites

- Claude Code CLI v2.0.27+
- Active Claude subscription

### Installation (Choose One)

<details open>
<summary><strong>Option 1: From Marketplace (Recommended)</strong></summary>

```bash
# Step 1️⃣ Add the marketplace
/plugin add marketplace pluginagentmarketplace/custom-plugin-javascript

# Step 2️⃣ Install the plugin
/plugin install javascript-developer-plugin@pluginagentmarketplace-javascript

# Step 3️⃣ Restart Claude Code
# Close and reopen your terminal/IDE
```

</details>

<details>
<summary><strong>Option 2: Local Installation</strong></summary>

```bash
# Clone the repository
git clone https://github.com/pluginagentmarketplace/custom-plugin-javascript.git
cd custom-plugin-javascript

# Load locally
/plugin load .

# Restart Claude Code
```

</details>

### ✅ Verify Installation

After restart, you should see these agents:

```
javascript-developer-plugin:04-asynchronous-javascript
javascript-developer-plugin:05-dom-browser-apis
javascript-developer-plugin:02-functions-scope
javascript-developer-plugin:01-javascript-fundamentals
javascript-developer-plugin:07-javascript-ecosystem
... and 2 more
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **7 Agents** | Specialized AI agents for javascript tasks |
| 🛠️ **7 Skills** | Reusable capabilities with Golden Format |
| ⌨️ **4 Commands** | Quick slash commands |
| 🔄 **SASMP v1.3.0** | Full protocol compliance |

---

## 🤖 Agents

### 7 Specialized Agents

| # | Agent | Purpose |
|---|-------|---------|
| 1 | **04-asynchronous-javascript** | Master asynchronous JavaScript including callbacks, promises |
| 2 | **05-dom-browser-apis** | Master DOM manipulation and browser APIs. Learn to interact  |
| 3 | **02-functions-scope** | Deep dive into JavaScript functions, scope, closures, and ex |
| 4 | **01-javascript-fundamentals** | Master core JavaScript basics including variables, data type |
| 5 | **07-javascript-ecosystem** | Master JavaScript ecosystem including package managers, buil |
| 6 | **06-modern-es6-advanced** | Master modern ES6+ JavaScript features including classes, mo |
| 7 | **03-objects-arrays** | Master JavaScript objects, arrays, and prototypal inheritanc |

---

## 🛠️ Skills

### Available Skills

| Skill | Description | Invoke |
|-------|-------------|--------|
| `ecosystem` | Master JavaScript ecosystem including npm, build tools (Webp | `Skill("javascript-developer-plugin:ecosystem")` |
| `fundamentals` | Core JavaScript fundamentals including variables, data types | `Skill("javascript-developer-plugin:fundamentals")` |
| `asynchronous` | Master asynchronous JavaScript patterns including callbacks, | `Skill("javascript-developer-plugin:asynchronous")` |
| `data-structures` | Master JavaScript objects and arrays including manipulation  | `Skill("javascript-developer-plugin:data-structures")` |
| `functions` | Advanced function patterns including declaration styles, clo | `Skill("javascript-developer-plugin:functions")` |
| `modern-javascript` | Master modern ES6+ JavaScript features including classes, ar | `Skill("javascript-developer-plugin:modern-javascript")` |
| `dom-apis` | Master DOM manipulation and browser APIs. Learn element sele | `Skill("javascript-developer-plugin:dom-apis")` |

---

## ⌨️ Commands

| Command | Description |
|---------|-------------|
| `/learn` | Start Your JavaScript Journey |
| `/assess` | Evaluate Your JavaScript Knowledge |
| `/browse-agent` | agent - Explore All 7 JavaScript Agents |
| `/projects` | Browse Hands-On JavaScript Projects |

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [LICENSE](LICENSE) | License information |

---

## 📁 Project Structure

<details>
<summary>Click to expand</summary>

```
custom-plugin-javascript/
├── 📁 .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── 📁 agents/              # 7 agents
├── 📁 skills/              # 7 skills (Golden Format)
├── 📁 commands/            # 4 commands
├── 📁 hooks/
├── 📄 README.md
├── 📄 CHANGELOG.md
└── 📄 LICENSE
```

</details>

---

## 📅 Metadata

| Field | Value |
|-------|-------|
| **Version** | 2.0.0 |
| **Last Updated** | 2025-12-29 |
| **Status** | Production Ready |
| **SASMP** | v1.3.0 |
| **Agents** | 7 |
| **Skills** | 7 |
| **Commands** | 4 |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch
3. Follow the Golden Format for new skills
4. Submit a pull request

---

## ⚠️ Security

> **Important:** This repository contains third-party code and dependencies.
>
> - ✅ Always review code before using in production
> - ✅ Check dependencies for known vulnerabilities
> - ✅ Follow security best practices
> - ✅ Report security issues privately via [Issues](../../issues)

---

## 📝 License

Copyright © 2025 **Dr. Umit Kacar** & **Muhsin Elcicek**

Custom License - See [LICENSE](LICENSE) for details.

---

## 👥 Contributors

<table>
<tr>
<td align="center">
<strong>Dr. Umit Kacar</strong><br/>
Senior AI Researcher & Engineer
</td>
<td align="center">
<strong>Muhsin Elcicek</strong><br/>
Senior Software Architect
</td>
</tr>
</table>

---

<div align="center">

**Made with ❤️ for the Claude Code Community**

[![GitHub](https://img.shields.io/badge/GitHub-pluginagentmarketplace-black?style=for-the-badge&logo=github)](https://github.com/pluginagentmarketplace)

</div>
