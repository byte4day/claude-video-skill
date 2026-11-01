# Pipeline

```
/video "subject"
  ├─ new_project.mjs → .video/<slug>/
  ├─ kickoff settings (engine, aspect, depth, format)
  ├─ Agent(video-researcher) [+ video-feed-scout × N]
  │    └─ research/{facts,sources,visual-notes,inventory,gaps}.md
  ├─ Agent(video-cinematographer)
  │    └─ plan.md + storyboard.json → budget.mjs → HUMAN GATE
  │         └─ qa/storyboard-accepted.json
  ├─ Agent(video-renderer)
  │    └─ remotion/ or three/ + build-notes.md + Studio/preview
  ├─ ship.mjs → qa/report.json
  ├─ Agent(video-qa-reviewer) → qa/visual-review.md (PASS)
  ├─ gate.mjs → READY
  └─ render.mjs → out/final.mp4
```

## Stage commands

| Slash | Skill |
|-------|-------|
| `/video` | orchestrator |
| `/video-research` | research only |
| `/video-storyboard` | board only |
| `/video-render` | build only |
| `/video-qa` | ship + review + gate |
| `/video-deliver` | same as qa with `--deliver` |

## Artifact tree

```
.video/<slug>/
├── brief.md
├── settings.json
├── research/
├── plan.md
├── storyboard.json
├── remotion/ | three/
├── build-notes.md
├── qa/
│   ├── budget.json
│   ├── storyboard-accepted.json
│   ├── report.json
│   ├── visual-review.md
│   └── gate.json
└── out/final.mp4
```
