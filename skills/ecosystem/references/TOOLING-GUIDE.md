# JavaScript Tooling Guide

> Essential tools for modern JavaScript development

## Package Managers

| Tool | Lock File | Speed | Disk Usage |
|------|-----------|-------|------------|
| npm | package-lock.json | Medium | High |
| yarn | yarn.lock | Fast | High |
| pnpm | pnpm-lock.yaml | Fastest | Low |

### Quick Commands

```bash
# npm
npm install           # Install dependencies
npm install -D pkg    # Dev dependency
npm run build         # Run script

# pnpm (recommended)
pnpm install
pnpm add -D pkg
pnpm build
```

## Build Tools

### Vite (Recommended for new projects)
```bash
npm create vite@latest my-app
cd my-app && npm install && npm run dev
```

### Webpack (Legacy/Complex apps)
```bash
npm install webpack webpack-cli -D
```

## Testing

| Tool | Use Case |
|------|----------|
| Vitest | Unit tests (Vite projects) |
| Jest | Unit tests (General) |
| Playwright | E2E testing |

```bash
# Vitest
npm install -D vitest
npx vitest

# Jest
npm install -D jest
npx jest
```

## Code Quality

```bash
# ESLint + Prettier
npm install -D eslint prettier eslint-config-prettier

# TypeScript
npm install -D typescript @types/node
npx tsc --init
```

## Project Structure

```
my-project/
├── src/
│   ├── index.js
│   └── utils/
├── tests/
├── package.json
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
└── README.md
```

---

**Author:** Dr. Umit Kacar & Muhsin Elcicek
