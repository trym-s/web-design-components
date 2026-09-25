import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Liquid } from "./liquid-gooey";
import { cn } from "./lib/utils";
import "./gooey-email-input.css";

/** Closed, the 44px submit circle hides inside the right end of the 202px pill; open, the field
 *  shifts left and the button detaches right, symmetric about the 290px stage centre. */
const BTN_W = 44;
const openX = (gap: number) => ({ field: -(BTN_W + gap) / 2, btn: BTN_W / 2 + 2 + gap / 2 });

export type GooeyEmailInputProps = {
  /** Controlled value. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called with the current value by the arrow button or Enter; the field then blurs (closes). */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** Accessible name of the input. */
  label?: string;
  /** Accessible name of the submit button. */
  submitLabel?: string;
  /** Morph duration in ms. */
  duration?: number;
  /** Morph easing (CSS timing function); the default overshoots for a settle. */
  easing?: string;
  /** Peak blur of the arrow's cross-blur pulse, px. */
  crossBlur?: number;
  /** Resting gap between field and button when open, px. */
  gap?: number;
  /** Goo blur sigma in px. */
  blur?: number;
  /** Alpha-contrast slope of the liquid edge. */
  contrast?: number;
  /** `box-shadow` syntax, rendered on the merged liquid. */
  shadow?: string;
  className?: string;
};

export function GooeyEmailInput({
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  placeholder = "Enter your email",
  label = "Email address",
  submitLabel = "Submit email",
  duration = 600,
  easing = "cubic-bezier(0.22, 1.3, 0.71, 1)",
  crossBlur = 2,
  gap = 20,
  blur = 8,
  contrast = 22,
  shadow = "0 0 0 1px var(--border) inset, 0 2px 6px var(--gooey-drop)",
  className,
}: GooeyEmailInputProps) {
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState(defaultValue);
  const text = value ?? inner;
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Cross-blur pulse, re-armed on every open/close (not on mount) so the animation restarts.
  const [pulsing, setPulsing] = useState(false);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  useEffect(() => () => {
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
  }, []);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setPulsing(false);
    const raf = requestAnimationFrame(() => setPulsing(true));
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulsing(false), duration + 60);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const submit = () => {
    onSubmit?.(text);
    inputRef.current?.blur();
  };

  const x = openX(gap);
  const transition = { duration, ease: easing };

  return (
    <Liquid
      blur={blur}
      contrast={contrast}
      fill="var(--popover)"
      shadow={shadow}
      className={cn(
        "h-[210px] w-[290px] [--gooey-drop:oklch(0_0_0/0.08)] dark:[--gooey-drop:oklch(0_0_0/0.24)]",
        pulsing && "gooey-eb-pulsing",
        className,
      )}
      style={{ "--eb-dur": `${duration}ms`, "--eb-ease": easing, "--eb-blur": `${crossBlur}px` } as CSSProperties}
    >
      <Liquid.Item className="absolute left-[44px] top-[81px]" x={open ? x.field : 0} transition={transition}>
        <div className="h-12 w-[202px] rounded-full">
          <input
            ref={inputRef}
            type="email"
            value={text}
            placeholder={placeholder}
            aria-label={label}
            onChange={(e) => {
              if (value === undefined) setInner(e.target.value);
              onValueChange?.(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            className="size-full rounded-full border-0 bg-transparent pl-[18px] pr-11 font-[inherit] text-[14px] text-foreground outline-none placeholder:text-muted-foreground pointer-coarse:text-[16px]"
          />
        </div>
      </Liquid.Item>
      <Liquid.Item className="absolute left-[200px] top-[83px]" x={open ? x.btn : 0} transition={transition}>
        <button
          type="button"
          aria-label={submitLabel}
          tabIndex={open ? 0 : -1}
          onPointerDown={(e) => e.preventDefault() /* keep the input focused */}
          onClick={submit}
          className="grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-popover-foreground [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <svg
            className={cn(
              "gooey-eb-arrow transition-opacity duration-150 ease-[ease]",
              open ? "opacity-100 delay-[calc(var(--eb-dur,360ms)*0.12)]" : "opacity-0",
            )}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9h11M9.5 4.5 14 9l-4.5 4.5" />
          </svg>
        </button>
      </Liquid.Item>
    </Liquid>
  );
}
