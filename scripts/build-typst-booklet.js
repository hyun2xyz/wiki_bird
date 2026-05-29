#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const {
  blocksToTypst,
  metaFromBlocks,
  parseBlocks,
  resolveInput,
  titleFromBlocks,
} = require("./lib/iiki-html-export");

const repoRoot = path.resolve(__dirname, "..");
const templateCandidates = [
  path.join(repoRoot, "typst", "iiki-booklet.typ"),
  path.join(repoRoot, "assets", "iiki-booklet.typ"),
];
const templatePath = templateCandidates.find((candidate) => fs.existsSync(candidate));

function usage() {
  console.error("Usage: node scripts/build-typst-booklet.js <output-dir-or-index.html> [--no-compile]");
}

function hasTypst() {
  const result = spawnSync("typst", ["--version"], { stdio: "ignore" });
  return result.status === 0;
}

const args = process.argv.slice(2);
const input = args.find((arg) => !arg.startsWith("--"));
const noCompile = args.includes("--no-compile");

if (!input) {
  usage();
  process.exit(2);
}

if (!templatePath) {
  throw new Error(`Missing Typst booklet template. Checked: ${templateCandidates.join(", ")}`);
}

const { html, outputDir } = resolveInput(input);
const blocks = parseBlocks(html);
const title = titleFromBlocks(blocks);
const subtitle = metaFromBlocks(blocks);
const typstDir = path.join(outputDir, "typst");
const mainPath = path.join(typstDir, "main.typ");
const localTemplatePath = path.join(typstDir, "iiki-booklet.typ");
const pdfPath = path.join(typstDir, "index.pdf");

fs.mkdirSync(typstDir, { recursive: true });
fs.copyFileSync(templatePath, localTemplatePath);
fs.writeFileSync(mainPath, blocksToTypst(blocks, { title, subtitle }));

console.log(`Wrote ${mainPath}`);
console.log(`Wrote ${localTemplatePath}`);

if (!noCompile) {
  if (hasTypst()) {
    const result = spawnSync("typst", ["compile", "--root", outputDir, mainPath, pdfPath], {
      cwd: repoRoot,
      stdio: "inherit",
    });

    if (result.status !== 0) {
      process.exit(result.status || 1);
    }

    console.log(`Wrote ${pdfPath}`);
  } else {
    console.warn("typst CLI not found; generated main.typ only.");
  }
}
