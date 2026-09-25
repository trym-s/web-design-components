# Button Group

ButtonGroup joins related actions into a single connected control. Use it when multiple buttons represent related choices or operations that belong together visually, like copy/cut/paste, or undo/redo.

## Classification

- Category: `action-feedback` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ButtonGroup.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ButtonGroup joins related actions into a single connected control.
- Avoid when: Don't mix wildly different actions. A Save button next to a Delete button in the same group is confusing. Don't use ButtonGroup for navigation. Use SegmentedControl or TabList for switching between views. Don't nest ButtonGroups. If you need multiple groups, place them side by side with a gap. Don't disable the group to show that an action is in flight. A disabled member drops focus, so a keyboard user loses their place; leave the group enabled and show progress on the button that started the work.
- Provides: Button, Divider
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ButtonGroupShowcase, ButtonGroupBasic, ButtonGroupFloating
- Upstream: Astryx core · Action
- Keywords: button-group, connected, split, toolbar, actions, grouped, buttons

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

- `upstream/examples/ButtonGroupShowcase.tsx` — Button Group · static: `static/ButtonGroupShowcase.html`
- `upstream/examples/ButtonGroupBasic.tsx` — ButtonGroup — Basic: Three related actions joined into a single connected control. Provide a group label for accessibility and keep all buttons the same variant so they read as one unit. · static: `static/ButtonGroupBasic.html`
- `upstream/examples/ButtonGroupFloating.tsx` — ButtonGroup — Floating: A grouped action bar raised with `elevation="med"`. The connected buttons share one surface, so the shadow lifts them as a unit. · static: `static/ButtonGroupFloating.html`

## Documentation

### Button Group

ButtonGroup joins related actions into a single connected control. Use it when multiple buttons represent related choices or operations that belong together visually, like copy/cut/paste, or undo/redo.

**Do**

- Group buttons that perform related actions on the same object, like copy, cut, paste on selected text.
- Use the same variant for all buttons in a group so they look like a single connected unit.
- Keep groups small (2–4 buttons). For more actions, use a Toolbar or DropdownMenu instead.
- Name the group for what its buttons act on. The label is the group's accessible name and a screen reader reads it before each member.
- Keep the group a single Tab stop. Arrow keys move between members along the orientation, Home/End jump to the ends, and disabled members are skipped. This is the WAI-ARIA APG roving tabindex technique: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex

**Don't**

- Don't mix wildly different actions. A Save button next to a Delete button in the same group is confusing.
- Don't use ButtonGroup for navigation. Use SegmentedControl or TabList for switching between views.
- Don't nest ButtonGroups. If you need multiple groups, place them side by side with a gap.
- Don't disable the group to show that an action is in flight. A disabled member drops focus, so a keyboard user loses their place; leave the group enabled and show progress on the button that started the work.

**Anatomy**

- Button (required) — One or more Button or IconButton children that form the connected group.
- Divider — A thin border between buttons, rendered automatically by the group.

**Accessibility**

- Text label — WCAG 1.4.3 Contrast (Minimum) (4.5:1): Text in each button must have at least 4.5:1 contrast with its background in every state. For Hover and Pointer down, measure the final background after the overlay is applied.
- Essential icon or spinner arc — WCAG 1.4.11 Non-text Contrast (3:1): An icon used instead of text must have at least 3:1 contrast with the button background. The moving spinner arc must also meet 3:1. An icon beside a visible label does not need its own check.
- Visible control boundary — WCAG 1.4.11 Non-text Contrast (3:1 if needed): Some groups need a divider or edge to show each button. That divider or edge must have at least 3:1 contrast.
- Keyboard focus indicator — WCAG 1.4.11 Non-text Contrast (3:1): The focus outline must have at least 3:1 contrast with the area around it.
- Disabled appearance — WCAG 1.4.3 and 1.4.11 exceptions (Not required): Disabled controls do not need to meet these contrast ratios.

Styling hook class: `.astryx-button-group`

## Files

- `upstream/ButtonGroup.doc.mjs`
- `upstream/ButtonGroup.tsx`
- `upstream/ButtonGroupContext.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ButtonGroup
