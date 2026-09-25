# Link

A styled anchor for inline and standalone text navigation. Supports external links, underline variants, tooltips, and custom link components for router integration. Use it for navigating between pages or to external URLs.

## Classification

- Category: `action-feedback` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Link.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A styled anchor for inline and standalone text navigation.
- Avoid when: Use Link for actions that do not navigate; use a Button instead. Use generic text like "click here" or "read more"; describe the destination. Set `label` on text links; `aria-label` prevents assistive technology from reading the actual link content.
- Provides: Label, Right icon, Left icon
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: LinkShowcase, LinkExternalLinks, LinkInlineLink, LinksWithTooltips
- Upstream: Astryx core · Action
- Keywords: link, anchor, href, hyperlink, navigation, url, external, textlink

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

- `upstream/examples/LinkShowcase.tsx` — Link: A standalone link. · static: `static/LinkShowcase.html`
- `upstream/examples/LinkExternalLinks.tsx` — Link — External Links: A vertical list of external links that open in a new tab with an indicator icon. · static: `static/LinkExternalLinks.html`
- `upstream/examples/LinkInlineLink.tsx` — Link — Inline Text: A link embedded within a paragraph of body text. · static: `static/LinkInlineLink.html`
- `upstream/examples/LinksWithTooltips.tsx` — Link — With Tooltips: Horizontal row of standalone links with descriptive hover tooltips. · static: `static/LinksWithTooltips.html`

## Documentation

### Link

A styled anchor for inline and standalone text navigation. Supports external links, underline variants, tooltips, and custom link components for router integration. Use it for navigating between pages or to external URLs.

**Do**

- Write descriptive, concise link text that clearly communicates the destination.
- Set `isStandalone` when the link appears outside of inline text, so it receives proper base font sizing.
- Only set `label` when the link content is not descriptive text (e.g. an icon-only link). For text links, the visible text is already the accessible name; adding `label` overrides it for screen readers, which is harmful.

**Don't**

- Use Link for actions that do not navigate; use a Button instead.
- Use generic text like "click here" or "read more"; describe the destination.
- Set `label` on text links; `aria-label` prevents assistive technology from reading the actual link content.

**Anatomy**

- Label (required) — The visible text of the link.
- Right icon — Icon placed after the label to indicate an action affordance.
- Left icon — Icon placed before the label to represent meaning.

**Accessibility**

- Link text — WCAG 1.4.3 Contrast (Minimum) (4.5:1): Link text must have at least 4.5:1 contrast with the background behind it. For Pointer down, measure against the pressed overlay the link paints behind its text.

Styling hook class: `.astryx-link`

### Link

A styled anchor for inline and standalone text navigation. Supports external links, underline variants, tooltips, and custom link components for router integration. Use it for navigating between pages or to external URLs.

**Do**

- Write descriptive, concise link text that clearly communicates the destination.
- Set `isStandalone` when the link appears outside of inline text, so it receives proper base font sizing.
- Only set `label` when the link content is not descriptive text (e.g. an icon-only link). For text links, the visible text is already the accessible name; adding `label` overrides it for screen readers, which is harmful.

**Don't**

- Use Link for actions that do not navigate; use a Button instead.
- Use generic text like "click here" or "read more"; describe the destination.
- Set `label` on text links; `aria-label` prevents assistive technology from reading the actual link content.

**Anatomy**

- Label (required) — The visible text of the link.
- Right icon — Icon placed after the label to indicate an action affordance.
- Left icon — Icon placed before the label to represent meaning.

Styling hook class: `.astryx-link`

## Files

- `upstream/Link.doc.mjs`
- `upstream/Link.tsx`
- `upstream/LinkContext.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Link
