# Dock

A dock navigation component with animated dropdown menus, hover effects, and image previews.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/dock-demo.tsx`
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
- Local source fallback: `src/examples/dock-demo.tsx`

## How an agent uses this reference

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
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

- `src/examples/dock-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/navigation/dock
