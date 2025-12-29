#!/usr/bin/env node

/**
 * ES6+ Code Pattern Analyzer & Converter
 * Analyzes JavaScript code and suggests modern ES6+ improvements
 *
 * Usage:
 *   node es6-converter.js <file.js>
 *   node es6-converter.js src/app.js --fix
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
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

/**
 * Pattern definitions for ES5 to ES6+ conversion
 */
const PATTERNS = {
  // var to let/const
  varDeclaration: {
    name: 'var → let/const',
    pattern: /\bvar\s+(\w+)\s*=/g,
    severity: 'warning',
    message: 'Use let or const instead of var',
    suggestion: (match, varName) => `const ${varName} =`
  },

  // Function to arrow function
  functionExpression: {
    name: 'function → arrow',
    pattern: /(\w+)\s*:\s*function\s*\(([^)]*)\)\s*\{/g,
    severity: 'info',
    message: 'Consider using arrow function syntax',
    suggestion: (match, name, params) => `${name}: (${params}) => {`
  },

  // Anonymous function to arrow
  anonymousFunction: {
    name: 'anonymous → arrow',
    pattern: /function\s*\(([^)]*)\)\s*\{([^}]{0,50})\}/g,
    severity: 'info',
    message: 'Consider using arrow function',
    checkContext: true
  },

  // String concatenation to template literal
  stringConcat: {
    name: 'concat → template',
    pattern: /(['"])([^'"]*)\1\s*\+\s*(\w+)\s*\+\s*(['"])([^'"]*)\4/g,
    severity: 'info',
    message: 'Use template literals instead of string concatenation'
  },

  // Object property shorthand
  propertyLonghand: {
    name: 'property shorthand',
    pattern: /(\w+)\s*:\s*\1(?=[,}])/g,
    severity: 'info',
    message: 'Use shorthand property syntax',
    suggestion: (match, prop) => prop
  },

  // .bind(this) to arrow
  bindThis: {
    name: '.bind(this) → arrow',
    pattern: /\.bind\(this\)/g,
    severity: 'warning',
    message: 'Use arrow function instead of .bind(this)'
  },

  // Object.assign to spread
  objectAssign: {
    name: 'Object.assign → spread',
    pattern: /Object\.assign\s*\(\s*\{\s*\}\s*,/g,
    severity: 'info',
    message: 'Consider using object spread operator',
    suggestion: '{ ...'
  },

  // Array.prototype.concat to spread
  arrayConcat: {
    name: '.concat() → spread',
    pattern: /(\w+)\.concat\((\w+)\)/g,
    severity: 'info',
    message: 'Consider using array spread operator',
    suggestion: (match, arr1, arr2) => `[...${arr1}, ...${arr2}]`
  },

  // arguments to rest parameters
  argumentsKeyword: {
    name: 'arguments → rest',
    pattern: /\barguments\b/g,
    severity: 'warning',
    message: 'Use rest parameters instead of arguments object'
  },

  // indexOf !== -1 to includes
  indexOfCheck: {
    name: 'indexOf → includes',
    pattern: /\.indexOf\(([^)]+)\)\s*(!==?|===?)\s*-1/g,
    severity: 'info',
    message: 'Use .includes() for existence check'
  },

  // for loop to for...of
  forLoop: {
    name: 'for → for...of',
    pattern: /for\s*\(\s*(?:var|let)\s+(\w+)\s*=\s*0\s*;\s*\1\s*<\s*(\w+)\.length\s*;\s*\1\+\+\s*\)/g,
    severity: 'info',
    message: 'Consider using for...of loop'
  },

  // callback to Promise/async
  callbackPattern: {
    name: 'callback → Promise',
    pattern: /function\s*\([^)]*,\s*(callback|cb|done)\s*\)/g,
    severity: 'info',
    message: 'Consider using Promises or async/await'
  },

  // == to ===
  looseEquality: {
    name: '== → ===',
    pattern: /[^!=]==[^=]/g,
    severity: 'warning',
    message: 'Use strict equality (===) instead of loose equality (==)'
  },

  // != to !==
  looseInequality: {
    name: '!= → !==',
    pattern: /!=[^=]/g,
    severity: 'warning',
    message: 'Use strict inequality (!==) instead of loose inequality (!=)'
  },

  // console.log (for production)
  consoleLog: {
    name: 'console.log',
    pattern: /console\.(log|warn|error|info|debug)\(/g,
    severity: 'info',
    message: 'Remove or replace console statements in production'
  },

  // require to import (ES modules)
  requireStatement: {
    name: 'require → import',
    pattern: /(?:const|let|var)\s+(\w+)\s*=\s*require\s*\(\s*(['"][^'"]+['"])\s*\)/g,
    severity: 'info',
    message: 'Consider using ES module import syntax',
    suggestion: (match, name, module) => `import ${name} from ${module}`
  },

  // module.exports to export
  moduleExports: {
    name: 'module.exports → export',
    pattern: /module\.exports\s*=/g,
    severity: 'info',
    message: 'Consider using ES module export syntax'
  },

  // Nullish coalescing opportunity
  orDefault: {
    name: '|| → ??',
    pattern: /(\w+)\s*\|\|\s*(['"][^'"]*['"]|\d+|true|false|null|\[\]|\{\})/g,
    severity: 'info',
    message: 'Consider using nullish coalescing (??) if only null/undefined should trigger default'
  },

  // Optional chaining opportunity
  nestedAccess: {
    name: 'nested && → ?.',
    pattern: /(\w+)\s*&&\s*\1\.(\w+)\s*&&\s*\1\.\2\.(\w+)/g,
    severity: 'info',
    message: 'Consider using optional chaining (?.)'
  }
};

/**
 * Analyze JavaScript file for ES6+ patterns
 */
function analyzeFile(code, filename) {
  const results = {
    filename,
    totalIssues: 0,
    byCategory: {
      error: [],
      warning: [],
      info: []
    },
    suggestions: []
  };

  const lines = code.split('\n');

  for (const [patternName, config] of Object.entries(PATTERNS)) {
    let match;
    const regex = new RegExp(config.pattern.source, config.pattern.flags);

    while ((match = regex.exec(code)) !== null) {
      const lineNumber = code.substring(0, match.index).split('\n').length;
      const line = lines[lineNumber - 1];

      const issue = {
        pattern: config.name,
        message: config.message,
        line: lineNumber,
        column: match.index - code.lastIndexOf('\n', match.index - 1),
        match: match[0],
        context: line.trim()
      };

      if (config.suggestion) {
        issue.suggestion = typeof config.suggestion === 'function'
          ? config.suggestion(...match)
          : config.suggestion;
      }

      results.byCategory[config.severity].push(issue);
      results.totalIssues++;
    }
  }

  return results;
}

/**
 * Generate report
 */
function generateReport(results) {
  console.log(`\n${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.cyan}  ES6+ CODE ANALYSIS REPORT${COLORS.reset}`);
  console.log(`${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}\n`);

  console.log(`${COLORS.blue}File:${COLORS.reset} ${results.filename}`);
  console.log(`${COLORS.blue}Total Issues:${COLORS.reset} ${results.totalIssues}\n`);

  // Warnings
  if (results.byCategory.warning.length > 0) {
    console.log(`${COLORS.yellow}⚠️  WARNINGS (${results.byCategory.warning.length})${COLORS.reset}`);
    console.log(`${'─'.repeat(50)}`);
    results.byCategory.warning.forEach((issue, i) => {
      console.log(`\n${i + 1}. ${COLORS.yellow}${issue.pattern}${COLORS.reset} (line ${issue.line})`);
      console.log(`   ${issue.message}`);
      console.log(`   ${COLORS.gray}${issue.context}${COLORS.reset}`);
      if (issue.suggestion) {
        console.log(`   ${COLORS.green}→ ${issue.suggestion}${COLORS.reset}`);
      }
    });
    console.log();
  }

  // Info/Suggestions
  if (results.byCategory.info.length > 0) {
    console.log(`${COLORS.blue}💡 SUGGESTIONS (${results.byCategory.info.length})${COLORS.reset}`);
    console.log(`${'─'.repeat(50)}`);
    results.byCategory.info.forEach((issue, i) => {
      console.log(`\n${i + 1}. ${COLORS.blue}${issue.pattern}${COLORS.reset} (line ${issue.line})`);
      console.log(`   ${issue.message}`);
      console.log(`   ${COLORS.gray}${issue.context}${COLORS.reset}`);
      if (issue.suggestion) {
        console.log(`   ${COLORS.green}→ ${issue.suggestion}${COLORS.reset}`);
      }
    });
    console.log();
  }

  // Summary
  console.log(`${'─'.repeat(50)}`);
  const warningCount = results.byCategory.warning.length;
  const infoCount = results.byCategory.info.length;

  if (results.totalIssues === 0) {
    console.log(`${COLORS.green}✅ No ES6+ improvement suggestions!${COLORS.reset}`);
  } else {
    console.log(`${COLORS.yellow}${warningCount} warning(s)${COLORS.reset}, ${COLORS.blue}${infoCount} suggestion(s)${COLORS.reset}`);
  }

  return results.byCategory.warning.length === 0;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help')) {
    console.log(`
${COLORS.cyan}ES6+ Code Analyzer${COLORS.reset}

Analyzes JavaScript code and suggests modern ES6+ improvements.

Usage:
  node es6-converter.js <file.js>

Checks for:
  • var → let/const
  • function → arrow functions
  • String concatenation → template literals
  • Object.assign → spread operator
  • .indexOf() !== -1 → .includes()
  • require → import (ES modules)
  • == → === (strict equality)
  • .bind(this) → arrow functions
  • for loops → for...of
  • And more...

Examples:
  node es6-converter.js app.js
  node es6-converter.js src/utils.js
`);
    process.exit(0);
  }

  const filePath = args[0];

  if (!fs.existsSync(filePath)) {
    console.error(`${COLORS.red}Error: File not found: ${filePath}${COLORS.reset}`);
    process.exit(1);
  }

  const code = fs.readFileSync(filePath, 'utf-8');
  const results = analyzeFile(code, filePath);
  const passed = generateReport(results);

  process.exit(passed ? 0 : 1);
}

// Export for testing
module.exports = { analyzeFile, PATTERNS };

// Run if called directly
if (require.main === module) {
  main();
}
