#!/usr/bin/env node
/**
 * Validate storyboard.json timings against settings.durationSec.
 * Usage: node budget.mjs --dir .video/<slug>
 */
import fs from "node:fs";
import path from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

const dir = path.resolve(arg("dir", ".video"));
const boardPath = path.join(dir, "storyboard.json");
const settingsPath = path.join(dir, "settings.json");

if (!fs.existsSync(boardPath)) {
  console.error(JSON.stringify({ ok: false, error: "missing storyboard.json", dir }));
  process.exit(1);
}

const board = JSON.parse(fs.readFileSync(boardPath, "utf8"));
const settings = fs.existsSync(settingsPath)
  ? JSON.parse(fs.readFileSync(settingsPath, "utf8"))
  : {};

const scenes = board.scenes || [];
const errors = [];
const warnings = [];

if (!scenes.length) errors.push("no scenes");

let cursor = 0;
let sum = 0;
for (const s of scenes) {
  if (typeof s.durationSec !== "number" || s.durationSec <= 0) {
    errors.push(`scene ${s.id || "?"}: invalid durationSec`);
    continue;
  }
  if (typeof s.startSec === "number" && Math.abs(s.startSec - cursor) > 0.05) {
    warnings.push(`scene ${s.id}: startSec ${s.startSec} != expected ${cursor}`);
  }
  if (s.onScreenText && s.durationSec < 1.2) {
    warnings.push(`scene ${s.id}: text may be unreadable at ${s.durationSec}s`);
  }
  if (!s.beat) warnings.push(`scene ${s.id}: missing beat`);
  cursor += s.durationSec;
  sum += s.durationSec;
}

const target = board.totalDurationSec ?? settings.durationSec ?? sum;
if (Math.abs(sum - target) > 0.5) {
  errors.push(`duration sum ${sum}s != target ${target}s`);
}
if (settings.durationSec && Math.abs(sum - settings.durationSec) > 2) {
  warnings.push(`sum ${sum}s drifts from settings.durationSec ${settings.durationSec}s`);
}

const beats = new Set(scenes.map((s) => s.beat).filter(Boolean));
if (!beats.has("hook") && !beats.has("key")) {
  warnings.push("no hook/key beat — weak open");
}
if (!beats.has("cta") && (settings.format === "product-ad" || settings.format === "sizzle")) {
  warnings.push("product/sizzle format without cta beat");
}

const ok = errors.length === 0;
const report = { ok, sumDurationSec: sum, targetDurationSec: target, errors, warnings, sceneCount: scenes.length };
fs.mkdirSync(path.join(dir, "qa"), { recursive: true });
fs.writeFileSync(path.join(dir, "qa", "budget.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(ok ? 0 : 1);
