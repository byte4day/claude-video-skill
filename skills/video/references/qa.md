# QA checklist

## Automated (`ship.mjs`)

- [ ] brief, settings, research pack present
- [ ] plan + storyboard present
- [ ] storyboard-accepted.json
- [ ] budget.mjs passes
- [ ] remotion/ or three/ build exists
- [ ] build-notes.md exists
- [ ] facts cite URLs

## Human/agent visual review

- [ ] Verdict PASS/FAIL at top of `qa/visual-review.md`
- [ ] Hook clear; CTA present for ads
- [ ] Text readable (holds)
- [ ] No crowded scenes
- [ ] Claims match facts or marked illustrative
- [ ] Aspect safe areas OK

## Gate

`gate.mjs` requires ship OK + visual PASS + accepted storyboard → prints `READY`.

Only then `render.mjs`.
