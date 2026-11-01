#!/usr/bin/env node
/**
 * Automated pre-delivery checks. Usage: node ship.mjs --dir .video/<slug>
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

const dir = path.resolve(arg("dir", ".video"));
const qaDir = path.join(dir, "qa");
fs.mkdirSync(qaDir, { recursive: true });

const checks = [];
function check(id, pass, detail) {
  checks.push({ id, pass: !!pass, detail });
}

const need = [
  "brief.md",
  "settings.json",
  "research/facts.md",
  "research/sources.md",
  "research/gaps.md",
  "plan.md",
  "storyboard.json",
];

for (const rel of need) {
  const p = path.join(dir, rel);
  const ok = fs.existsSync(p) && fs.statSync(p).size > 16;
  check(`file:${rel}`, ok, ok ? "present" : "missing or empty");
}

const accepted = path.join(qaDir, "storyboard-accepted.json");
if (fs.existsSync(accepted)) {
  try {
    const j = JSON.parse(fs.readFileSync(accepted, "utf8"));
    check("storyboard-accepted", j.accepted === true, JSON.stringify(j));
  } catch (e) {
    check("storyboard-accepted", false, String(e.message || e));
  }
} else {
  check("storyboard-accepted", false, "missing — waive only if user said so");
}

const budgetScript = path.join(path.dirname(new URL(import.meta.url).pathname), "budget.mjs");
const budget = spawnSync(process.execPath, [budgetScript, "--dir", dir], { encoding: "utf8" });
check("budget", budget.status === 0, (budget.stdout || budget.stderr || "").slice(0, 500));

const settings = JSON.parse(fs.readFileSync(path.join(dir, "settings.json"), "utf8"));
const remotionDir = path.join(dir, "remotion");
const threeDir = path.join(dir, "three");
const hasRemotion =
  fs.existsSync(remotionDir) &&
  (fs.existsSync(path.join(remotionDir, "package.json")) ||
    fs.existsSync(path.join(remotionDir, "src")));
const hasThree =
  fs.existsSync(threeDir) &&
  (fs.existsSync(path.join(threeDir, "index.html")) || fs.readdirSync(threeDir).length > 0);

if (settings.engine === "remotion") {
  check("build:remotion", hasRemotion, hasRemotion ? remotionDir : "expected .video/.../remotion");
} else if (settings.engine === "three") {
  check("build:three", hasThree, hasThree ? threeDir : "expected .video/.../three");
} else {
  check("build", hasRemotion || hasThree, "no remotion/ or three/ build");
}

const buildNotes = path.join(dir, "build-notes.md");
check("build-notes", fs.existsSync(buildNotes), buildNotes);

const facts = fs.readFileSync(path.join(dir, "research", "facts.md"), "utf8");
check("facts-sourced", /\(source:/i.test(facts) || /https?:\/\//.test(facts), "facts should cite URLs");

const failed = checks.filter((c) => !c.pass);
const report = {
  ok: failed.length === 0,
  at: new Date().toISOString(),
  slug: settings.slug,
  checks,
  failed: failed.map((c) => c.id),
  next: failed.length
    ? "Fix failures, then spawn video-qa-reviewer, then gate.mjs"
    : "Spawn video-qa-reviewer → write qa/visual-review.md → gate.mjs",
};

fs.writeFileSync(path.join(qaDir, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
