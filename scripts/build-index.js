#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const outputsDir = path.join(repoRoot, "outputs");
const outputPath = path.join(repoRoot, "index.html");

function readText(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function stripTags(value) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function matchFirst(text, pattern) {
  const match = text.match(pattern);
  return match ? stripTags(match[1]) : "";
}

function countScreenshots(slug) {
  const dir = path.join(outputsDir, slug, "assets", "screenshots");
  try {
    return fs.readdirSync(dir).filter((name) => /\.(png|jpe?g|webp|gif)$/i.test(name)).length;
  } catch {
    return 0;
  }
}

function getMtime(file) {
  try {
    return fs.statSync(file).mtime;
  } catch {
    return new Date(0);
  }
}

function getSlugDate(slug) {
  const match = slug.match(/^(\d{4}-\d{2}-\d{2})(?:-|$)/);
  return match ? match[1] : "";
}

function getSortTime(slug, mtime) {
  const slugDate = getSlugDate(slug);
  if (slugDate) {
    const timestamp = Date.parse(`${slugDate}T00:00:00Z`);
    if (!Number.isNaN(timestamp)) return timestamp;
  }

  return mtime.getTime();
}

function buildItems() {
  if (!fs.existsSync(outputsDir)) return [];

  return fs.readdirSync(outputsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const slug = entry.name;
      const htmlPath = path.join(outputsDir, slug, "index.html");
      if (!fs.existsSync(htmlPath)) return null;

      const html = readText(htmlPath);
      const research = readText(path.join(outputsDir, slug, "research.md"));
      const qaExists = fs.existsSync(path.join(outputsDir, slug, "qa.md"));
      const title = matchFirst(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || slug;
      const meta = matchFirst(html, /<p class="meta"[^>]*>([\s\S]*?)<\/p>/i);
      const depth = matchFirst(research, /(?:리서치 깊이|Research depth|Depth)\s*[:：]\s*([^\n]+)/i);
      const mtime = getMtime(htmlPath);
      const slugDate = getSlugDate(slug);

      return {
        slug,
        title,
        meta,
        depth,
        qaExists,
        screenshots: countScreenshots(slug),
        href: `outputs/${slug}/index.html`,
        researchHref: fs.existsSync(path.join(outputsDir, slug, "research.md")) ? `outputs/${slug}/research.md` : "",
        qaHref: qaExists ? `outputs/${slug}/qa.md` : "",
        date: slugDate || mtime.toISOString().slice(0, 10),
        sortTime: getSortTime(slug, mtime),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.sortTime - a.sortTime || b.slug.localeCompare(a.slug));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const items = buildItems();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
}

function itemDate(item) {
  const slugDate = item.slug.match(/^(\d{4}-\d{2}-\d{2})/);
  return formatDate(slugDate ? slugDate[1] : item.date);
}

const rows = items.map((item) => {
  return `\n\t\t\t<li><time>${escapeHtml(itemDate(item))}</time><a href="${item.href}">${escapeHtml(item.title)}</a></li>`;
}).join("");

const html = `<!doctype html>
<html lang="ko" id="top">
<head>
\t<meta charset="utf-8">
\t<meta name="viewport" content="width=device-width, initial-scale=1">
\t<title>iiki Index</title>
\t<style>
\t\t:root {
\t\t\tcolor-scheme: light;
\t\t\t--text: #222;
\t\t\t--muted: #4a4a4a;
\t\t\t--link: #2f6de0;
\t\t\t--paper: #fff;
\t\t}

\t\t* { box-sizing: border-box; }

\t\tbody {
\t\t\tmargin: 0;
\t\t\tbackground: var(--paper);
\t\t\tcolor: var(--text);
\t\t\tfont-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
\t\t\tfont-size: 22px;
\t\t\tline-height: 1.55;
\t\t\tletter-spacing: 0;
\t\t}

\t\tmain {
\t\t\tmax-width: 1180px;
\t\t\tmargin: 0;
\t\t\tpadding: 18px 24px 56px;
\t\t\tword-break: keep-all;
\t\t\toverflow-wrap: break-word;
\t\t}

\t\ta {
\t\t\tcolor: var(--link);
\t\t\ttext-decoration: none;
\t\t\ttext-underline-offset: 3px;
\t\t}

\t\ta:hover {
\t\t\ttext-decoration: underline;
\t\t}

\t\tol {
\t\t\tlist-style: none;
\t\t\tmargin: 0;
\t\t\tpadding: 0;
\t\t}

\t\tli {
\t\t\tdisplay: flex;
\t\t\tgap: 32px;
\t\t\talign-items: baseline;
\t\t\tmargin: 4px 0;
\t\t}

\t\ttime {
\t\t\tflex: 0 0 225px;
\t\t\tcolor: var(--muted);
\t\t}

\t\t@media (max-width: 760px) {
\t\t\tbody { font-size: 18px; }
\t\t\tmain { padding: 14px 16px 42px; }
\t\t\tli {
\t\t\t\tdisplay: block;
\t\t\t\tmargin: 10px 0;
\t\t\t}
\t\t\ttime {
\t\t\t\tdisplay: block;
\t\t\t\tmargin-bottom: 1px;
\t\t\t}
\t\t}
\t</style>
</head>
<body>
\t<main>
\t\t<ol aria-label="iiki 리서치 목록">${rows || "\n\t\t\t<li><time></time><span>No outputs yet</span></li>"}
\t\t</ol>
\t</main>
</body>
</html>
`;

fs.writeFileSync(outputPath, html);
console.log(`Wrote ${path.relative(repoRoot, outputPath)} with ${items.length} items.`);
