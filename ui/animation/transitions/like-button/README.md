# Like Button

A lightweight like/favourite control should acknowledge a new selection with a heart fill, pop, and particle burst.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the fill, pop and particle burst

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `like-button.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### LikeButton — `like-button.tsx`

- Props: `liked` / `defaultLiked` / `onLikedChange(liked)`, `label` ("Like"), `likedLabel` ("Liked"), `className`.
- Structure: a 32 px pill button (`--card`, ring `--border`) with a 16 px outlined heart, an invisible particle origin (8 dots
  at fixed offsets around the heart) and the label. `--like-color` (`oklch(0.615 0.246 15.4)`, upstream #f40051) is declared on
  the button.
- Motion: liking fills the heart and turns it `--like-color` over `--like-fill` (150 ms); the icon pops (scale 1 → 0.82 → 1)
  over `--like-pop` (350 ms, `cubic-bezier(0.34, 1.96, 0.64, 1)`); the dots (`--like-particle-size` 2.5 px) burst out to their
  offsets (~16–20 px), fading and shrinking to 0.6 over `--like-particle-dur` (600 ms). Unliking only unfills. Reduced motion:
  no pop, no burst.
- Keyboard: native toggle button with `aria-pressed`.
