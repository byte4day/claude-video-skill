#!/usr/bin/env node
/**
 * Export final media after READY gate.
 * Usage: node render.mjs --dir .video/<slug> [--force]
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const v = process.argv[i + 1];
  if (!v || v.startsWith("--")) return true;
  return v;
}

const dir = path.resolve(arg("dir", ".video"));
const force = !!arg("force", false);
const outDir = path.join(dir, "out");
fs.mkdirSync(outDir, { recursive: true });

const gatePath = path.join(dir, "qa", "gate.json");
if (!force) {
  if (!fs.existsSync(gatePath)) {
    console.error("BLOCKED: run gate.mjs first (or --force)");
    process.exit(1);
  }
  const gate = JSON.parse(fs.readFileSync(gatePath, "utf8"));
  if (gate.status !== "READY") {
    console.error("BLOCKED: gate is not READY", gate);
    process.exit(1);
  }
}

const settings = JSON.parse(fs.readFileSync(path.join(dir, "settings.json"), "utf8"));
const finalMp4 = path.join(outDir, "final.mp4");
const result = { engine: settings.engine, out: finalMp4, ok: false, log: [] };

if (settings.engine === "remotion") {
  const remotionDir = path.join(dir, "remotion");
  if (!fs.existsSync(path.join(remotionDir, "package.json"))) {
    result.log.push("No remotion/package.json — agent must scaffold first");
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }
  const board = JSON.parse(fs.readFileSync(path.join(dir, "storyboard.json"), "utf8"));
  const composition = board.compositionId || settings.compositionId || undefined;
  const args = ["remotion", "render"];
  if (composition) args.push(composition);
  args.push(finalMp4);
  result.log.push(`cwd=${remotionDir} npx ${args.join(" ")}`);
  const r = spawnSync("npx", args, { cwd: remotionDir, encoding: "utf8", shell: true });
  result.log.push((r.stdout || "").slice(-2000));
  if (r.stderr) result.log.push((r.stderr || "").slice(-2000));
  result.ok = r.status === 0 && fs.existsSync(finalMp4);
} else if (settings.engine === "three") {
  const threeDir = path.join(dir, "three");
  const html = path.join(threeDir, "index.html");
  if (!fs.existsSync(html)) {
    result.log.push("missing three/index.html");
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }
  // Capture path: prefer playwright if present; else instruct agent.
  const helper = path.join(threeDir, "capture.mjs");
  if (fs.existsSync(helper)) {
    const r = spawnSync(process.execPath, [helper, "--out", finalMp4], {
      cwd: threeDir,
      encoding: "utf8",
    });
    result.log.push((r.stdout || "") + (r.stderr || ""));
    result.ok = r.status === 0 && fs.existsSync(finalMp4);
  } else {
    result.ok = false;
    result.log.push(
      "Three.js film ready for preview. Add three/capture.mjs (Playwright/Puppeteer + ffmpeg) or render manually, then place out/final.mp4."
    );
    result.preview = html;
    fs.writeFileSync(
      path.join(outDir, "RENDER_INSTRUCTIONS.md"),
      `# Render Three.js film\n\nPreview: \`${html}\`\n\nImplement \`three/capture.mjs\` to record frame-exact MP4 to \`${finalMp4}\`, or use HyperFrames / ffmpeg from a screen capture.\n`
    );
  }
} else {
  result.log.push(`unknown engine ${settings.engine}`);
}

fs.writeFileSync(path.join(outDir, "render-report.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
