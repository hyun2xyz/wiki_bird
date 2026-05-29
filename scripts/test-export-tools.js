#!/usr/bin/env node

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "iiki-export-test-"));
const outputDir = path.join(tmpRoot, "outputs", "2026-05-29-sample");
const screenshotDir = path.join(outputDir, "assets", "screenshots");

fs.mkdirSync(screenshotDir, { recursive: true });
fs.writeFileSync(path.join(screenshotDir, "01-sample.png"), "not a real png");

const html = `<!doctype html>
<html lang="ko">
<head><meta charset="utf-8"><title>Sample Research</title></head>
<body>
  <main>
    <h1>Sample Research</h1>
    <p class="meta">iiki research · 확인일 2026-05-29</p>
    <section>
      <h2>1. 한 줄 결론</h2>
      <p><strong>HTML</strong>은 <a href="https://example.com">자료 보기</a>에 좋다.</p>
      <blockquote>복붙 가능한 문법이 필요하다.</blockquote>
      <ul><li>첫 번째 항목</li><li><code>index.html</code>을 보관한다</li></ul>
      <figure>
        <img src="assets/screenshots/01-sample.png" alt="샘플 화면">
        <figcaption>샘플 캡처 설명</figcaption>
      </figure>
      <table>
        <tr><th>깊이</th><th>설명</th></tr>
        <tr><td>중</td><td>기본 문서</td></tr>
      </table>
    </section>
    <section>
      <h2>출처</h2>
      <ol><li><a href="https://example.com/source">Example Source</a></li></ol>
    </section>
  </main>
</body>
</html>`;

fs.writeFileSync(path.join(outputDir, "index.html"), html);

try {
  execFileSync("node", [path.join(repoRoot, "scripts", "export-iyo-wiki-text.js"), outputDir], {
    cwd: repoRoot,
    stdio: "pipe",
  });

  const wikiText = fs.readFileSync(path.join(outputDir, "iyo-wiki.txt"), "utf8");
  assert(wikiText.includes("====== Sample Research ======"), "exports h1 as WackoWiki-style title");
  assert(wikiText.includes("===== 1. 한 줄 결론 ====="), "exports h2 as WackoWiki-style section");
  assert(wikiText.includes("**HTML**은 ((https://example.com 자료 보기))에 좋다."), "keeps bold text and links");
  assert(wikiText.includes("{{iyoimage file=\"assets/screenshots/01-sample.png\""), "exports figure as iyoimage macro");
  assert(wikiText.includes("|= 깊이 |= 설명 |"), "exports table header");

  execFileSync("node", [path.join(repoRoot, "scripts", "build-typst-booklet.js"), outputDir, "--no-compile"], {
    cwd: repoRoot,
    stdio: "pipe",
  });

  const typstPath = path.join(outputDir, "typst", "main.typ");
  const typst = fs.readFileSync(typstPath, "utf8");
  const typstTemplate = fs.readFileSync(path.join(outputDir, "typst", "iiki-booklet.typ"), "utf8");
  assert(typst.includes("#import \"iiki-booklet.typ\": iiki-booklet"), "uses local booklet template");
  assert(typstTemplate.includes("paper: \"a5\""), "copies A5 booklet template");
  assert(typst.includes("title: \"Sample Research\""), "passes title to booklet template");
  assert(typst.includes("= 1. 한 줄 결론"), "exports headings to Typst");
  assert(typst.includes("#figure("), "exports figure block");

  console.log("iiki export tool tests passed.");
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}
