# Outline

A table-of-contents sidebar for documentation pages, help centers, wikis, and long settings pages. Use it for navigation within a single page, not for app routes. Features a sliding indicator track that animates to the active heading. The list is a single tab stop: arrow keys move between headings, Home/End jump to the ends, and Enter/Space activate.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Outline.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A table-of-contents sidebar for documentation pages, help centers, wikis, and long settings pages.
- Avoid when: Use Outline for application navigation - use SideNav or TopNav for routes. Use Outline for expandable hierarchy - use TreeList when nodes need expand and collapse. Rely on onNavigateEnd to mean "arrived" - it also fires when the user interrupts the scroll.
- Provides: Outline, Heading link, Label, Indicator track, Active indicator
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: OutlineShowcase, OutlineControlled, OutlineDeepNesting, OutlineDensity
- Upstream: Astryx core · Navigation
- Keywords: outline, table of contents, toc, heading navigation, scroll spy, documentation, anchors, sliding indicator

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

- `src/examples/OutlineShowcase.tsx` — Outline: A document outline with the active section highlighted by the sliding indicator track. · static: `static/OutlineShowcase.html`
- `src/examples/OutlineControlled.tsx` — Outline — Controlled: Drive the active section yourself with activeId and onActiveIdChange. Providing activeId disables the built-in scroll-spy so your own logic owns the highlight. · static: `static/OutlineControlled.html`
- `src/examples/OutlineDeepNesting.tsx` — Outline — Deep Nesting: Heading levels 1 through 4 map to progressively deeper indentation, so a long document with sub-sections stays scannable. · static: `static/OutlineDeepNesting.html`
- `src/examples/OutlineDensity.tsx` — Outline — Density: Two density variants control item padding. Use compact for dense sidebars and default for standard documentation layouts. The sliding indicator automatically matches each item height. · static: `static/OutlineDensity.html`

## Documentation

### Outline

A table-of-contents sidebar for documentation pages, help centers, wikis, and long settings pages. Use it for navigation within a single page, not for app routes. Features a sliding indicator track that animates to the active heading. The list is a single tab stop: arrow keys move between headings, Home/End jump to the ends, and Enter/Space activate.

**Do**

- Pass a flat ordered list of headings and let level control indentation.
- Use activeId when custom scroll logic owns the active section.
- Use density="compact" in dense sidebars where vertical space is tight.
- Use useOutlineFromMarkdown or useOutlineFromDOM when headings are generated from content.
- Pass scrollContainerRef when the content scrolls in a split pane, modal, or panel instead of the viewport.
- Set offset to the height of a fixed header that overlays the content, so headings land below it instead of underneath it.

**Don't**

- Use Outline for application navigation - use SideNav or TopNav for routes.
- Use Outline for expandable hierarchy - use TreeList when nodes need expand and collapse.
- Rely on onNavigateEnd to mean "arrived" - it also fires when the user interrupts the scroll.

**Anatomy**

- Outline (required) — Navigation container for the same-page heading links and indicator.
- Heading link (required) — Anchor for one heading, indented by level and marked when active.
- Label (required) — Heading text displayed inside its heading link.
- Indicator track (required) — Painted vertical rule behind the active indicator.
- Active indicator (required) — Sliding bar positioned beside the currently active heading link.

Styling hook class: `.astryx-outline`, `.astryx-outline-indicator`, `.astryx-outline-item`

### Outline

A table-of-contents sidebar for documentation pages, help centers, wikis, and long settings pages. Use it for navigation within a single page, not for app routes.

**Do**

- Pass a flat ordered list of headings and let level control indentation.
- Use activeId when custom scroll logic owns the active section.
- Use density="compact" in dense sidebars where vertical space is tight.
- Use useOutlineFromMarkdown or useOutlineFromDOM when headings are generated from content.

**Don't**

- Use Outline for application navigation - use SideNav or TopNav for routes.
- Use Outline for expandable hierarchy - use TreeList when nodes need expand and collapse.

**Anatomy**

- Outline (required) — Navigation container for the same-page heading links and indicator.
- Heading link (required) — Anchor for one heading, indented by level and marked when active.
- Label (required) — Heading text displayed inside its heading link.
- Indicator track (required) — Painted vertical rule behind the active indicator.
- Active indicator (required) — Sliding bar positioned beside the currently active heading link.

Styling hook class: `.astryx-outline`, `.astryx-outline-indicator`, `.astryx-outline-item`

## Files

- `src/Outline.doc.mjs`
- `src/Outline.spec.md`
- `src/Outline.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Outline
