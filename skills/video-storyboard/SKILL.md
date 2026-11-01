---
name: video-storyboard
description: >
  Storyboard stage for product/game videos. Turns brief + .video research into
  plan.md and storyboard.json with time budget. Use for /video-storyboard after
  research, before Remotion/Three build. Stops for human approval unless waived.
argument-hint: "[--slug name]"
allowed-tools: Read Write Edit Grep Glob Bash AskUserQuestion
disable-model-invocation: true
effort: high
---

# Video storyboard

1. Load `.video/<slug>/brief.md`, `settings.json`, and `research/*`.
2. Delegate **video-cinematographer** (or do the work if already that agent).
3. Classify format if missing: product-ad, game-demo, app-demo, explainer, logo-sting, sizzle.
4. Write `plan.md` (arc, tone, music) and `storyboard.json` (see schema).
5. Run:

   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/skills/video/scripts/budget.mjs" --dir .video/<slug>
   ```

6. Present scene cards (time, shot, text, camera). **Wait for approval** unless the user waived the gate.
7. On approve, write `qa/storyboard-accepted.json` with `{ "accepted": true, "at": "<iso>" }`.

Schema and pacing: `${CLAUDE_PLUGIN_ROOT}/skills/video/references/storyboard-schema.md` and `pacing.md`.
