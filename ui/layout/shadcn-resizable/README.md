# Resizable

Accessible resizable panel groups and layouts with keyboard support.

## Classification

- Category: `layout` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/resizable.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Accessible resizable panel groups and layouts with keyboard support.
- Provides: resizable with 3 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: resizable-demo, resizable-vertical, resizable-handle
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add resizable`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/resizable.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `resizable-demo` — `upstream/examples/resizable-demo.tsx`, `static/resizable-demo.html`

## About

The `Resizable` component is built on top of [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) by [bvaughn](https://github.com/bvaughn).

## Installation

```bash
npx shadcn@latest add resizable
```

- Install the following dependencies:

```bash
npm install react-resizable-panels
```

- Copy and paste the following code into your project.

Source: `components/ui/resizable.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
```

```tsx showLineNumbers
<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>
```

## Composition

Use the following composition to build a `ResizablePanelGroup`:

```text
ResizablePanelGroup
├── ResizablePanel
├── ResizableHandle
└── ResizablePanel
```

## Vertical

Use `orientation="vertical"` for vertical resizing.

> Example `resizable-vertical` — `upstream/examples/resizable-vertical.tsx`, `static/resizable-vertical.html`

## Handle

Use the `withHandle` prop on `ResizableHandle` to show a visible handle.

> Example `resizable-handle` — `upstream/examples/resizable-handle.tsx`, `static/resizable-handle.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `resizable-rtl` — `upstream/examples/resizable-rtl.tsx`, `static/resizable-rtl.html`

## API Reference

See the [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels/tree/main/packages/react-resizable-panels) documentation.

## Changelog

### 2025-02-02 `react-resizable-panels` v4

Updated to `react-resizable-panels` v4. See the [v4.0.0 release notes](https://github.com/bvaughn/react-resizable-panels/releases/tag/4.0.0) for full details.

If you're using `react-resizable-panels` primitives directly, note the following changes:

| v3                           | v4                      |
| ---------------------------- | ----------------------- |
| `PanelGroup`                 | `Group`                 |
| `PanelResizeHandle`          | `Separator`             |
| `direction` prop             | `orientation` prop      |
| `defaultSize={50}`           | `defaultSize="50%"`     |
| `onLayout`                   | `onLayoutChange`        |
| `ImperativePanelHandle`      | `PanelImperativeHandle` |
| `ref` prop on Panel          | `panelRef` prop         |
| `data-panel-group-direction` | `aria-orientation`      |

> Note:
  The shadcn/ui wrapper components (`ResizablePanelGroup`, `ResizablePanel`,
  `ResizableHandle`) remain unchanged.

## Files

- `upstream/ui/resizable.tsx` — the ui file as the registry installs it
- `upstream/examples/resizable-demo.tsx`
- `upstream/examples/resizable-vertical.tsx`
- `upstream/examples/resizable-handle.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/resizable
