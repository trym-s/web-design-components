# Dashboard — build status

Written 2026-08-12, mid-implementation. Describes what exists, what was verified, and what is left.

## Why it exists

`ui/` holds ~68 captured references from three upstreams. Nothing in the repo could render them —
no `package.json`, no bundler. This dashboard is the proof that the extraction produced working
components, and a way to browse the bank visually.

Two constraints drove the design:

1. **CSS collision.** The 19 Beautiful UI entries need `ui/_sources/beautiful-ui/styles.css`,
   a compiled Tailwind v4 sheet with global resets. The 27 transitions.dev entries each import
   their own `.t-*` stylesheet. One document cannot hold both plus a shell.
2. **Render load.** ~10 entries are WebGL/canvas engines with rAF loops. Mounting all at once
   is unusable.

Both solved the same way: **one iframe per live component, nothing live until clicked.**

## What is built

### Tooling (repo root)

- `package.json` — React 19, react-dom 19, plus the bank's own deps: `three`, `motion`,
  `d3-scale`, `d3-shape`, `clsx`, `tailwind-merge`, `glimm`, `iconoir-react`, `liveline`, `tinted`.
  All resolved from npm; none were missing. React 19 specifically, because `dither-kit` renders
  `<Context>` directly as a provider, which is React 19 syntax.
- `vite.config.ts` — Vite `root` is the repo root so `ui/` is inside the served tree and
  `import.meta.glob` reaches it. Contains:
  - `resolve.dedupe: ["react", "react-dom"]` — `liveline` ships its own React copy; without this
    every hook inside it throws "Invalid hook call".
  - `define` for `process.env.NEXT_PUBLIC_MEDIA_BASE` — `hover-video-button` reads it.
  - `bankShims()` plugin — see below.
  - Five build entries: shell, preview, and the three vanilla wrapper pages.
- `tsconfig.json` — loose (`strict: false`); the bank is a snapshot, not a typechecked project.

### The shim plugin

The arlan.me vault pages publish each effect's own files but **not** the app-level helpers those
files import. Ten specifiers resolve to nothing in the captured tree. `bankShims()` fills them in,
and only when the real file is genuinely absent, so a future fuller capture wins automatically.

| Missing specifier | Resolution |
|---|---|
| `../../lib/haptics` | `dashboard/shims/haptics.ts` — no-ops |
| `../../lib/sound` | `dashboard/shims/sound.ts` — silent no-ops |
| `../../lib/view-transition` | `dashboard/shims/view-transition.ts` — `onTransitionChange` never fires |
| `../section-label` | `dashboard/shims/section-label.tsx` — small caption component |
| `./use-magnetism` | `dashboard/shims/use-magnetism.ts` — no-op hook |
| `./use-compact` | `dashboard/shims/liquid-use-compact.ts` — reimplemented against the captured `scenes.tsx` |
| `./cycle` (arcade) | `dashboard/shims/arcade-cycle.ts` — **deliberate failure marker**, see below |
| `.../ransom/manifest.json` | `dashboard/shims/ransom-manifest.json` — `{}` (sprite data not captured) |
| `../swirl/controls` | **real file**: `ui/effects/ascii-swirl/src/swirl/controls.tsx` |
| `../../lib/video-sources` | **real file**: `ui/animation/hover-video-button/src/app/lib/video-sources.ts` |

The last two are not shims — those modules exist in the bank, just under a different entry's `src/`.

`arcade/cycle.ts` carries the entire phase sequence of the arcade-pixel engine and was never
published. It cannot be faked honestly, so the shim exports throwing stubs: the card fails loudly
and gets a "needs shim" badge instead of pretending to work.

### The app

- `dashboard/src/registry.ts` — zero manual registry. Globs `reference.tsx` / `reference.md`,
  `README/SOURCE/PROMPT.md`, `preview.png`, and every `src/`+`registry/` file as raw text.
  Derives id, category, title, `Use when:` line, and the arlan `## Classification` block
  (nature / medium / entry point). Source is inferred: transitions path → `transitions.dev`,
  has `PROMPT.md` → `arlan-vault`, has README/SOURCE → `standalone`, else `beautiful-ui`.
- `dashboard/src/overrides.ts` — the only hand-kept table: CSS profile, `kind` (react / vanilla),
  and pre-known status badges.
- `dashboard/src/preview.tsx` + `preview.html` — one component per document. Loads the Beautiful UI
  sheet only for that source, plus `bu-fonts.css` (the snapshot's `@font-face` points at
  `/_next/static/media/*` and 404s; the snapshot file itself stays byte-identical, its sha256 is
  asserted by `scripts/check-bank.sh` in git history). Picks `default` export, falling back to the
  first capitalised named export — transitions.dev entries export `export function Toggle()`.
  Reports mount success/failure to the parent via `postMessage`.
- `dashboard/src/demos.tsx` — demo props for references that need usage data, plus full live scenes
  for `border-beam`, `hover-video-button`, `metal-fx`, and `thinking-orbs`. Supplied here rather
  than editing captured files; the four heavier component modules load only when played.
- `dashboard/src/Grid.tsx` / `Card.tsx` — grouped grid, filters (category / source / nature),
  search over id and "Use when". Cards are inert until **Play**; max 4 live at once, oldest evicted.
- `dashboard/src/Detail.tsx` — `#/c/<id>`: live iframe with 360 / 768 / full width toggle, exact
  full-resolution source capture toggle when available, Use-when, copy-PROMPT.md button, file tree
  with source panes, README, provenance.
- `dashboard/src/shell.css` — hand-written, deliberately Tailwind-free so the shell shares nothing
  with the bank's stylesheets.
- `dashboard/vanilla/{color-depth,typer,symbols-effect}.html` — the three non-React entries.
  `typer` needed a wrapper because the captured `typer.html` imports `./typer.js`, which was never
  captured (only `typer.ts`); the wrapper drives `TyperGroup` straight from the TS source.
  `symbols-effect` is a bare Three.js class with no demo, so the wrapper feeds it a local image
  from the bank — no network needed.

### Bank files that were changed

Only files I generated in the previous extraction step, never upstream source:

- The 18 arlan `reference.tsx` files were rewritten. They had been generated assuming a default
  export; the captured components use named exports (`ArcadePlayground`, `HoloCard`, …).
  `ghosty-reveal`, `hover-video-button`, and `vector-editor` now carry real demo usage
  (an inline SVG feather mask, the `/vault/amo` clip base, a parsed starting path).
- Nothing under any `src/` or `registry/` tree was touched.

## Verification

A Playwright script (`playwright` installed in the scratchpad, not in the repo) loads every entry's
preview URL in a fresh page, records console/page errors, counts painted nodes, and screenshots it.

Final full run used a **3.8s settle delay**: **68 entries checked and screenshot**. Every screenshot
was inspected. The longer delay removed the React 19 concurrent-render false positives. Confirmed
limitations:

| Entry | Issue |
|---|---|
| `effects/arcade-pixel` | `arcade/cycle.ts` not captured upstream; sandbox also cannot fetch its R2 textures |
| `animation/hover-video-button` | `ERR_SSL_PROTOCOL_ERROR` reaching the R2 bucket — network-gated in this sandbox |
| `effects/emboss` | same R2 fetch |
| `data-visualization/dither-kit` | mounts, but is visually blank/unstyled without its required Tailwind build |
| `typography/ransom-note` | controls mount, but the missing sprite manifest and images leave the note blank |

`animation/transitions/modal` opens and closes correctly. `shimmer-text` renders correctly.
`effects/symbols-effect` renders its canvas; its low DOM node count was a false positive.

Stopping `ascii-swirl` removed its iframe from the page; the source cleanup also cancels its rAF,
disconnects observers, and disposes the renderer. `npm run build` passes. Vite reports only the
expected unresolved captured Next.js font URLs and large registry chunk warning.

## Completed follow-up

1. Raised checker settle delay to 3.8s and reran all 68 previews.
2. Inspected all 68 screenshots, including the WebGL and Beautiful UI sets.
3. Added confirmed limitation badges and reasons to `overrides.ts`.
4. Confirmed `ascii-swirl` iframe teardown and source cleanup.
5. Ran a successful production build.
6. Added `.vite/` to `.gitignore`; `dist/` was already covered.
7. Added dashboard usage and snapshot boundaries to `AGENTS.md`.
8. Recorded incomplete upstream captures in `ui/_sources/arlan-vault/SOURCE.md`.

## Visual parity follow-up

1. Reviewed all 68 live previews individually against the 53 captured `preview.png` references.
2. Replaced the four standalone animation smoke-test mounts with full usage scenes. Border Beam now
   plays card, compact control, and line/search variants; Metal FX shows circle and pill variants;
   Thinking Orbs shows five semantic states at both tuned sizes.
3. Added a `reference` view to every detail page with a capture, preserving the full 1200×900 frame
   and linking it to the original-resolution image.
4. Kept every retained `src/` and `registry/` snapshot untouched.
5. Rechecked the four repaired scenes at 640×480 and card size; `npm run build` passes.
