# Blur-up Image

Placeholder resolves into the photo.

## Classification

- Category: `content` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/blur-up-image.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/blur-up-image.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/blur-up-image

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--foreground`, `--card`, `--muted-foreground`, `--radius`, …).
It imports only `react`, `motion` (`motion/react`), and `clsx` + `tailwind-merge` through `src/lib/utils.ts` (`cn`). Upstream's
numeric `radius` prop (5 | 6 | 9 | 11 | 14 px) is replaced by a token radius, `rounded-[calc(var(--radius)+1px)]`, which a
`rounded-*` class in `className` overrides. `src/demo.tsx` is sample data and wiring only; its photo `src/hillside-castle.jpg`
is sample media from the interior.dev snapshot — replace it with your own image.

### BlurUpImage — `blur-up-image.tsx`

- Props: `src` (undefined = still loading), `alt`, `width` / `height` (intrinsic size; also sets `aspect-ratio`), `placeholder`
  (a tiny LQIP data URL shown blurred underneath), `color` (a dominant colour painted behind everything, any CSS colour),
  `blur` (placeholder blur in px, 14), `srcSet`, `sizes`, `loading` (`lazy`), `fetchPriority`, `onReady()`, `onError()`,
  `className`. `useBlurUpImage({ src, srcSet, onReady, onError })` is exported and returns `{ ref, status, instant, loaded }`.
- Structure: a `relative w-full overflow-hidden` box with `aspect-ratio: width / height`, background `--foreground` at 10 %
  (under the `color` style); inside, the placeholder `<img>` (`object-cover`, `filter: blur(14px)`, `scale(1.08)` so blurred
  edges stay inside) and the real `<img>` on top (`decoding="async"`, not draggable). On error a `--card` layer with a
  22 px broken-image glyph in `--muted-foreground` fades in over both.
- States: `aria-busy="true"` while `loading`; `loading` → the real image sits at opacity 0, `blur(18px) saturate(0.6)`, scale 1.06;
  `ready` → it "develops" to opacity 1, `blur(0) saturate(1)`, scale 1 over 650 ms, easing `cubic-bezier(0.23, 1, 0.32, 1)`;
  `error` → the fallback layer. When the image was already in cache (complete on mount) or reduced motion is on, the change
  is instant and only opacity switches. Readiness waits for `img.decode()` when available.
- Interactions: none; change `src` to reload (the component resets to `loading` when `src` is cleared).
- Keyboard: none (not focusable).
