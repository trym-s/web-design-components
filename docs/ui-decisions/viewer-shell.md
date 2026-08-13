# Viewer shell

## Purpose

The viewer is the browsing surface for this repository's own reference bank. Its
audience is the operator or agent choosing a reference to adapt, and its single
job is elimination speed: reduce ~4,000 entries to the one worth reading, then
show its source, provenance and install route without losing the narrowing that
got there.

The catalog is 4,057 entries, 3,929 of them icons. The previous grid rendered
every match at once, so the default view mounted a card per entry — thousands of
DOM nodes, most of them a grey box, because icon entries carry no `preview.png`.
Its only axes were category, source and nature; `role`, `evidence`, `framework`
and `availability` were in the catalog but not in the interface.

Approved hierarchy: mode (components vs icons) → group facet (category for
components, upstream source for icons) → chip axis (role / framework) → free
text, with ⌘K spanning everything and detail in a drawer.

## Reference bank

- Commit: `1bebc9f41731eb25b097fd04b7d57cf34deaa9d9`
- Selected:
  - `overlay/command-palette` — behavior — fuzzy scoring with streak/boundary
    bonuses and a keyword penalty, `combobox`+`listbox` wiring,
    `aria-activedescendant`, polite result-count announcement, scroll lock with
    gutter compensation, pointer-motion (not hover) activation, dismiss only when
    the pointer both went down and up outside the panel.
  - `navigation/sidebar-nav` — structure — workspace identity row, `/`-hinted
    quick search, section captions, per-item counts, one hover/active box that
    travels between rows. Its `preview.png` is a captured 404 page, so only its
    source informed the adaptation.
  - `data-display/filter-table` — structure — counted, horizontally scrollable
    filter chips with `aria-pressed` and a status dot. The table body was not
    taken.
  - `async/load-more` — behavior — IntersectionObserver sentinel firing 600px
    ahead of the viewport, with a `maxAutoLoads` ceiling that pauses and hands
    over to an explicit button.
  - `search/search-list` — structure — empty-state block (framed mark, title,
    recovery line) and the clear affordance inside the field.
  - `overlay/drawer` — structure — side panel that keeps the list's place.
  - `navigation/tabs` — structure — one indicator shared across tabs.
  - `code/code-block` — structure — filename header above the source surface.
  - `action-feedback/copy-button` — behavior — width-locked label that ticks and
    reverts after 2s.
  - `ui/_sources/beautiful-ui/styles.css` — visual — the light and dark token
    values (`--page/--canvas/--surface/--inset/--hover`, the ink and line scales,
    `--field`, accent and status colours with their tints, six shadow tokens).

Every selection is `evidence: review`; each was read at source before use. No
`blocked` entry was proposed.

## Adaptation

The shell stays Tailwind-free, so nothing was installed and no snapshot was
edited. Token *values* were copied into `dashboard/src/tokens.css` rather than
importing the compiled sheet, which carries global resets that would collide with
the shell; the previews keep loading it behind their iframe. Light is the base
palette and `[data-theme="dark"]` swaps the same names, applied before first
paint from `dashboard/index.html`.

Motion's layout animation in the palette and the load-more spinner were replaced
with CSS transitions — the shell keeps no animation dependency — and the whole
sheet is disabled under `prefers-reduced-motion`.

The upstream product copy ("Creamery Ops", task rows, flavour searches) was
dropped; the vocabulary is this bank's own: references, icon sets, roles,
evidence, `Use when`.

Icon tiles mount their real upstream module in the shell rather than an iframe,
gated by an IntersectionObserver so only tiles near the viewport load. React and
raw line-md SVG (2,772 of 3,929) render inline and animate on hover from the
component's own handlers; Vue, Svelte and Lottie sets need their own runtime, so
their tiles show the framework and defer to the drawer's iframe. Only `size` is
passed to icon components — every set declares it, and any other prop is spread
onto their root element and warned about by React.

States covered: skeleton rows while a source file loads, the empty block when a
filter matches nothing, `needs shim` / `shim` badges from catalog status, a
`local only` badge for `personal-cache` entries, an explicit note for entries
that arrived after the last deployment and so have no bundled preview, Escape and
outside-click dismissal with a focus trap in the drawer, `/` to focus the filter
and ⌘K for the palette, and an off-canvas rail plus full-width sheet below 900px.

Two performance faults surfaced during verification and were fixed in the same
pass:

- `dashboard/src/preview.tsx` imported the shell registry, which imports the
  5.9 MB `catalog/catalog.json`. Every preview iframe therefore parsed the whole
  catalog before mounting one component. `dashboard/src/previewEntry.ts` now
  resolves the module, stylesheet profile and icon framework from the path alone.
  A preview that took 7.9s to render takes 0.7–2.8s.
- `dashboard/src/registry.ts` eagerly globbed every reference and README as raw
  text, ~12k requests before first paint. The eager globs now stop at the icon
  boundary and icon entries are built from catalog metadata.

`vite.config.ts` also ignores `.cache/**` in the dev watcher (watching the
personal icon cache exhausts the inotify limit and kills the dev server with
`ENOSPC`) and turns off `reportCompressedSize`, which gzipped all ~19.5k emitted
assets purely to print a size table and was the build's peak-memory step.

Narrowing the preview's directory-listing glob away from the icon tree removed
~7.9k chunks that existed only so the build could tell whether a directory has a
README: the emitted asset count fell from 19,487 to 11,629 and `dist` from 97 MB
to 65 MB.

## Alternative considered

A two-pane docs layout: narrow left rail with one flat virtualised list, a
permanent detail pane on the right, no drawer and no group tree. It is less code
and deep-links cleanly, but it offers a single narrowing axis. With 23
categories, 14 sources and 5 frameworks — and 97% of the mass inside one
category — a single list cannot be reduced fast enough, and scanning icons by eye
is impossible without a dense grid.

## Verification

- `npm run catalog:check` — 4,057 references valid.
- `npm run build` — passes, 54s, 11,629 assets. The built output was then served
  and re-driven through the same Playwright run: root, `dashboard/index.html` and
  `dashboard/preview.html` all return `200 text/html`, sampled JS/CSS/font/image
  assets return their own MIME types rather than an SPA-fallback `text/html`, and
  the flows above behave identically to dev.
- Playwright driving system Chromium at 1440×900 and 390×844: components grid,
  a played live preview, icons mode, the SVG chip filter, an icon detail, ⌘K
  ranking ("records tab" → `data-display/records-table` first), the drawer's
  preview/files/docs tabs, Escape dismissal, the empty state, light theme, and
  the mobile rail and full-width drawer. Every screenshot was inspected. No page
  errors or console errors in the final run.

Remaining limitations:

- Vue, Svelte and Lottie icon tiles show a framework placeholder rather than the
  glyph; only their drawer preview animates. The `react-useanimations` set needs
  `npm run dev:personal` because its animation data is deliberately not in the
  repository.
- The pre-existing broken entries are unchanged: `effects/arcade-pixel` (upstream
  never published `cycle.ts`), `typography/ransom-note` (sprite manifest not
  captured), and the two R2-gated media entries.
- `dashboard/src/registry.ts` still imports the 5.9 MB catalog statically as the
  offline fallback for the live fetch, which is most of the 6.5 MB shell chunk.
  Splitting a components-only slice out of the catalog build would remove it.
- The icon sources exist twice on disk (`ui/icons/<set>/<name>/src/` and
  `ui/_sources/<set>/src/`), so the viewer emits a chunk for each tree: one for
  the Files pane's raw text, one for the mountable module. Deduplicating belongs
  in the importer, not the viewer.
