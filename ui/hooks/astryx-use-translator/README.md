# useTranslator

Returns a translator function that resolves keys against the current locale, provider overrides, and the shipped English fallback catalog. Call inside a component; the returned function can be used anywhere within that component's scope.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useTranslator.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Returns a translator function that resolves keys against the current locale, provider overrides, and the shipped English fallback catalog.
- Provides: useTranslator
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (utility/astryx-internationalization-provider)
- Upstream: Astryx core · utilities
- Keywords: i18n, internationalization, localization, translation, translate, locale, hook

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

### useTranslator

Import: `@astryxdesign/core`

Returns a translator function that resolves keys against the current locale, provider overrides, and the shipped English fallback catalog. Call inside a component; the returned function can be used anywhere within that component's scope.

**Returns**

```ts
[
  {
    "name": "value",
    "type": "(key: string, values?: Record<string, string | number | Date>) => string",
    "description": "A stable translator function bound to the current InternationalizationProvider context. Call it with a message key and optional ICU MessageFormat values to get the formatted string in the active locale. Safe to use in render, event handlers, effects, or any code that runs during the parent component's lifecycle."
  }
]
```

## Files

- `upstream/useTranslator.doc.mjs`
- `upstream/useTranslator.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useTranslator
