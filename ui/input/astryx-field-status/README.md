# Field Status

FieldStatus renders validation feedback for fields and field-like controls. Use it directly for custom controls that need the same error, warning, or success presentation as Field.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/FieldStatus.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: FieldStatus renders validation feedback for fields and field-like controls.
- Avoid when: Use FieldStatus for general alerts or page-level notices; use Banner or Toast instead.
- Provides: Message box, Detached icon, Message text
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: FieldStatusShowcase, FieldStatusBasic
- Upstream: Astryx core · Form Controls

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

- `upstream/examples/FieldStatusShowcase.tsx` — Field Status: Field status messages in error, warning, and success states with attached and detached variants. · static: `static/FieldStatusShowcase.html`
- `upstream/examples/FieldStatusBasic.tsx` — FieldStatus — Basic: Detached error and success messages for validation feedback. Use below checkboxes, switches, or custom controls where an attached status would overlap. · static: `static/FieldStatusBasic.html`

## Documentation

### Field Status

FieldStatus renders validation feedback for fields and field-like controls. Use it directly for custom controls that need the same error, warning, or success presentation as Field.

**Do**

- Use attached status below bordered inputs when the message belongs to that input.
- Use detached status for controls like checkboxes, switches, and custom controls where overlap would be visually awkward.

**Don't**

- Use FieldStatus for general alerts or page-level notices; use Banner or Toast instead.

**Anatomy**

- Message box (required) — Painted container for the validation feedback.
- Detached icon — Leading status glyph shown only by the detached variant.
- Message text (required) — Text describing the validation status.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` * | `'error' \| 'warning' \| 'success'` |  | Status type. |
| `message` * | `string` |  | Status message text. |
| `id` | `string` |  | ID for aria-describedby association. |
| `variant` | `'attached' \| 'detached'` | `'attached'` | Visual variant: attached overlaps the input, detached floats below. |

Styling hook class: `.astryx-field-status`, `.astryx-field-status-icon`

## Files

- `upstream/FieldStatus.doc.mjs`
- `upstream/FieldStatus.spec.md`
- `upstream/FieldStatus.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/FieldStatus
