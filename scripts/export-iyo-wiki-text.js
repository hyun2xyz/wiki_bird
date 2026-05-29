#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  blocksToIyoWiki,
  parseBlocks,
  resolveInput,
} = require("./lib/iiki-html-export");

function usage() {
  console.error("Usage: node scripts/export-iyo-wiki-text.js <output-dir-or-index.html> [--stdout]");
}

const args = process.argv.slice(2);
const input = args.find((arg) => !arg.startsWith("--"));
const stdout = args.includes("--stdout");

if (!input) {
  usage();
  process.exit(2);
}

const { html, outputDir } = resolveInput(input);
const blocks = parseBlocks(html);
const text = blocksToIyoWiki(blocks);
const outputPath = path.join(outputDir, "iyo-wiki.txt");

if (stdout) {
  process.stdout.write(text);
} else {
  fs.writeFileSync(outputPath, text);
  console.log(`Wrote ${outputPath}`);
}
