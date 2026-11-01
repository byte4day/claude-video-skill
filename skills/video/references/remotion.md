# Remotion notes (thin — prefer official skills)

Install companion:

```bash
claude plugin marketplace add remotion-dev/claude-code-plugin
claude plugin install remotion@remotion
```

Or project skills: `npx remotion skills add`

## Must follow

- Animate with `useCurrentFrame` + `interpolate` / spring — **no** CSS/Tailwind animations
- Studio before render
- Safe margins ~80px sides / 100px top-bottom at 1080p
- Multi-scene: Sequences + transitions packages
- 3D: `npx remotion add @remotion/three` → `ThreeCanvas`; **forbid** `@react-three/fiber` `useFrame`
- Sequences inside ThreeCanvas: `layout="none"`
- Render only after READY (or explicit user ask): `npx remotion render [id] out/final.mp4`

Official docs: https://www.remotion.dev/docs/ai/skills · https://www.remotion.dev/docs/three
