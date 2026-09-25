# Glowing Border Button

A stylish glowing border button with a gradient border and glowing effects.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4; static HTML
- Framework: react
- Entry point: `upstream/examples/glowing-border-button-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A stylish glowing border button with a gradient border and glowing effects.
- Provides: Glowing Border Button
- Requires: `clsx`, `tailwind-merge`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/glowing-border-button.json`
- Registry: https://www.chamaac.com/r/glowing-border-button.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/glowing-border-button/glowing-border-button.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/glowing-border-button.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Additional CSS classes to style the button |
| `onClick` | `() => void` | `-` | Click handler function |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/glowing-border-button/glowing-border-button.tsx` — the component as the registry installs it
- `upstream/examples/glowing-border-button-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/buttons/glowing-border-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### GlowingBorderButton — `glowing-border-button.tsx`

A 60 px tall rounded button: a `--border` shell whose 2 px rim shows a blurred beam (`--glowing-border-beam`, default `#50C878`) spinning every 3 s behind an opaque `--background` face with bold `--foreground` text.

- Props: `children` ("Book a Call"), `className`, every `<button>` attribute.
- States: constant beam rotation; `:focus-visible` adds a `--ring` ring.
- Interactions: click.
- Keyboard: native button.
- Reduced motion: the beam stops (`motion-reduce:animate-none`).
