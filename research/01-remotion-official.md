# Research Agent 1 — Official Remotion + Claude Code

**Date:** 2026-11-01 · **Scope:** remotion-dev plugin, skills, Claude Code extension model

## Summary

Remotion ships Agent Skills for coding agents. Two official Claude Code paths:

| Path | Source | Invocation |
|------|--------|------------|
| Claude Code **plugin** | `remotion-dev/claude-code-plugin` | `/remotion:remotion-create` |
| Project **skills** | `remotion-dev/skills` via `npx remotion skills add` | `/remotion-create` |

**No standalone `/remotion-3d` skill.** 3D lives as rule `3d.md` under `/remotion-markup` (`@remotion/three`).

## Install

```bash
# Plugin (Claude Code)
claude plugin marketplace add remotion-dev/claude-code-plugin
claude plugin install remotion@remotion
# restart Claude Code

# Project skills
npx remotion skills add
# or: npx skills add remotion-dev/skills
```

Layout after project install: `.agents/skills/` with `.claude/skills` → symlink.

## Skill inventory (`/remotion-*`)

| Skill | Role |
|-------|------|
| `remotion-best-practices` | Router for all skills |
| `remotion-create` | Scaffold project/composition |
| `remotion-markup` | React markup, animation, media, **3D**, effects |
| `remotion-studio` | Launch Studio preview |
| `remotion-render` | Export video/still |
| `remotion-maps` | Maps + Cesium 3D flyovers |
| `remotion-captions` | Captions/subtitles |
| `remotion-saas` | Player / Lambda / SaaS |
| `remotion-interactivity` | Studio-editable markup |
| `remotion-docs` | Live docs lookup |
| `remotion-upgrade` | Upgrade Remotion + skills |
| `remotion-multimedia` | Mediabunny metadata |
| `remotion-license` | Documented; packaging incomplete in public skills tree |

Plugin = skills-only (no agents/commands/hooks). Version observed: **4.0.539**.

## 3D rules (`@remotion/three`)

1. `npx remotion add @remotion/three`
2. Wrap in `<ThreeCanvas>` + lighting
3. Animate only via `useCurrentFrame()` — **forbid** R3F `useFrame()`
4. `<Sequence>` inside ThreeCanvas needs `layout="none"`

## Claude Code model (2025–2026)

| Mechanism | Behavior |
|-----------|----------|
| CLAUDE.md | Always-on |
| Skills (incl. former slash commands) | `/name`; body on use |
| Subagents | Isolated context; summary returns |
| Plugins | Package skills/agents/hooks/MCP |

Skills preferred over `.claude/commands/*.md`. Plugin skills: `/plugin:skill`.

## Product/game launch tips (from Remotion skills)

- One focal message per scene; solve crowding with **time**, not grids
- Safe area (1080w): ≥80px sides, ≥100px top/bottom
- Animate with `useCurrentFrame` + `interpolate` only — no CSS/Tailwind animations
- Studio first; render only when user asks
- Captions/VO via remotion-captions + voiceover guidance

## Gaps

- No `/remotion-3d` top-level skill
- Dual install naming (`/remotion:…` vs `/remotion-…`)
- Skills instruct agents; they are not a renderer
- Remotion company license for orgs of 4+

## Sources

- https://www.remotion.dev/docs/ai/claude-code-plugin
- https://www.remotion.dev/docs/ai/skills
- https://www.remotion.dev/docs/three
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/plugins
- https://github.com/remotion-dev/claude-code-plugin
- https://github.com/remotion-dev/skills
