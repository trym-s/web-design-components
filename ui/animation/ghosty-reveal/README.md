# Ghosty reveal

- I love it when photos do not just fade in. The good ones bleed in through a soft, cloudy edge, like the image is forming out of fog. It looks expensive and hard to build. It is neither.
- The whole trick is a mask. A tall, feathered gradient is laid over the image, several times taller than the box, and you slide it across with `mask-position`. Because the edge of the mask is soft and a little cloudy, the image appears through a feathered front instead of a hard line. That is the ghost.
- Below is the real thing on live images, with controls for how soft the bleed is, which way it travels, the duration and the easing. You can grab the component and the mask and drop them into anything.

## Classification

- Category: `animation` — decorative
- Medium: CSS mask-position
- Entry point: `upstream/ghosty-reveal/standalone/GhostReveal.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/ghosty-reveal/standalone/GhostReveal.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/ghosty-reveal

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and
`tailwind-merge` (through `src/lib/utils.ts`). The upstream feathered PNG mask is replaced by a built-in CSS gradient
with the same ramp (pass `maskSrc` / `maskSrcH` to use a real image). `src/demo.tsx` wraps token-coloured placeholder
"photos" and is sample wiring only.

### GhostReveal — `ghost-reveal.tsx`

- Props: `children` (the element to reveal), `maskSrc` (vertical-ramp mask URL, transparent top → opaque bottom; optional),
  `maskSrcH` (horizontal-ramp mask URL for left/right; falls back to `maskSrc`), `scale` (mask size in % of the box
  along the travel axis, 500), `duration` (ms, 1000), `easing` (`cubic-bezier(0.16, 1, 0.3, 1)`), `direction`
  (`up` | `down` | `left` | `right`, `up`), `play` (controlled trigger; omit for reveal-once on scroll-in),
  `threshold` (IntersectionObserver visible fraction, 0.2), `onHidden()` (fires when the hide transition ends),
  `className`, `style`.
- Structure: one `div` wrapping the children with `mask-image`, `mask-repeat: no-repeat` and an oversized
  `mask-size` (`100% 500%` for up/down, `500% 100%` for left/right). The built-in mask is
  `linear-gradient(<dir>, alpha 0 at 0 %, alpha 0.35 at 45 %, alpha 1 at 70 %)`, oriented so the opaque end is the
  one in view when revealed (`to bottom` for up, `to top` for down, `to right` for left, `to left` for right).
- States: hidden → `mask-position` at the transparent end (up `0% 0%`, down `0% 100%`, left `0% 0%`, right `100% 0%`);
  revealed → the opposite end (up `0% 100%`, down `0% 0%`, left `100% 0%`, right `0% 0%`). The change is a
  `mask-position` transition of `duration` ms with `easing`, so the content bleeds in through a soft edge.
  `prefers-reduced-motion: reduce` swaps the mask for a 0.3 s opacity fade.
- Interactions: none of its own. Uncontrolled, it reveals once when ≥ `threshold` of it scrolls into view (reveals
  immediately if IntersectionObserver is missing). Controlled, toggle `play`; `onHidden` fires on `transitionend` of
  `mask-position` while `play` is false, so a driver can swap the child only when fully hidden.
- Keyboard: none (purely visual wrapper; the children keep their own focus behaviour).
