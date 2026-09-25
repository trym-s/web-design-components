# Load More

Sentinel that loads before you hit the end.

## Classification

- Category: `async` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/load-more.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/load-more.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/load-more

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and wiring only.

### LoadMore — `load-more.tsx`

- Props: `onLoad()` (may return a promise; resolving to `false` means no more pages; rejecting shows the error face), `hasMore` (true; false shows the end face), `auto` (true: load when the sentinel scrolls near), `rootRef` (scroll container for the observer; default the viewport), `rootMargin` (`"600px 0px"`), `maxAutoLoads` (3 consecutive automatic loads before it pauses and waits for a click), `labels` (partial `{ idle: "Load more", loading: "Loading", error: "Couldn’t load. Try again", end: "You’re all caught up" }`), `onError(error)`, `className`. The file also exports `useLoadMore(options)` → `{ status, paused, sentinelRef, load }`.
- Structure: a full-width centred row with a 1 px invisible sentinel at its top (observed with `IntersectionObserver`) and a ghost `<button>` 32 px high, `px-3`, 12.5 px medium text, radius `calc(var(--radius) - 1px)`. The four faces (11 px icon + label: chevron, spinner, alert, check; `gap-1.5`) are stacked in one grid cell. `aria-label` follows the face; a hidden `role="status" aria-live="polite" aria-atomic` span announces error and end.
- States: `idle` (`--foreground`, hover fill `--primary` at 4 %, press 1 px down), `loading` (`--muted-foreground`, spinner turning once per 700 ms, face shifted 1 px down, `aria-busy`, `aria-disabled`), `error` (`--destructive`; auto-loading stops until a manual click), `end` (`--muted-foreground`, check, inert). Faces crossfade with opacity/y 3 px/blur 3 px on a spring (stiffness 260, damping 34, mass 0.8). Focus-visible: `--primary` at 6 % fill + 1 px inset `--primary` ring. Reduced motion: instant swaps, still spinner.
- Interactions: with `auto`, the sentinel entering the `rootMargin`-expanded viewport triggers a load; after each success it is re-observed so a still-visible sentinel loads again, up to `maxAutoLoads` in a row (the counter resets when the sentinel leaves view or on a manual click). Clicks while loading or at the end are ignored; only one request runs at a time.
- Keyboard: native button — Enter / Space load.
