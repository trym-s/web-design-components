# Lightbox

A fullscreen overlay for viewing images and videos at full resolution. Supports single-item and gallery modes with prev/next navigation, optional zoom and pan for images, and native video controls.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Lightbox.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A fullscreen overlay for viewing images and videos at full resolution.
- Avoid when: Use the lightbox for non-image content; it is specialized for images. Nest interactive content inside captions; keep them plain text.
- Provides: Viewer overlay, Media, Close button, Previous button, Next button, Caption, Counter
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: LightboxShowcase, LightboxGallery, LightboxVideo, LightboxZoom
- Upstream: Astryx core · Overlay
- Keywords: lightbox, image, video, viewer, gallery, zoom, fullscreen, media, photo, preview

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

- `upstream/examples/LightboxShowcase.tsx` — Lightbox: A fullscreen image viewer with caption. · static: `static/LightboxShowcase.html`
- `upstream/examples/LightboxGallery.tsx` — Lightbox — Gallery: A thumbnail grid that opens a fullscreen gallery. Clicking any thumbnail opens the lightbox at that index. Prev/next navigation lets users browse all images without closing. · static: `static/LightboxGallery.html`
- `upstream/examples/LightboxVideo.tsx` — Lightbox — Video: Opens a video in the lightbox. Native browser controls are available. Zoom and pan are disabled for video items. · static: `static/LightboxVideo.html`
- `upstream/examples/LightboxZoom.tsx` — Lightbox — Zoom: A lightbox with zoom and pan enabled. Double-click the image to zoom in; drag to pan around. Double-click again or use the close button to exit. · static: `static/LightboxZoom.html`

## Documentation

### Lightbox

A fullscreen overlay for viewing images and videos at full resolution. Supports single-item and gallery modes with prev/next navigation, optional zoom and pan for images, and native video controls.

**Do**

- Always provide alt text for every image for screen reader accessibility.
- Use gallery mode with onIndexChange for multi-image sets.
- Enable hasZoom only when viewing high-resolution images that benefit from close inspection.

**Don't**

- Use the lightbox for non-image content; it is specialized for images.
- Nest interactive content inside captions; keep them plain text.

**Anatomy**

- Viewer overlay (required) — Full-viewport dialog overlay that contains the active media and controls.
- Media (required) — Active image or video presented inside the viewer.
- Close button (required) — Button that closes the viewer.
- Previous button — Gallery button that moves to the previous media item.
- Next button — Gallery button that moves to the next media item.
- Caption — Caller-provided caption displayed below the active media.
- Counter — Current position and total shown in gallery mode.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` * | `boolean` |  | Whether the lightbox is open. |
| `onOpenChange` * | `(isOpen: boolean) => void` |  | Callback when the lightbox open state changes. |
| `media` * | `LightboxMedia \| LightboxMedia[]` |  | Media to display. Pass a single object for one item, or an array for gallery mode with prev/next navigation. Each item is {src: string, alt: string, caption?: ReactNode, type?: 'image' \| 'video'}; type defaults to 'image', and zoom/pan is disabled for 'video'. |
| `index` | `number` |  | Current index in gallery mode (when media is an array). |
| `onIndexChange` | `(index: number) => void` |  | Callback when the gallery index changes via prev/next navigation. |
| `hasZoom` | `boolean` | `false` | Enable zoom on double-click, or Enter/Space/+/- via keyboard (images only). When zoomed, drag or use arrow keys to pan. |
| `defaultIndex` | `number` | `0` | Initial image index in gallery mode for uncontrolled usage. |
| `hasAutoPlay` | `boolean` | `false` | Automatically start video playback when a video media item is shown. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be stylex.create() value. |

Styling hook class: `.astryx-lightbox`

### Lightbox

A fullscreen overlay for viewing images and videos at full resolution. Supports single-item and gallery modes with prev/next navigation, optional zoom and pan for images, and native video controls.

**Do**

- Always provide alt text for every image for screen reader accessibility.
- Use gallery mode with onIndexChange for multi-image sets.
- Enable hasZoom only when viewing high-resolution images that benefit from close inspection.

**Don't**

- Use the lightbox for non-image content; it is specialized for images.
- Nest interactive content inside captions; keep them plain text.

**Anatomy**

- Viewer overlay (required) — Full-viewport dialog overlay that contains the active media and controls.
- Media (required) — Active image or video presented inside the viewer.
- Close button (required) — Button that closes the viewer.
- Previous button — Gallery button that moves to the previous media item.
- Next button — Gallery button that moves to the next media item.
- Caption — Caller-provided caption displayed below the active media.
- Counter — Current position and total shown in gallery mode.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` * | `boolean` |  | 灯箱是否打开。 |
| `onOpenChange` * | `(isOpen: boolean) => void` |  | 灯箱打开状态变化时的回调。 |
| `media` * | `LightboxMedia \| LightboxMedia[]` |  | 要显示的媒体。传入单个对象或数组（用于画廊模式的上一张/下一张导航）。每项为 {src, alt, caption?, type?: 'image' \| 'video'}；type 默认为 'image'，'video' 禁用缩放/平移。 |
| `index` | `number` |  | 画廊模式中当前索引。 |
| `onIndexChange` | `(index: number) => void` |  | 通过上一张/下一张导航更改画廊索引时的回调。 |
| `hasZoom` | `boolean` | `false` | 启用双击缩放（仅图片）。缩放后可拖动平移。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式。必须是 stylex.create() 的值。 |

Styling hook class: `.astryx-lightbox`

## Files

- `upstream/Lightbox.doc.mjs`
- `upstream/Lightbox.spec.md`
- `upstream/Lightbox.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Lightbox
