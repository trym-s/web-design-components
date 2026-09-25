# Citation

Citations display inline references to external sources. Use them to attribute information within AI-generated responses, articles, or anywhere provenance and source links are needed.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Citation.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Citations display inline references to external sources.
- Avoid when: Mix label and number variants in the same paragraph. Pick one style per context for visual consistency.
- Provides: Container, Icon, Label text, Number
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CitationShowcase, CitationInlineText, CitationSourceList
- Upstream: Astryx core · Content

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

- `src/examples/CitationShowcase.tsx` — Citation — Showcase: All citation variants at a glance: label chips and numbered badges, with and without icons and links. · static: `static/CitationShowcase.html`
- `src/examples/CitationInlineText.tsx` — Citation — Inline Text: Citations embedded within a paragraph of text, showing how they flow inline with surrounding content. · static: `static/CitationInlineText.html`
- `src/examples/CitationSourceList.tsx` — Citation — Source List: A list of citation sources with icons, as you might show at the end of an AI-generated response or article footer. · static: `static/CitationSourceList.html`

## Documentation

### Citation

Citations display inline references to external sources. Use them to attribute information within AI-generated responses, articles, or anywhere provenance and source links are needed.

**Do**

- Use the label variant when the source title adds meaningful context for the reader.
- Use the number variant for compact inline references within body text, like footnotes.

**Don't**

- Mix label and number variants in the same paragraph. Pick one style per context for visual consistency.

**Anatomy**

- Container (required) — The interactive wrapper. Renders as an anchor when a URL is provided, or a span otherwise.
- Icon — An optional source icon shown before the label text. Accepts a favicon/logo image URL (via source.src) or a React node such as an Astryx <Icon>. Only available in the label variant.
- Label text — The source title, truncated with ellipsis when it exceeds the max width. Shown in the label variant.
- Number — The citation index displayed as a superscript badge. Shown in the number variant.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `source` * | `CitationSource` |  | The citation source object containing title, url, an optional image src, and an optional icon node. The url follows the shared navigation rule described on the Link `href` prop; rejected destinations leave the citation visible without navigation. Image src uses separate resource handling. |
| `number` * | `number` |  | The display index for this citation. |
| `variant` | `'label' \| 'number'` | `'label'` | Display style: a label chip showing the source title or a compact numbered badge. |

Styling hook class: `.astryx-citation`

## Files

- `src/Citation.doc.mjs`
- `src/Citation.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Citation
