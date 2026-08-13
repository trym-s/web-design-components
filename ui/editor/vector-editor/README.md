# Figma vector editor

- You know that Figma look everyone copies: the thin blue box around a thing, the little corner squares, the size tag under it, and the dots you grab to bend a shape. I wanted to see if I could build it for the web, so here it is.
- It is two small parts. One draws the blue box and the size tag around anything. The other lets you grab the dots on a shape and drag them to change it, then gives you the new path back. It is pretty raw, just a fun little experiment, but it works and you can take it.

## Classification

- Category: `editor` — functional
- Medium: React + SVG
- Entry point: `src/svg-editor/standalone/FigmaFrame.tsx`
- Nature: a working tool surface; treat it as an implementation reference, not a skin.

## Files

- `src/svg-editor/standalone/types.ts`
- `src/svg-editor/standalone/parse.ts`
- `src/svg-editor/standalone/FigmaFrame.tsx`
- `src/svg-editor/standalone/VectorEditor.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/vector-editor
