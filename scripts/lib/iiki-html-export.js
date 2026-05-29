const fs = require("fs");
const path = require("path");

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function stripTags(value) {
  return decodeEntities(String(value).replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function attr(html, name) {
  const pattern = new RegExp(`${name}\\s*=\\s*(["'])(.*?)\\1`, "i");
  const match = String(html).match(pattern);
  return match ? decodeEntities(match[2]).trim() : "";
}

function convertInlineToWiki(html) {
  let text = String(html);

  text = text.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_, attrs, inner) => {
    const href = attr(attrs, "href");
    const label = convertInlineToWiki(inner);
    return href ? `((${href} ${label || href}))` : label;
  });

  text = text.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, inner) => {
    const label = stripTags(inner);
    return label ? `**${label}**` : "";
  });

  text = text.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, inner) => {
    const code = stripTags(inner);
    return code ? `##${code}##` : "";
  });

  return stripTags(text);
}

function cleanHtml(html) {
  return String(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, "");
}

function parseRows(tableHtml) {
  const rows = [];
  for (const rowMatch of tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [];
    for (const cellMatch of rowMatch[1].matchAll(/<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
      cells.push({
        header: cellMatch[1].toLowerCase() === "th",
        text: convertInlineToWiki(cellMatch[2]),
      });
    }
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

function parseBlocks(html) {
  const cleaned = cleanHtml(html);
  const mainMatch = cleaned.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const source = mainMatch ? mainMatch[1] : cleaned;
  const blocks = [];
  const blockPattern = /<(h[1-3]|p|blockquote|pre|figure|table|ul|ol)\b([^>]*)>([\s\S]*?)<\/\1>/gi;

  for (const match of source.matchAll(blockPattern)) {
    const tag = match[1].toLowerCase();
    const attrs = match[2] || "";
    const inner = match[3] || "";

    if (tag === "p") {
      const text = convertInlineToWiki(inner);
      if (text) blocks.push({ type: "paragraph", text, className: attr(attrs, "class") });
      continue;
    }

    if (/^h[1-3]$/.test(tag)) {
      const text = convertInlineToWiki(inner);
      if (text) blocks.push({ type: "heading", level: Number(tag.slice(1)), text });
      continue;
    }

    if (tag === "blockquote") {
      const text = convertInlineToWiki(inner);
      if (text) blocks.push({ type: "quote", text });
      continue;
    }

    if (tag === "pre") {
      const text = decodeEntities(inner.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, ""));
      if (text.trim()) blocks.push({ type: "code", text: text.trim() });
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((item) => convertInlineToWiki(item[1]))
        .filter(Boolean);
      if (items.length > 0) blocks.push({ type: "list", ordered: tag === "ol", items });
      continue;
    }

    if (tag === "figure") {
      const imgMatch = inner.match(/<img\b([^>]*)>/i);
      const captionMatch = inner.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
      const src = imgMatch ? attr(imgMatch[1], "src") : "";
      const alt = imgMatch ? attr(imgMatch[1], "alt") : "";
      const caption = captionMatch ? convertInlineToWiki(captionMatch[1]) : "";
      if (src || caption) blocks.push({ type: "figure", src, alt, caption });
      continue;
    }

    if (tag === "table") {
      const rows = parseRows(inner);
      if (rows.length > 0) blocks.push({ type: "table", rows });
    }
  }

  return blocks;
}

function resolveInput(inputPath) {
  const absolute = path.resolve(inputPath);
  const stat = fs.statSync(absolute);
  const htmlPath = stat.isDirectory() ? path.join(absolute, "index.html") : absolute;
  const outputDir = stat.isDirectory() ? absolute : path.dirname(absolute);

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing HTML file: ${htmlPath}`);
  }

  return { htmlPath, outputDir, html: fs.readFileSync(htmlPath, "utf8") };
}

function titleFromBlocks(blocks, fallback = "iiki research") {
  const h1 = blocks.find((block) => block.type === "heading" && block.level === 1);
  return h1 ? h1.text : fallback;
}

function metaFromBlocks(blocks) {
  const meta = blocks.find((block) => block.type === "paragraph" && /\bmeta\b/.test(block.className || ""));
  return meta ? meta.text : "";
}

function escapeWikiAttr(value) {
  return String(value).replace(/"/g, "&quot;");
}

function blocksToIyoWiki(blocks) {
  const lines = [];
  const firstTitleIndex = blocks.findIndex((block) => block.type === "heading" && block.level === 1);
  const orderedBlocks = firstTitleIndex > 0
    ? [blocks[firstTitleIndex], ...blocks.slice(0, firstTitleIndex), ...blocks.slice(firstTitleIndex + 1)]
    : blocks;

  for (const block of orderedBlocks) {
    if (block.type === "heading") {
      const mark = block.level === 1 ? "======" : block.level === 2 ? "=====" : "====";
      lines.push(`${mark} ${block.text} ${mark}`);
      lines.push("");
      continue;
    }

    if (block.type === "paragraph") {
      lines.push(block.text);
      lines.push("");
      continue;
    }

    if (block.type === "quote") {
      lines.push(`> ${block.text}`);
      lines.push("");
      continue;
    }

    if (block.type === "code") {
      lines.push("%%(code)");
      lines.push(block.text);
      lines.push("%%");
      lines.push("");
      continue;
    }

    if (block.type === "list") {
      block.items.forEach((item, index) => {
        lines.push(block.ordered ? `${index + 1}. ${item}` : `* ${item}`);
      });
      lines.push("");
      continue;
    }

    if (block.type === "figure") {
      if (block.src) {
        const attrs = [
          `file="${escapeWikiAttr(block.src)}"`,
          'width="100%"',
          'height="auto"',
          'align="center"',
        ];
        if (block.alt) attrs.push(`alt="${escapeWikiAttr(block.alt)}"`);
        if (block.caption) attrs.push(`caption="${escapeWikiAttr(block.caption)}"`);
        lines.push(`{{iyoimage ${attrs.join(" ")}}}`);
      } else if (block.caption) {
        lines.push(`그림: ${block.caption}`);
      }
      lines.push("");
      continue;
    }

    if (block.type === "table") {
      for (const row of block.rows) {
        const header = row.every((cell) => cell.header);
        const prefix = header ? "|= " : "| ";
        const divider = header ? " |= " : " | ";
        lines.push(`${prefix}${row.map((cell) => cell.text).join(divider)} |`);
      }
      lines.push("");
    }
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function escapeTypstText(value) {
  return String(value)
    .replace(/\(\((https?:\/\/\S+)\s+(.+?)\)\)/g, "$2 ($1)")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/##(.*?)##/g, "$1")
    .replace(/\\/g, "\\\\")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/#/g, "\\#")
    .replace(/\$/g, "\\$")
    .replace(/%/g, "\\%")
    .replace(/\*/g, "\\*")
    .trim();
}

function typstString(value) {
  return JSON.stringify(String(value));
}

function typstImagePath(src) {
  if (!src) return "";
  if (/^(https?:)?\/\//i.test(src)) return "";
  return src.startsWith("assets/") ? `../${src}` : src;
}

function blocksToTypst(blocks, options = {}) {
  const title = options.title || titleFromBlocks(blocks);
  const subtitle = options.subtitle || metaFromBlocks(blocks);
  const lines = [
    '#import "iiki-booklet.typ": iiki-booklet',
    "",
    `#show: body => iiki-booklet(body, title: ${typstString(title)}, subtitle: ${typstString(subtitle)})`,
    "",
  ];

  for (const block of blocks) {
    if (block.type === "heading") {
      if (block.level === 1) continue;
      const mark = block.level === 2 ? "=" : "==";
      lines.push(`${mark} ${escapeTypstText(block.text)}`);
      lines.push("");
      continue;
    }

    if (block.type === "paragraph") {
      if (/\bmeta\b/.test(block.className || "")) continue;
      lines.push(escapeTypstText(block.text));
      lines.push("");
      continue;
    }

    if (block.type === "quote") {
      lines.push(`#quote(block: true)[${escapeTypstText(block.text)}]`);
      lines.push("");
      continue;
    }

    if (block.type === "code") {
      lines.push("```");
      lines.push(block.text);
      lines.push("```");
      lines.push("");
      continue;
    }

    if (block.type === "list") {
      block.items.forEach((item) => {
        lines.push(`${block.ordered ? "+" : "-"} ${escapeTypstText(item)}`);
      });
      lines.push("");
      continue;
    }

    if (block.type === "figure") {
      const imagePath = typstImagePath(block.src);
      if (imagePath) {
        lines.push("#figure(");
        lines.push(`  image(${typstString(imagePath)}, width: 100%),`);
        if (block.caption) lines.push(`  caption: [${escapeTypstText(block.caption)}],`);
        lines.push(")");
      } else if (block.caption) {
        lines.push(`#block(stroke: 0.5pt + luma(70%), inset: 8pt)[${escapeTypstText(block.caption)}]`);
      }
      lines.push("");
      continue;
    }

    if (block.type === "table") {
      const columns = Math.max(...block.rows.map((row) => row.length));
      lines.push("#table(");
      lines.push(`  columns: ${columns},`);
      lines.push("  inset: 5pt,");
      lines.push("  stroke: 0.5pt + luma(75%),");
      for (const row of block.rows) {
        const cells = row.map((cell) => `[${escapeTypstText(cell.text)}]`);
        if (row.every((cell) => cell.header)) {
          lines.push(`  table.header(${cells.join(", ")}),`);
        } else {
          cells.forEach((cell) => lines.push(`  ${cell},`));
        }
      }
      lines.push(")");
      lines.push("");
    }
  }

  return lines.join("\n").trim() + "\n";
}

module.exports = {
  blocksToIyoWiki,
  blocksToTypst,
  metaFromBlocks,
  parseBlocks,
  resolveInput,
  titleFromBlocks,
};
