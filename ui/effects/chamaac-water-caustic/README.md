# Water Caustic

A stunning, tileable water caustic lighting shader using wave interference.

> Work in progress in the Chamaac repository (`app/in-progress/`); not on the site yet.

## Classification

- Category: `effects` — decorative
- Medium: React + TypeScript + Tailwind CSS v4 + three.js (@react-three/fiber, GLSL shaders); static HTML
- Framework: react
- Entry point: `upstream/examples/water-caustic-demo.tsx`
- Nature: decorative; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A stunning, tileable water caustic lighting shader using wave interference.
- Provides: Water Caustic
- Requires: `three`, `@react-three/fiber`, `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · in-progress
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/water-caustic.json`
- Registry: https://www.chamaac.com/r/water-caustic.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/water-caustic/water-caustic.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/water-caustic.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`. Shader backgrounds draw on a canvas at runtime: port the GLSL from the component source, not the markup.

## Files

- `ui/_sources/chamaac/registry/chamaac/water-caustic/water-caustic.tsx` — the component as the registry installs it
- `upstream/examples/water-caustic-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/amarnathdhumal/chamaacui/tree/main/app/in-progress/water-caustic
