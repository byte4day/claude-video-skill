#!/usr/bin/env node
/**
 * Create .video/<slug>/ working tree for Claude Video.
 * Usage: node new_project.mjs --slug my-game --brief "..." [--engine remotion|three] [--aspect 16:9] [--depth medium]
 */
import fs from "node:fs";
import path from "node:path";

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const v = process.argv[i + 1];
  if (!v || v.startsWith("--")) return true;
  return v;
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "untitled";
}

const brief = arg("brief", process.argv.slice(2).filter((a) => !a.startsWith("--")).join(" ") || "");
const slug = slugify(arg("slug", brief || "untitled"));
const engine = arg("engine", "remotion");
const aspect = arg("aspect", "16:9");
const depth = arg("depth", "medium");
const durationSec = Number(arg("duration", "20"));
const root = path.resolve(process.cwd(), ".video", slug);

const dirs = [
  root,
  path.join(root, "research"),
  path.join(root, "research", "_feeds"),
  path.join(root, "research", "refs"),
  path.join(root, "qa"),
  path.join(root, "out"),
];

for (const d of dirs) fs.mkdirSync(d, { recursive: true });

const settings = {
  slug,
  engine,
  aspect,
  durationSec,
  researchDepth: depth,
  fps: 30,
  format: "auto",
  captionLang: "en",
  createdAt: new Date().toISOString(),
};

fs.writeFileSync(path.join(root, "settings.json"), JSON.stringify(settings, null, 2));
if (brief) {
  fs.writeFileSync(
    path.join(root, "brief.md"),
    `# Brief — ${slug}\n\n${brief}\n\n_Created ${settings.createdAt}_\n`
  );
}

const stubs = {
  "research/facts.md": `# Facts — ${slug}\n\n_No facts yet._\n`,
  "research/sources.md": `# Sources — ${slug}\n\n`,
  "research/visual-notes.md": `# Visual notes — ${slug}\n\n`,
  "research/inventory.md": `# Inventory — ${slug}\n\n| Asset | Status | Path/URL |\n|-------|--------|----------|\n`,
  "research/gaps.md": `# Gaps — ${slug}\n\n`,
};

for (const [rel, body] of Object.entries(stubs)) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) fs.writeFileSync(p, body);
}

console.log(JSON.stringify({ ok: true, root, settings }, null, 2));
