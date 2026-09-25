# useGridFocus

Manages keyboard navigation within a 2D grid following the WAI-ARIA grid pattern. Supports arrow keys for cell-to-cell navigation, Home/End for row boundaries, Ctrl+Home/Ctrl+End for grid boundaries, and Page Up/Down for custom callbacks (e.g., month navigation in calendars). Boundary navigation callbacks allow cross-grid navigation.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useGridFocus.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Manages keyboard navigation within a 2D grid following the WAI-ARIA grid pattern.
- Avoid when: Use for simple linear lists; prefer useListFocus for 1D navigation.
- Provides: useGridFocus
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · focus
- Keywords: grid, focus, keyboard, navigation, arrow, calendar, a11y, wai-aria, cells

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `upstream/examples/` as-is, or read `upstream/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- None of its own upstream; the demo is its family's: `ui/hooks/astryx-use-container-reveal`.

## Documentation

### useGridFocus

Import: `@astryxdesign/core/hooks`

Manages keyboard navigation within a 2D grid following the WAI-ARIA grid pattern. Supports arrow keys for cell-to-cell navigation, Home/End for row boundaries, Ctrl+Home/Ctrl+End for grid boundaries, and Page Up/Down for custom callbacks (e.g., month navigation in calendars). Boundary navigation callbacks allow cross-grid navigation.

**Do**

- Use for calendar date grids: wire onPageUp/onPageDown to month navigation and onNavigateBefore/onNavigateAfter for cross-month arrow key navigation.
- Attach both gridRef and handleKeyDown to the grid container element.
- For roving-tabindex grids (e.g. Calendar), set hasRovingTabIndex: true and attach handleFocus to the container onFocus; seed one focus target with tabindex=0 and the hook repairs and moves it.

**Don't**

- Use for simple linear lists; prefer useListFocus for 1D navigation.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseGridFocusOptions` |  | Configuration object for grid focus behavior. |
| `options.columns` * | `number` |  | Number of columns in the grid. Used for up/down navigation (moves by this many cells). |
| `options.cellSelector` | `string` | `'button:not([disabled]), [tabindex]:not([tabindex="-1"])'` | Selector for cells within the grid. Should match ALL cell positions in DOM order (including disabled/empty) so grid geometry is preserved. |
| `options.isCellFocusable` | `(cell: HTMLElement) => boolean` |  | Predicate for whether a matched cell can receive focus. Omit to treat every matched cell as focusable. |
| `options.getFocusTarget` | `(cell: HTMLElement) => HTMLElement \| null` |  | Resolves the element to focus for a cell, e.g. a button inside a role="gridcell" wrapper. Omit to focus the cell itself. |
| `options.onNavigateBefore` | `(column: number, offset: number) => void` |  | Callback when navigation would go before the first cell. Receives the column index and offset (1 for horizontal, columns for vertical). |
| `options.onNavigateAfter` | `(column: number, offset: number) => void` |  | Callback when navigation would go after the last cell. Receives the column index and offset. |
| `options.onPageUp` | `() => void` |  | Callback for Page Up key (e.g., navigate to previous month in calendars). |
| `options.onPageDown` | `() => void` |  | Callback for Page Down key (e.g., navigate to next month in calendars). |
| `options.hasRovingTabIndex` | `boolean` | `false` | Own a single roving tab stop across the grid: one focusable cell (its resolved focus target) carries tabindex="0", the rest -1. Stamped/repaired on render and moved with arrow navigation. Attach the returned handleFocus to the container onFocus. |

**Returns**

```ts
[
  {
    "name": "gridRef",
    "type": "React.RefObject<HTMLElement | null>",
    "description": "Ref to attach to the grid container element."
  },
  {
    "name": "handleKeyDown",
    "type": "(e: React.KeyboardEvent) => void",
    "description": "Key down handler to attach to the grid container."
  },
  {
    "name": "handleFocus",
    "type": "(e: React.FocusEvent) => void",
    "description": "Focus handler for the grid container. Keeps the roving tab stop in sync when hasRovingTabIndex is enabled; a no-op otherwise, so always safe to attach."
  },
  {
    "name": "focusCell",
    "type": "(index: number) => void",
    "description": "Focus a specific cell by index (clamped to valid range)."
  },
  {
    "name": "focusFirst",
    "type": "() => void",
    "description": "Focus the first focusable cell in the grid."
  },
  {
    "name": "focusLast",
    "type": "() => void",
    "description": "Focus the last focusable cell in the grid."
  }
]
```

## Files

- `upstream/useGridFocus.doc.mjs`
- `upstream/useGridFocus.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useGridFocus
