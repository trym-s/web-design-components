# Media Theme

Provides token overrides for content rendered on inverted surfaces: media overlays, scrims, toasts, and tooltips. The base behavior flips color-scheme so all light-dark() tokens resolve to the correct side. Only a small set of tokens need explicit overrides beyond that. Themes can further customize component appearance on media surfaces via onDark/onLight in defineTheme(), with both token overrides (e.g. "--color-accent": "#90CAF9") and component overrides (e.g. ghost buttons get a border on dark surfaces).

## Classification

- Category: `utility` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/MediaTheme.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Provides token overrides for content rendered on inverted surfaces: media overlays, scrims, toasts, and tooltips.
- Avoid when: Use MediaTheme for app-level dark mode: use Theme with mode="dark" or mode="system" instead. MediaTheme is for local surface inversions, not page-wide color scheme.
- Provides: MediaTheme
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: MediaThemeShowcase, MediaThemeImageOverlay, MediaThemeLightScrim
- Upstream: Astryx core · Utility
- Keywords: theme, dark-mode, light-mode, media, inverted, overlay, scrim, toast, tooltip

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

- `upstream/examples/MediaThemeShowcase.tsx` — MediaTheme — Media Overlay: A compact media overlay showing MediaTheme adapting text, icons, badges, and button variants over an image-backed dark surface. · static: `static/MediaThemeShowcase.html`
- `upstream/examples/MediaThemeImageOverlay.tsx` — MediaTheme — Image Overlay: A common image card pattern: place text and actions over a dark gradient and wrap the overlay content in MediaTheme mode="dark". · static: `static/MediaThemeImageOverlay.html`
- `upstream/examples/MediaThemeLightScrim.tsx` — MediaTheme — Light Scrim: A light scrim over an image. Use MediaTheme mode="light" so text and ghost buttons use dark-on-light tokens. · static: `static/MediaThemeLightScrim.html`

## Documentation

### Media Theme

Provides token overrides for content rendered on inverted surfaces: media overlays, scrims, toasts, and tooltips. The base behavior flips color-scheme so all light-dark() tokens resolve to the correct side. Only a small set of tokens need explicit overrides beyond that. Themes can further customize component appearance on media surfaces via onDark/onLight in defineTheme(), with both token overrides (e.g. "--color-accent": "#90CAF9") and component overrides (e.g. ghost buttons get a border on dark surfaces).

**Do**

- Use for any content placed over a dark background (image overlays, video scrims, dark cards) or other inverted surfaces like toasts and tooltips.
- Prefer mode="auto" when the surface color comes from a theme token. A token named "inverted" is not guaranteed to be inverted, and auto measures what was actually painted instead of trusting the name. It can even decide that a surface needs no media context at all.
- Pair with a background color: MediaTheme flips the token context but does not add a background. Set backgroundColor on the parent element.
- Themes can customize components on media surfaces via onDark.components and onLight.components in defineTheme(). For example, add a border to ghost buttons on dark surfaces.

**Don't**

- Use MediaTheme for app-level dark mode: use Theme with mode="dark" or mode="system" instead. MediaTheme is for local surface inversions, not page-wide color scheme.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` * | `'dark' \| 'light' \| 'auto' \| 'off'` |  | Surface luminance context: dark for content over dark backgrounds (light text, white-tinted interactions), light for content over light backgrounds (dark text, black-tinted interactions), auto to decide from the painted surface (no media context when the ambient text already reads on the surface at 3:1, otherwise the side that reads better), and off to turn it off explicitly. The element renders either way, so a surface can switch contexts without remounting children. |
| `fallback` | `'dark' \| 'light'` | `'dark'` | Which side auto uses when the surface cannot be measured: during SSR, on the first client frame, and whenever the backdrop is not knowable from CSS, most often a background-image, whose pixels need sampling (useImageMode) rather than a computed style. Ignored unless mode is auto. |
| `children` * | `ReactNode` |  | Content to render with inverted token context. Components inherit the correct colors automatically. |

## Files

- `upstream/MediaTheme.doc.mjs`
- `upstream/MediaTheme.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/MediaTheme
