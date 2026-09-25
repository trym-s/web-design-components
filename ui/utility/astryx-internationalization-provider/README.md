# Internationalization Provider

Wraps your app to set the active locale and (optionally) merge additional translation catalogs + per-locale overrides. Astryx components inside the subtree resolve their strings against this context. If no provider is present, components fall back to the shipped English defaults.

## Classification

- Category: `utility` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/InternationalizationProvider.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Wraps your app to set the active locale and (optionally) merge additional translation catalogs + per-locale overrides.
- Avoid when: Cast custom catalog maps to `any`; the i18n package exports `MessagesByLocale` and `Catalog` for local catalog typing.
- Provides: InternationalizationProvider
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: InternationalizationProvider01ShippedLocale, InternationalizationProvider02Overrides, InternationalizationProvider03RtlDirection
- Upstream: Astryx core · Utility
- Keywords: i18n, internationalization, localization, locale, translation, translations, provider, language

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

## Examples

- `src/examples/InternationalizationProvider01ShippedLocale.tsx` — Internationalization Provider — Shipped Locale: Load a locale catalog shipped by Astryx and re-render InternationalizationProvider with a new locale to update Astryx strings live. · static: `static/InternationalizationProvider01ShippedLocale.html`
- `src/examples/InternationalizationProvider02Overrides.tsx` — Internationalization Provider — Overrides: Override a small number of Astryx strings without providing a full locale catalog. · static: `static/InternationalizationProvider02Overrides.html`
- `src/examples/InternationalizationProvider03RtlDirection.tsx` — Internationalization Provider — RTL Direction: Toggle text direction with the `dir` prop and watch Astryx components mirror. Pagination flips its prev/next chevrons under RTL. The `dir` prop is passed to both `InternationalizationProvider` (so Astryx components pick it up) and the `VStack` (so the DOM subtree mirrors); both channels stay in sync with no extra wrapper. · static: `static/InternationalizationProvider03RtlDirection.html`

## Documentation

### Internationalization Provider

Wraps your app to set the active locale and (optionally) merge additional translation catalogs + per-locale overrides. Astryx components inside the subtree resolve their strings against this context. If no provider is present, components fall back to the shipped English defaults.

**Do**

- Use shipped Astryx locale catalogs from `@astryxdesign/core/locales/*` when one exists for your target locale.
- Use a same-shape local catalog only when Astryx has not shipped that locale yet or you are testing in-progress translations.
- Use real BCP 47 tags such as `fr`, `pt-BR`, or `ar`; regional locales fall back to their base language before English.
- Set the `dir` attribute on `<html>` (or a wrapping element) yourself; the provider does not set it. Astryx components mirror layout and directional icons from the DOM `dir`, so an RTL locale won't visually mirror without it. Use `getLocaleDirection(locale)` to derive the value for both the provider and the DOM.

**Don't**

- Cast custom catalog maps to `any`; the i18n package exports `MessagesByLocale` and `Catalog` for local catalog typing.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` * | `string` |  | BCP 47 language tag for the active locale (e.g. "en", "pt", "pt-BR", "zh-Hans"). Regional tags fall back to their base language, then to the shipped "en" catalog. |
| `messages` | `MessagesByLocale` |  | Optional map of BCP 47 tag to translation catalog. Import shipped catalogs from `@astryxdesign/core/locales/*`; the shipped "en" catalog is always available and does not need to be listed here. |
| `overrides` | `Overrides` |  | Sparse per-locale key overrides applied on top of shipped defaults. Overrides are locale-keyed so a runtime locale swap picks up the correct set. |
| `dir` | `'ltr' \| 'rtl'` |  | Explicit text-direction override for the context. When omitted, direction is derived from `locale` via `Intl.Locale.getTextInfo()`. This sets the direction Astryx reads, but it does NOT set the DOM `dir` attribute; you must set `dir` on `<html>` (or a wrapping element) yourself, since Astryx components mirror layout and directional icons from the DOM `dir`, not from this prop. Set both to the same value and keep them in sync. |
| `children` * | `ReactNode` |  | Content to render with the internationalization provider. |

**Example — Load a shipped Astryx locale catalog**

```tsx
import type {ReactNode} from 'react';
import {InternationalizationProvider} from '@astryxdesign/core/i18n';
import frFR from '@astryxdesign/core/locales/fr-FR.json';

export function AppI18n({children}: {children: ReactNode}) {
  return (
    <InternationalizationProvider locale="fr-FR" messages={{'fr-FR': frFR}}>
      {children}
    </InternationalizationProvider>
  );
}
```

**Example — Override one Astryx string**

```tsx
import type {ReactNode} from 'react';
import {InternationalizationProvider} from '@astryxdesign/core/i18n';

export function AppI18n({children}: {children: ReactNode}) {
  return (
    <InternationalizationProvider
      locale="en"
      overrides={{
        en: {'@astryx.selector.placeholder': 'Choose...'},
      }}
    >
      {children}
    </InternationalizationProvider>
  );
}
```

**Example — Provide a local fallback catalog**

```tsx
import type {ReactNode} from 'react';
import {
  InternationalizationProvider,
  type MessagesByLocale,
} from '@astryxdesign/core/i18n';
import ptBR from './locales/pt-BR.json';

const messages: MessagesByLocale = {'pt-BR': ptBR};

export function AppI18n({children}: {children: ReactNode}) {
  return (
    <InternationalizationProvider locale="pt-BR" messages={messages}>
      {children}
    </InternationalizationProvider>
  );
}
```

## Files

- `src/InternationalizationProvider.doc.mjs`
- `src/InternationalizationProvider.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/InternationalizationProvider
