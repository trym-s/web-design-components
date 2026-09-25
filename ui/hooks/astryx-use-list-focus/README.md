# useListFocus

Manages keyboard navigation within a linear list following WAI-ARIA menu/listbox/toolbar patterns. Supports arrow key navigation (vertical, horizontal, or both), Home/End for boundaries, optional wrap-around, RTL, and Escape to close. Opt into hasRovingTabIndex for composite widgets (toolbars, segmented controls, tab strips) that own a single tab stop. Suitable for dropdown menus, toolbars, and any 1D focusable list.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useListFocus.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Manages keyboard navigation within a linear list following WAI-ARIA menu/listbox/toolbar patterns.
- Avoid when: Use for 2D grid navigation; prefer useGridFocus for grids and calendars.
- Provides: useListFocus
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · focus
- Keywords: list, focus, keyboard, navigation, menu, toolbar, roving, tabindex, a11y, arrow, wai-aria

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

### useListFocus

Import: `@astryxdesign/core/hooks`

Manages keyboard navigation within a linear list following WAI-ARIA menu/listbox/toolbar patterns. Supports arrow key navigation (vertical, horizontal, or both), Home/End for boundaries, optional wrap-around, RTL, and Escape to close. Opt into hasRovingTabIndex for composite widgets (toolbars, segmented controls, tab strips) that own a single tab stop. Suitable for dropdown menus, toolbars, and any 1D focusable list.

**Do**

- Set orientation to 'horizontal' for toolbars and tab bars, 'vertical' for dropdown menus.
- Provide an onEscape callback for menus/dropdowns to return focus to the trigger.
- Enable hasRovingTabIndex (and hasCaretGuard when the widget can contain text inputs) for toolbar-style composites that should be a single tab stop.

**Don't**

- Use for 2D grid navigation; prefer useGridFocus for grids and calendars.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `UseListFocusOptions` |  | Configuration object for list focus behavior. All fields are optional. |
| `options.itemSelector` | `string` | `'[role="menuitem"]'` | Selector for focusable items within the list. |
| `options.boundarySelector` | `string` |  | Selector identifying a list boundary, for lists that contain nested lists of the same kind (e.g. a menu with submenu flyouts). When set, item collection and key handling are scoped to this level's own container. Typically '[role="menu"]'. |
| `options.wrap` | `boolean` | `true` | Whether arrow navigation wraps around at the ends. |
| `options.onEscape` | `() => void` |  | Callback when Escape key is pressed (e.g., close menu). Supplying it also consumes the key (preventDefault); without it Escape passes through to the surrounding layer. |
| `options.orientation` | `'horizontal' \| 'vertical' \| 'both'` | `'vertical'` | Navigation orientation. 'horizontal' uses ArrowLeft/ArrowRight, 'vertical' uses ArrowUp/ArrowDown, 'both' accepts all four arrows. |
| `options.hasHomeEnd` | `boolean` | `true` | Whether Home/End jump to the first/last enabled item. |
| `options.hasRovingTabIndex` | `boolean` | `false` | Opt into roving-tabindex ownership: the hook stamps a single tab stop (one item tabindex="0", the rest -1), repairs it as items mount/unmount or toggle disabled, and moves it with arrow navigation. When false, the hook only moves focus and never touches tabindex. |
| `options.hasCaretGuard` | `boolean` | `false` | When true, arrow keys are not stolen from a nested text input/textarea whose caret is not at the boundary in the direction of travel (or that has a selection), and are never stolen from a nested contenteditable (rich-text editor / chat composer). Preserves inline text editing within the list. |

**Returns**

```ts
[
  {
    "name": "listRef",
    "type": "React.RefObject<HTMLElement | null>",
    "description": "Ref to attach to the list container element."
  },
  {
    "name": "handleKeyDown",
    "type": "(e: React.KeyboardEvent) => void",
    "description": "Key down handler to attach to the list container."
  },
  {
    "name": "handleFocus",
    "type": "(e: React.FocusEvent) => void",
    "description": "Focus handler for the container. Keeps the roving tab stop in sync when hasRovingTabIndex is enabled; a no-op otherwise, so it is always safe to attach."
  },
  {
    "name": "focusItem",
    "type": "(index: number) => void",
    "description": "Focus a specific item by index (clamped to valid range)."
  },
  {
    "name": "focusFirst",
    "type": "() => boolean",
    "description": "Focus the first enabled item. Returns true when an item was focused."
  },
  {
    "name": "focusLast",
    "type": "() => boolean",
    "description": "Focus the last enabled item. Returns true when an item was focused."
  },
  {
    "name": "ownsEvent",
    "type": "(e: React.KeyboardEvent) => boolean",
    "description": "Whether a key event belongs to this list level rather than a nested list sharing the same boundarySelector. Always true when no boundarySelector is set. Use to guard consumer-added key handling (Enter/Space, typeahead)."
  },
  {
    "name": "getItems",
    "type": "() => HTMLElement[]",
    "description": "This level's focusable items in DOM order (already scoped by boundarySelector). Build typeahead targets from this instead of re-querying."
  }
]
```

## Files

- `upstream/useListFocus.doc.mjs`
- `upstream/useListFocus.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useListFocus
