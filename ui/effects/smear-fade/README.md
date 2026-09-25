# Fade motion

- Thought this was a blur. It's two hundred copies of the word stacked almost invisibly, and the fade is just where a lot of them piled up.
- Did it the dumb way first, two hundred draws a frame, and it choked exactly when you moved your cursor. Now every pixel just walks back up the trail and counts.

## Classification

- Category: `effects` — decorative
- Medium: WebGL canvas
- Entry point: `upstream/smear/SmearCard.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `upstream/smear/shaders.ts`
- `upstream/smear/text-mask.ts`
- `upstream/smear/engine.ts`
- `upstream/smear/SmearCard.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/fade-motion
