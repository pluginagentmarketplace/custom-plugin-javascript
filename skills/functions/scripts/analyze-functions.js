#!/usr/bin/env node

/**
 * JavaScript Function Analyzer
 * Analyzes function patterns, complexity, and provides recommendations
 *
 * Usage:
 *   node analyze-functions.js <file.js>
 *   node analyze-functions.js --dir <directory>
 *
 * @author Dr. Umit Kacar & Muhsin Elcicek
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Patterns to detect
const PATTERNS = {
  // Function declarations
  functionDeclaration: /function\s+(\w+)\s*\(([^)]*)\)\s*\{/g,
  functionExpression: /(?:const|let|var)\s+(\w+)\s*=\s*function\s*(?:\w+)?\s*\(([^)]*)\)\s*\{/g,
  arrowFunction: /(?:const|let|var)\s+(\w+)\s*=\s*(?:\(([^)]*)\)|(\w+))\s*=>/g,
  methodShorthand: /(\w+)\s*\(([^)]*)\)\s*\{/g,
  asyncFunction: /async\s+function\s+(\w+)/g,
  asyncArrow: /(?:const|let|var)\s+(\w+)\s*=\s*async\s*(?:\(([^)]*)\)|(\w+))\s*=>/g,
  generatorFunction: /function\s*\*\s*(\w+)/g,

  // Anti-patterns
  varDeclaration: /\bvar\s+\w+/g,
  nestedCallbacks: /\(\s*(?:function|\([^)]*\)\s*=>)[^}]*\(\s*(?:function|\([^)]*\)\s*=>)/g,
  thisInCallback: /\.(?:map|filter|forEach|reduce)\s*\([^)]*function\s*\([^)]*\)[^}]*this\./g,

  // Good patterns
  useStrict: /'use strict'|"use strict"/,
  defaultParams: /\(([^)]*=\s*[^,)]+)/g,
  restParams: /\.\.\.\w+/g,
  destructuring: /\{\s*\w+(?:\s*,\s*\w+)*\s*\}/g,

  // Closures
  closurePattern: /return\s+(?:function|\([^)]*\)\s*=>)/g,

  // Higher-order functions
  higherOrderReturn: /return\s+(?:function|\([^)]*\)\s*=>)/g,
  functionParam: /(?:const|let|var|function)\s+\w+\s*(?:=\s*)?\([^)]*(?:function|\w+\s*=>)/g
};

// Colors for terminal
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

/**
 * Analyze a JavaScript file for function patterns
 */
function analyzeFile(filePath) {
  const results = {
    file: filePath,
    functions: [],
    patterns: {
      declarations: 0,
      expressions: 0,
      arrows: 0,
      async: 0,
      generators: 0,
      closures: 0,
      higherOrder: 0
    },
    issues: [],
    recommendations: [],
    complexity: 0
  };

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Count function types
    results.patterns.declarations = (content.match(PATTERNS.functionDeclaration) || []).length;
    results.patterns.expressions = (content.match(PATTERNS.functionExpression) || []).length;
    results.patterns.arrows = (content.match(PATTERNS.arrowFunction) || []).length;
    results.patterns.async = (content.match(PATTERNS.asyncFunction) || []).length +
                            (content.match(PATTERNS.asyncArrow) || []).length;
    results.patterns.generators = (content.match(PATTERNS.generatorFunction) || []).length;
    results.patterns.closures = (content.match(PATTERNS.closurePattern) || []).length;
    results.patterns.higherOrder = (content.match(PATTERNS.higherOrderReturn) || []).length;

    // Extract function names and analyze each
    const functionDeclarations = [...content.matchAll(PATTERNS.functionDeclaration)];
    const functionExpressions = [...content.matchAll(PATTERNS.functionExpression)];
    const arrowFunctions = [...content.matchAll(PATTERNS.arrowFunction)];

    [...functionDeclarations, ...functionExpressions, ...arrowFunctions].forEach(match => {
      const name = match[1];
      const params = match[2] || match[3] || '';
      const lineNumber = content.substring(0, match.index).split('\n').length;

      results.functions.push({
        name,
        params: params.split(',').map(p => p.trim()).filter(Boolean),
        line: lineNumber,
        type: match[0].includes('=>') ? 'arrow' :
              match[0].includes('const') || match[0].includes('let') ? 'expression' : 'declaration'
      });
    });

    // Check for anti-patterns
    if (PATTERNS.varDeclaration.test(content)) {
      results.issues.push({
        type: 'warning',
        message: 'Found "var" declarations - consider using "const" or "let"',
        count: (content.match(PATTERNS.varDeclaration) || []).length
      });
    }

    if (PATTERNS.nestedCallbacks.test(content)) {
      results.issues.push({
        type: 'warning',
        message: 'Detected nested callbacks - consider using Promises or async/await',
        count: (content.match(PATTERNS.nestedCallbacks) || []).length
      });
    }

    if (PATTERNS.thisInCallback.test(content)) {
      results.issues.push({
        type: 'error',
        message: '"this" used in callback - may be undefined. Use arrow functions instead.',
        count: (content.match(PATTERNS.thisInCallback) || []).length
      });
    }

    // Check for good patterns
    if (!PATTERNS.useStrict.test(content) && !content.includes('import ') && !content.includes('export ')) {
      results.recommendations.push('Consider adding "use strict" directive');
    }

    if (!PATTERNS.defaultParams.test(content) && results.functions.length > 0) {
      results.recommendations.push('Consider using default parameters for optional arguments');
    }

    // Calculate complexity score (simplified)
    results.complexity = calculateComplexity(content);

    // Add recommendations based on patterns
    if (results.patterns.expressions > results.patterns.arrows * 2) {
      results.recommendations.push('Consider using arrow functions for shorter syntax');
    }

    if (results.patterns.closures > 5) {
      results.recommendations.push('High closure usage - ensure proper memory management');
    }

  } catch (error) {
    results.issues.push({
      type: 'error',
      message: `Could not read file: ${error.message}`
    });
  }

  return results;
}

/**
 * Calculate cyclomatic complexity (simplified)
 */
function calculateComplexity(content) {
  const complexityPatterns = [
    /\bif\s*\(/g,
    /\belse\s+if\s*\(/g,
    /\bfor\s*\(/g,
    /\bwhile\s*\(/g,
    /\bswitch\s*\(/g,
    /\bcase\s+/g,
    /\bcatch\s*\(/g,
    /\?\s*[^:]+\s*:/g,  // Ternary
    /&&/g,
    /\|\|/g
  ];

  let complexity = 1; // Base complexity

  complexityPatterns.forEach(pattern => {
    const matches = content.match(pattern) || [];
    complexity += matches.length;
  });

  return complexity;
}

/**
 * Get complexity rating
 */
function getComplexityRating(complexity) {
  if (complexity <= 10) return { rating: 'Low', color: COLORS.green };
  if (complexity <= 20) return { rating: 'Moderate', color: COLORS.yellow };
  if (complexity <= 40) return { rating: 'High', color: COLORS.yellow };
  return { rating: 'Very High', color: COLORS.red };
}

/**
 * Print analysis results
 */
function printResults(results) {
  console.log(`\n${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.cyan}  Function Analysis: ${results.file}${COLORS.reset}`);
  console.log(`${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}\n`);

  // Function counts
  console.log(`${COLORS.blue}Function Patterns:${COLORS.reset}`);
  console.log(`  Declarations:    ${results.patterns.declarations}`);
  console.log(`  Expressions:     ${results.patterns.expressions}`);
  console.log(`  Arrow Functions: ${results.patterns.arrows}`);
  console.log(`  Async Functions: ${results.patterns.async}`);
  console.log(`  Generators:      ${results.patterns.generators}`);
  console.log(`  Closures:        ${results.patterns.closures}`);
  console.log(`  Higher-Order:    ${results.patterns.higherOrder}`);

  // Function list
  if (results.functions.length > 0) {
    console.log(`\n${COLORS.blue}Functions Found (${results.functions.length}):${COLORS.reset}`);
    results.functions.forEach(fn => {
      const params = fn.params.length > 0 ? fn.params.join(', ') : 'none';
      console.log(`  ${COLORS.gray}Line ${fn.line}:${COLORS.reset} ${fn.name}(${params}) [${fn.type}]`);
    });
  }

  // Complexity
  const complexityRating = getComplexityRating(results.complexity);
  console.log(`\n${COLORS.blue}Complexity:${COLORS.reset}`);
  console.log(`  Score: ${results.complexity}`);
  console.log(`  Rating: ${complexityRating.color}${complexityRating.rating}${COLORS.reset}`);

  // Issues
  if (results.issues.length > 0) {
    console.log(`\n${COLORS.red}Issues:${COLORS.reset}`);
    results.issues.forEach(issue => {
      const color = issue.type === 'error' ? COLORS.red : COLORS.yellow;
      console.log(`  ${color}[${issue.type.toUpperCase()}]${COLORS.reset} ${issue.message}`);
      if (issue.count) console.log(`    ${COLORS.gray}Found ${issue.count} occurrence(s)${COLORS.reset}`);
    });
  }

  // Recommendations
  if (results.recommendations.length > 0) {
    console.log(`\n${COLORS.green}Recommendations:${COLORS.reset}`);
    results.recommendations.forEach(rec => {
      console.log(`  ${COLORS.green}→${COLORS.reset} ${rec}`);
    });
  }

  console.log();
}

/**
 * Analyze directory
 */
function analyzeDirectory(dirPath) {
  const results = [];
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results.push(...analyzeDirectory(fullPath));
    } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
      results.push(analyzeFile(fullPath));
    }
  });

  return results;
}

/**
 * Print summary for multiple files
 */
function printSummary(allResults) {
  console.log(`\n${COLORS.magenta}═══════════════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.magenta}  SUMMARY${COLORS.reset}`);
  console.log(`${COLORS.magenta}═══════════════════════════════════════════════════════════${COLORS.reset}\n`);

  const totals = {
    files: allResults.length,
    functions: 0,
    declarations: 0,
    expressions: 0,
    arrows: 0,
    issues: 0,
    avgComplexity: 0
  };

  allResults.forEach(r => {
    totals.functions += r.functions.length;
    totals.declarations += r.patterns.declarations;
    totals.expressions += r.patterns.expressions;
    totals.arrows += r.patterns.arrows;
    totals.issues += r.issues.length;
    totals.avgComplexity += r.complexity;
  });

  totals.avgComplexity = Math.round(totals.avgComplexity / allResults.length);

  console.log(`  Files analyzed:     ${totals.files}`);
  console.log(`  Total functions:    ${totals.functions}`);
  console.log(`  Declarations:       ${totals.declarations}`);
  console.log(`  Expressions:        ${totals.expressions}`);
  console.log(`  Arrow functions:    ${totals.arrows}`);
  console.log(`  Total issues:       ${totals.issues}`);
  console.log(`  Avg complexity:     ${totals.avgComplexity}`);

  const rating = getComplexityRating(totals.avgComplexity);
  console.log(`  Complexity rating:  ${rating.color}${rating.rating}${COLORS.reset}\n`);
}

// Main
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node analyze-functions.js <file.js>');
    console.log('  node analyze-functions.js --dir <directory>');
    process.exit(0);
  }

  let results = [];

  if (args[0] === '--dir') {
    const dir = args[1] || '.';
    console.log(`${COLORS.cyan}Analyzing directory: ${dir}${COLORS.reset}`);
    results = analyzeDirectory(dir);
    results.forEach(printResults);
    printSummary(results);
  } else {
    results = [analyzeFile(args[0])];
    printResults(results[0]);
  }

  // Exit with error if issues found
  const hasErrors = results.some(r => r.issues.some(i => i.type === 'error'));
  process.exit(hasErrors ? 1 : 0);
}

module.exports = { analyzeFile, analyzeDirectory, calculateComplexity };

if (require.main === module) {
  main();
}
