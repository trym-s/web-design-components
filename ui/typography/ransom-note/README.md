# Ransom note

- I always liked the ransom-note look, where every letter is torn from a different magazine and taped down crooked. So I took a set of real cut-out letters and made it into something you can type with.
- Each character picks a random paper scrap from the set, then gets a small random tilt, bounce and size so the line reads like it was assembled by hand, not typed. Type your own note below, tune how messy it is, and re-roll to shuffle the scraps.

## Classification

- Category: `typography` — decorative
- Medium: React + image scraps
- Entry point: `src/ransom/playground.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/ransom/manifest.ts`
- `src/ransom/RansomLine.tsx`
- `src/ransom/RansomNoteCard.tsx`
- `src/ransom/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/ransom-note
