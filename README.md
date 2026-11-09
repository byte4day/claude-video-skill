# Product Video

<p align="center">
  <img src="assets/logo.svg" alt="Product Video logo" width="160" height="160" />
</p>

Claude Code plugin by **[字节4](https://github.com/byte4day)** (`byte4day`): **product / game → researched storyboard → Remotion or Three.js → QA gate → MP4**.

Researched against Remotion’s official skills, Promptfilm, Animatic, VideoKit, HyperFrames, Renzaflow, and Claude Code’s skills/agents/plugins model (see [`research/`](research/)).

## Install (Claude Code)

```bash
claude plugin marketplace add byte4day/claude-video-skill
claude plugin install product-video@product-video
```

Then `/reload-plugins` (or restart Claude Code).

**Recommended companion** (Remotion engine):

```bash
claude plugin marketplace add remotion-dev/claude-code-plugin
claude plugin install remotion@remotion
```

## Usage

```text
/video Make a 20s launch trailer for my roguelike "Ashfall" — dark fantasy, Steam
/video https://example.com/my-saas --engine remotion --aspect 9:16
/video This is my product: wireless earbuds, matte black — product ad, deep research
```

Staged:

| Command | What |
|---------|------|
| `/video` | Full pipeline |
| `/video-research` | Research → `.video/<slug>/research/` only |
| `/video-storyboard` | Plan + storyboard (human gate) |
| `/video-render` | Build Remotion / Three preview |
| `/video-qa` | Automated ship + fresh-eyes review + gate |

## Agents

| Agent | Role |
|-------|------|
| `video-researcher` | Multi-feed web research → disk |
| `video-feed-scout` | Parallel single-feed scout |
| `video-cinematographer` | Storyboard + pacing |
| `video-renderer` | Remotion / Three build |
| `video-qa-reviewer` | Independent PASS/FAIL review |

## Models

Claude Code agent `model` fields use aliases (`sonnet`, `opus`, `haiku`, `fable`) or full IDs. Aliases resolve to the current Claude 5.x / Fable lines (for example `opus` → Opus 5.5, `fable` → Fable 5.2). This plugin pins specialists: cinematographer → `fable` (hard creative, long-horizon), QA → `opus`, research/render → `sonnet`, feed scouts → `haiku`. Prefer `inherit` for any new orchestrator agents so the parent session chooses the model.

## Pipeline gates

1. Research on disk before storyboard  
2. Storyboard accepted before build  
3. Builder ≠ visual reviewer  
4. `gate.mjs` prints **READY** before final MP4  

Working tree: `.video/<slug>/` in the project you run Claude from.

## Layout

```
.claude-plugin/     plugin + marketplace manifests + logo
assets/logo.svg     brand mark
skills/video/       orchestrator + scripts + references
skills/video-*      stage skills
agents/             specialist subagents
research/           ecosystem research archive
```

## License

MIT © 字节4
