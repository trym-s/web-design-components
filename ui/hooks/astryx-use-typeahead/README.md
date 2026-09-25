# useTypeahead

Adds APG type-to-focus search to a collection: printable keystrokes are buffered (resetting after a pause), and the first item whose label starts with the buffer is reported through onMatch. Pressing the same letter repeatedly cycles through the matches rather than filtering deeper. It moves nothing itself; pair it with the collection's own focus management, most often useListFocus or useGridFocus.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useTypeahead.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Adds APG type-to-focus search to a collection: printable keystrokes are buffered (resetting after a pause), and the first item whose label starts with the buffer is reported through onMatch.
- Avoid when: Use it on a text input; the field already receives the characters, and typeahead would fight the value.
- Provides: useTypeahead
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · focus
- Keywords: typeahead, type to focus, first character, keyboard, search, jump, menu, listbox, select, apg, accessibility, a11y

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

### useTypeahead

Import: `@astryxdesign/core/hooks`

Adds APG type-to-focus search to a collection: printable keystrokes are buffered (resetting after a pause), and the first item whose label starts with the buffer is reported through onMatch. Pressing the same letter repeatedly cycles through the matches rather than filtering deeper. It moves nothing itself; pair it with the collection's own focus management, most often useListFocus or useGridFocus.

**Do**

- Wire onMatch to the focus manager you already have (useListFocus.focusItem) instead of moving focus yourself.
- Let it see the key event first and fall through to arrow-key navigation only when it returns false.
- Pass getCurrentIndex so repeated presses of one letter walk through matches instead of sticking on the first.

**Don't**

- Use it on a text input; the field already receives the characters, and typeahead would fight the value.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseTypeaheadOptions` |  | Configuration object. |
| `options.getItemLabels` * | `() => ReadonlyArray<string \| null \| undefined>` |  | Returns the item labels in DOM order. A null or empty entry marks a non-matchable slot and keeps indices aligned with the caller's items. |
| `options.onMatch` * | `(index: number) => void` |  | Called with the index of the matched item so the caller can focus or select it; typically useListFocus's focusItem. |
| `options.getCurrentIndex` | `() => number` | `() => -1` | The index to search from, usually the focused item, so repeated presses of one letter cycle through matches. A negative value means nothing is current. |
| `options.resetMs` | `number` | `750` | Milliseconds of inactivity after which the typed buffer resets. |
| `options.isDisabled` | `(index: number) => boolean` |  | Whether an index should be skipped, e.g. disabled items. |

**Returns**

```ts
[
  {
    "name": "onKeyDown",
    "type": "(e: React.KeyboardEvent | KeyboardEvent) => boolean",
    "description": "Keydown handler. Returns true when it consumed a printable character, so the caller can stop its own key handling."
  },
  {
    "name": "reset",
    "type": "() => void",
    "description": "Clears the pending buffer, e.g. when the collection closes."
  }
]
```

## Files

- `upstream/useTypeahead.doc.mjs`
- `upstream/useTypeahead.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useTypeahead
