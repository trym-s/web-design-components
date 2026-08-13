<!-- Verbatim "Copy prompt" payload from ghosty-reveal; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Ghosty reveal".

What it is:
- I love it when photos do not just fade in. The good ones bleed in through a soft, cloudy edge, like the image is forming out of fog. It looks expensive and hard to build. It is neither.
- The whole trick is a mask. A tall, feathered gradient is laid over the image, several times taller than the box, and you slide it across with `mask-position`. Because the edge of the mask is soft and a little cloudy, the image appears through a feathered front instead of a hard line. That is the ghost.
- Below is the real thing on live images, with controls for how soft the bleed is, which way it travels, the duration and the easing. You can grab the component and the mask and drop them into anything.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### ghosty-reveal/standalone/GhostReveal.tsx
```tsx
"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * GhostReveal — a soft "ghostly" image/element reveal.
 *
 * The trick: a tall, feathered alpha mask is laid over the element at
 * `mask-size: 100% <scale>%` (the mask is
 * several times taller than the box). Animating `mask-position` from one end to
 * the other slides that soft gradient across the element, so the content bleeds
 * in through a cloudy, feathered edge instead of a hard wipe — the ghost look.
 *
 * Direction just rotates which mask edge leads. Scroll-triggered by default via
 * IntersectionObserver; pass `play` to drive it yourself. Honors reduced motion.
 */

export type GhostDirection = "up" | "down" | "left" | "right";

export interface GhostRevealProps {
  children: ReactNode;
  /** Mask image — a soft feathered PNG with a VERTICAL ramp (for up/down). */
  maskSrc: string;
  /** Optional HORIZONTAL-ramp version of the mask, used for left/right so the
   *  feather runs along the wipe. Falls back to maskSrc if omitted (then
   *  left/right reveal without a horizontal feather). */
  maskSrcH?: string;
  /** How many times taller/wider than the box the mask is. Bigger = slower,
   *  softer bleed. Maps to `mask-size`. Default 500 (i.e. 500%). */
  scale?: number;
  /** Reveal duration in ms. Default 1000. */
  duration?: number;
  /** CSS easing. Default a gliding ease-out. */
  easing?: string;
  /** Which way the soft edge travels. Default "up" (rises from the bottom). */
  direction?: GhostDirection;
  /** Controlled trigger. When omitted, reveals on scroll-into-view (once). */
  play?: boolean;
  /** Visible fraction before the scroll trigger fires (0..1). Default 0.2. */
  threshold?: number;
  /** Fires when the mask finishes animating OUT (fully hidden). Lets a driver
   *  swap the child image exactly when nothing is visible, so a new image can
   *  never flash in over the old one mid-transition. */
  onHidden?: () => void;
  className?: string;
  style?: CSSProperties;
}

// The reveal is a soft gradient mask that slides across the box. The PNG asset
// is a vertical feather (good for up/down); for left/right we use a CSS gradient
// oriented horizontally so the feather runs along the wipe — NO element rotation
// (rotating a non-square box clips it). Each direction defines the mask image,
// its over-sized dimension, and the from/to positions for hidden→revealed.
function axisFor(
  dir: GhostDirection,
  maskSrc: string,
  maskSrcH: string,
  scale: number,
) {
  const pct = `${scale}%`;
  // Up/down use the vertical-ramp PNG (tall mask, sweeps along Y). Left/right use
  // the horizontal-ramp PNG (wide mask, sweeps along X). Both are REAL feathered
  // images and no element is rotated, so the feather is correct and nothing clips.
  switch (dir) {
    case "up": // feather rises from the bottom
      return { image: `url(${maskSrc})`, size: `100% ${pct}`, from: "0% 0%", to: "0% 100%" };
    case "down": // feather descends from the top
      return { image: `url(${maskSrc})`, size: `100% ${pct}`, from: "0% 100%", to: "0% 0%" };
    case "left": // feather sweeps in horizontally
      return { image: `url(${maskSrcH})`, size: `${pct} 100%`, from: "0% 0%", to: "100% 0%" };
    case "right":
      return { image: `url(${maskSrcH})`, size: `${pct} 100%`, from: "100% 0%", to: "0% 0%" };
  }
}

export function GhostReveal({
  children,
  maskSrc,
  maskSrcH,
  scale = 500,
  duration = 1000,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  direction = "up",
  play,
  threshold = 0.2,
  onHidden,
  className = "",
  style,
}: GhostRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controlled = play !== undefined;
  const [shown, setShown] = useState(false);

  // Scroll trigger (uncontrolled mode). Fires once when the element scrolls in.
  useEffect(() => {
    if (controlled) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controlled, threshold]);

  const open = controlled ? play! : shown;
  const { image, size, from, to } = axisFor(
    direction,
    maskSrc,
    maskSrcH ?? maskSrc,
    scale,
  );

  // Fire onHidden when the mask-position transition completes while hidden, so a
  // driver swaps the image only after it's fully masked out (never a flash of
  // the next image over the old one). Keep the latest `open`/`onHidden` in refs
  // so the listener stays attached without re-binding each render.
  const openRef = useRef(open);
  openRef.current = open;
  const onHiddenRef = useRef(onHidden);
  onHiddenRef.current = onHidden;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: TransitionEvent) => {
      if (e.target !== el) return;
      if (e.propertyName !== "mask-position" && e.propertyName !== "-webkit-mask-position")
        return;
      if (!openRef.current) onHiddenRef.current?.();
    };
    el.addEventListener("transitionend", handle);
    return () => el.removeEventListener("transitionend", handle);
  }, []);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const maskStyle: CSSProperties = reduce
    ? { opacity: open ? 1 : 0, transition: `opacity 0.3s ${easing}` }
    : {
        WebkitMaskImage: image,
        maskImage: image,
        WebkitMaskSize: size,
        maskSize: size,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: open ? to : from,
        maskPosition: open ? to : from,
        transition: `-webkit-mask-position ${duration}ms ${easing}, mask-position ${duration}ms ${easing}`,
      };

  return (
    <div ref={ref} className={className} style={{ ...maskStyle, ...style }}>
      {children}
    </div>
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Ghosty reveal\",\"url\":\"https://arlan.me/vault/ghosty-reveal\",\"image\":\"/vault/ghosty-reveal.svg\",\"datePublished\":\"Jun 29, 2026\",\"about\":\"Personal\",\"keywords\":\"CSS, Mask, Reveal\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Ghosty reveal\",\"item\":\"https://arlan.me/vault/ghosty-reveal\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Ghosty reveal"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[9845]}],"$L24"],["$","div",null,{"className":"-mt-6","children":["$","$L25",null,{}]}],["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"I love it when photos do not just fade in. The good ones bleed in through a soft, cloudy edge, like the image is forming out of fog. It looks expensive and hard to build. It is neither."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"The whole trick is a mask. A tall, feathered gradient is laid over the image, several times taller than the box, and you slide it across with "}],["$","code","1",{"className":"font-mono text-[0.92em] text-[var(--text-primary)]","children":"mask-position"}],["$","$1","2",{"children":". Because the edge of the mask is soft and a little cloudy, the image appears through a feathered front instead of a hard line. That is the ghost."}]]}],["$","p","2",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Below is the real thing on live images, with controls for how soft the bleed is, which way it travels, the duration and the easing. You can grab the component and the mask and drop them into anything."}]]}]]}],["$","$L26",null,{"children":[["$","$L27",null,{"playground":"ghosty-reveal"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L28",null,{"text":"$29","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L2a"]}],"$L2b","$L2c"]}]]}],"$L2d"]}]]}]
