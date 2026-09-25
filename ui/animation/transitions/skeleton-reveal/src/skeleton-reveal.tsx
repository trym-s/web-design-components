import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./skeleton-reveal.css";

export type SkeletonRevealProps = {
  /**
   * `true` snaps back to the skeleton instantly and pulses it until `false`; `false` cross-fades
   * skeleton → content with a matching blur (400 ms).
   */
  loading: boolean;
  /** Placeholder shapes; each direct child pulses (opacity 1 → 0.5 → 1 over 1 s). */
  skeleton: ReactNode;
  /** The real content, in the same slot. */
  children: ReactNode;
  /** Size the wrapper: both layers are absolutely stacked inside it. */
  className?: string;
};

/** Layout-free skeleton → content swap: both layers share one slot and one transition. */
export function SkeletonReveal({ loading, skeleton, children, className }: SkeletonRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const skelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const skel = skelRef.current;
    if (!loading || !wrap || !skel) return;
    // Snap back without transitions and restart the pulse.
    wrap.classList.add("is-resetting");
    skel.classList.remove("is-pulsing");
    void skel.offsetWidth;
    wrap.classList.remove("is-resetting");
    skel.classList.add("is-pulsing");
  }, [loading]);

  return (
    <div
      ref={wrapRef}
      className={cn("t-skel", loading ? "is-loading" : "is-revealed", className)}
      aria-busy={loading}
    >
      <div ref={skelRef} className="t-skel-skeleton is-pulsing" aria-hidden="true">
        {skeleton}
      </div>
      <div className="t-skel-content" aria-hidden={loading}>
        {children}
      </div>
    </div>
  );
}
