#!/usr/bin/env node

/**
 * JavaScript Project Health Checker
 * Analyzes project structure, dependencies, and configuration
 *
 * @author Dr. Umit Kacar & Muhsin Elcicek
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function checkFile(filePath) {
  return fs.existsSync(filePath);
}

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function analyzeProject(projectPath = '.') {
  const results = {
    score: 0,
    maxScore: 100,
    checks: []
  };

  // Package.json check
  const pkgPath = path.join(projectPath, 'package.json');
  if (checkFile(pkgPath)) {
    results.checks.push({ name: 'package.json', status: 'pass', points: 10 });
    results.score += 10;

    const pkg = readJSON(pkgPath);
    if (pkg) {
      // Scripts check
      if (pkg.scripts?.test) {
        results.checks.push({ name: 'Test script', status: 'pass', points: 10 });
        results.score += 10;
      } else {
        results.checks.push({ name: 'Test script', status: 'fail', points: 0 });
      }

      // Engine specification
      if (pkg.engines?.node) {
        results.checks.push({ name: 'Node engine specified', status: 'pass', points: 5 });
        results.score += 5;
      }
    }
  } else {
    results.checks.push({ name: 'package.json', status: 'fail', points: 0 });
  }

  // Lock file check
  const hasNpmLock = checkFile(path.join(projectPath, 'package-lock.json'));
  const hasYarnLock = checkFile(path.join(projectPath, 'yarn.lock'));
  const hasPnpmLock = checkFile(path.join(projectPath, 'pnpm-lock.yaml'));

  if (hasNpmLock || hasYarnLock || hasPnpmLock) {
    results.checks.push({ name: 'Lock file', status: 'pass', points: 10 });
    results.score += 10;
  } else {
    results.checks.push({ name: 'Lock file', status: 'fail', points: 0 });
  }

  // ESLint config
  const eslintConfigs = ['.eslintrc', '.eslintrc.js', '.eslintrc.json', 'eslint.config.js'];
  if (eslintConfigs.some(f => checkFile(path.join(projectPath, f)))) {
    results.checks.push({ name: 'ESLint config', status: 'pass', points: 10 });
    results.score += 10;
  } else {
    results.checks.push({ name: 'ESLint config', status: 'warn', points: 0 });
  }

  // Prettier config
  const prettierConfigs = ['.prettierrc', '.prettierrc.js', 'prettier.config.js'];
  if (prettierConfigs.some(f => checkFile(path.join(projectPath, f)))) {
    results.checks.push({ name: 'Prettier config', status: 'pass', points: 5 });
    results.score += 5;
  }

  // TypeScript
  if (checkFile(path.join(projectPath, 'tsconfig.json'))) {
    results.checks.push({ name: 'TypeScript config', status: 'pass', points: 10 });
    results.score += 10;
  }

  // README
  if (checkFile(path.join(projectPath, 'README.md'))) {
    results.checks.push({ name: 'README.md', status: 'pass', points: 10 });
    results.score += 10;
  } else {
    results.checks.push({ name: 'README.md', status: 'warn', points: 0 });
  }

  // .gitignore
  if (checkFile(path.join(projectPath, '.gitignore'))) {
    results.checks.push({ name: '.gitignore', status: 'pass', points: 5 });
    results.score += 5;
  }

  // LICENSE
  if (checkFile(path.join(projectPath, 'LICENSE'))) {
    results.checks.push({ name: 'LICENSE', status: 'pass', points: 5 });
    results.score += 5;
  }

  return results;
}

function printReport(results) {
  console.log(`\n${COLORS.cyan}═══════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.cyan}  PROJECT HEALTH REPORT${COLORS.reset}`);
  console.log(`${COLORS.cyan}═══════════════════════════════════════${COLORS.reset}\n`);

  results.checks.forEach(check => {
    const icon = check.status === 'pass' ? `${COLORS.green}✓` :
                 check.status === 'warn' ? `${COLORS.yellow}⚠` :
                 `${COLORS.red}✗`;
    console.log(`${icon} ${check.name}${COLORS.reset}`);
  });

  const percentage = Math.round((results.score / results.maxScore) * 100);
  const color = percentage >= 80 ? COLORS.green :
                percentage >= 50 ? COLORS.yellow : COLORS.red;

  console.log(`\n${color}Score: ${results.score}/${results.maxScore} (${percentage}%)${COLORS.reset}\n`);
}

// Run
const projectPath = process.argv[2] || '.';
const results = analyzeProject(projectPath);
printReport(results);
