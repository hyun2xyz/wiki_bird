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
  typstReference: path.join(repoRoot, "skills", "iiki-research-html", "references", "typst-output.md"),
  indexBuilder: path.join(repoRoot, "scripts", "build-index.js"),
  iyoWikiExporter: path.join(repoRoot, "scripts", "export-iyo-wiki-text.js"),
  skillIyoWikiExporter: path.join(repoRoot, "skills", "iiki-research-html", "scripts", "export-iyo-wiki-text.js"),
  typstBookletBuilder: path.join(repoRoot, "scripts", "build-typst-booklet.js"),
  skillTypstBookletBuilder: path.join(repoRoot, "skills", "iiki-research-html", "scripts", "build-typst-booklet.js"),
  exportLibrary: path.join(repoRoot, "scripts", "lib", "iiki-html-export.js"),
  skillExportLibrary: path.join(repoRoot, "skills", "iiki-research-html", "scripts", "lib", "iiki-html-export.js"),
  rootBookletTemplate: path.join(repoRoot, "typst", "iiki-booklet.typ"),
  skillBookletTemplate: path.join(repoRoot, "skills", "iiki-research-html", "assets", "iiki-booklet.typ"),
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
  const typstReference = read(files.typstReference);
  const indexBuilder = read(files.indexBuilder);
  const rootBookletTemplate = read(files.rootBookletTemplate);
  const skillBookletTemplate = read(files.skillBookletTemplate);
  const iyoWikiExporter = read(files.iyoWikiExporter);
  const skillIyoWikiExporter = read(files.skillIyoWikiExporter);
  const typstBookletBuilder = read(files.typstBookletBuilder);
  const skillTypstBookletBuilder = read(files.skillTypstBookletBuilder);
  const exportLibrary = read(files.exportLibrary);
  const skillExportLibrary = read(files.skillExportLibrary);

  if (rootTemplate !== skillTemplate) {
    failures.push("templates/research-page.html and skill template copy differ.");
  }

  if (rootBookletTemplate !== skillBookletTemplate) {
    failures.push("typst/iiki-booklet.typ and skill asset copy differ.");
  }

  if (iyoWikiExporter !== skillIyoWikiExporter) {
    failures.push("export-iyo-wiki-text.js and skill script copy differ.");
  }

  if (typstBookletBuilder !== skillTypstBookletBuilder) {
    failures.push("build-typst-booklet.js and skill script copy differ.");
  }

  if (exportLibrary !== skillExportLibrary) {
    failures.push("iiki-html-export.js and skill library copy differ.");
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

  for (const [label, text] of [
    ["SKILL.md", skill],
    ["docs/research-html-workflow.md", docsWorkflow],
    ["skill research-html-workflow.md", skillWorkflow],
  ]) {
    for (const required of ["iyo-wiki.txt", "export-iyo-wiki-text.js", "build-typst-booklet.js"]) {
      if (!text.includes(required)) {
        failures.push(`${label} does not mention ${required}.`);
      }
    }
  }

  if (!typstReference.includes("iiki-booklet.typ") || !typstReference.includes("index.pdf")) {
    failures.push("typst-output.md does not describe the booklet PDF output.");
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("iiki style checks passed.");
