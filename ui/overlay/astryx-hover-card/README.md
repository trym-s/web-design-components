# Hover Card

HoverCard shows additional information when the user hovers or focuses a trigger element. Use it for profile cards, link summaries, or inline definitions where the user needs more context without navigating away.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/HoverCard.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: HoverCard shows additional information when the user hovers or focuses a trigger element.
- Avoid when: Place critical actions or required information inside a hover card; users may miss content that only appears on hover. Use a hover card when a simple Tooltip or Popover would suffice. Use a HoverCard for content the user must interact with; it disappears when the cursor leaves.
- Provides: Trigger, Card, Body, Actions
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: HoverCardShowcase, HoverCardInlineTextHoverCard, HoverCardInteractiveContent, HoverCardProfileHoverCard
- Upstream: Astryx core · Overlay
- Keywords: hovercard, hover card, popover, tooltip, preview card, flyout, overlay, hover popup

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

- `upstream/examples/HoverCardShowcase.tsx` — Hover Card: A hover card that shows a user profile preview when hovering over a trigger button. Starts open for preview. · static: `static/HoverCardShowcase.html`
- `upstream/examples/HoverCardInlineTextHoverCard.tsx` — HoverCard — Definition: Shows a term definition on hover within a paragraph. Use for technical terms, jargon, or concepts that some readers may not know, like a glossary built into the text. · static: `static/HoverCardInlineTextHoverCard.html`
- `upstream/examples/HoverCardInteractiveContent.tsx` — HoverCard — Link Preview: Shows a page summary when hovering a link: title, description, and URL. Use for documentation links, article references, or any URL where a preview helps the user decide whether to click. · static: `static/HoverCardInteractiveContent.html`
- `upstream/examples/HoverCardProfileHoverCard.tsx` — HoverCard — Profile Preview: Shows a user profile summary on hover with name, role, and bio. Use on usernames, avatars, or mentions to let users preview a profile without navigating away. · static: `static/HoverCardProfileHoverCard.html`

## Documentation

### Hover Card

HoverCard shows additional information when the user hovers or focuses a trigger element. Use it for profile cards, link summaries, or inline definitions where the user needs more context without navigating away.

**Do**

- Keep content supplementary; hover cards should enhance understanding without blocking the primary workflow.
- Provide a dashed underline on text triggers so users know the element is hoverable.
- Use the hook API (useHoverCard) when you need more control over timing or placement.
- Leave touchTrigger on auto so a tap opens the card on triggers that do nothing else, and stays out of the way on triggers that perform an action.
- Prefer placing HoverCard in a block context rather than directly in a <p>, heading, or link. Those placements are supported when necessary through a corrective portal, but the DOM and tab order may differ.

**Don't**

- Place critical actions or required information inside a hover card; users may miss content that only appears on hover.
- Use a hover card when a simple Tooltip or Popover would suffice.
- Use a HoverCard for content the user must interact with; it disappears when the cursor leaves.

**Anatomy**

- Trigger (required) — The element that opens the hover card on hover or focus: a button, link, or inline text.
- Card (required) — The floating overlay with the preview content, anchored to the trigger.
- Body (required) — The main content area: profile info, link summary, or any rich content.
- Actions — Optional buttons inside the card for follow-up actions like Follow or Message.

Styling hook class: `.astryx-hover-card`, `.astryx-hovercard`

### Hover Card

HoverCard shows additional information when the user hovers or focuses a trigger element. Use it for profile cards, link summaries, or inline definitions where the user needs more context without navigating away.

**Do**

- Keep content supplementary; hover cards should enhance understanding without blocking the primary workflow.
- Provide a dashed underline on text triggers so users know the element is hoverable.
- Use the hook API (useHoverCard) when you need more control over timing or placement.
- Leave touchTrigger on auto so a tap opens the card on triggers that do nothing else, and stays out of the way on triggers that perform an action.
- Prefer placing HoverCard in a block context rather than directly in a <p>, heading, or link. Those placements are supported when necessary through a corrective portal, but the DOM and tab order may differ.

**Don't**

- Place critical actions or required information inside a hover card; users may miss content that only appears on hover.
- Use a hover card when a simple Tooltip or Popover would suffice.
- Use a HoverCard for content the user must interact with; it disappears when the cursor leaves.

Styling hook class: `.astryx-hover-card`, `.astryx-hovercard`

## Files

- `upstream/HoverCard.doc.mjs`
- `upstream/HoverCard.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/HoverCard
