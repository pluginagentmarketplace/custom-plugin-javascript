---
name: ecosystem
description: Master JavaScript ecosystem including npm, build tools (Webpack, Vite), testing (Jest), linting, Git workflow, and framework integration.
---

# JavaScript Ecosystem Skill

## Quick Start

Modern JavaScript development uses a rich ecosystem of tools:

```bash
# Project setup
npm init -y
npm install express cors dotenv

# Development
npm run dev

# Build & test
npm run build
npm test

# Version & publish
npm version patch
npm publish
```

## Package Management with npm

### npm Basics

```bash
# Initialize project
npm init                    # Interactive setup
npm init -y                 # Use defaults

# Install packages
npm install package-name    # Latest version
npm install package@1.2.3   # Specific version
npm install --save-dev pkg  # Dev dependency
npm install -g package      # Global installation

# Update and manage
npm update package-name
npm uninstall package-name
npm list                    # Show installed packages
npm outdated                # Check for updates

# Clean and audit
npm cache clean --force
npm audit                   # Check vulnerabilities
npm audit fix               # Automatically fix issues
```

### package.json Structure

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My awesome project",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack",
    "test": "jest",
    "lint": "eslint src/**/*.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "webpack": "^5.0.0",
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

## Build Tools

### Webpack Configuration

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',  // or 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  }
};
```

### Vite (Modern Alternative)

```bash
# Create new project
npm create vite@latest my-project -- --template react
cd my-project
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Testing Frameworks

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/**/*.test.{js,jsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Writing Tests

```javascript
// math.test.js
describe('Math operations', () => {
  test('addition works', () => {
    expect(2 + 2).toBe(4);
  });

  test('array operations', () => {
    expect([1, 2, 3]).toContain(2);
    expect([1, 2, 3]).toHaveLength(3);
  });

  test('async operations', async () => {
    const data = await fetchUser(1);
    expect(data.id).toBe(1);
  });

  test('mocking functions', () => {
    const mockFn = jest.fn().mockReturnValue(42);
    expect(mockFn()).toBe(42);
    expect(mockFn).toHaveBeenCalled();
  });

  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });
});
```

## Linting and Formatting

### ESLint Configuration

```javascript
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "eqeqeq": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2]
  }
}
```

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}
```

### Pre-commit Hooks with husky

```bash
npm install husky lint-staged --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run lint-staged"
```

```json
{
  "lint-staged": {
    "*.js": "eslint --fix",
    "*.{js,css,md}": "prettier --write"
  }
}
```

## Git Workflow

```bash
# Initialize and configure
git init
git config user.name "Your Name"
git config user.email "your@email.com"

# Basic workflow
git status                              # Check status
git add .                               # Stage all changes
git commit -m "Description"             # Create commit
git push origin branch-name             # Push to remote

# Branching
git branch -a                           # List all branches
git branch feature/my-feature           # Create branch
git checkout feature/my-feature         # Switch branch
git switch -c feature/my-feature        # Modern way
git merge feature/my-feature            # Merge branch

# Viewing history
git log                                 # Full history
git log --oneline -10                   # Last 10 commits
git log --graph --oneline --all        # Visual history
git diff                                # Changes not staged
git diff --staged                       # Changes staged

# Undoing changes
git restore file.js                     # Discard changes
git restore --staged file.js            # Unstage file
git revert HEAD                         # Create undo commit
git reset --soft HEAD~1                 # Undo commit, keep changes
```

## Deploying Applications

### Environment Variables

```javascript
// .env file
DATABASE_URL=mongodb://localhost:27017/db
API_KEY=your-secret-key
NODE_ENV=production

// .env.example (commit this)
DATABASE_URL=
API_KEY=
NODE_ENV=

// Access in code
require('dotenv').config();
const dbUrl = process.env.DATABASE_URL;
```

### Package Management

```bash
# Production dependencies
npm install express cors mongoose

# Development dependencies
npm install --save-dev nodemon jest eslint

# Lock file for reproducible installs
git commit package-lock.json
```

### Common Deployment Platforms

```bash
# Vercel (Recommended for Next.js/React)
npm install -g vercel
vercel deploy

# Heroku (Node.js/Express)
npm install -g heroku
heroku login
heroku create my-app
git push heroku main

# AWS/DigitalOcean/Other VPS
# Use traditional git push or CI/CD pipeline
```

## Performance Optimization

### Code Splitting

```javascript
// Dynamic imports (React example)
import React from 'react';

const HeavyComponent = React.lazy(() =>
  import('./HeavyComponent')
);

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

### Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer

# In webpack.config.js
const BundleAnalyzerPlugin = require(
  'webpack-bundle-analyzer'
).BundleAnalyzerPlugin;

plugins: [
  new BundleAnalyzerPlugin()
]
```

## Continuous Integration/Deployment

### GitHub Actions Example

```yaml
# .github/workflows/tests.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

## Common Commands Reference

```bash
# Setup
npm init -y
npm install react react-dom

# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run test          # Run tests
npm run lint          # Lint code

# Publishing
npm version patch     # Bump version
npm publish           # Publish to npm

# Maintenance
npm audit fix         # Fix vulnerabilities
npm prune             # Remove unused packages
npm cache clean       # Clear cache
```

## Practice Recommendations

1. **Project setup** - Initialize and configure new projects
2. **Testing** - Write comprehensive unit and integration tests
3. **CI/CD** - Set up automated testing and deployment
4. **Performance** - Analyze and optimize bundles
5. **Git workflow** - Use proper branching and commit practices
6. **Deployment** - Deploy to various platforms

## Resources

- npm docs: https://docs.npmjs.com
- Webpack: https://webpack.js.org
- Jest: https://jestjs.io
- ESLint: https://eslint.org
- Vite: https://vitejs.dev

## Next Steps

- Master one framework (React, Vue, Angular)
- Learn backend with Node.js/Express
- Implement CI/CD pipelines
- Deploy applications to production
- Contribute to open source projects
