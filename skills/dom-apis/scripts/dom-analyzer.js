#!/usr/bin/env node

/**
 * DOM Structure Analyzer
 * Analyzes HTML files for DOM patterns, accessibility, and performance
 *
 * Usage:
 *   node dom-analyzer.js <html-file>
 *   node dom-analyzer.js index.html --check-a11y
 *   node dom-analyzer.js index.html --performance
 *
 * @author Dr. Umit Kacar & Muhsin Elcicek
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Colors for output
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
 * Simple HTML parser for analysis
 */
class HTMLAnalyzer {
  constructor(html) {
    this.html = html;
    this.issues = [];
    this.stats = {
      elements: 0,
      ids: new Set(),
      classes: new Set(),
      eventHandlers: [],
      images: [],
      links: [],
      forms: [],
      headings: { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 },
      depth: 0,
      maxDepth: 0
    };
  }

  /**
   * Parse and analyze HTML
   */
  analyze() {
    this.countElements();
    this.extractIds();
    this.extractClasses();
    this.checkInlineHandlers();
    this.analyzeImages();
    this.analyzeLinks();
    this.analyzeForms();
    this.analyzeHeadings();
    this.estimateDepth();

    return {
      stats: this.stats,
      issues: this.issues
    };
  }

  /**
   * Count total elements
   */
  countElements() {
    const tagPattern = /<([a-z][a-z0-9]*)\b[^>]*>/gi;
    const matches = this.html.match(tagPattern) || [];
    this.stats.elements = matches.length;
  }

  /**
   * Extract all IDs
   */
  extractIds() {
    const idPattern = /\bid=["']([^"']+)["']/gi;
    let match;
    const idCounts = {};

    while ((match = idPattern.exec(this.html)) !== null) {
      const id = match[1];
      this.stats.ids.add(id);
      idCounts[id] = (idCounts[id] || 0) + 1;
    }

    // Check for duplicate IDs
    for (const [id, count] of Object.entries(idCounts)) {
      if (count > 1) {
        this.issues.push({
          type: 'error',
          category: 'dom',
          message: `Duplicate ID found: "${id}" (${count} times)`,
          fix: 'IDs must be unique in the document'
        });
      }
    }
  }

  /**
   * Extract all classes
   */
  extractClasses() {
    const classPattern = /\bclass=["']([^"']+)["']/gi;
    let match;

    while ((match = classPattern.exec(this.html)) !== null) {
      const classes = match[1].split(/\s+/);
      classes.forEach(cls => {
        if (cls) this.stats.classes.add(cls);
      });
    }
  }

  /**
   * Check for inline event handlers
   */
  checkInlineHandlers() {
    const handlerPattern = /\bon(click|change|submit|load|focus|blur|keydown|keyup|mouseover|mouseout)=["'][^"']*["']/gi;
    let match;

    while ((match = handlerPattern.exec(this.html)) !== null) {
      this.stats.eventHandlers.push(match[0]);
    }

    if (this.stats.eventHandlers.length > 0) {
      this.issues.push({
        type: 'warning',
        category: 'performance',
        message: `Found ${this.stats.eventHandlers.length} inline event handlers`,
        fix: 'Use addEventListener() for better separation of concerns'
      });
    }
  }

  /**
   * Analyze images
   */
  analyzeImages() {
    const imgPattern = /<img\b([^>]*)>/gi;
    let match;

    while ((match = imgPattern.exec(this.html)) !== null) {
      const attrs = match[1];
      const img = {
        hasAlt: /\balt=/.test(attrs),
        hasSrc: /\bsrc=/.test(attrs),
        hasWidth: /\bwidth=/.test(attrs),
        hasHeight: /\bheight=/.test(attrs),
        hasLoading: /\bloading=/.test(attrs)
      };
      this.stats.images.push(img);

      if (!img.hasAlt) {
        this.issues.push({
          type: 'error',
          category: 'a11y',
          message: 'Image missing alt attribute',
          fix: 'Add alt="" for decorative images or descriptive alt for meaningful images'
        });
      }

      if (!img.hasWidth || !img.hasHeight) {
        this.issues.push({
          type: 'warning',
          category: 'performance',
          message: 'Image missing width/height attributes',
          fix: 'Add dimensions to prevent layout shift (CLS)'
        });
      }
    }
  }

  /**
   * Analyze links
   */
  analyzeLinks() {
    const linkPattern = /<a\b([^>]*)>([^<]*)<\/a>/gi;
    let match;

    while ((match = linkPattern.exec(this.html)) !== null) {
      const attrs = match[1];
      const text = match[2].trim();

      const link = {
        hasHref: /\bhref=/.test(attrs),
        isExternal: /\bhref=["']https?:\/\//.test(attrs),
        hasTarget: /\btarget=/.test(attrs),
        hasRel: /\brel=/.test(attrs),
        text: text
      };
      this.stats.links.push(link);

      // Check for empty links
      if (!text && !/\baria-label=/.test(attrs)) {
        this.issues.push({
          type: 'error',
          category: 'a11y',
          message: 'Link has no accessible name',
          fix: 'Add link text or aria-label'
        });
      }

      // Check external links
      if (link.isExternal && link.hasTarget && !link.hasRel) {
        this.issues.push({
          type: 'warning',
          category: 'security',
          message: 'External link with target="_blank" missing rel="noopener"',
          fix: 'Add rel="noopener noreferrer" for security'
        });
      }
    }
  }

  /**
   * Analyze forms
   */
  analyzeForms() {
    const formPattern = /<form\b([^>]*)>/gi;
    const inputPattern = /<input\b([^>]*)>/gi;
    const labelPattern = /<label\b([^>]*)>/gi;

    // Count forms
    const forms = this.html.match(formPattern) || [];
    this.stats.forms = forms.length;

    // Check inputs for labels
    let match;
    const inputs = [];
    while ((match = inputPattern.exec(this.html)) !== null) {
      const attrs = match[1];
      const hasId = /\bid=["']([^"']+)["']/.exec(attrs);
      const isHidden = /\btype=["']hidden["']/.test(attrs);

      if (hasId && !isHidden) {
        inputs.push(hasId[1]);
      }
    }

    // Check for associated labels
    const labels = [];
    while ((match = labelPattern.exec(this.html)) !== null) {
      const forAttr = /\bfor=["']([^"']+)["']/.exec(match[1]);
      if (forAttr) {
        labels.push(forAttr[1]);
      }
    }

    const unlabeledInputs = inputs.filter(id => !labels.includes(id));
    if (unlabeledInputs.length > 0) {
      this.issues.push({
        type: 'warning',
        category: 'a11y',
        message: `${unlabeledInputs.length} form input(s) without associated labels`,
        fix: 'Add <label for="input-id"> for each input'
      });
    }
  }

  /**
   * Analyze heading structure
   */
  analyzeHeadings() {
    for (let i = 1; i <= 6; i++) {
      const pattern = new RegExp(`<h${i}\\b`, 'gi');
      const matches = this.html.match(pattern) || [];
      this.stats.headings[`h${i}`] = matches.length;
    }

    // Check heading hierarchy
    if (this.stats.headings.h1 === 0) {
      this.issues.push({
        type: 'warning',
        category: 'a11y',
        message: 'No H1 heading found',
        fix: 'Add a single H1 for the main page title'
      });
    }

    if (this.stats.headings.h1 > 1) {
      this.issues.push({
        type: 'warning',
        category: 'a11y',
        message: `Multiple H1 headings found (${this.stats.headings.h1})`,
        fix: 'Use only one H1 per page'
      });
    }

    // Check for skipped levels
    const levels = [1, 2, 3, 4, 5, 6];
    let foundLevel = false;
    for (const level of levels) {
      if (this.stats.headings[`h${level}`] > 0) {
        foundLevel = true;
      } else if (foundLevel && level < 6) {
        // Check if higher levels exist
        for (let higher = level + 1; higher <= 6; higher++) {
          if (this.stats.headings[`h${higher}`] > 0) {
            this.issues.push({
              type: 'warning',
              category: 'a11y',
              message: `Heading level H${level} skipped`,
              fix: 'Maintain proper heading hierarchy (H1 → H2 → H3...)'
            });
            break;
          }
        }
      }
    }
  }

  /**
   * Estimate DOM depth
   */
  estimateDepth() {
    let depth = 0;
    let maxDepth = 0;
    const openTag = /<([a-z][a-z0-9]*)\b[^>]*(?<!\/)\s*>/gi;
    const closeTag = /<\/([a-z][a-z0-9]*)\s*>/gi;
    const selfClosing = /<([a-z][a-z0-9]*)\b[^>]*\/\s*>/gi;

    // Simple depth estimation
    let position = 0;
    const html = this.html;

    while (position < html.length) {
      const nextOpen = html.indexOf('<', position);
      if (nextOpen === -1) break;

      const tagEnd = html.indexOf('>', nextOpen);
      if (tagEnd === -1) break;

      const tag = html.substring(nextOpen, tagEnd + 1);

      if (tag.startsWith('</')) {
        depth--;
      } else if (!tag.endsWith('/>') && !tag.startsWith('<!') && !tag.startsWith('<?')) {
        // Skip void elements
        const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
        const tagName = tag.match(/<([a-z]+)/i)?.[1]?.toLowerCase();

        if (tagName && !voidElements.includes(tagName)) {
          depth++;
          if (depth > maxDepth) {
            maxDepth = depth;
          }
        }
      }

      position = tagEnd + 1;
    }

    this.stats.maxDepth = maxDepth;

    if (maxDepth > 15) {
      this.issues.push({
        type: 'warning',
        category: 'performance',
        message: `Deep DOM nesting detected (${maxDepth} levels)`,
        fix: 'Consider flattening DOM structure for better performance'
      });
    }
  }
}

/**
 * Generate report
 */
function generateReport(analysis) {
  console.log(`\n${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.cyan}  DOM ANALYSIS REPORT${COLORS.reset}`);
  console.log(`${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}\n`);

  const { stats, issues } = analysis;

  // Statistics
  console.log(`${COLORS.blue}📊 STATISTICS${COLORS.reset}`);
  console.log(`${'─'.repeat(50)}`);
  console.log(`   Total Elements:      ${stats.elements}`);
  console.log(`   Unique IDs:          ${stats.ids.size}`);
  console.log(`   Unique Classes:      ${stats.classes.size}`);
  console.log(`   Max DOM Depth:       ${stats.maxDepth}`);
  console.log(`   Images:              ${stats.images.length}`);
  console.log(`   Links:               ${stats.links.length}`);
  console.log(`   Forms:               ${stats.forms}`);
  console.log(`   Inline Handlers:     ${stats.eventHandlers.length}`);
  console.log();

  // Heading structure
  console.log(`${COLORS.blue}📑 HEADING STRUCTURE${COLORS.reset}`);
  console.log(`${'─'.repeat(50)}`);
  for (let i = 1; i <= 6; i++) {
    const count = stats.headings[`h${i}`];
    if (count > 0) {
      console.log(`   H${i}: ${count}`);
    }
  }
  console.log();

  // Issues
  if (issues.length > 0) {
    console.log(`${COLORS.yellow}⚠️  ISSUES FOUND (${issues.length})${COLORS.reset}`);
    console.log(`${'─'.repeat(50)}`);

    const grouped = {
      error: issues.filter(i => i.type === 'error'),
      warning: issues.filter(i => i.type === 'warning')
    };

    if (grouped.error.length > 0) {
      console.log(`\n${COLORS.red}Errors:${COLORS.reset}`);
      grouped.error.forEach((issue, i) => {
        console.log(`   ${i + 1}. [${issue.category}] ${issue.message}`);
        console.log(`      ${COLORS.gray}Fix: ${issue.fix}${COLORS.reset}`);
      });
    }

    if (grouped.warning.length > 0) {
      console.log(`\n${COLORS.yellow}Warnings:${COLORS.reset}`);
      grouped.warning.forEach((issue, i) => {
        console.log(`   ${i + 1}. [${issue.category}] ${issue.message}`);
        console.log(`      ${COLORS.gray}Fix: ${issue.fix}${COLORS.reset}`);
      });
    }
  } else {
    console.log(`${COLORS.green}✓ No issues found!${COLORS.reset}`);
  }

  console.log();

  // Summary
  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;

  if (errorCount === 0 && warningCount === 0) {
    console.log(`${COLORS.green}✅ DOM analysis passed!${COLORS.reset}`);
  } else if (errorCount > 0) {
    console.log(`${COLORS.red}❌ ${errorCount} error(s), ${warningCount} warning(s)${COLORS.reset}`);
  } else {
    console.log(`${COLORS.yellow}⚠️  ${warningCount} warning(s)${COLORS.reset}`);
  }

  return errorCount === 0;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
${COLORS.cyan}DOM Analyzer${COLORS.reset}

Usage:
  node dom-analyzer.js <html-file>
  node dom-analyzer.js index.html

Options:
  --help        Show this help

Examples:
  node dom-analyzer.js index.html
  node dom-analyzer.js src/template.html
`);
    process.exit(0);
  }

  const filePath = args[0];

  if (!fs.existsSync(filePath)) {
    console.error(`${COLORS.red}Error: File not found: ${filePath}${COLORS.reset}`);
    process.exit(1);
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  const analyzer = new HTMLAnalyzer(html);
  const analysis = analyzer.analyze();

  const passed = generateReport(analysis);
  process.exit(passed ? 0 : 1);
}

// Export for testing
module.exports = { HTMLAnalyzer };

// Run if called directly
if (require.main === module) {
  main();
}
