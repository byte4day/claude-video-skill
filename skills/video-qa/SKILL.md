---
name: video-qa
description: >
  QA and delivery stage for product/game videos. Runs automated ship checks,
  spawns a fresh-eyes visual reviewer, gates READY, and optionally renders
  final MP4. Use for /video-qa, /video-deliver, or before calling any film done.
argument-hint: "[--slug name] [--deliver]"
allowed-tools: Read Write Grep Glob Bash Agent
disable-model-invocation: true
effort: high
---

# Video QA + deliver

1. Run automated checks:

   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/skills/video/scripts/ship.mjs" --dir .video/<slug>
   ```

2. Spawn **video-qa-reviewer** with a clean brief: paths to storyboard, build, stills/preview. Reviewer must **not** have built the film. It writes `qa/visual-review.md` only (read-only tools preferred).

3. Fix failures; re-ship. Then:

   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/skills/video/scripts/gate.mjs" --dir .video/<slug>
   ```

4. If arguments include `--deliver` or user asked for MP4 **and** gate prints READY:

   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/skills/video/scripts/render.mjs" --dir .video/<slug>
   ```

5. Report paths, remaining risks, illustrative gaps.

Never claim done without READY. Checklist: `${CLAUDE_PLUGIN_ROOT}/skills/video/references/qa.md`.
