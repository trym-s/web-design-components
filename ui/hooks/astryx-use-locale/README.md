# useLocale

Reads the authoritative Astryx locale. Use it to thread the provider locale into pure formatting helpers and sibling-package APIs; do not derive a second locale from navigator.language or a hardcoded literal.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useLocale.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Reads the authoritative Astryx locale.
- Avoid when: Use navigator.language or a hardcoded display locale as a fallback; InternationalizationProvider is the locale source.
- Provides: useLocale
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (utility/astryx-internationalization-provider)
- Upstream: Astryx core · utilities
- Keywords: i18n, internationalization, localization, locale, language, provider, hook

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

### useLocale

Import: `@astryxdesign/core`

Reads the authoritative Astryx locale. Use it to thread the provider locale into pure formatting helpers and sibling-package APIs; do not derive a second locale from navigator.language or a hardcoded literal.

**Do**

- Pass the returned locale to pure Astryx helpers or package APIs that require an explicit locale.

**Don't**

- Use navigator.language or a hardcoded display locale as a fallback; InternationalizationProvider is the locale source.

**Returns**

```ts
[
  {
    "name": "locale",
    "type": "Locale",
    "description": "The active InternationalizationProvider BCP 47 locale. Falls back to 'en' when no provider is present."
  }
]
```

## Files

- `upstream/useLocale.doc.mjs`
- `upstream/useLocale.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useLocale
