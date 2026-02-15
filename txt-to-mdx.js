#!/usr/bin/env node

/**
 * TXT to MDX Converter
 * 🤖 Built by Claude - Anthropic's AI Assistant
 * 
 * Converts plain text files to MDX format with automatic cleanup
 * - Removes unsupported components (VideoPlayer, Chart, Callout, etc.)
 * - Removes import statements
 * - Fixes unclosed code blocks
 * - Ensures proper Front Matter
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

// Components to remove
const COMPONENTS_TO_REMOVE = [
  'VideoPlayer',
  'Chart',
  'Callout',
  'CustomComponent',
  'Interactive',
  'Demo',
  'Widget',
  'Player',
  'Embed'
];

/**
 * Clean MDX content by removing unsupported components and imports
 */
function cleanMDXContent(content) {
  let cleaned = content;
  
  // Remove import statements
  cleaned = cleaned.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  
  // Remove component usage (both self-closing and with children)
  COMPONENTS_TO_REMOVE.forEach(component => {
    // Self-closing: <Component />
    const selfClosingRegex = new RegExp(`<${component}[^>]*?/>`, 'g');
    cleaned = cleaned.replace(selfClosingRegex, '');
    
    // With children: <Component>...</Component>
    const withChildrenRegex = new RegExp(`<${component}[^>]*?>.*?</${component}>`, 'gs');
    cleaned = cleaned.replace(withChildrenRegex, '');
  });
  
  // Remove empty lines (more than 2 consecutive)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned.trim();
}

/**
 * Fix unclosed code blocks
 */
function fixCodeBlocks(content) {
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockCount = 0;
  
  lines.forEach(line => {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      codeBlockCount++;
    }
  });
  
  // If odd number of code block markers, add closing marker
  if (codeBlockCount % 2 !== 0) {
    content += '\n```\n';
  }
  
  return content;
}

/**
 * Ensure proper Front Matter
 */
function ensureFrontMatter(content) {
  if (!content.startsWith('---')) {
    const frontMatter = `---
title: "Untitled"
date: "${new Date().toISOString().split('T')[0]}"
summary: ""
---

`;
    return frontMatter + content;
  }
  
  // Check if summary is empty and fix it
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontMatterMatch) {
    let frontMatter = frontMatterMatch[1];
    if (frontMatter.includes('summary: ""') || frontMatter.includes("summary: ''")) {
      // Summary is empty, that's fine
    } else if (!frontMatter.includes('summary:')) {
      // Add summary field
      frontMatter += '\nsummary: ""';
      content = content.replace(/^---\n[\s\S]*?\n---/, `---\n${frontMatter}\n---`);
    }
  }
  
  return content;
}

/**
 * Convert a single TXT file to MDX
 */
function convertFile(inputPath, outputPath) {
  try {
    let content = fs.readFileSync(inputPath, 'utf-8');
    
    // Apply transformations
    content = ensureFrontMatter(content);
    content = cleanMDXContent(content);
    content = fixCodeBlocks(content);
    
    // Write output
    fs.writeFileSync(outputPath, content, 'utf-8');
    
    return true;
  } catch (error) {
    console.error(`${colors.red}Error converting ${inputPath}:${colors.reset}`, error.message);
    return false;
  }
}

/**
 * Process directory recursively
 */
function processDirectory(inputDir, outputDir) {
  const stats = {
    total: 0,
    success: 0,
    failed: 0
  };
  
  function traverse(dir, outDir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    entries.forEach(entry => {
      const inputPath = path.join(dir, entry.name);
      const outputPath = path.join(outDir, entry.name);
      
      if (entry.isDirectory()) {
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputPath)) {
          fs.mkdirSync(outputPath, { recursive: true });
        }
        traverse(inputPath, outputPath);
      } else if (entry.isFile() && entry.name.endsWith('.txt')) {
        stats.total++;
        const mdxPath = outputPath.replace(/\.txt$/, '.mdx');
        
        console.log(`${colors.cyan}Converting:${colors.reset} ${inputPath}`);
        console.log(`${colors.cyan}       To:${colors.reset} ${mdxPath}`);
        
        if (convertFile(inputPath, mdxPath)) {
          stats.success++;
          console.log(`${colors.green}✓ Success${colors.reset}\n`);
        } else {
          stats.failed++;
          console.log(`${colors.red}✗ Failed${colors.reset}\n`);
        }
      }
    });
  }
  
  traverse(inputDir, outputDir);
  return stats;
}

/**
 * Main function
 */
function main() {
  console.log(`${colors.bright}${colors.magenta}`);
  console.log('╔════════════════════════════════════════╗');
  console.log('║   TXT to MDX Converter                 ║');
  console.log('║   🤖 Built by Claude                   ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(colors.reset);
  
  const args = process.argv.slice(2);
  const inputDir = args[0] || path.join(process.cwd(), 'input');
  const outputDir = args[1] || path.join(process.cwd(), 'output');
  
  console.log(`${colors.yellow}Input directory:${colors.reset}  ${inputDir}`);
  console.log(`${colors.yellow}Output directory:${colors.reset} ${outputDir}\n`);
  
  if (!fs.existsSync(inputDir)) {
    console.error(`${colors.red}Error: Input directory does not exist: ${inputDir}${colors.reset}`);
    process.exit(1);
  }
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const stats = processDirectory(inputDir, outputDir);
  
  console.log(`${colors.bright}${colors.green}Conversion Complete!${colors.reset}`);
  console.log(`${colors.green}Total files:${colors.reset}    ${stats.total}`);
  console.log(`${colors.green}Successful:${colors.reset}     ${stats.success}`);
  if (stats.failed > 0) {
    console.log(`${colors.red}Failed:${colors.reset}         ${stats.failed}`);
  }
  console.log();
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export for use as module
module.exports = { convertFile, processDirectory, cleanMDXContent };
