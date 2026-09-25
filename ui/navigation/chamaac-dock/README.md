# Dock

A dock navigation component with animated dropdown menus, hover effects, and image previews.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/dock-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A dock navigation component with animated dropdown menus, hover effects, and image previews.
- Provides: Dock
- Requires: `motion`, `clsx`, `tailwind-merge`, `lucide-react`, `next-themes`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/dock.json`
- Registry: https://www.chamaac.com/r/dock.json
- Local source fallback: `upstream/examples/dock-demo.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/dock.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `-` | Dock items as children. Use DockIcon, DockItem (for dropdowns), and DockLink components to compose the dock navigation. |
| `closeDelay` | `number` | `100` | Delay in milliseconds before closing dropdown menus when mouse leaves |
| `bottomOffset` | `string` | `"60px"` | CSS value for the bottom offset of the dock navigation |
| `activePage` | `string` | `-` | Optional path to determine which menu items should be marked as active. If not provided, uses the current pathname from Next.js router. |
| `className` | `string` | `""` | Custom class names for styling the dock container |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/examples/dock-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/navigation/dock

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `lucide-react`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only; `src/demo-assets/` holds its sample media. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### Dock — `dock.tsx`

Fixed bottom navigation built from children: `DockIcon` (icon link), `DockLink` (text link, optional trailing icon that nudges up-right on hover, `external` opens a new tab) and `DockItem` (dropdown with `DockDropdownItem` links, each with an optional preview image). Next.js is gone: links are `<a>` unless `renderLink` supplies your router's link, the current page is `activePage` (no `usePathname`), and hover/active fills are `--accent` classes (upstream picked hex colours in JS via `next-themes`).

- Props (Dock): `children`, `activePage`, `renderLink({href, className, children, onClick})`, `closeDelay` (100 ms), `bottomOffset` (`60px`), `className`.
- States: desktop (md+) — a `--background` pill (translucent in dark mode, blurred, `--border`); the link matching `activePage` and an open dropdown trigger get `--accent`; an open `DockItem` grows the pill upward into a 400 px+ panel listing its links beside an 80 px preview of the hovered (else active) link's image. Mobile — a "Menu" pill; open, a full-screen `--background` list of links and sections, with body scroll locked.
- Interactions: hover opens a dropdown and keeps it open while over the trigger or panel; leaving closes it after `closeDelay`; hovering a dropdown link nudges it 5 px right and swaps the preview.
- Keyboard: triggers are buttons — focusing one opens its panel (blur closes it), links are tabbable; the mobile Menu button toggles `aria-expanded`.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
