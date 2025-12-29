#!/usr/bin/env node

/**
 * JavaScript Fundamentals Validator
 * Validates JavaScript code for best practices and common issues
 *
 * Usage:
 *   node validate-fundamentals.js <file.js>
 *   node validate-fundamentals.js --dir <directory>
 *
 * @author Dr. Umit Kacar & Muhsin Elcicek
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Validation Rules
const RULES = {
  // Variable declaration rules
  noVar: {
    pattern: /\bvar\s+\w+/g,
    message: 'Avoid "var" - use "const" or "let" instead',
    severity: 'error',
    autofix: (match) => match.replace('var', 'let')
  },

  // Prefer const
  preferConst: {
    pattern: /\blet\s+(\w+)\s*=\s*[^;]+;\s*(?![\s\S]*\1\s*=)/g,
    message: 'Consider using "const" for variables that are never reassigned',
    severity: 'warning'
  },

  // Strict equality
  looseEquality: {
    pattern: /[^!=]==(?!=)|[^!]=(?!=)/g,
    message: 'Use strict equality (=== or !==) instead of loose equality',
    severity: 'error',
    exceptions: ['== null', '!= null'] // null check exception
  },

  // Console statements
  consoleLog: {
    pattern: /console\.(log|warn|error|info|debug)\s*\(/g,
    message: 'Remove console statements in production code',
    severity: 'warning'
  },

  // Unused variables (simplified check)
  unusedVars: {
    pattern: /(?:const|let|var)\s+(\w+)\s*=/g,
    message: 'Potentially unused variable',
    severity: 'info',
    checkUsage: true
  },

  // Magic numbers
  magicNumbers: {
    pattern: /(?<![\w.])(?:[2-9]|\d{2,})(?![\w.])/g,
    message: 'Consider using named constants instead of magic numbers',
    severity: 'info',
    exceptions: [0, 1, -1, 100]
  },

  // Template literals
  stringConcatenation: {
    pattern: /["']\s*\+\s*\w+\s*\+\s*["']/g,
    message: 'Consider using template literals instead of string concatenation',
    severity: 'warning'
  },

  // Arrow functions
  functionExpression: {
    pattern: /function\s*\(\s*\)\s*{/g,
    message: 'Consider using arrow functions for anonymous functions',
    severity: 'info'
  },

  // typeof checks
  typeofUndefined: {
    pattern: /typeof\s+\w+\s*===?\s*["']undefined["']/g,
    message: 'Consider using optional chaining (?.) or nullish coalescing (??)',
    severity: 'info'
  }
};

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// Severity colors
const SEVERITY_COLORS = {
  error: COLORS.red,
  warning: COLORS.yellow,
  info: COLORS.cyan
};

/**
 * Validate a single JavaScript file
 * @param {string} filePath - Path to the JavaScript file
 * @returns {Object} Validation results
 */
function validateFile(filePath) {
  const results = {
    file: filePath,
    errors: [],
    warnings: [],
    info: [],
    passed: true
  };

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Apply each rule
    Object.entries(RULES).forEach(([ruleName, rule]) => {
      let match;
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        // Find line number
        const lineNumber = content.substring(0, match.index).split('\n').length;
        const column = match.index - content.lastIndexOf('\n', match.index - 1);

        const issue = {
          rule: ruleName,
          message: rule.message,
          line: lineNumber,
          column: column,
          match: match[0],
          severity: rule.severity
        };

        // Add to appropriate array
        if (rule.severity === 'error') {
          results.errors.push(issue);
          results.passed = false;
        } else if (rule.severity === 'warning') {
          results.warnings.push(issue);
        } else {
          results.info.push(issue);
        }
      }
    });

    // Additional checks
    checkBestPractices(content, lines, results);

  } catch (error) {
    results.errors.push({
      rule: 'file-read',
      message: `Could not read file: ${error.message}`,
      severity: 'error'
    });
    results.passed = false;
  }

  return results;
}

/**
 * Check for additional best practices
 */
function checkBestPractices(content, lines, results) {
  // Check for 'use strict' in non-module files
  if (!content.includes('use strict') && !content.includes('import ') && !content.includes('export ')) {
    results.warnings.push({
      rule: 'use-strict',
      message: 'Consider adding "use strict" directive',
      line: 1,
      severity: 'warning'
    });
  }

  // Check for very long lines
  lines.forEach((line, index) => {
    if (line.length > 120) {
      results.info.push({
        rule: 'line-length',
        message: `Line exceeds 120 characters (${line.length})`,
        line: index + 1,
        severity: 'info'
      });
    }
  });

  // Check for deeply nested code (simplified)
  const maxNesting = 4;
  let currentNesting = 0;
  let maxFound = 0;

  content.split('').forEach((char, i) => {
    if (char === '{') currentNesting++;
    if (char === '}') currentNesting--;
    if (currentNesting > maxFound) maxFound = currentNesting;
  });

  if (maxFound > maxNesting) {
    results.warnings.push({
      rule: 'nesting-depth',
      message: `Code is deeply nested (${maxFound} levels). Consider refactoring.`,
      severity: 'warning'
    });
  }
}

/**
 * Format and print results
 */
function printResults(results) {
  console.log(`\n${COLORS.cyan}Validating: ${results.file}${COLORS.reset}\n`);

  const allIssues = [
    ...results.errors,
    ...results.warnings,
    ...results.info
  ].sort((a, b) => (a.line || 0) - (b.line || 0));

  if (allIssues.length === 0) {
    console.log(`${COLORS.green}  No issues found.${COLORS.reset}`);
  } else {
    allIssues.forEach(issue => {
      const color = SEVERITY_COLORS[issue.severity];
      const location = issue.line ? `Line ${issue.line}` : 'File';
      console.log(`  ${color}[${issue.severity.toUpperCase()}]${COLORS.reset} ${location}: ${issue.message}`);
      if (issue.match) {
        console.log(`    ${COLORS.gray}Found: "${issue.match}"${COLORS.reset}`);
      }
    });
  }

  // Summary
  console.log(`\n${COLORS.cyan}Summary:${COLORS.reset}`);
  console.log(`  Errors: ${results.errors.length}`);
  console.log(`  Warnings: ${results.warnings.length}`);
  console.log(`  Info: ${results.info.length}`);
  console.log(`  Status: ${results.passed ? COLORS.green + 'PASSED' : COLORS.red + 'FAILED'}${COLORS.reset}\n`);
}

/**
 * Validate directory recursively
 */
function validateDirectory(dirPath) {
  const results = [];
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results.push(...validateDirectory(fullPath));
    } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
      results.push(validateFile(fullPath));
    }
  });

  return results;
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node validate-fundamentals.js <file.js>');
    console.log('  node validate-fundamentals.js --dir <directory>');
    process.exit(0);
  }

  let results = [];

  if (args[0] === '--dir') {
    const dir = args[1] || '.';
    console.log(`${COLORS.cyan}Validating directory: ${dir}${COLORS.reset}`);
    results = validateDirectory(dir);
  } else {
    results = [validateFile(args[0])];
  }

  results.forEach(printResults);

  // Exit with error code if any file failed
  const failed = results.some(r => !r.passed);
  process.exit(failed ? 1 : 0);
}

// Export for module usage
module.exports = { validateFile, validateDirectory, RULES };

// Run if called directly
if (require.main === module) {
  main();
}
