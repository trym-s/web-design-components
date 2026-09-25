# Progress

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/progress.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
- Provides: progress with 3 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: progress-demo, progress-label, progress-controlled
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add progress`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/progress.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `progress-demo` — `upstream/examples/progress-demo.tsx`, `static/progress-demo.html`

## Installation

```bash
npx shadcn@latest add progress
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/progress.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Progress } from "@/components/ui/progress"
```

```tsx showLineNumbers
<Progress value={33} />
```

## Label

Use a `Field` component to add a label to the progress bar.

> Example `progress-label` — `upstream/examples/progress-label.tsx`, `static/progress-label.html`

## Controlled

A progress bar that can be controlled by a slider.

> Example `progress-controlled` — `upstream/examples/progress-controlled.tsx`, `static/progress-controlled.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `progress-rtl` — `upstream/examples/progress-rtl.tsx`, `static/progress-rtl.html`

## API Reference

See the [Radix UI Progress](https://www.radix-ui.com/docs/primitives/components/progress#api-reference) documentation.

## Files

- `upstream/ui/progress.tsx` — the ui file as the registry installs it
- `upstream/examples/progress-demo.tsx`
- `upstream/examples/progress-label.tsx`
- `upstream/examples/progress-controlled.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/progress
