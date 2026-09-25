# Chromatic glow

- I wanted light that blooms out soft and pulls the colors apart at the edges.
- The word gets blurred at a few sizes and added back together, so it glows for real. Then it splits into a warm copy and a cool copy that drift a little the opposite way, and that gap is the rainbow edge. Move over it and the split leans toward your cursor. Type your own word and pick the two colors below.

## Classification

- Category: `effects` — decorative
- Medium: WebGL canvas
- Entry point: `upstream/chroma/playground.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `upstream/chroma/params.ts`
- `upstream/chroma/text-mask.ts`
- `upstream/chroma/shaders.ts`
- `upstream/chroma/engine.ts`
- `upstream/chroma/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/chroma-glow
