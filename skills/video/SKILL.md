---
name: video
description: >
  End-to-end researched product/game promo video for Claude Code. Researches
  web feeds, saves artifacts, storyboards, builds Remotion or Three.js film,
  runs QA + fresh-eyes review, gates READY, then delivers MP4. Use whenever
  the user says make a video, trailer, promo, sizzle, launch film, product ad,
  game trailer, motion graphic, /video, or "this is my product/game — make a
  video" — even if they do not name Remotion or Three.js.
argument-hint: "[brief | product-url | game-name] [--engine remotion|three] [--aspect 16:9|9:16|1:1] [--depth light|medium|deep]"
allowed-tools: Read Write Edit Grep Glob Bash WebSearch WebFetch Agent AskUserQuestion
effort: high
---

# Product Video — orchestrator

Turn a product, game, app, or brief into a finished promo video.

Pipeline (never skip gates):

```
kickoff → research (disk) → storyboard (human gate) → build → QA + fresh eyes → READY → MP4
```

## 0. Paths

- Plugin/skill root: `${CLAUDE_SKILL_DIR}` (this skill) or `${CLAUDE_PLUGIN_ROOT}`
- Project workdir: `${CLAUDE_PROJECT_DIR}/.video/<slug>/`
- Scripts: `${CLAUDE_SKILL_DIR}/scripts/`

If `$ARGUMENTS` is empty, ask once for the subject (product/game URL or name).

## 1. Kickoff (one question max)

Ask once (or infer from brief) and write `.video/<slug>/settings.json`:

| Field | Default |
|-------|---------|
| `engine` | `remotion` (use `three` for realtime 3D HTML film) |
| `aspect` | `16:9` (ads also: `9:16`, `1:1`) |
| `durationSec` | `15`–`30` |
| `researchDepth` | `medium` (`light`/`deep`) |
| `format` | auto-classify: `product-ad` \| `game-demo` \| `app-demo` \| `explainer` \| `logo-sting` \| `sizzle` |
| `captionLang` | `en` |

Slug = kebab-case short name from the subject.

```bash
node "${CLAUDE_SKILL_DIR}/scripts/new_project.mjs" --slug <slug> --brief "$ARGUMENTS"
```

Save the raw brief to `.video/<slug>/brief.md`.

Read [references/formats.md](references/formats.md) to lock the format.

## 2. Research (always on disk)

Delegate the **video-researcher** agent (and optional parallel feed scouts). Do not invent facts.

Required outputs under `.video/<slug>/research/`:

| File | Content |
|------|---------|
| `facts.md` | Sourced claims (features, price, platform, release) |
| `sources.md` | URL list with what each contributed |
| `visual-notes.md` | Palette, UI, characters, camera refs |
| `inventory.md` | Assets on hand vs needed (logo, GLB, screenshots, music) |
| `gaps.md` | Unknowns marked **illustrative** if used on screen |

Depth:

- `light` — official site + store page
- `medium` — + press, docs, 2–3 reference videos
- `deep` — + competitors, community, frame contact sheets

See [references/research.md](references/research.md).

## 3. Storyboard (human gate)

Delegate **video-cinematographer**. Produce:

- `plan.md` — message arc, tone, music direction
- `storyboard.json` — scenes with `id`, `startSec`, `durationSec`, `shot`, `onScreenText`, `voiceover`, `camera`, `assets`

```bash
node "${CLAUDE_SKILL_DIR}/scripts/budget.mjs" --dir .video/<slug>
```

Present the board. **Wait for approval** before building (unless the user said "skip approval" / "just ship").

See [references/storyboard-schema.md](references/storyboard-schema.md) and [references/pacing.md](references/pacing.md).

## 4. Build

Delegate **video-renderer** with approved board + `engine` from settings.

### Remotion (`engine: remotion`)

1. Prefer installed Remotion skills (`/remotion-create`, `/remotion-markup`, or plugin `/remotion:…`). If missing, recommend:

   ```bash
   claude plugin marketplace add remotion-dev/claude-code-plugin
   claude plugin install remotion@remotion
   ```

2. Scaffold or reuse project under `.video/<slug>/remotion/` (or repo root if already Remotion).
3. Open Studio early (`npx remotion studio`). Animate only with `useCurrentFrame` + `interpolate`.
4. For 3D product/game mesh: `npx remotion add @remotion/three` — follow [references/remotion.md](references/remotion.md).

### Three.js HTML film (`engine: three`)

1. Single self-contained HTML (or small module set) under `.video/<slug>/three/`.
2. Real-time loop; frame-driven camera; captions hold while readable.
3. See [references/threejs.md](references/threejs.md).

Do **not** export final MP4 yet — preview first.

## 5. QA + fresh eyes

```bash
node "${CLAUDE_SKILL_DIR}/scripts/ship.mjs" --dir .video/<slug>
```

Then delegate **video-qa-reviewer** (must not be the builder). It writes `qa/visual-review.md` only.

Fix issues; re-run ship. Loop until gate passes.

```bash
node "${CLAUDE_SKILL_DIR}/scripts/gate.mjs" --dir .video/<slug>
```

See [references/qa.md](references/qa.md) and [references/pipeline.md](references/pipeline.md).

## 6. Deliver

Only when `gate.mjs` prints `READY`:

```bash
node "${CLAUDE_SKILL_DIR}/scripts/render.mjs" --dir .video/<slug>
```

Report:

- Path to `out/final.mp4` (and preview URL/HTML)
- Format, aspect, duration, engine
- Research folder path
- Honest gaps (illustrative claims)

## Slash companions

| Command | Skill | Use |
|---------|-------|-----|
| `/video` | this | Full pipeline |
| `/video-research` | video-research | Research only |
| `/video-storyboard` | video-storyboard | Board from existing research |
| `/video-render` | video-render | Build approved board |
| `/video-qa` | video-qa | QA + review |
| `/video-deliver` | video-qa + render | Gate + MP4 |

## Non-negotiables

1. Research lands on disk before storyboard.
2. Storyboard approved before build (unless user waived).
3. Builder ≠ visual reviewer.
4. Never call the film done without `READY`.
5. Mark unsourced on-screen numbers as illustrative.
6. Prefer Studio/preview before render.
