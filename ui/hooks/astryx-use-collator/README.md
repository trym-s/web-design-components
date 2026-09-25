# useCollator

Returns the sanctioned locale-aware comparator for custom sorting. The collator is recreated when the provider locale or an option changes.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useCollator.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Returns the sanctioned locale-aware comparator for custom sorting.
- Avoid when: Construct Intl.Collator directly or call localeCompare; those bypass the provider-backed locale contract.
- Provides: useCollator
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (utility/astryx-internationalization-provider)
- Upstream: Astryx core · utilities
- Keywords: i18n, internationalization, locale, collation, compare, sort, table, hook

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

- None of its own upstream; the demo is its family's: `ui/utility/astryx-internationalization-provider`.

## Documentation

### useCollator

Import: `@astryxdesign/core`

Returns the sanctioned locale-aware comparator for custom sorting. The collator is recreated when the provider locale or an option changes.

**Do**

- Reuse collator.compare in custom Table comparators and other user-visible string ordering.

**Don't**

- Construct Intl.Collator directly or call localeCompare; those bypass the provider-backed locale contract.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `Intl.CollatorOptions` |  | Optional collation behavior such as numeric ordering, sensitivity, punctuation handling, and case order. |

**Returns**

```ts
[
  {
    "name": "collator",
    "type": "Intl.Collator",
    "description": "A memoized collator bound to the active InternationalizationProvider locale."
  }
]
```

## Files

- `upstream/useCollator.doc.mjs`
- `upstream/useCollator.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useCollator
