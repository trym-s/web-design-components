# Copy Button

Copy to tick, width locked, reverts after 2s.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/copy-button.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/copy-button.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/copy-button

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react`, `motion` (`motion/react`), `clsx` and `tailwind-merge` (through `src/lib/utils.ts`, shadcn's `cn` — point it at the target's own `@/lib/utils` when it has one). `src/demo.tsx` is sample data and wiring only.

### CopyButton — `copy-button.tsx`

- Props: `value` (string written to the clipboard), `label` (`"Copy"`, also the `aria-label`), `copiedLabel` (`"Copied"`), `errorLabel` (`"Failed"`), `timeout` (2000 ms before the face returns to idle), `onCopy(value)`, `onError(reason)`, `disabled`, `className`. The file also exports `useCopyToClipboard({ timeout, onCopy, onError })` → `{ copy(text): Promise<boolean>, reset, status, copied }`; it uses `navigator.clipboard.writeText` and falls back to a hidden `<textarea>` + `document.execCommand("copy")` (restoring the previous selection).
- Structure: a `<button>` 36 px high (`h-9`), `px-3`, `gap-2`, 13 px medium text, radius `calc(var(--radius) - 1px)`, 1 px `--border`, `--card` fill, `--foreground` text, `shadow-xs`. Inside: a 14×14 icon cell stacking three SVGs (copy glyph, check, cross; 1.5 px stroke `currentColor`) in one grid cell, then a label cell stacking the three labels in one grid cell (the widest label sets the width, so the button never resizes). A visually hidden `role="status" aria-live="polite"` span announces `copiedLabel` / `errorLabel`.
- States: `idle` / `copied` / `error`. The active icon is at opacity 1, scale 1; the others at opacity 0, scale 0.92. The check path draws in (`pathLength` 0 → 1, 260 ms, ease `cubic-bezier(0.23, 1, 0.32, 1)`). The active label is at opacity 1, y 0, blur 0; the others at opacity 0, y 3 px, blur 3 px. Crossfades use a spring (stiffness 260, damping 34, mass 0.8). Hover fill `--accent`; focus-visible: border `--primary` plus a 3 px `--primary`/20 % ring; disabled 50 % opacity. After `timeout` ms the status returns to `idle`. Reduced motion (`prefers-reduced-motion`) swaps every transition for an instant change.
- Interactions: click copies `value`; a press nudges the button down 1 px (spring stiffness 520, damping 34, mass 0.45). `touch-action: manipulation`.
- Keyboard: native button — Enter / Space copy; focus ring as above.
