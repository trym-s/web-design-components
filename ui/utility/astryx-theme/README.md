# Theme

Wraps a subtree with a specific Astryx theme. For static production themes, use `astryx theme build` and import the generated CSS plus built theme object for first-paint and SSR performance. Use runtime `defineTheme()` when themes are dynamic or for prototyping. `defineTheme` accepts a `tokens` object whose keys are CSS custom property names (always prefixed with `--`). Common token names include `--color-accent`, `--color-background-surface`, `--color-background-body`, `--color-text-primary`, `--color-text-secondary`, `--radius-container`, `--spacing-1` through `--spacing-6`. Values can be a string (same for light/dark) or a `[light, dark]` tuple. Example: ```ts import {defineTheme} from '@astryxdesign/core/theme'; const myTheme = defineTheme({   name: 'ocean',   tokens: {     '--color-accent': ['#0077B6', '#48CAE4'],     '--color-background-surface': ['#F0F8FF', '#0A1628'],     '--color-text-primary': ['#0A1317', '#FFFFFF'],     '--radius-container': '16px',   }, }); ```

## Classification

- Category: `utility` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Theme.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Wraps a subtree with a specific Astryx theme.
- Avoid when: Default to runtime themes in SSR production apps. Component overrides inject after hydration instead of shipping as static CSS.
- Provides: Theme
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ThemeShowcase, ThemeApply, ThemeNested, ThemeSwitcher
- Upstream: Astryx core · Utility
- Keywords: theme, theming, provider, color-scheme

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

## Examples

- `upstream/examples/ThemeShowcase.tsx` — Theme — Distinct Themes: Two visually distinct theme providers wrapping identical content to show how Theme changes the visual treatment of child components. · static: `static/ThemeShowcase.html`
- `upstream/examples/ThemeApply.tsx` — Theme — Apply Theme: Wrap a subtree in Theme to apply a theme to every child component in that region. · static: `static/ThemeApply.html`
- `upstream/examples/ThemeNested.tsx` — Theme — Nested Theme: Nested Theme providers let a local region use a different theme without affecting the rest of the page. · static: `static/ThemeNested.html`
- `upstream/examples/ThemeSwitcher.tsx` — Theme — Switch Themes: Use state to switch the theme object passed to Theme and preview a different visual treatment. · static: `static/ThemeSwitcher.html`

## Documentation

### Theme

Wraps a subtree with a specific Astryx theme. For static production themes, use `astryx theme build` and import the generated CSS plus built theme object for first-paint and SSR performance. Use runtime `defineTheme()` when themes are dynamic or for prototyping. `defineTheme` accepts a `tokens` object whose keys are CSS custom property names (always prefixed with `--`). Common token names include `--color-accent`, `--color-background-surface`, `--color-background-body`, `--color-text-primary`, `--color-text-secondary`, `--radius-container`, `--spacing-1` through `--spacing-6`. Values can be a string (same for light/dark) or a `[light, dark]` tuple. Example: ```ts import {defineTheme} from '@astryxdesign/core/theme'; const myTheme = defineTheme({   name: 'ocean',   tokens: {     '--color-accent': ['#0077B6', '#48CAE4'],     '--color-background-surface': ['#F0F8FF', '#0A1628'],     '--color-text-primary': ['#0A1317', '#FFFFFF'],     '--radius-container': '16px',   }, }); ```

**Do**

- Build app themes that are known ahead of time with `astryx theme build`, then import the generated CSS and built theme object.
- Use runtime themes when the theme is created or edited in the browser, such as theme editors, user branding, or prototypes.
- Token names always start with `--` (e.g. `--color-accent`, `--color-background-surface`). Do not omit the prefix.

**Don't**

- Default to runtime themes in SSR production apps. Component overrides inject after hydration instead of shipping as static CSS.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` * | `DefinedTheme` |  | Theme object to apply. Prefer built theme objects for static production themes; use runtime `defineTheme()` for dynamic themes. |
| `mode` | `'light' \| 'dark' \| 'system'` | `'system'` | Color mode. System follows OS preference. |
| `children` * | `ReactNode` |  | Content to render with the theme. |

## Files

- `upstream/Theme.doc.mjs`
- `upstream/Theme.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Theme
