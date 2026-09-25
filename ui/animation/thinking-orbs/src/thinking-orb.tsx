// ThinkingOrb — thinking-orbs 0.2.0 (MIT © Jakub Antalik, see ./LICENSE). One shared clock
// (performance.now) keeps every orb in phase; each instance runs its own rAF loop but pauses while
// offscreen or when the tab is hidden. Reduced-motion users get a static frame. Dots are mixed
// between `--foreground` (near) and `--background` (far), re-read whenever the theme changes.

import { useEffect, useRef, useState, type RefObject } from 'react';
import type { Ink } from './engine/core';
import { MODE_DRAWS } from './engine/registry';
import { resolvePreset } from './presets';
import type { ThinkingOrbProps } from './types';

const LABELS: Record<string, string> = {
  working: 'Working…',
  searching: 'Searching…',
  solving: 'Solving…',
  listening: 'Listening…',
  connecting: 'Connecting…',
  weaving: 'Weaving…',
  composing: 'Composing…',
  breathing: 'Thinking…',
  shaping: 'Shaping…'
};

/** Any CSS colour → sRGB 0–255 via a 1×1 canvas. */
function rgbOf(value: string): [number, number, number] {
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

/** The theme's foreground/background for this element, live across class / data-theme / media changes. */
function useInk(ref: RefObject<Element | null>): Ink | null {
  const [ink, setInk] = useState<Ink | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resolve = () => {
      const css = getComputedStyle(el);
      setInk({ fg: rgbOf(css.getPropertyValue('--foreground').trim()), bg: rgbOf(css.getPropertyValue('--background').trim()) });
    };
    resolve();
    const mo = new MutationObserver(resolve);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'], subtree: true });
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', resolve);
    return () => {
      mo.disconnect();
      mq.removeEventListener('change', resolve);
    };
  }, [ref]);
  return ink;
}

/** Live `prefers-reduced-motion` — reduced users get a static frame. */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function ThinkingOrb({ state = 'working', size = 64, speed = 1, paused = false, style, 'aria-label': ariaLabel, ...rest }: ThinkingOrbProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const ink = useInk(ref);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !ink) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { mode, speed: baseSpeed, opts } = resolvePreset(state, size);
    const draw = MODE_DRAWS[mode];
    const effSpeed = baseSpeed * speed;
    const frame = (tSec: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      draw(ctx, size, tSec, ink, opts);
    };

    if (reduced) {
      frame(0.6);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      frame((performance.now() / 1000) * effSpeed);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || paused) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    frame((performance.now() / 1000) * effSpeed);
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && document.visibilityState !== 'hidden') start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => {
      if (document.visibilityState === 'hidden') stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [state, size, ink, speed, paused, reduced]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={ariaLabel ?? LABELS[state]}
      style={{ width: size, height: size, display: 'block', ...style }}
      {...rest}
    />
  );
}
