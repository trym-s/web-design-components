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
