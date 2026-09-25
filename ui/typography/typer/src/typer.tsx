// React wrapper around the framework-free Typer engine (`typer-engine.ts`). The engine owns the
// element's children (it splits the text into word/char spans and swaps their classes per frame),
// so React renders an empty element and hands it over.

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "./lib/utils";
import { Typer, type TyperOptions } from "./typer-engine";
import "./typer.css";

export type TyperVariation =
  | "charFill"
  | "charInverse"
  | "charAccent"
  | "charAccentInverse"
  | "charAccentFill"
  | "charBorder";

export interface TyperTextProps extends Omit<TyperOptions, "variations"> {
  text: string;
  /** Which reveal to run. Omit to reveal ("in") once when ≥ `threshold` of the line is in view.
   *  Changing it (or `replayKey`) runs that phase. */
  play?: "in" | "out" | "inout";
  /** Change to replay the current `play` phase. */
  replayKey?: number;
  /** State classes in the pool (default all six). */
  variations?: TyperVariation[];
  threshold?: number;
  className?: string;
  style?: CSSProperties;
}

export function TyperText({
  text,
  play,
  replayKey = 0,
  fps = 20,
  cycles = 3,
  cycleLength = 0.5,
  delay = 0,
  variations,
  initVisible = false,
  threshold = 0.4,
  className,
  style,
}: TyperTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const typer = useRef<Typer | null>(null);
  const variationKey = variations?.join(",");

  // (Re)create the engine when its options change.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = text;
    const t = new Typer(el, { fps, cycles, cycleLength, delay, variations: variations?.slice(), initVisible });
    typer.current = t;
    return () => {
      t.destroy();
      typer.current = null;
    };
    // `text` is handled by the reset effect below; `variations` via its key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fps, cycles, cycleLength, delay, variationKey, initVisible]);

  // New text → rebuild in place and replay.
  const shownText = useRef(text);
  useEffect(() => {
    if (shownText.current === text) return;
    shownText.current = text;
    typer.current?.reset(text);
    if (play !== "out") typer.current?.in();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // Drive the phase: controlled via `play`, else once on scroll-in.
  useEffect(() => {
    const t = typer.current;
    const el = ref.current;
    if (!t || !el) return;
    if (play === "in") {
      t.reset(shownText.current); // so a replay restarts from blank
      return t.in();
    }
    if (play === "out") return t.out();
    if (play === "inout") return t.inOut();
    if (typeof IntersectionObserver === "undefined") return t.in();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          t.in();
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [play, replayKey, threshold, fps, cycles, cycleLength, delay, variationKey, initVisible]);

  return <span ref={ref} data-typer="" className={cn(className)} style={style} />;
}
