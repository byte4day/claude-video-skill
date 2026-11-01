---
name: video-render
description: >
  Build stage for product/game videos. Implements an approved storyboard as a
  Remotion composition or Three.js HTML film and opens Studio/preview. Use for
  /video-render after storyboard acceptance. Do not export final MP4 unless the
  user explicitly asks or READY gate already passed.
argument-hint: "[--slug name] [--engine remotion|three]"
allowed-tools: Read Write Edit Grep Glob Bash
disable-model-invocation: true
effort: high
---

# Video render (build)

1. Require `.video/<slug>/storyboard.json` and `qa/storyboard-accepted.json` (or user waiver in brief).
2. Read `settings.json` for `engine`, `aspect`, `durationSec`.
3. Delegate **video-renderer** or implement directly.

## Remotion

- Install/use Remotion skills if available; else scaffold with `npx create-video@latest --yes --blank --no-tailwind .video/<slug>/remotion`
- Open Studio before heavy composition work
- Frame-driven animation only (`useCurrentFrame` + `interpolate`)
- 3D: `@remotion/three` — no R3F `useFrame`
- Write notes to `.video/<slug>/build-notes.md` (composition id, Studio command)

## Three.js

- Write film under `.video/<slug>/three/` (prefer one HTML entry)
- Looping realtime; caption holds; camera from clock/frame
- Document preview command in `build-notes.md`

4. Stop after preview is running. Final MP4 is `/video-qa` + `render.mjs` after READY.

Refs: `${CLAUDE_PLUGIN_ROOT}/skills/video/references/remotion.md`, `threejs.md`.
