# Carousel

Carousel scrolls a row of items horizontally when they overflow the available width. Use it for card grids, image galleries, product lists, or any set of items that should be browsable without taking up the full page.

## Classification

- Category: `surface` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Carousel.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Carousel scrolls a row of items horizontally when they overflow the available width.
- Avoid when: Use a carousel for content every user must see. Not everyone scrolls horizontally, so put critical content above the fold. Auto-advance items. Let the user scroll at their own pace. Nest carousels. A carousel inside a carousel is confusing and breaks keyboard navigation.
- Provides: Scroll container, Items, Fade edges, Navigation buttons
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CarouselShowcase, CarouselCards, CarouselSnap
- Upstream: Astryx core · Container
- Keywords: carousel, slider, scroll, gallery, filmstrip, swiper, horizontal, overflow, snap

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

- `src/examples/CarouselShowcase.tsx` — Carousel: A horizontal carousel of cards with scroll-snap and navigation buttons. Scroll or click the arrows to browse. · static: `static/CarouselShowcase.html`
- `src/examples/CarouselCards.tsx` — Carousel — Cards: A horizontally scrollable row of cards with snap scrolling enabled. Use for feature grids, product lists, or any set of cards that overflows the available width. The carousel adds fade edges and navigation buttons automatically. · static: `static/CarouselCards.html`
- `src/examples/CarouselSnap.tsx` — Carousel — Snap: Scroll-snap carousel with navigation buttons and team member cards. Each card snaps to the start edge on scroll. Use when items should be viewed one at a time rather than as a continuous strip. · static: `static/CarouselSnap.html`

## Documentation

### Carousel

Carousel scrolls a row of items horizontally when they overflow the available width. Use it for card grids, image galleries, product lists, or any set of items that should be browsable without taking up the full page.

**Do**

- Enable scroll-snap when each item should land precisely at the start edge, like a gallery or product list.
- Reach for hasLoop on small, cyclable sets like a photo gallery, where wrapping past the last item back to the first feels natural.
- Always provide an aria-label that describes what the carousel contains, like "Featured products" or "Team members".
- Carousel implements the WAI-ARIA APG carousel pattern (https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) without auto-rotation: the region is labelled and carries aria-roledescription="carousel", each item is a group named "Slide N of M", and the scroll container is a tab stop so keyboard users can pan it with the arrow keys.
- Use a consistent gap and item width so the carousel looks intentional, not like content overflowing by accident.
- Trust the built-in navigation: trackpad users can swipe horizontally, and mouse users can hold Shift while scrolling the wheel to move through items.

**Don't**

- Use a carousel for content every user must see. Not everyone scrolls horizontally, so put critical content above the fold.
- Auto-advance items. Let the user scroll at their own pace.
- Nest carousels. A carousel inside a carousel is confusing and breaks keyboard navigation.

**Anatomy**

- Scroll container (required) — The horizontal overflow area that holds all items.
- Items (required) — The children rendered in a row inside the scroll container. With hasSnap, each item snaps to the start edge.
- Fade edges — Gradient fades on the left and right edges that indicate more content is available. Enabled by default, disable with hasEdgeFade={false}.
- Navigation buttons — Prev/next buttons that appear when the content can scroll in that direction. Enabled by default, disable with hasButtons={false}.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Carousel items rendered in a horizontal scroll container. |
| `gap` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4` | `1` | Gap between items using the spacing token scale. |
| `hasButtons` | `boolean` | `true` | Show prev/next navigation buttons when content is scrollable. |
| `hasEdgeFade` | `boolean` | `true` | Show a gradient edge-fade mask when content overflows, signalling that more items exist off-screen. |
| `hasLoop` | `boolean` | `false` | Wrap-around scrolling: next at the end scrolls to the start, prev at the start scrolls to the end. Buttons stay visible at both edges. Only engages when content overflows. |
| `hasSnap` | `boolean` | `false` | Enable scroll-snap so each child snaps to the start edge. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Inline padding inside the scroll container, with matching scroll-padding so snap points align to the content edge. |
| `aria-label` | `string` | `'Carousel'` | Accessible label for the carousel region. |
| `ref` | `React.Ref<HTMLDivElement>` |  | Ref forwarded to the root element. |
| `handleRef` | `React.Ref<CarouselHandle>` |  | Imperative handle exposing scrollNext(), scrollPrev(), scrollTo(index), canScrollNext(), and canScrollPrev() for programmatic scroll control. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value. |
| `className` | `string` |  | CSS class name for the root element. Prefer xstyle for styling. |
| `style` | `CSSProperties` |  | Inline styles for the root element. Prefer xstyle. |
| `data-testid` | `string` |  | Test selector for automated testing frameworks. |

Styling hook class: `.astryx-carousel`, `.astryx-carousel-scroller`

## Files

- `src/Carousel.doc.mjs`
- `src/Carousel.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Carousel
