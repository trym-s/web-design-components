# glider gun

gosper's gun firing a glider every 30 generations.

## Classification

- Category: `effects` — decorative
- Medium: TypeScript ASCII frames + monospace text; React demo
- Framework: react
- Entry point: `src/demo.tsx`
- Nature: decorative
- Added: 2026-10-08T14:00:32Z
- Curation: pending
- Use when: a terminal-style page needs gosper's gun firing a glider every 30 generations.
- Avoid when: the visual would substitute for a usable control or a real data source.
- Provides: gosper's gun firing a glider every 30 generations; 56×20 cells at 10 fps.
- Requires: the local ascii.rest snapshot; React for this demo, browser DOM for playback.
- Availability: public
- Variants: default
- Upstream category: generative
- Local source: `src/glider-gun.ts`

## Files

- `src/glider-gun.ts`: captured piece; only its type import points to the shared snapshot.
- `src/demo.tsx`: minimal replay of the upstream default options.
- `reference.tsx`: dashboard entry point.
- `preview.png`: Chromium capture of the original component page.
- Shared renderer, adapters, font files and licenses: `ui/_sources/ascii-rest/`.

## Use

The piece exports `meta` and a factory returning `frame(t, env)`. Use the shared `mount` with a `pre` or `canvas`, or copy the React / HTML / Astro adapter and local font assets when adapting to a project. Preserve upstream defaults and reduced-motion behavior. The data and form animations are visual demonstrations, not live services or operable forms.

Upstream page: https://ascii.rest/glider-gun/
