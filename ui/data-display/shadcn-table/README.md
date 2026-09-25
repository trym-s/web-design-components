# Table

A responsive table component.

## Classification

- Category: `data-display` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/table.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A responsive table component.
- Provides: table with 3 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: table-demo, table-footer, table-actions
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add table`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/table.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `table-demo` — `src/examples/table-demo.tsx`, `static/table-demo.html`

## Installation

```bash
npx shadcn@latest add table
```

- Copy and paste the following code into your project.

Source: `components/ui/table.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
```

```tsx showLineNumbers
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Composition

Use the following composition to build a `Table`:

```text
Table
├── TableCaption
├── TableHeader
│   └── TableRow
│       ├── TableHead
│       ├── TableHead
│       ├── TableHead
│       └── TableHead
├── TableBody
│   ├── TableRow
│   │   ├── TableCell
│   │   ├── TableCell
│   │   ├── TableCell
│   │   └── TableCell
│   └── TableRow
│       ├── TableCell
│       ├── TableCell
│       ├── TableCell
│       └── TableCell
└── TableFooter
```

## Footer

Use the `<TableFooter />` component to add a footer to the table.

> Example `table-footer` — `src/examples/table-footer.tsx`, `static/table-footer.html`

## Actions

A table showing actions for each row using a `<DropdownMenu />` component.

> Example `table-actions` — `src/examples/table-actions.tsx`, `static/table-actions.html`

## Data Table

You can use the `<Table />` component to build more complex data tables. Combine it with [@tanstack/react-table](https://tanstack.com/table/latest) to create tables with sorting, filtering and pagination.

See the [Data Table](/docs/components/data-table) documentation for more information.

You can also see an example of a data table in the [Tasks](/examples/tasks) demo.

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `table-rtl` — `src/examples/table-rtl.tsx`, `static/table-rtl.html`

## Files

- `src/ui/table.tsx` — the ui file as the registry installs it
- `src/examples/table-demo.tsx`
- `src/examples/table-footer.tsx`
- `src/examples/table-actions.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/table
