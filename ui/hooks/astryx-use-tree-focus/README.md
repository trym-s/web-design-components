# useTreeFocus

Manages roving-tabindex focus and the WAI-ARIA tree keyboard model. ArrowUp/ArrowDown/Home/End roam linearly over the visible treeitems (skipping disabled ones), while ArrowRight/ArrowLeft carry tree semantics (expand/collapse, move to first-child/parent). Enter/Space activate, and printable characters trigger typeahead.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useTreeFocus.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Manages roving-tabindex focus and the WAI-ARIA tree keyboard model.
- Avoid when: Use for linear lists (prefer useListFocus) or 2D grids (prefer useGridFocus); those traversals differ from a tree.
- Provides: useTreeFocus
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · focus
- Keywords: tree, treeview, focus, keyboard, navigation, arrow, expand, collapse, roving, tabindex, a11y, wai-aria, apg

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `src/examples/` as-is, or read `src/` to own the component (upstream calls this "swizzle").
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

### useTreeFocus

Import: `@astryxdesign/core/hooks`

Manages roving-tabindex focus and the WAI-ARIA tree keyboard model. ArrowUp/ArrowDown/Home/End roam linearly over the visible treeitems (skipping disabled ones), while ArrowRight/ArrowLeft carry tree semantics (expand/collapse, move to first-child/parent). Enter/Space activate, and printable characters trigger typeahead.

**Do**

- Use for hierarchical tree widgets: wire onToggleExpand to your expansion state and onActiveChange to a single roving tab stop.
- Attach both treeRef and handleKeyDown to the role="tree" container element.

**Don't**

- Use for linear lists (prefer useListFocus) or 2D grids (prefer useGridFocus); those traversals differ from a tree.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `UseTreeFocusOptions` |  | Configuration object for tree focus behavior. |
| `options.itemSelector` | `string` | `'[role="treeitem"]'` | Selector for visible treeitems within the tree, in DOM order. |
| `options.isItemDisabled` | `(item: HTMLElement) => boolean` |  | Predicate for whether a treeitem is disabled and must be skipped during navigation. Defaults to reading `data-tree-disabled` / `aria-disabled`. |
| `options.getLevel` | `(item: HTMLElement) => number` |  | Reads the 1-based nesting level of a treeitem. Defaults to the `aria-level` attribute. |
| `options.onToggleExpand` | `(id: string) => void` |  | Called to expand/collapse the treeitem with the given id (ArrowRight on a collapsed parent, ArrowLeft on an expanded parent, Enter/Space on a parent without its own action). |
| `options.onActivate` | `(item: HTMLElement, id: string \| undefined) => boolean \| void` |  | Called when Enter/Space activates a treeitem. Return true when handled; return false/undefined to let the hook fall back to toggling expansion. |
| `options.onActiveChange` | `(id: string \| undefined) => void` |  | Notified when the hook moves focus to a treeitem. Consumers use this to move a single roving tab stop. |
| `options.hasRovingTabIndex` | `boolean` | `false` | When true, the hook owns a single roving tab stop across the visible treeitems (stamps tabindex 0/-1, repairs on mount, moves with navigation). Preserves an existing tabindex="0" seed on mount. Attach the returned `handleFocus` to keep the stop in sync after clicks. |
| `options.typeahead` | `boolean` | `true` | Whether typeahead (jump to next item whose text starts with the typed characters) is enabled. |

**Returns**

```ts
[
  {
    "name": "treeRef",
    "type": "React.RefObject<HTMLElement | null>",
    "description": "Ref to attach to the tree container element (role=\"tree\")."
  },
  {
    "name": "handleKeyDown",
    "type": "(e: React.KeyboardEvent) => void",
    "description": "Key down handler to attach to the tree container."
  },
  {
    "name": "handleFocus",
    "type": "(e: React.FocusEvent) => void",
    "description": "Focus handler to attach to the container's onFocus. Keeps the roving tab stop in sync when hasRovingTabIndex is enabled; a no-op otherwise, so always safe to attach."
  },
  {
    "name": "focusFirst",
    "type": "() => void",
    "description": "Focus the first enabled visible treeitem."
  },
  {
    "name": "focusLast",
    "type": "() => void",
    "description": "Focus the last enabled visible treeitem."
  }
]
```

## Files

- `src/useTreeFocus.doc.mjs`
- `src/useTreeFocus.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useTreeFocus
