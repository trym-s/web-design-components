/**
 * XY Pad — Audio UI's registry element (registry-audio/bases/base/audio/elements/xypad.tsx) with its
 * Nova style hooks (`.cn-xypad*`) inlined as Tailwind classes.
 * MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { XYPad as XYPadPrimitive } from "./audio-ui/primitives/xypad";
import { cn } from "./lib/utils";

const xypadVariants = cva("", {
  defaultVariants: { size: "default" },
  variants: { size: { default: "h-48", lg: "h-64", sm: "h-40", xl: "h-96" } },
});

const GRID = [20, 40, 60, 80];

export interface XYPadProps extends XYPadPrimitive.RootProps, VariantProps<typeof xypadVariants> {
  /** Renders the value chip; defaults to the primitive's `x, y` readout. */
  formatValue?: (value: { x: number; y: number }) => React.ReactNode;
  valueDisplay?: "visible" | "hidden";
}

export function XYPad({ className, size, formatValue, valueDisplay = "visible", ...props }: XYPadProps) {
  return (
    <XYPadPrimitive.Root {...props}>
      <XYPadPrimitive.Label />
      <XYPadPrimitive.Slider
        className={cn(
          "relative block w-full cursor-crosshair touch-none select-none overflow-hidden rounded-xl border border-transparent bg-card ring-1 ring-foreground/10 transition-[color,border-color,box-shadow,opacity] duration-150 ease-out hover:ring-3 hover:ring-ring/50 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:border-ring active:ring-3 active:ring-ring/50 motion-reduce:transition-none",
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
          xypadVariants({ size }),
          className
        )}
        data-slot="xypad"
      >
        <XYPadPrimitive.Grid className="pointer-events-none absolute inset-0">
          {GRID.map((position) => (
            <XYPadPrimitive.GridLine
              className="absolute bg-border opacity-30 data-grid-vertical-line:top-0 data-grid-vertical-line:bottom-0 data-grid-vertical-line:w-px"
              key={`v-${position}`}
              orientation="vertical"
              position={position}
            />
          ))}
          {GRID.map((position) => (
            <XYPadPrimitive.GridLine
              className="absolute bg-border opacity-30 data-grid-horizontal-line:right-0 data-grid-horizontal-line:left-0 data-grid-horizontal-line:h-px"
              key={`h-${position}`}
              orientation="horizontal"
              position={position}
            />
          ))}
        </XYPadPrimitive.Grid>
        <XYPadPrimitive.Crosshair
          className="pointer-events-none absolute bg-primary opacity-50 data-crosshair-vertical:top-0 data-crosshair-vertical:bottom-0 data-crosshair-vertical:w-px"
          orientation="vertical"
        />
        <XYPadPrimitive.Crosshair
          className="pointer-events-none absolute bg-primary opacity-50 data-crosshair-horizontal:right-0 data-crosshair-horizontal:left-0 data-crosshair-horizontal:h-px"
          orientation="horizontal"
        />
        <XYPadPrimitive.Cursor className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute size-5 transition-none">
          <XYPadPrimitive.CursorGlow className="absolute inset-0 rounded-full bg-primary opacity-20 blur-sm transition-opacity duration-200 motion-reduce:transition-none" />
          <XYPadPrimitive.CursorDot className="absolute inset-1 rounded-full bg-primary shadow-sm" />
          <XYPadPrimitive.CursorHighlight className="absolute inset-2 rounded-full bg-primary-foreground opacity-30" />
        </XYPadPrimitive.Cursor>
        {valueDisplay === "visible" && (
          <XYPadPrimitive.ValueDisplay
            className="absolute top-2.5 right-2.5 z-10 rounded-[min(var(--radius-md),10px)] bg-background/90 px-2 py-1 font-mono text-muted-foreground text-xs ring-1 ring-foreground/10 backdrop-blur-md"
            formatValue={formatValue}
          />
        )}
      </XYPadPrimitive.Slider>
    </XYPadPrimitive.Root>
  );
}
