# Symbols effect

- Drop in an image or a video and it gets cut into four brightness bands. Each band is stamped with a tiny symbol, tinted with its own colour, so the picture is rebuilt out of little marks. It all runs on the GPU, so video plays through it live.
- The symbols, the colours and where the bands split are yours to change. When it looks right you can save a still as a PNG or record the whole thing as a video.
- It runs entirely in the browser, nothing gets uploaded, and you can grab the code below and drop the renderer into your own project.

## Classification

- Category: `effects` — decorative
- Medium: WebGL shader
- Entry point: `src/sandbox/standalone/SymbolsEffect.ts`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/sandbox/shaders.ts`
- `src/sandbox/glyphs.ts`
- `src/sandbox/standalone/SymbolsEffect.ts`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `src/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/sandbox
