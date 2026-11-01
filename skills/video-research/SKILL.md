---
name: video-research
description: >
  Research-only stage for product/game videos. Scrapes official sites, stores,
  press, docs and reference footage; writes facts.md, sources.md, visual-notes.md,
  inventory.md, gaps.md under .video/<slug>/research/. Use for /video-research,
  before storyboarding, or when the user asks to research a product or game for
  a trailer/ad — do not build or render video.
argument-hint: "[subject | url] [--depth light|medium|deep] [--slug name]"
allowed-tools: Read Write Grep Glob Bash WebSearch WebFetch Agent
disable-model-invocation: true
effort: medium
---

# Video research

Research `$ARGUMENTS` for a promo/trailer. Write disk artifacts only — no storyboard, no build.

## Steps

1. Resolve slug and depth (default `medium`). Ensure `.video/<slug>/` exists via:

   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/skills/video/scripts/new_project.mjs" --slug <slug> --brief "$ARGUMENTS"
   ```

2. Spawn **video-researcher** (and optional parallel feed specialists via Agent tool). Cover:

   | Feed | What to pull |
   |------|----------------|
   | Official site / landing | Positioning, features, CTA, brand colors |
   | App Store / Play / Steam / itch | Platforms, price, ratings, screenshots, tags |
   | Docs / changelog | Real capabilities (no marketing fluff) |
   | Press / launch posts | Quotes, dates, comparisons |
   | Social / trailer refs | Motion language, pacing, music mood |
   | Asset hunt | Logo SVG/PNG, GLB, UI kit, soundtrack license |

3. Write under `.video/<slug>/research/`:

   - `facts.md` — bullet claims with `(source: URL)`
   - `sources.md` — full citation list
   - `visual-notes.md` — palette, typography cues, camera refs
   - `inventory.md` — have / need / blocked
   - `gaps.md` — unknowns; anything used on screen without a source → **illustrative**

4. Return a short summary + absolute paths. Do not invent specs.

Full contract: [../video/references/research.md](../video/references/research.md) — if that path fails, read `${CLAUDE_PLUGIN_ROOT}/skills/video/references/research.md`.
