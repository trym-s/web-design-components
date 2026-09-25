/**
 * Knob — Audio UI's registry element (registry-audio/bases/base/audio/elements/knob.tsx) with its
 * Nova style hooks (registry-audio/styles/style-nova.css, `.cn-knob*`) inlined as Tailwind classes.
 * MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { cva, type VariantProps } from "class-variance-authority";
import { Knob as KnobPrimitive } from "./audio-ui/primitives/knob";
import { cn } from "./lib/utils";

const knobVariants = cva(
  "relative inline-flex rounded-full border border-transparent outline-none ring-1 ring-foreground/10 transition-[border-color,box-shadow] duration-150 ease-out focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 hover:ring-3 hover:ring-ring/50 has-[[data-slot=knob-control]:active]:border-ring has-[[data-slot=knob-control]:active]:ring-3 has-[[data-slot=knob-control]:active]:ring-ring motion-reduce:transition-none",
  {
    defaultVariants: { size: "default" },
    variants: { size: { default: "size-12", lg: "size-16", sm: "size-11", xl: "size-24" } },
  }
);

// The pressed-in shade is the one colour the style does not take from a token; override the variable to retheme it.
const knobControlClassName =
  "transform-[translateZ(0)] relative isolate flex size-full cursor-grab touch-none select-none outline-none [clip-path:circle(50%_at_50%_50%)] focus-visible:outline-none active:cursor-grabbing data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 bg-secondary text-secondary-foreground shadow-xs transition-[color,background-color,box-shadow,border-color,opacity] duration-150 ease-out hover:bg-secondary/90 [--knob-press:oklch(0_0_0/0.14)] active:shadow-[inset_0_-14px_28px_-12px_var(--knob-press)] motion-reduce:transition-none dark:bg-secondary/60 dark:hover:bg-secondary/70 dark:[--knob-press:oklch(0_0_0/0.28)]";

const knobBodyVariants = cva(
  "absolute z-0 rounded-full bg-card text-card-foreground ring-1 ring-foreground/10 transition-transform duration-100 ease-out motion-reduce:transition-none",
  {
    defaultVariants: { size: "default" },
    variants: { size: { default: "inset-1.5", lg: "inset-2", sm: "inset-1", xl: "inset-2.5" } },
  }
);

export type KnobProps = KnobPrimitive.RootProps & VariantProps<typeof knobVariants>;

function Knob({ className, size, ...props }: KnobProps) {
  return (
    <KnobPrimitive.Root className={cn(knobVariants({ size }), className)} data-slot="knob" {...props}>
      <KnobPrimitive.Slider className={knobControlClassName} data-slot="knob-control">
        <KnobPrimitive.Body className={knobBodyVariants({ size })} data-slot="knob-body" />
        <KnobPrimitive.Arc
          className="pointer-events-none absolute inset-0 z-1 block size-full text-primary [&_path]:stroke-current"
          data-slot="knob-arc"
        />
        <KnobPrimitive.Indicator
          className="pointer-events-none absolute inset-0 z-2 block size-full text-primary"
          data-slot="knob-indicator"
        />
      </KnobPrimitive.Slider>
    </KnobPrimitive.Root>
  );
}

export { Knob, knobVariants };
