# Skeleton

An animated shimmer placeholder that previews the shape of content while it loads. Use it to build loading screens that match the layout of the real content. For content with unknown dimensions, use Spinner instead.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Skeleton.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: An animated shimmer placeholder that previews the shape of content while it loads.
- Avoid when: Use when the content dimensions are unknown; use Spinner instead. Combine with a Spinner on the same content area; pick one loading pattern. Show skeletons indefinitely; if loading takes too long, show an error or empty state instead.
- Provides: Placeholder
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SkeletonShowcase, SkeletonCardSkeleton, SkeletonStaggeredList, SkeletonTableRowSkeleton
- Upstream: Astryx core · Feedback & Status
- Keywords: skeleton, placeholder, loading, shimmer, pulse, loader, bone, ghost, preloader

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

- `src/examples/SkeletonShowcase.tsx` — Skeleton: A skeleton loading placeholder. · static: `static/SkeletonShowcase.html`
- `src/examples/SkeletonCardSkeleton.tsx` — Skeleton — Card Loading: Card skeleton with avatar, name, and content lines. · static: `static/SkeletonCardSkeleton.html`
- `src/examples/SkeletonStaggeredList.tsx` — Skeleton — Staggered List: Staggered skeleton lines with varying widths. · static: `static/SkeletonStaggeredList.html`
- `src/examples/SkeletonTableRowSkeleton.tsx` — Skeleton — Table Rows: Table skeleton with staggered column widths. · static: `static/SkeletonTableRowSkeleton.html`

## Documentation

### Skeleton

An animated shimmer placeholder that previews the shape of content while it loads. Use it to build loading screens that match the layout of the real content. For content with unknown dimensions, use Spinner instead.

**Do**

- Match the size and shape of the content being loaded to create a realistic placeholder.
- Stagger multiple skeletons with the `index` prop for a natural wave animation.

**Don't**

- Use when the content dimensions are unknown; use Spinner instead.
- Combine with a Spinner on the same content area; pick one loading pattern.
- Show skeletons indefinitely; if loading takes too long, show an error or empty state instead.

**Anatomy**

- Placeholder (required) — Painted shape that stands in for content while it loads.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number \| string` | `'100%'` | Width in pixels (number) or CSS value (string). |
| `height` | `number \| string` | `'100%'` | Height in pixels (number) or CSS value (string). |
| `radius` | `'none' \| 0 \| 1 \| 2 \| 3 \| 4 \| 'rounded'` | `3` | Border radius using design token scale. Use none for sharp corners, rounded for fully rounded (avatars, pills, circles). |
| `index` | `number` | `0` | Index for staggered animation timing. For element at index n, animation starts at DELAY_TIME + (STAGGER_TIME × n). |

Styling hook class: `.astryx-skeleton`

### Skeleton

An animated shimmer placeholder that previews the shape of content while it loads. Use it to build loading screens that match the layout of the real content. For content with unknown dimensions, use Spinner instead.

**Do**

- Match the size and shape of the content being loaded to create a realistic placeholder.
- Stagger multiple skeletons with the `index` prop for a natural wave animation.

**Don't**

- Use when the content dimensions are unknown; use Spinner instead.
- Combine with a Spinner on the same content area; pick one loading pattern.
- Show skeletons indefinitely; if loading takes too long, show an error or empty state instead.

**Anatomy**

- Placeholder (required) — Painted shape that stands in for content while it loads.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number \| string` | `'100%'` | 像素宽度（数字）或 CSS 值（字符串）。 |
| `height` | `number \| string` | `'100%'` | 像素高度（数字）或 CSS 值（字符串）。 |
| `radius` | `'none' \| 0 \| 1 \| 2 \| 3 \| 4 \| 'rounded'` | `3` | 使用设计令牌的边框圆角。使用 none 表示直角，rounded 表示完全圆角（头像、药丸形、圆形）。 |
| `index` | `number` | `0` | 交错动画时序的索引。对于索引为 n 的元素，动画在 DELAY_TIME + (STAGGER_TIME × n) 时开始。 |

Styling hook class: `.astryx-skeleton`

## Files

- `src/Skeleton.doc.mjs`
- `src/Skeleton.spec.md`
- `src/Skeleton.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Skeleton
