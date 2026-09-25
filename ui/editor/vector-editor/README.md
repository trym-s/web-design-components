# Figma vector editor

- You know that Figma look everyone copies: the thin blue box around a thing, the little corner squares, the size tag under it, and the dots you grab to bend a shape. I wanted to see if I could build it for the web, so here it is.
- It is two small parts. One draws the blue box and the size tag around anything. The other lets you grab the dots on a shape and drag them to change it, then gives you the new path back. It is pretty raw, just a fun little experiment, but it works and you can take it.

## Classification

- Category: `editor` — functional
- Medium: React + SVG
- Entry point: `upstream/svg-editor/standalone/FigmaFrame.tsx`
- Nature: a working tool surface; treat it as an implementation reference, not a skin.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/svg-editor/standalone/types.ts`
- `upstream/svg-editor/standalone/parse.ts`
- `upstream/svg-editor/standalone/FigmaFrame.tsx`
- `upstream/svg-editor/standalone/VectorEditor.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/vector-editor

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and
`tailwind-merge` (through `src/lib/utils.ts`). `types.ts` and `parse.ts` are the upstream path model and parser
unchanged; `vector-editor.css` holds the frame's intro keyframes (the upstream site defined them globally).
`src/demo.tsx` is sample wiring only.

Colours are CSS variables declared on each component root with the upstream values: `--vector-accent`
(Figma blue, `oklch(0.67 0.183 249.2)`), `--vector-arm` (tangent lines, `oklch(0.768 0.052 249.4)`) and
`--vector-point` (handle fill / badge text, `oklch(1 0 0)`). Override them with a class, e.g.
`className="[--vector-accent:var(--primary)]"`.

### Path model and helpers — `types.ts`, `parse.ts`

- `VectorPath = { anchors: Anchor[]; starts: number[]; closed: boolean[] }`; `Anchor = { p, in, out }` with absolute
  `{x, y}` points (`in`/`out` are bezier handles, `null` = straight). Several subpaths share one flat `anchors` array;
  `starts[s]` is the first index of subpath `s`, `closed[s]` its `Z` flag.
- `parsePath(d)` accepts `M L H V C S Q T Z` (absolute and relative) and normalises everything to cubic segments;
  it throws on arcs (`A`). A closed subpath's duplicated last anchor is folded into its first anchor.
- `serializePath(path)` writes `M … C …/L … Z` per subpath, rounded to 2 decimals. `bounds(path)` returns the box over
  anchors and handles.

### VectorEditor — `vector-editor.tsx`

- Props: `path` (controlled `VectorPath`), `onChange(next)`, `viewBox` (`[minX, minY, w, h]`), `width` / `height`
  (rendered px, default the viewBox size), `mirror` (`angle-length` default | `angle` | `none`), `style`
  (`EditorStyle`: `accent`, `arm`, `anchorR` 4, `handleR` 3.2, `pointFill`, `fill` (accent), `fillOpacity` 0.08,
  `stroke` (accent), `strokeWidth` 1.5, `showRig` true, `fillRule` `evenodd`), `className`.
- Structure: one `<svg>` (block, `touch-action: none`, no text selection, `overflow: visible`) holding the path, then
  the rig: tangent arm lines (anchor → handle, stroke `arm`, width max(0.75, 0.6 × strokeWidth)), handle diamonds
  (squares of 2 × `handleR` rotated 45°, `pointFill` fill, `accent` stroke 1.1, invisible hit circle 3.5 × `handleR`),
  and anchors on top (circles of `anchorR`, stroke 1.25, invisible hit circle 3 × `anchorR`, cursor `grab`).
- States: stateless apart from the active drag; `showRig: false` shows only the shape.
- Interactions: pointer-down on an anchor or handle captures the pointer. Pointer positions map to user space through
  the SVG's screen CTM, and moves are coalesced to one `onChange` per animation frame (flushed on pointer-up/cancel).
  Dragging an anchor moves it and both its handles by the same delta. Dragging a handle moves it; the opposite
  handle mirrors through the anchor: `angle-length` keeps it collinear at the same length, `angle` collinear at its
  own length, `none` leaves it. Holding Alt at pointer-down forces `none` (a corner).
- Keyboard: none (pointer-only editor).

### FigmaFrame — `figma-frame.tsx`

- Props: `children`, `width` / `height` (explicit size for the badge; otherwise measured with a ResizeObserver),
  `style` (`FrameStyle`: `accent`, `handleSize` 8, `handleFill`, `borderWidth` 1, `showHandles`, `showBadge`,
  `badgeBg`, `badgeText`), `className`.
- Structure: an `inline-block` relative wrapper around the children; an absolute inset border (`borderWidth` px,
  `accent`); four corner squares (`handleSize` px, `handleFill` fill, 1 px `accent` border, radius 1 px, centred on
  the corners); a badge centred 30 px below the bottom edge (`rounded-sm`, 11 px tabular figures, `badgeBg` /
  `badgeText`) reading `W × H`.
- States: first mount plays an intro for 900 ms: the border scales open from the top-left
  (`bbox-open`, 0.6 s `cubic-bezier(0.16, 1, 0.3, 1)`), the handles pop in (`bbox-handle`, 0.25 s ease-out, delays
  0.18 / 0.28 / 0.38 / 0.48 s clockwise from top-left), the badge fades down in (`bbox-badge`, 0.25 s, delay 0.2 s).
  Afterwards size changes just update the frame and badge.
- Interactions: none; the frame and badge are `pointer-events: none`.
- Keyboard: none.
