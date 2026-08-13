<!-- Verbatim "Copy prompt" payload from typer; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "The typer".

What it is:
- Most headlines fade in. The nice ones type in. A wave runs across the line, and as it passes each letter the letter flickers through a few states, a solid pill, a highlight, an outlined pill, then lands on plain text. Letters next to each other in the same state merge into one long rounded bar.
- Below you can type your own text and change the color, the speed, and which states are in the mix. The colors are three variables, so it drops onto any theme.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### typer/standalone/typer.ts
```ts
// Typer — a character-by-character text reveal where each glyph ripples through a
// pool of randomized visual states (filled pill, inverse, accent, outlined pill…)
// before settling into plain text. Adjacent same-state chars merge into one
// rounded bar (that corner-merging is pure CSS, see typer.css).
//
// The reveal is a frame loop: a normalized progress runs across the word, and each
// character has its own bezier "control point" so the wave of state-changes ripples
// smoothly instead of marching in a straight line. Per character, once progress has
// passed it, it rolls through `cycles` random states, then settles.
//
// Framework-free. Attach one Typer to a [data-typer] element, then drive it with
// in()/out()/inOut()/reset(). A TyperGroup runs several with a per-line stagger,
// which is how a stacked block cascades in.

// ── math helpers ──
const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

// round v to the nearest multiple of step (quantizes the per-char progress so a
// glyph holds each state for a beat instead of flickering every frame).
const roundToStep = (v: number, step: number) => Math.round(v / step) * step;

// linear remap of v from [inLo,inHi] into [outLo,outHi].
const remap = (
  v: number,
  inLo: number,
  inHi: number,
  outLo: number,
  outHi: number,
) => ((v - inLo) * (outHi - outLo)) / (inHi - inLo) + outLo;

// solve a cubic bezier easing y for a given x, control points (x1,y1)(x2,y2),
// endpoints fixed at (0,0)(1,1). Newton's method with a bisection fallback. Used
// once per character to place its reveal "control point" along an eased curve, so
// the ripple accelerates and settles like the original.
function bezierEase(
  x: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  eps = 1e-6,
): number {
  const bx = (t: number) =>
    3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3;
  const by = (t: number) =>
    3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3;
  const bxDeriv = (t: number) =>
    3 * (1 - t) ** 2 * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t ** 2 * (1 - x2);

  let t = x;
  for (let i = 0; i < 8; i++) {
    const dx = bx(t) - x;
    if (Math.abs(dx) < eps) return by(t);
    const d = bxDeriv(t);
    if (Math.abs(d) < 1e-6) break;
    t -= dx / d;
  }
  let lo = 0,
    hi = 1;
  t = x;
  while (lo < hi) {
    const cx = bx(t);
    if (Math.abs(cx - x) < eps) return by(t);
    if (cx < x) lo = t;
    else hi = t;
    t = (lo + hi) / 2;
  }
  return by(t);
}

// the full pool of per-character states (CSS class suffixes). Any subset can be
// used; they get shuffled per run so the ripple never looks the same twice.
export const ALL_VARIATIONS = [
  "charFill",
  "charInverse",
  "charAccent",
  "charAccentInverse",
  "charAccentFill",
  "charBorder",
] as const;

export type TyperType = "initial" | "in" | "out" | "inout" | "done";

export interface TyperOptions {
  fps?: number; // frames per second of the reveal loop
  cycles?: number; // how many random states each char rolls through
  cycleLength?: number; // fraction of frames spent settling (0..1)
  delay?: number; // seconds before this typer's loop starts (per-line stagger)
  variations?: string[]; // which state classes are in the pool
  initVisible?: boolean; // start fully revealed (no animation)
}

interface CharNode {
  el: HTMLSpanElement;
  cp: number; // per-char control point (bezier-eased position along the word)
  currentClass: string;
}

export class Typer {
  private element: HTMLElement;
  private originalContent: string;
  private source: string;
  private length: number;
  private fps: number;
  private cycles: number;
  private cycleLength: number;
  private frames: number;
  private frame = 0;
  private loop: number | null = null;
  private delay: number;
  private delayTimer: number | null = null;
  private charNodes: CharNode[] = [];
  private type: TyperType = "initial";
  private divisor: number;
  private denominator: number;
  private variations: string[];
  private initVisible: boolean;

  constructor(element: HTMLElement, opts: TyperOptions = {}) {
    this.element = element;
    this.originalContent = element.innerHTML;
    this.source = element.textContent || "";
    this.length = this.source.replace(/\s/g, "").length;
    this.fps = opts.fps ?? 20;
    this.cycles = opts.cycles ?? 3;
    this.cycleLength = opts.cycleLength ?? 0.5;
    // total frames scales a little with word length so long lines don't feel rushed.
    this.frames = this.length ? this.fps * (1 + this.length * 0.01) : 0;
    this.delay = opts.delay ?? 0;
    this.divisor = this.length > 1 ? this.length - 1 : 1;
    this.denominator = this.frames - this.frames * this.cycleLength || 1;

    this.variations = (opts.variations ?? [...ALL_VARIATIONS]).slice();
    this.shuffle();
    this.initVisible = opts.initVisible ?? false;

    if (this.length) {
      this.build();
      if (this.initVisible) {
        this.charNodes.forEach((n) => this.setClass(n, "char"));
        this.type = "done";
        this.element.dataset.typerType = "done";
      } else {
        this.applyFrame();
        this.element.dataset.typerType = "initial";
      }
    }
  }

  // split into words (preserving whitespace nodes) and wrap each char in a span.
  // Each char gets a bezier-eased control point from its position in the word.
  private build() {
    this.element.innerHTML = "";
    this.charNodes = [];
    const parts = this.source.split(/(\s+)/);
    let i = 0;
    for (const part of parts) {
      if (part.trim() === "") {
        this.element.append(document.createTextNode(part));
        continue;
      }
      const word = document.createElement("span");
      word.className = "word";
      for (const ch of part.split("")) {
        const pos = i / this.divisor;
        // ease the control point so chars near the start reveal sooner, with a
        // smooth ramp; quantize to 0.05 so states hold for a beat.
        const cp = roundToStep(bezierEase(pos, 0, 0.75, 0.75, 0), 0.05);
        const span = document.createElement("span");
        span.className = "char charInit";
        span.textContent = ch || " ";
        this.charNodes.push({ el: span, cp, currentClass: "char charInit" });
        i += 1;
        word.appendChild(span);
      }
      this.element.appendChild(word);
    }
  }

  // swap this typer to new text and rebuild (used by the "type your own" control).
  reset(text: string) {
    this.stopLoop();
    this.source = text;
    this.length = text.replace(/\s/g, "").length;
    this.divisor = this.length > 1 ? this.length - 1 : 1;
    this.frames = this.length ? this.fps * (1 + this.length * 0.01) : 0;
    this.denominator = this.frames - this.frames * this.cycleLength || 1;
    this.frame = 0;
    this.type = "initial";
    this.build();
    this.applyFrame();
    this.element.dataset.typerType = "initial";
  }

  in() {
    this.setType("in");
  }
  out() {
    this.setType("out");
  }
  inOut() {
    this.setType("inout");
  }

  private setType(t: TyperType) {
    if (t === this.type && t !== "inout") return;
    this.type = t;
    this.element.dataset.typerType = t;
    this.stopLoop();
    this.frame = 0;
    this.applyFrame();
    if (t !== "initial" && this.charNodes.length) this.startLoop();
  }

  private startLoop() {
    if (this.loop || this.delayTimer || !this.charNodes.length) return;
    if (this.type === "initial") return;
    this.shuffle();
    const begin = () => {
      this.delayTimer = null;
      if (this.loop || this.type === "initial") return;
      this.applyFrame();
      this.loop = window.setInterval(() => this.tick(), 1000 / this.fps);
    };
    if (this.delay > 0) {
      this.delayTimer = window.setTimeout(begin, this.delay * 1000);
    } else {
      begin();
    }
  }

  private stopLoop() {
    if (this.delayTimer) {
      window.clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
    if (this.loop) {
      window.clearInterval(this.loop);
      this.loop = null;
    }
  }

  private tick() {
    // inout runs the in phase then the out phase back to back (2x the frames).
    const total = this.type === "inout" ? this.frames * 2 : this.frames;
    this.frame += 1;
    this.frame = clamp(this.frame, 0, total);
    this.applyFrame();
    if (this.frame >= total) {
      this.stopLoop();
      this.type = "done";
      this.element.dataset.typerType = "done";
    }
  }

  // paint every char's class for the current frame.
  private applyFrame() {
    if (!this.length || !this.charNodes.length) return;
    if (this.type === "initial") {
      this.charNodes.forEach((n) => this.setClass(n, "char charInit"));
      return;
    }
    // in the inout case, the second half is the "out" phase.
    const phase =
      this.type === "inout" && this.frame > this.frames
        ? "out"
        : this.type === "inout"
          ? "in"
          : this.type;
    const progress =
      (this.type === "inout" && phase === "out"
        ? this.frame - this.frames
        : this.frame) / this.denominator;

    for (const node of this.charNodes) {
      // this char's local progress = global progress minus its control-point offset.
      let p = progress - node.cp;
      p = roundToStep(p, 0.1);
      p = clamp(p, 0, 1);

      // pick a state: while mid-reveal, roll through the shuffled pool by cycle.
      let variation = "charInit";
      if (p > 0) {
        const idx = Math.round(remap(p, 0, 1, 0, this.cycles));
        variation = this.variations[idx % this.variations.length];
      }
      if (p >= 1) variation = ""; // settled → plain char
      const midClass = variation ? `char ${variation}` : "char";

      // "in" ramps charInit → states → plain; "out" runs it in reverse.
      let cls: string;
      if (phase === "in") {
        cls = p <= 0 ? "char charInit" : p >= 1 ? "char" : midClass;
      } else {
        cls = p <= 0 ? "char" : p >= 1 ? "char charInit" : midClass;
      }
      this.setClass(node, cls);
    }
  }

  private setClass(node: CharNode, cls: string) {
    if (cls === node.currentClass) return;
    node.currentClass = cls;
    node.el.className = cls;
  }

  private shuffle() {
    this.variations.sort(() => 0.5 - Math.random());
  }

  destroy() {
    this.stopLoop();
    this.element.innerHTML = this.originalContent;
    delete this.element.dataset.typerType;
  }
}

// Runs several typers together with a per-line stagger, so a stacked block cascades
// in top-to-bottom. Each line's `delay` offsets when its reveal starts.
export class TyperGroup {
  private typers: Typer[] = [];

  constructor(
    elements: HTMLElement[],
    opts: Omit<TyperOptions, "delay"> = {},
    stagger = 0.15, // seconds between consecutive lines
  ) {
    this.typers = elements.map(
      (el, i) => new Typer(el, { ...opts, delay: i * stagger }),
    );
  }

  in() {
    this.typers.forEach((t) => t.in());
  }
  out() {
    this.typers.forEach((t) => t.out());
  }
  destroy() {
    this.typers.forEach((t) => t.destroy());
  }
}

```

### typer/standalone/typer.css
```css
/* Typer — the styling for the character reveal. The engine (typer.ts) swaps each
   char's class between these states; the CSS is what makes a state look like a
   solid pill, an outlined pill, an accent block, and so on. The nicest trick is
   pill-merging: adjacent same-state chars round only at the two outer ends, so a
   run of them reads as one continuous rounded bar, not separate boxes.

   Everything is themed from four custom properties, so a preset can recolor the
   text, the pill fills, AND the borders all at once:
     --typer-fg          the base ink (plain letters, ink pills, ink borders)
     --typer-bg          the page / knockout color inside a filled pill
     --typer-accent      the accent surface (accent pill fills, accent borders)
     --typer-accent-ink  the text color that sits ON an accent fill
   Set them on the [data-typer] element or any ancestor. */

[data-typer] {
  --typer-fg: #1b1b1b;
  --typer-bg: #fcfcfc;
  --typer-accent: #12a150;
  --typer-accent-ink: #fcfcfc;
  --typer-radius: 5px;
}

/* before the reveal runs, the whole line is invisible (chars are charInit). */
[data-typer][data-typer-type="initial"] {
  opacity: 0;
}

[data-typer] .word {
  white-space: pre; /* keep intra-word spacing exact */
}

[data-typer] .word .char {
  box-sizing: content-box;
  display: inline-block;
  color: var(--typer-fg);
  background: transparent;
  transition: none; /* state changes are discrete frames, not tweened */
}

/* not yet revealed → transparent (holds the layout, shows nothing). */
[data-typer] .word .char.charInit {
  color: transparent;
}

/* ── Solid pill: ink block, knockout text. Adjacent fills merge into one bar. ── */
[data-typer] .word .char.charFill {
  color: var(--typer-bg);
  background: var(--typer-fg);
  border-radius: var(--typer-radius);
}
[data-typer] .word .char.charFill:has(+ .charFill) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[data-typer] .word .char.charFill + .charFill {
  border-radius: 0;
}
[data-typer] .word .char.charFill + .charFill:last-child,
[data-typer] .word .char.charFill + .charFill:has(+ :not(.charFill)) {
  border-radius: 0 var(--typer-radius) var(--typer-radius) 0;
}

/* ── Inverse: ink knockout, no rounding (a hard block). ── */
[data-typer] .word .char.charInverse {
  color: var(--typer-bg);
  background: var(--typer-fg);
}

/* ── Accent: colored LETTERS on the page (no pill) — the accent reaching the
      text itself, not just a fill. ── */
[data-typer] .word .char.charAccent {
  color: var(--typer-accent);
  background: transparent;
}

/* ── Accent inverse: an accent PILL with knockout text sitting on it. Merges into
      a bar like the ink fill. ── */
[data-typer] .word .char.charAccentInverse {
  color: var(--typer-accent-ink);
  background: var(--typer-accent);
  border-radius: var(--typer-radius);
}
[data-typer] .word .char.charAccentInverse:has(+ .charAccentInverse) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[data-typer] .word .char.charAccentInverse + .charAccentInverse {
  border-radius: 0;
}
[data-typer] .word .char.charAccentInverse + .charAccentInverse:last-child,
[data-typer]
  .word
  .char.charAccentInverse
  + .charAccentInverse:has(+ :not(.charAccentInverse)) {
  border-radius: 0 var(--typer-radius) var(--typer-radius) 0;
}

/* ── Accent fill: a briefly solid block of pure accent (both fill and text). ── */
[data-typer] .word .char.charAccentFill {
  color: var(--typer-accent);
  background: var(--typer-accent);
}

/* ── Outlined pill: an ACCENT border box around ink text; a run merges like the
      solid pill, but by dropping the inner vertical borders instead of the fill. ── */
[data-typer] .word .char.charBorder {
  position: relative;
  color: var(--typer-fg);
}
[data-typer] .word .char.charBorder::after {
  content: "";
  display: inline-block;
  position: absolute;
  inset: 0;
  border: 1px solid var(--typer-accent);
  border-radius: var(--typer-radius);
}
[data-typer] .word .char.charBorder:has(+ .charBorder)::after {
  border-right: 1px solid transparent;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[data-typer] .word .char.charBorder + .charBorder::after {
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-radius: 0;
}
[data-typer] .word .char.charBorder + .charBorder:last-child::after,
[data-typer] .word .char.charBorder + .charBorder:has(+ :not(.charBorder))::after {
  border-left: 1px solid transparent;
  border-right: 1px solid var(--typer-accent);
  border-radius: 0 var(--typer-radius) var(--typer-radius) 0;
}

@media (prefers-reduced-motion: reduce) {
  /* no reveal animation: show the text plainly. */
  [data-typer][data-typer-type="initial"] {
    opacity: 1;
  }
  [data-typer] .word .char.charInit {
    color: var(--typer-fg);
  }
}

```

### typer/standalone/typer.html
```html
<!-- Typer — a stacked block of lines that reveal character by character, each glyph
     rippling through randomized pill/highlight/border states before it settles.
     Load typer.css, put one [data-typer] element per line, then drive them with a
     TyperGroup (from typer.ts) for the top-to-bottom cascade.

     Colors are three custom properties (set them on any ancestor):
       --typer-fg  ink/pill · --typer-bg  page/knockout · --typer-accent  highlight -->

<link rel="stylesheet" href="typer.css" />

<div class="typer-block" style="display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;font-weight:600;font-size:clamp(1.4rem,4vw,2.4rem)">
  <span data-typer data-typer-type="initial">design engineered by me :)</span>
</div>

<!-- typer.ts is an ES module. Instantiate a TyperGroup over the lines and reveal
     them; the group staggers each line so the block cascades in top-to-bottom. -->
<script type="module">
  import { TyperGroup } from "./typer.js"; // built from typer.ts

  const lines = [...document.querySelectorAll("[data-typer]")];
  const group = new TyperGroup(
    lines,
    { fps: 20, cycles: 3 }, // tune speed and how many states each char rolls through
    0.15, // seconds of stagger between consecutive lines
  );

  // reveal once the block scrolls into view
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      group.in();
      io.disconnect();
    }
  }, { threshold: 0.4 });
  io.observe(document.querySelector(".typer-block"));
</script>

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"The typer\",\"url\":\"https://arlan.me/vault/typer\",\"image\":\"/vault/typer.svg\",\"datePublished\":\"Jul 7, 2026\",\"about\":\"Study\",\"keywords\":\"CSS, Text, Animation\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"The typer\",\"item\":\"https://arlan.me/vault/typer\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"The typer"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[42538]}],"$L24"],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Most headlines fade in. The nice ones type in. A wave runs across the line, and as it passes each letter the letter flickers through a few states, a solid pill, a highlight, an outlined pill, then lands on plain text. Letters next to each other in the same state merge into one long rounded bar."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Below you can type your own text and change the color, the speed, and which states are in the mix. The colors are three variables, so it drops onto any theme."}]]}]]}],["$","$L25",null,{"children":[["$","$L26",null,{"playground":"typer"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L27",null,{"text":"$28","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L29"]}],"$L2a","$L2b"]}]]}],"$L2c"]}]]}]
