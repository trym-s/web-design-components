# Thumbnail

Thumbnail displays a compact, square preview of an image attachment. It shows a shimmer effect while uploading, the image on success, and a placeholder icon when no source is set. Use it in chat composers, file upload lists, or anywhere you need a small image preview with optional remove and click actions.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Thumbnail.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Thumbnail displays a compact, square preview of an image attachment.
- Avoid when: Don't use Thumbnail for non-image file types like PDFs or spreadsheets; use a file attachment component with an appropriate icon instead. Don't omit alt text when a src is provided; screen readers need a description of the image content, not just the file name from label.
- Provides: Image, Placeholder, Remove button, Upload overlay, Skeleton
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ThumbnailShowcase, ThumbnailDisabled, ThumbnailGallery, ThumbnailRemovable, ThumbnailStates
- Upstream: Astryx core · Content
- Keywords: thumbnail, attachment, preview, image, upload, dismiss, remove, loading

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

- `src/examples/ThumbnailShowcase.tsx` — Thumbnail: A thumbnail with an image and label. · static: `static/ThumbnailShowcase.html`
- `src/examples/ThumbnailDisabled.tsx` — Thumbnail — Disabled: Thumbnails in the disabled state with reduced opacity. The remove button and click handler are suppressed when disabled. · static: `static/ThumbnailDisabled.html`
- `src/examples/ThumbnailGallery.tsx` — Thumbnail — Gallery: A row of clickable thumbnails with labels that open a detail view. Use for image attachment lists where users need to preview and manage uploads. · static: `static/ThumbnailGallery.html`
- `src/examples/ThumbnailRemovable.tsx` — Thumbnail — Removable: Thumbnails with a remove button overlay. The close button uses APCA luminance detection to stay visible on both dark and light images. · static: `static/ThumbnailRemovable.html`
- `src/examples/ThumbnailStates.tsx` — Thumbnail — States: All visual states side by side: image loaded, placeholder, skeleton loading, and upload overlay. Demonstrates the full lifecycle of a thumbnail from empty to loaded. · static: `static/ThumbnailStates.html`

## Documentation

### Thumbnail

Thumbnail displays a compact, square preview of an image attachment. It shows a shimmer effect while uploading, the image on success, and a placeholder icon when no source is set. Use it in chat composers, file upload lists, or anywhere you need a small image preview with optional remove and click actions.

**Do**

- Always provide a label prop with the file name so the thumbnail and its remove button are accessible to screen readers and show a tooltip on hover.
- Use isLoading without a src to show a skeleton during initial upload, and isLoading with a src to show a spinner overlay once a preview URL is available.
- Pair onClick with a lightbox or detail view so users can inspect the full image; the thumbnail adds button semantics and a hover overlay automatically.

**Don't**

- Don't use Thumbnail for non-image file types like PDFs or spreadsheets; use a file attachment component with an appropriate icon instead.
- Don't omit alt text when a src is provided; screen readers need a description of the image content, not just the file name from label.

**Anatomy**

- Image — The preview image, displayed as a square with cover fit.
- Placeholder — An image silhouette icon shown when no src is provided.
- Remove button — An overlaid close button in the top-right corner. Appears when onRemove is set. Sits on a fixed --color-overlay scrim with an --color-on-dark icon to stay visible on any image.
- Upload overlay — A semi-transparent overlay with a spinner, shown when isLoading is true and a src preview is available.
- Skeleton — A shimmer animation shown when isLoading is true and no src is set.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` |  | Image source URL. |
| `alt` | `string` |  | Alt text for the image. When omitted, the image is explicitly decorative (alt="", role="presentation", aria-hidden) and hidden from screen readers; a dev warning fires if neither alt nor label is set. |
| `label` | `string` |  | Accessible label (e.g. file name). Shown as tooltip on hover. |
| `onRemove` | `(e: React.MouseEvent) => void` |  | Callback for the overlaid remove button. |
| `onClick` | `(e: React.MouseEvent) => void` |  | Click handler. Adds button semantics and a hover overlay. |
| `isLoading` | `boolean` | `false` | Shows skeleton (no src) or upload overlay (with src). |
| `isDisabled` | `boolean` | `false` | Whether the thumbnail is disabled. |
| `showRemoveOn` | `'always' \| 'hover'` | `'hover'` | When the remove button is visible. `hover` (the default) reveals it on hover and on keyboard focus, and keeps it visible on any touch-capable device; `always` shows it at rest. Only applies when `onRemove` is set. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |
| `className` | `string` |  | CSS class name for the root element. Prefer xstyle for styling; className is provided for integration with non-StyleX systems. |
| `style` | `CSSProperties` |  | Inline styles for the root element. Prefer xstyle for styling; inline styles bypass StyleX optimization. |
| `data-testid` | `string` |  | Test selector for automated testing frameworks. |

Styling hook class: `.astryx-thumbnail`

## Files

- `src/Thumbnail.doc.mjs`
- `src/Thumbnail.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Thumbnail
