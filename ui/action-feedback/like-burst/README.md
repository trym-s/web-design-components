# Like Burst

Optimistic like that survives rapid taps.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/like-burst.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/like-burst.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/like-burst

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and wiring only.

### LikeBurst — `like-burst.tsx`

- Props: `initialLiked` (false), `initialCount` (0), `onCommit(liked, signal)` (returns a promise that persists the final intent; rejecting rolls back), `onError(error)`, `onToggle(liked)` (fires on every click), `settle` (400 ms debounce before committing), `label` (`"Like"`), `activeLabel` (`"Liked"`), `format(n)` (default `Intl.NumberFormat("en-US")`), `disabled`, `className`, `ref` (exposes `{ toggle() }`). The file also exports `useOptimisticLike(options)` → `{ liked, count, base, pending, burst, settled, toggle }`.
- Structure: a `<button aria-pressed aria-busy>` 36 px high, `px-3`, `gap-2`, radius `calc(var(--radius) - 1px)`, 1 px `--border`, `--card` fill, 13 px medium `--foreground` text. Contents: an 18×18 heart cell (outline heart in `--muted-foreground`, 1.7 px stroke; filled heart in `--foreground` stacked on top), a label cell stacking `label` / `activeLabel`, and a 12 px tabular count in `--muted-foreground` whose width is reserved for the widest of count / count + 1. A hidden `role="status" aria-live="polite"` span announces the settled state ("129 likes, liked").
- States: liked → filled heart fades in and scales 0.55 → 1 (spring stiffness 520, damping 34, mass 0.45), outline fades out, labels crossfade (spring 260 / 34 / 0.8). Each like fires a burst of 8 `--primary` sparks (3–4 px squares, radius `calc(var(--radius) - 8.5px)`) flying 13–22 px outward from the heart centre, fading out over 440 ms with ease `cubic-bezier(0.23, 1, 0.32, 1)` and 0–50 ms staggered delays. The count rolls: the old number exits 7 px down, the new one enters from 7 px up. Focus-visible: 2 px `--ring` ring. Reduced motion: no sparks, no roll, instant fades.
- Interactions: click toggles optimistically (count ±1 immediately). Rapid clicks are debounced by `settle`; only the final intent is committed, earlier in-flight commits are aborted via `AbortSignal`. If the final intent equals the last confirmed state nothing is sent; a rejected commit restores the last confirmed liked/count.
- Keyboard: native button — Enter / Space toggle.
