# Syntax Theme

Applies syntax highlighting colors to CodeBlock and any code component in the subtree. By default, code components use the theme-level syntax colors (set via defineTheme({ syntax: ... })), which derive from the palette (--color-text-accent for keywords, --color-text-green for strings, etc.). SyntaxTheme lets you override those per-region. The system uses 14 semantic tokens (keyword, string, comment, number, function, type, variable, operator, constant, tag, attribute, property, punctuation, background) validated against 11 community themes. Custom themes are created with defineSyntaxTheme() and can use [light, dark] tuples for automatic color-scheme adaptation. Built-in presets: oneDarkPro, dracula, monokai, nord, tokyoNight, catppuccinMocha, githubLight, githubDark, solarizedLight, oneLight (import from @astryxdesign/core/theme/syntax).

## Classification

- Category: `utility` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/syntax/SyntaxTheme.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Applies syntax highlighting colors to CodeBlock and any code component in the subtree.
- Provides: SyntaxTheme
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SyntaxThemeShowcase, SyntaxThemeDarkPreset, SyntaxThemeLightPreset
- Upstream: Astryx core · Utility
- Keywords: syntax, highlighting, code, theme, codeblock, prism, shiki

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

- `upstream/examples/SyntaxThemeShowcase.tsx` — SyntaxTheme — Compact Preset: A concise code block rendered with the One Dark Pro syntax preset to show how SyntaxTheme changes highlighting colors without making the page long. · static: `static/SyntaxThemeShowcase.html`
- `upstream/examples/SyntaxThemeDarkPreset.tsx` — SyntaxTheme — Dark Preset: Wrap a code block in SyntaxTheme to apply a dark syntax preset such as Dracula. · static: `static/SyntaxThemeDarkPreset.html`
- `upstream/examples/SyntaxThemeLightPreset.tsx` — SyntaxTheme — Light Preset: Use a light syntax preset for code examples that need to sit on light documentation surfaces. · static: `static/SyntaxThemeLightPreset.html`

## Documentation

### Syntax Theme

Applies syntax highlighting colors to CodeBlock and any code component in the subtree. By default, code components use the theme-level syntax colors (set via defineTheme({ syntax: ... })), which derive from the palette (--color-text-accent for keywords, --color-text-green for strings, etc.). SyntaxTheme lets you override those per-region. The system uses 14 semantic tokens (keyword, string, comment, number, function, type, variable, operator, constant, tag, attribute, property, punctuation, background) validated against 11 community themes. Custom themes are created with defineSyntaxTheme() and can use [light, dark] tuples for automatic color-scheme adaptation. Built-in presets: oneDarkPro, dracula, monokai, nord, tokyoNight, catppuccinMocha, githubLight, githubDark, solarizedLight, oneLight (import from @astryxdesign/core/theme/syntax).

**Do**

- Use the syntax field in defineTheme() for app-wide code styling. Use SyntaxTheme only when a specific section needs a different look.
- Pick from built-in presets or create a custom theme with defineSyntaxTheme() for brand-specific colors.
- Syntax themes support light-dark() tuples: each token can have different values for light and dark mode, resolved automatically by the color scheme.
- For a single CodeBlock, pass the syntaxTheme prop directly: it is shorthand for wrapping that block in SyntaxTheme. Use the SyntaxTheme wrapper when theming a whole region of code components.

**Don't**


**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` * | `SyntaxTheme` |  | Syntax highlighting theme: a preset from @astryxdesign/core/theme/syntax or a custom theme created with defineSyntaxTheme(). |
| `children` * | `ReactNode` |  | Content subtree. All CodeBlock components within will use this syntax theme. |

## Files

- `upstream/SyntaxTheme.doc.mjs`
- `upstream/syntax/SyntaxTheme.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/SyntaxTheme
