#!/usr/bin/env node
/**
 * READY gate. Usage: node gate.mjs --dir .video/<slug>
 * Prints READY or BLOCKED.
 */
import fs from "node:fs";
import path from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

const dir = path.resolve(arg("dir", ".video"));
const qaDir = path.join(dir, "qa");
const blockers = [];

function needFile(rel, pred = (s) => s.length > 20) {
  const p = path.join(dir, rel);
  if (!fs.existsSync(p)) {
    blockers.push(`missing ${rel}`);
    return null;
  }
  const body = fs.readFileSync(p, "utf8");
  if (!pred(body)) blockers.push(`thin/invalid ${rel}`);
  return body;
}

const reportPath = path.join(qaDir, "report.json");
if (!fs.existsSync(reportPath)) {
  blockers.push("missing qa/report.json — run ship.mjs first");
} else {
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (!report.ok) blockers.push(`ship failed: ${(report.failed || []).join(", ")}`);
}

needFile("qa/visual-review.md", (s) => /verdict/i.test(s));
const review = fs.existsSync(path.join(qaDir, "visual-review.md"))
  ? fs.readFileSync(path.join(qaDir, "visual-review.md"), "utf8")
  : "";
if (review) {
  const m = review.match(/verdict\s*[:\-]?\s*(PASS|FAIL)/i);
  if (!m) blockers.push("visual-review.md missing PASS/FAIL verdict");
  else if (m[1].toUpperCase() === "FAIL") blockers.push("visual review FAIL");
}

const accepted = path.join(qaDir, "storyboard-accepted.json");
if (fs.existsSync(accepted)) {
  const j = JSON.parse(fs.readFileSync(accepted, "utf8"));
  if (j.accepted !== true) blockers.push("storyboard not accepted");
} else {
  blockers.push("missing storyboard-accepted.json");
}

const ready = blockers.length === 0;
const out = {
  status: ready ? "READY" : "BLOCKED",
  at: new Date().toISOString(),
  blockers,
};
fs.writeFileSync(path.join(qaDir, "gate.json"), JSON.stringify(out, null, 2));
console.log(ready ? "READY" : "BLOCKED");
console.log(JSON.stringify(out, null, 2));
process.exit(ready ? 0 : 1);
