# Research Agent 2 — Claude Code Video / Animation / 3D Ecosystem

**Date:** 2026-11-01 · **North star:** Promptfilm research → storyboard → 3D film → READY gate

## Layer map

| Layer | Role | Examples |
|-------|------|----------|
| Full film OS | Brief → research → board → build → QA → deliver | Promptfilm, Animatic, VideoKit |
| HTML→MP4 engines | Seekable browser render | HyperFrames, Renzaflow |
| Launch wrappers | One-command ship films | brag, huashu-motion, explainroo |
| 3D knowledge | Correct Three.js / shaders / R3F | CloudAI-X, iart-ai, core-3d-animation |
| Post / math | Edit or diagram | ffmpeg-skill, manim-skill |
| Catalog | Discovery (~94 skills) | createmotion.io/motif |

## Project cards

### Promptfilm ⭐ (closest to product/game need)
- Install: `/plugin marketplace add Seokwoooo/promptfilm` → `/plugin install promptfilm@promptfilm`
- Command: `/promptfilm`
- Pipeline: kickoff → research (`facts.md`, `sources.md`, …) → storyboard gate → Three.js HTML → QA + fresh-eyes → READY → MP4
- Formats: product ad, game/app demo, journey, how-it-works, logo sting, data story
- License: MIT · https://github.com/Seokwoooo/promptfilm

### VideoKit (ClaudeKit) — proprietary
- 17 `/video-*` commands, 5 skills, 3 agents (director/creator/editor)
- Remotion + FFmpeg + optional HyperFrames; post-render verification
- Paid · https://theclaudekit.com/video

### Animatic
- `/brief` → `/storyboard` → `/sizzle` → `/animate` → `/review`
- Personalities: cinematic-dark, editorial, neutral-light, montage
- Remotion 1920×1080@60 · MIT · https://github.com/getfndd/animatic

### HyperFrames (HeyGen)
- HTML + GSAP/Lottie/Three → deterministic MP4
- Apache-2.0 · marketplace: `heygen-com/hyperframes`
- https://claude.com/marketplace/plugins/hyperframes

### Renzaflow
- `/renzaflow` (.glb → product 360/hero) · `/renzascene` (HTML/GSAP/Three)
- Deterministic Chrome→FFmpeg · MIT · https://github.com/nikhilachale/Renzaflow

### Remotion official — see `01-remotion-official.md`

### Others worth knowing
| Skill | Job |
|-------|-----|
| brag | Repo → launch MP4 (HyperFrames) |
| huashu-motion | Product launch + score + critic |
| explainroo | Narrated explainer + TTS |
| CloudAI-X/threejs-skills | 13 Three.js knowledge skills |
| iart-ai/webgl-animation-skills | GLSL / particles / Three motion |
| freshtechbro core-3d-animation | Three/Babylon/R3F/GSAP plugin bundle |
| ffmpeg-skill | Delivery: cutdowns, captions, loudness |
| manim-skill | 3B1B-style math films |

## Comparison (ads & trailers)

| Project | Research | Storyboard | 3D | QA gate | Best for |
|---------|----------|------------|-----|---------|----------|
| Promptfilm | deep | yes | Three.js film | READY + fresh eyes | Product ads + game demos |
| VideoKit | light | templates | weak | post-verify | SaaS demos / social |
| Animatic | brief | JSON | via Remotion | evaluate/review | UI sizzle |
| HyperFrames | light | refs | optional | lint/preview | Kinetic promos |
| Renzaflow | light | soft | GLB | scrub preview | Product 360 |
| brag | project-scan | brief | no | soft | Launch clips |

## Must-copy patterns for our skill

1. **Format router** — product ad | game demo | explainer | sting before build
2. **Research-first** — disk artifacts with sources; mark illustrative vs public
3. **Storyboard human gate** with time budget before expensive build
4. **Pacing grammar** — caption = camera stop; hold times; beat types
5. **Independent QA** — builder ≠ reviewer; READY gate before “done”
6. **Taste profile** — overridable brand/taboos/aspect defaults
7. **Optional rails** — Remotion plugin, HyperFrames/GLB path, ffmpeg cutdowns

## Sources

- https://github.com/Seokwoooo/promptfilm
- https://theclaudekit.com/video
- https://github.com/getfndd/animatic
- https://github.com/heygen-com/hyperframes
- https://github.com/nikhilachale/Renzaflow
- https://createmotion.io/resources/agent-skills/
- https://github.com/CloudAI-X/threejs-skills
- https://github.com/iart-ai/webgl-animation-skills
- https://github.com/freshtechbro/claudedesignskills
