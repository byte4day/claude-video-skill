# Three.js HTML film notes

Target: one previewable entry at `.video/<slug>/three/index.html`.

## Rules

- Drive motion from a frame clock (or `performance.now` mapped to loop duration) — deterministic enough to capture
- Physically plausible lighting for product/game heroes
- Captions: DOM overlay or canvas; hold while readable
- Seamless loop when format is journey/sting
- Keep dependencies minimal; prefer import maps or a tiny bundler only if needed
- Document preview: `npx serve three` or open file / Vite

## Capture

Add `three/capture.mjs` that:

1. Launches headless Chromium
2. Seeks/steps through the loop duration at target fps
3. Pipes frames to ffmpeg → `../out/final.mp4`

Or hand off to HyperFrames / Renzaflow-style pipelines if installed.

Knowledge packs (optional): `npx skills add cloudai-x/threejs-skills`
