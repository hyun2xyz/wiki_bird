#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const files = {
  rootTemplate: path.join(repoRoot, "templates", "research-page.html"),
  skillTemplate: path.join(repoRoot, "skills", "iiki-research-html", "templates", "research-page.html"),
  skill: path.join(repoRoot, "skills", "iiki-research-html", "SKILL.md"),
  docsStyle: path.join(repoRoot, "docs", "wiki-html-style-rules.md"),
  skillStyle: path.join(repoRoot, "skills", "iiki-research-html", "references", "wiki-html-style-rules.md"),
  docsWorkflow: path.join(repoRoot, "docs", "research-html-workflow.md"),
  skillWorkflow: path.join(repoRoot, "skills", "iiki-research-html", "references", "research-html-workflow.md"),
  indexBuilder: path.join(repoRoot, "scripts", "build-index.js"),
};

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const failures = [];

for (const [label, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) {
    failures.push(`${label} is missing: ${path.relative(repoRoot, file)}`);
  }
}

if (failures.length === 0) {
  const rootTemplate = read(files.rootTemplate);
  const skillTemplate = read(files.skillTemplate);
  const skill = read(files.skill);
  const docsStyle = read(files.docsStyle);
  const skillStyle = read(files.skillStyle);
  const docsWorkflow = read(files.docsWorkflow);
  const skillWorkflow = read(files.skillWorkflow);
  const indexBuilder = read(files.indexBuilder);

  if (rootTemplate !== skillTemplate) {
    failures.push("templates/research-page.html and skill template copy differ.");
  }

  for (const [label, text] of [
    ["SKILL.md", skill],
    ["docs/wiki-html-style-rules.md", docsStyle],
    ["skill wiki-html-style-rules.md", skillStyle],
    ["docs/research-html-workflow.md", docsWorkflow],
    ["skill research-html-workflow.md", skillWorkflow],
  ]) {
    if (!text.includes("templates/research-page.html")) {
      failures.push(`${label} does not mention templates/research-page.html.`);
    }
  }

  for (const [label, text] of [
    ["docs/research-html-workflow.md", docsWorkflow],
    ["skill research-html-workflow.md", skillWorkflow],
  ]) {
    if (text.includes("Screenshot count matches depth")) {
      failures.push(`${label} still uses fixed screenshot-count QA wording.`);
    }
  }

  if (!indexBuilder.includes("function getSlugDate")) {
    failures.push("build-index.js does not include slug-date sorting helper.");
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("iiki style checks passed.");
