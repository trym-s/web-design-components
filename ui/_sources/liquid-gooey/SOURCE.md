# Liquid Gooey source snapshot

- Upstream site: https://gooey.jakubantalik.com/
- Repository: https://github.com/Jakubantalik/Libraries.git
- Captured commit: `1dc861997d1987def44c191638cd245d7dbeec06`
- Captured: 2026-08-12
- Package: `liquid-gooey@0.1.0`
- License: MIT (see `LICENSE`)
- Runtime: React 18+; no runtime network dependency

The live catalog and pinned repository agree on six public demos. The published engine exposes
`Liquid` and `Liquid.Item`; its complete TypeScript source is retained in `src/`. Shared site
CSS and all avatar/icon/image assets consumed by the demos are local in this directory.

| Demo | Effect | Bank entry |
| --- | --- | --- |
| Gooey plus menu | Morph | `ui/navigation/gooey-plus-menu` |
| Gooey tabs | Move | `ui/navigation/gooey-tabs` |
| Gooey avatar group | Morph + dissolve | `ui/gesture/gooey-avatar-group` |
| Gooey melting cards | Morph + dissolve | `ui/gesture/gooey-melting-cards` |
| Gooey email input | Morph | `ui/input/gooey-email-input` |
| Gooey liquid slider | Move | `ui/gesture/gooey-liquid-slider` |

Excluded from the component count: `ApiTest.tsx` is an internal API test harness, while
`App.tsx` and `DemoPage.tsx` are composite catalog/marketing pages. They do not publish
additional components. The site has no sitemap or robots inventory; both paths return the SPA.

## Token mapping for `src/`

`upstream/` demos style themselves through the site variables in `styles.css` (light `:root`, dark
`[data-theme='dark']`). A copy-paste `src/` (AGENTS.md, Entry layout, rule 2) resolves them through shadcn
tokens; the dark pairs disappear because the tokens switch with `.dark`. Each entry vendors the engine as
`src/liquid-gooey/` (MIT, with `LICENSE`); its only colour defaults are the liquid `fill` (`var(--popover)`)
and the shadow fallback colour.

| `styles.css` variable (light · dark) | `src/` |
| --- | --- |
| `--bg` | `background` |
| `--text` | `foreground` |
| `--muted`, `--label`, `--note` | `muted-foreground` |
| `--modal-bg` (the liquid surface, `Liquid fill`) | `popover` → `fill="var(--popover)"` |
| `--btn-text` (icons riding the liquid) | `popover-foreground` |
| `--card-bg` / `--card-border`, `--panel-border` | `card` / `border` |
| `--panel-bg`, `--skeleton` | `muted` |
| `--stage-bg` (demo stage only) | `muted/30` |
| `--ctl-bg` / `--ctl-bg-hover` / `--ctl-border` | `foreground/5` / `foreground/10` / `input` |
| `--field-bg` | `background` |
| `--track` / `--track-ring` | `foreground/10` / `border` |
| `--sl-thumb` (`#fff` · `#525252`) | `--gooey-thumb`, declared on the component root: `[--gooey-thumb:oklch(1_0_0)] dark:[--gooey-thumb:oklch(0.44_0_0)]` |
| `--accent` / `--on-accent` | `primary` / `primary-foreground`; focus outlines → `ring` |
| `--hover-veil` | `foreground/5` |
| `--tab-ind` / `--tab-ind-text` | `primary` / `primary-foreground` |
| `--tab-label` / `--tab-label-hover` | `foreground/75` / `foreground` |
| `--photo-edge` / `--photo-lift` | declared on the component root with the upstream values: `[--photo-edge:oklch(0_0_0/0.2)] dark:[--photo-edge:oklch(1_0_0/0.08)]`, `[--photo-lift:oklch(0_0_0/0.16)] dark:[--photo-lift:oklch(0_0_0/0.55)]` |
| `Liquid shadow` (bank reference: `0 0 0 1px rgba(255,255,255,.04) inset, 0 2px 6px rgba(0,0,0,.24)`) | default prop `0 0 0 1px var(--border) inset, 0 2px 6px var(--gooey-drop)` with `[--gooey-drop:oklch(0_0_0/0.08)] dark:[--gooey-drop:oklch(0_0_0/0.24)]` on the root |
| Slider thumb `shadow` (light `0 0 0 1px rgba(0,0,0,.08), 0 1px 5px rgba(0,0,0,.08)`; dark five-layer Logram stack) | default prop `0 0 0 1px var(--border), 0 1px 5px var(--gooey-drop)` |
| `.ap-reset` literal greys | `secondary` / `secondary-foreground` |
| `Inter` / `Roboto Mono` | `font-sans` / `font-mono` |
| pill radii (`48px`, `28px`, `50%`), stage `10px`, cards `14px`/`20px` | `rounded-full`, `rounded-lg`, `rounded-[calc(var(--radius)+4px)]` / `+10px` |
