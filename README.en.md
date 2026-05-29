# iiki

**2026-05-29 · v0.2.0 · IYO Wiki text and Typst booklet beta (ദ്ദി ᴖ⩊ᴖ )**

```text
Hello, I'm Hyun.

I study editorial design in Korea, research different AI-powered pipelines,
and share them with other people.
I love the sharing philosophy of the World Wide Web, HTML, humor, and writing.

***

On May 9, Thariq Shihipar posted on X about how the Claude Code team uses HTML.
The point was that, rather than asking AI for something and receiving the result
as plain text or Markdown, an HTML prototype is often easier to read and judge.
It is a little like how we usually do not notice it, but through graphic design
we can take in a lot of information without reading every bit of text.
The way to use it is simple: at the end of any conversation, say,
"make this into HTML."

But the HTML UI made this way can be a little uncomfortable.
More importantly, it is very ugly.

***

Let me introduce my friend iiki.

It is a bird we raise in our IYO Wiki.
Its main service is that it adds 짹 to the end of every sentence, which is cute.

As a side service, when you ask it to research a topic, it organizes the content
in a wiki style and attaches image references using Chrome captures.
Everything is saved locally as MD and HTML, so if you open index.html you can see
all the previous records at once. Of course, you can also host that file.

Then, use it well.
```

[한국어 README](README.md)

![iiki mini wiki mascot](docs/assets/miniwiki.jpg)

> **Hello. I can organize anything for you, 짹**

iiki is a research agent/skill that turns a topic into a readable wiki-style HTML document.

Give it something to research, and it checks current sources, keeps citations, captures useful screenshots, and writes a compact wiki page with a table of contents. When needed, it can also create Typst/PDF output.

The goal is not to translate source pages line by line. iiki checks the material, then rewrites it into a readable explanation: terms are unpacked before they are used, context is added where it changes the meaning, and tables or images are pulled out when they help the reader verify what is being said. The voice should stay factual, not chatty; when judgment is needed, the evidence sits next to it.

The root `index.html` is a local-only index of generated research pages under `outputs/`. For public GitHub Pages documentation, use `docs/index.html`.

## What It Does

- Topic research: start from official, primary, and recent sources whenever possible.
- Source-backed synthesis: keep evidence near important claims and mark uncertainty instead of smoothing it over.
- Korean wiki-style writing by default: rewrite the flow for Korean readers instead of translating source sentences one by one.
- Static HTML page with a fixed table of contents: make long research easy to scan and revisit.
- Chrome screenshot capture: keep visual proof for people, services, papers, official pages, and interfaces that need to be seen.
- `iyo-wiki.txt` export for IYO Wiki copy-paste: turn the HTML result into wiki-friendly text.
- `research.md` and `qa.md` logs: record what was checked, what passed, and what remains limited.
- Optional Typst/PDF booklet output: create a separate print-friendly document version from the same research.

Default output structure:

```text
outputs/YYYY-MM-DD-topic-slug/
├── index.html
├── iyo-wiki.txt
├── research.md
├── qa.md
├── assets/
│   └── screenshots/
│       └── 01-source-or-page.png
└── typst/
    ├── iiki-booklet.typ
    ├── main.typ
    └── index.pdf
```

Each output folder has its own `index.html`, which can be opened directly in a browser. New research outputs should be created in a specified folder or under this repo's `outputs/`, not on the Desktop by default.

## Screenshots

The root `index.html` is a simple local list.

![iiki local index screenshot](docs/assets/screenshots/local-index.png)

Each research record lives in `outputs/YYYY-MM-DD-topic-slug/`. Open that folder's `index.html` locally to read the generated wiki page.
iiki documents put the left table of contents, body text, images, and sources together on one page.

![iiki wiki page screenshot](docs/assets/screenshots/iiki-manual-page.png)

## Install And Activate

The recommended way to use iiki is through CLI-based agents. If you want research output saved as files, Chrome screenshots captured, and checks like `node scripts/build-index.js` run reliably, use Codex CLI or Claude Code.

### 1. Install For Codex CLI

```sh
git clone https://github.com/hyun2xyz/iiki.git
cd iiki
scripts/install-skill.sh codex
```

The current Codex user skill location is `$HOME/.agents/skills/iiki-research-html/`. For repo scope, place the skill at `.agents/skills/iiki-research-html/`.

For older Codex setups, install into the legacy location:

```sh
scripts/install-skill.sh codex-legacy
```

Invoke it in Codex like this:

```text
Use $iiki-research-html
```

### 2. Install For Claude Code

```sh
git clone https://github.com/hyun2xyz/iiki.git
cd iiki
scripts/install-skill.sh claude
```

For Claude Code, keep the skill folder in `~/.claude/skills/iiki-research-html/` or project `.claude/skills/iiki-research-html/`.

Invoke it in Claude Code like this:

```text
Use iiki-research-html
```

The install script overwrites any existing iiki skill folder at the target location.

### 3. Set Research Depth

After first installing or teaching iiki, ask the user to choose a default research depth:

```text
Would you like to set a default research depth? Choose 하, 중, or 상.
하: quick overview, 중: normal iiki document, 상: deep study research.
```

### 4. Manual PowerShell Install For Codex CLI

```powershell
git clone https://github.com/hyun2xyz/iiki.git
cd iiki

$dest = Join-Path $HOME ".agents\skills\iiki-research-html"
New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
Remove-Item -Recurse -Force $dest -ErrorAction SilentlyContinue
Copy-Item -Recurse ".\skills\iiki-research-html" $dest
```

### 5. Check Installation

1. Restart Codex or Claude Code.
2. Invoke `$iiki-research-html` or `Use $iiki-research-html`.
3. On first use, choose a default research depth: `하`, `중`, or `상`.
4. If the skill does not appear, check that `SKILL.md` is directly inside the installed skill folder.

For Codex, the expected user-scope structure is:

```text
$HOME/.agents/skills/iiki-research-html/SKILL.md
```

### 6. One-Minute App Trial

For ChatGPT, Claude, and Gemini apps, this README does not provide install or activation steps. Use the prompt below to make the model follow iiki for the current conversation only.

```text
Use the iiki method based on https://github.com/hyun2xyz/iiki.
Read README.md and skills/iiki-research-html/SKILL.md, then follow them.

Topic: Why HTML prototypes are useful as AI research outputs
Research depth: 중
Output:
- index.html body structure
- research.md
- qa.md
- screenshot candidates
- source list

Write it as a Korean wiki-style explanation.
```

This is only for previewing the structure. App chats may not reliably create local files, save Chrome screenshots, or refresh the local index. Use a CLI environment for real iiki outputs.

### Troubleshooting

- If an app returns a normal chat answer: it probably treated the GitHub URL as "read this for the current conversation." Use the one-minute trial prompt above and explicitly name `README.md`, `SKILL.md`, and the expected output files.
- If the HTML does not look like iiki: the app may be inventing its own style because it cannot write and verify the repo files. Use a CLI environment for real HTML output.
- If Codex cannot see the skill: check `$HOME/.agents/skills/iiki-research-html/SKILL.md`, then restart Codex.
- If you are on an older Codex setup: run `scripts/install-skill.sh codex-legacy` to install into `~/.codex/skills/`.

Official references:

- OpenAI Developers, [Codex Skills](https://developers.openai.com/codex/skills)
- Anthropic Docs, [Agent Skills - Claude Code](https://code.claude.com/docs/en/skills)

## Quick Start

Ask an agent that supports skills:

```text
Use $iiki-research-html.
Research the book A New Program for Graphic Design and turn it into outputs/YYYY-MM-DD-graphic-design-course/index.html.
Check current sources, include Chrome screenshots, and keep research.md and qa.md.
```

You can also call it more casually:

```text
Use iiki to research the Typst template ecosystem and make a wiki-style HTML page.
```

Once the agent has learned the skill, this can be even shorter:

```text
Use iiki for a Typst research note.
```

When iiki is active, conversational replies should end with `짹`.

```text
I'll organize it, 짹
Done, 짹
```

Research depth can be set to `하`, `중`, or `상`. If no depth is specified, the default is `중`.

```text
Use $iiki-research-html to research Andrej Karpathy.
Research depth: 상
Include basic profile information, a public profile/face reference, and representative work pages.
```

| Depth | Sources | Images | Use |
| --- | --- | --- | --- |
| `하` | 3-5 sources | Essential captures only | Quick overview |
| `중` | 6-10 sources | As needed for major sections | Normal iiki document |
| `상` | 10+ sources when available | Add enough for understanding and verification | Deep study document |

## Chrome Screenshots

iiki expects at least one Chrome-captured image in research HTML outputs.

Guidelines:

- Capture an official doc page, product page, paper/source page, or the final rendered HTML.
- For people, prefer official profiles, personal sites, university/company pages, talks, or other reputable public pages.
- Do not screenshot every keyword. Use images that help the reader understand the topic. There is no fixed maximum; add more when they clarify the research.
- Save images under `assets/screenshots/`.
- Embed screenshots with `<figure class="screenshot">`.
- Log URL, capture date, viewport, and purpose in `research.md`.
- Do not capture private dashboards, personal data, paywalled text, passwords, cookies, or logged-in account screens.

If the agent has no native Chrome tool, use the helper:

```sh
skills/iiki-research-html/scripts/capture-chrome-screenshot.sh \
  "https://example.com" \
  outputs/YYYY-MM-DD-topic-slug/assets/screenshots/01-example.png
```

## Viewing Results

Open a research page directly:

```sh
open outputs/YYYY-MM-DD-topic-slug/index.html
```

Research records are checked by opening each output folder's `index.html` locally.

Refresh and open the local root index:

```sh
node scripts/build-index.js
open index.html
```

Run `node scripts/build-index.js` after creating or editing an output so the root `index.html` stays current.

## IYO Wiki Copy-Paste Text

If you need text that can be pasted into IYO Wiki, run this after the final HTML is finished. This is not a second research result; it is an intermediate form for moving the already organized page into a wiki editor.

```sh
node scripts/export-iyo-wiki-text.js outputs/YYYY-MM-DD-topic-slug
```

This creates `iyo-wiki.txt` in the same output folder. It converts headings, paragraphs, links, lists, tables, quotes, and image captions into IYO Wiki-friendly text. The export keeps as much as possible editable, so the pasted page can still be revised inside the wiki.

Images are exported as `{{iyoimage ...}}` placeholders. After uploading files to IYO Wiki, adjust the `file="..."` paths as needed.

## Typst/PDF Booklet

For a paper-like booklet PDF, run this after the HTML is finished. HTML is the screen-reading version; Typst/PDF is the saved, shared, or printed version. The idea is to derive a document edition from the same research, not to write the research twice.

```sh
node scripts/build-typst-booklet.js outputs/YYYY-MM-DD-topic-slug
```

This creates `typst/main.typ`, `typst/iiki-booklet.typ`, and `typst/index.pdf`. The default layout is close to an A5 booklet, with calmer margins and line lengths for longer reading. If the Typst CLI is unavailable, the `.typ` files can still be generated and compiled later.

To generate Typst source without compiling PDF:

```sh
node scripts/build-typst-booklet.js outputs/YYYY-MM-DD-topic-slug --no-compile
```

## Main Files

- `skills/iiki-research-html/SKILL.md` - installable skill body
- `skills/iiki-research-html/references/` - research, HTML, and Typst rules
- `skills/iiki-research-html/scripts/capture-chrome-screenshot.sh` - Chrome screenshot helper
- `scripts/export-iyo-wiki-text.js` - IYO Wiki copy-paste text export
- `scripts/build-typst-booklet.js` - Typst/PDF booklet export
- `.claude/agents/iiki-research-html-builder.md` - Claude Code project agent
- `index.html` - local-only research output index
- `docs/index.html` - public iiki user guide for GitHub Pages
- `docs/research-html-workflow.md` - workflow docs
- `docs/wiki-html-style-rules.md` - HTML style rules
- `docs/distribution-plan.md` - Codex, Claude, Gemini, and Cursor distribution notes
- `outputs/` - generated research page examples

## Writing Tone

Default writing style is Korean wiki-style explanation.

- Avoid AI-ish filler.
- Use short paragraphs.
- Separate sourced facts from interpretation.
- Use exact dates for current information.
- Start with the flow, then add tables and screenshots.

## License

MIT. The skill folder also includes its own `LICENSE`, so it can be distributed separately.

## Then, Fighting

Fighting
