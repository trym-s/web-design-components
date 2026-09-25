# shadcn/ui

- Site: https://ui.shadcn.com
- Repository: https://github.com/shadcn-ui/ui
- Captured commit: `98a1fe67b439324ddc857f47fbdce056600a4329`
- Published registry: https://ui.shadcn.com/r/styles/{radix-nova,radix-rhea,base-nova,new-york-v4}/
- License: MIT — `LICENSE.md`
- Captured: 2026-09-24T16:30:00Z
- Importer: `node tools/import-shadcn.mjs <shadcn-ui/ui checkout>`, then `node tools/capture-bank.mjs --source shadcn --static --previews`

## Contents

- `radix-nova/`, `radix-rhea/`, `base-nova/` — ui/lib/hook files exactly as the registry installs them (docs examples import these)
- `new-york-v4/` — the ui files blocks and charts are built on (repository source)
- `styles.css` — the site's Tailwind v4 build over this snapshot; link it from any static HTML
- `tailwind.css` — its input: the docsite `globals.css` tokens with the snapshot as source
- `styles/style-*.css` — the eight style maps; `shadcn-tailwind.css` — the `shadcn/tailwind.css` layer
- `docsite/` — site modules a few examples import (markdown, message animations, media-query hook)
- `public/`, `remote/`, `fonts/` — images and Geist, localized
- `frame.tsx` — bank-only React harness; `manifest.json` — every captured entry

## Counts

- Components: 73 (docs pages), examples: 462
- Blocks: 27
- Charts: 70
- Styles: 8

## Excluded

- `radix/accordion-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/alert-dialog-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/alert-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/aspect-ratio-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/avatar-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/badge-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/breadcrumb-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/button-group-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/button-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/calendar-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/card-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/carousel-rtl` — RTL localisation demo; needs the docsite language selector
- `base/chart-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/chart-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/checkbox-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/collapsible-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/combobox-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/command-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/context-menu-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/data-table-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/date-picker-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/dialog-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/card-rtl` — RTL localisation demo; needs the docsite language selector
- `direction` — documentation only; the page embeds no renderable example
- `radix/drawer-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/dropdown-menu-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/empty-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/field-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/hover-card-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/input-group-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/input-otp-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/input-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/item-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/kbd-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/label-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/menubar-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/native-select-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/navigation-menu-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/pagination-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/popover-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/progress-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/radio-group-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/resizable-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/scroll-area-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/select-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/separator-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/sheet-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/sidebar-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/skeleton-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/slider-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/spinner-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/switch-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/table-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/tabs-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/textarea-rtl` — RTL localisation demo; needs the docsite language selector
- `toast` — documentation only; the page embeds no renderable example
- `radix/toggle-group-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/toggle-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/tooltip-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/typography-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/scroll-fade-rtl` — RTL localisation demo; needs the docsite language selector
- `radix/shimmer-rtl` — RTL localisation demo; needs the docsite language selector
- `block preview` — homepage showcase; exists only as untransformed radix style-slot source, never published as an installable block
- `block preview-02` — homepage showcase; exists only as untransformed radix style-slot source, never published as an installable block
- `block preview-03` — homepage showcase; exists only as untransformed radix style-slot source, never published as an installable block

