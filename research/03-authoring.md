# Research Agent 3 — Claude Code Skill + Agent Authoring

**Date:** 2026-11-01 · **Verdict:** Ship as a **plugin** (skills + agents + scripts), not one mega-SKILL.md

## Progressive disclosure

| Level | When | Content |
|-------|------|---------|
| Metadata | Always | `name` + `description` (~100 tokens) |
| Instructions | On trigger | `SKILL.md` body (&lt;500 lines ideal) |
| Resources | On demand | `references/`, `scripts/`, `assets/` |

## Skill frontmatter (Claude Code)

```yaml
---
name: video
description: What + when (triggers). Keep pushy.
argument-hint: "[brief] [--engine remotion|three] [--aspect 9:16|16:9]"
allowed-tools: Read Write Edit Grep Glob Bash WebSearch WebFetch Agent
disable-model-invocation: false
effort: high
---
```

Tokens: `$ARGUMENTS`, `$0`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_PROJECT_DIR}`

## Agent frontmatter

```yaml
---
name: video-researcher
description: When to delegate (short — always in context).
tools: Read, Write, Grep, Glob, Bash, WebSearch, WebFetch
model: sonnet   # aliases: sonnet | opus | haiku | fable | inherit | full IDs
maxTurns: 40
skills: [video-research]
omitClaudeMd: true
color: cyan
---
```

`model` accepts short aliases (`sonnet`, `opus`, `haiku`, `fable`), full IDs (`claude-opus-5-5`, …), or `inherit`. Prefer `inherit` on orchestrators; pin aliases only for specialist cost/quality tradeoffs.

Plugin agents: `permissionMode` / agent hooks ignored — use plugin-level hooks.

## Plugin layout

```
plugin-root/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/<name>/SKILL.md
├── agents/<name>.md
├── commands/          # legacy; prefer skills/
└── hooks/             # optional
```

Components live at **plugin root**, not inside `.claude-plugin/`.

Install:

```bash
claude plugin marketplace add <path-or-github>
claude plugin install <plugin>@<marketplace>
# /reload-plugins
```

## Steal from exemplars

| Source | Pattern |
|--------|---------|
| Promptfilm | Disk research, budget, ship/QA, fresh-eyes, READY gate |
| Remotion | Skill router, Studio-first, don't render until asked |
| Animatic | Staged slash surface, storyboard checkpoint, personalities |

## Recommended slash surface

| Command | Role |
|---------|------|
| `/video` | Full pipeline |
| `/video-research` | Research → disk only |
| `/video-storyboard` | Plan + board (needs research) |
| `/video-render` | Build approved board |
| `/video-qa` | Automated + visual review |
| `/video-deliver` | Gate + MP4 |

## Agent roster

1. **researcher** — web feeds → `.video/<slug>/research/`
2. **cinematographer** — research → storyboard + plan (human gate)
3. **renderer** — Remotion or Three.js build + Studio
4. **qa-reviewer** — fresh context; must not have built the film

## Pitfalls

1. Fat SKILL.md / nested reference chains
2. Components inside `.claude-plugin/`
3. Builder also “reviews” (confirmation bias)
4. Calling done without READY gate
5. Rendering before Studio preview
6. Long agent descriptions (token tax every turn)
7. Duplicating Remotion docs instead of recommending remotion plugin
8. Claude Code–only frontmatter keys on claude.ai packages

## Sources

- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/plugins/create
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://github.com/Seokwoooo/promptfilm
- https://github.com/remotion-dev/claude-code-plugin
- https://github.com/getfndd/animatic
