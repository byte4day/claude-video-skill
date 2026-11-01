# Research summary — Claude Code video / animation / 3D

**Date:** 2026-11-01 · **Agents:** 3 parallel research subagents

## What exists today

1. **Official Remotion** — `/remotion-*` skills + Claude plugin `remotion@remotion`. 3D is a markup rule (`@remotion/three`), not a slash skill. Studio-first; render on request.
2. **Ecosystem film OSes** — Promptfilm (research→3D HTML→READY), Animatic (brief→sizzle Remotion), VideoKit (17 `/video-*`, paid), HyperFrames (HTML→MP4), Renzaflow (GLB/HTML→MP4).
3. **Authoring model** — Claude Code prefers **plugins** packaging skills + agents + scripts; skills superseded flat commands; subagents for research/QA isolation.

## Product decision for this repo

Ship **product-video**: Promptfilm-shaped gates + Animatic-style staged commands + Remotion/Three engines + five specialist agents. Full notes in `01-*.md`, `02-*.md`, `03-*.md`.
