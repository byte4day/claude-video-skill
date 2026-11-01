# storyboard.json schema

```json
{
  "version": 1,
  "slug": "my-game",
  "aspect": "16:9",
  "fps": 30,
  "totalDurationSec": 20,
  "compositionId": "Main",
  "scenes": [
    {
      "id": "s1",
      "startSec": 0,
      "durationSec": 3,
      "beat": "hook",
      "shot": "title over dark void",
      "onScreenText": "MY GAME",
      "voiceover": "",
      "camera": "push_in",
      "transition": "hard_cut",
      "assets": ["logo.png"],
      "notes": ""
    }
  ]
}
```

## Enums

- **beat:** `hook` | `key` | `proof` | `transit` | `cta` | `return`
- **camera:** `static` | `push_in` | `pull_out` | `pan_left` | `pan_right` | `orbit` | `drift`
- **transition:** `hard_cut` | `crossfade` | `whip_left` | `whip_right`

Scenes must be contiguous: `startSec` of scene N = sum of prior durations.
