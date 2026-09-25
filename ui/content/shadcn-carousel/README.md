# Carousel

A carousel with motion and swipe built using Embla.

## Classification

- Category: `content` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/carousel.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A carousel with motion and swipe built using Embla.
- Provides: carousel with 7 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: carousel-demo, carousel-size, carousel-spacing, carousel-orientation, carousel-api, carousel-plugin, carousel-multiple
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add carousel`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/carousel.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `carousel-demo` — `src/examples/carousel-demo.tsx`, `static/carousel-demo.html`

## About

The carousel component is built using the [Embla Carousel](https://www.embla-carousel.com/) library.

## Installation

```bash
npx shadcn@latest add carousel
```

- Install the following dependencies:

```bash
npm install embla-carousel-react
```

- Copy and paste the following code into your project.

Source: `components/ui/carousel.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
```

```tsx showLineNumbers
<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Composition

Use the following composition to build a `Carousel`:

```text
Carousel
├── CarouselContent
│   ├── CarouselItem
│   └── CarouselItem
├── CarouselPrevious
└── CarouselNext
```

## Sizes

To set the size of the items, you can use the `basis` utility class on the `<CarouselItem />`.

> Example `carousel-size` — `src/examples/carousel-size.tsx`, `static/carousel-size.html`

```tsx showLineNumbers {4-6}
// 33% of the carousel width.
<Carousel>
  <CarouselContent>
    <CarouselItem className="basis-1/3">...</CarouselItem>
    <CarouselItem className="basis-1/3">...</CarouselItem>
    <CarouselItem className="basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

```tsx showLineNumbers {4-6}
// 50% on small screens and 33% on larger screens.
<Carousel>
  <CarouselContent>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Spacing

To set the spacing between the items, we use a `pl-[VALUE]` utility on the `<CarouselItem />` and a negative `-ml-[VALUE]` on the `<CarouselContent />`.

> Example `carousel-spacing` — `src/examples/carousel-spacing.tsx`, `static/carousel-spacing.html`

```tsx showLineNumbers /-ml-4/ /pl-4/
<Carousel>
  <CarouselContent className="-ml-4">
    <CarouselItem className="pl-4">...</CarouselItem>
    <CarouselItem className="pl-4">...</CarouselItem>
    <CarouselItem className="pl-4">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

```tsx showLineNumbers /-ml-2/ /pl-2/ /md:-ml-4/ /md:pl-4/
<Carousel>
  <CarouselContent className="-ml-2 md:-ml-4">
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Orientation

Use the `orientation` prop to set the orientation of the carousel.

> Example `carousel-orientation` — `src/examples/carousel-orientation.tsx`, `static/carousel-orientation.html`

```tsx showLineNumbers /vertical | horizontal/
<Carousel orientation="vertical | horizontal">
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Options

You can pass options to the carousel using the `opts` prop. See the [Embla Carousel docs](https://www.embla-carousel.com/api/options/) for more information.

```tsx showLineNumbers {2-5}
<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

## API

Use a state and the `setApi` props to get an instance of the carousel API.

> Example `carousel-api` — `src/examples/carousel-api.tsx`, `static/carousel-api.html`

```tsx showLineNumbers {1,4,22}
import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

## Events

You can listen to events using the api instance from `setApi`.

```tsx showLineNumbers {1,4-14,16}
import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      // Do something on select.
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

See the [Embla Carousel docs](https://www.embla-carousel.com/api/events/) for more information on using events.

## Plugins

You can use the `plugins` prop to add plugins to the carousel.

```ts showLineNumbers {1,6-10}
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}
```

> Example `carousel-plugin` — `src/examples/carousel-plugin.tsx`, `static/carousel-plugin.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `carousel-rtl` — `src/examples/carousel-rtl.tsx`, `static/carousel-rtl.html`

When localizing the carousel for RTL languages, you need to set the `direction` option in the `opts` prop to match the text direction. This ensures the carousel scrolls in the correct direction.

```tsx showLineNumbers {2-5}
<Carousel
  dir={dir}
  opts={{
    direction: dir,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious className="rtl:rotate-180" />
  <CarouselNext className="rtl:rotate-180" />
</Carousel>
```

The `direction` option accepts `"ltr"` or `"rtl"` and should match the `dir` prop value. You may also want to rotate the navigation buttons using the `rtl:rotate-180` class to ensure they point in the correct direction.

## API Reference

See the [Embla Carousel docs](https://www.embla-carousel.com/api/) for more information on props and plugins.

## Files

- `src/ui/carousel.tsx` — the ui file as the registry installs it
- `src/examples/carousel-demo.tsx`
- `src/examples/carousel-size.tsx`
- `src/examples/carousel-spacing.tsx`
- `src/examples/carousel-orientation.tsx`
- `src/examples/carousel-api.tsx`
- `src/examples/carousel-plugin.tsx`
- `src/examples/carousel-multiple.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/carousel
