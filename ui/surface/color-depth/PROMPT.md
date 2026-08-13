<!-- Verbatim "Copy prompt" payload from color-depth; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "The art of color depth".

What it is:
- Buttons that feel like real objects, glossy glass or brushed metal or a soft cushion. They look expensive and slow to make. They are neither.
- The depth is just layers stacked on one button: a gradient body, inset shadows for the bevel and glow, a brighter layer that fades in on hover, and a soft bar of light along the top. Below is one button built ten different ways, by technique, not by color. Switch and grab the CSS you want.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### color-depth/standalone/color-depth.css
```css
/* The Art of Color Depth — button depth by technique, not by color.
 *
 * Six ways to give a flat button real depth. Each is a different METHOD; the
 * colors are just variables you swap. Every recipe styles the same markup:
 *
 *   <button class="depth-btn depth-<type>">
 *     <span class="depth-label">Get Started</span>
 *   </button>
 *
 * The depth never comes from one drop shadow. It is layers stacked on the same
 * element: a base gradient (the body), inset shadows (the bevel and inner glow),
 * a ::before that fades in on hover (the light turning on), and often a ::after
 * highlight (the specular sheen). Copy the shared base plus the one type you want.
 */

/* ── shared base (same for every type) ─────────────────────────────────────── */
.depth-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 999px;
  font: 500 15px/1 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  letter-spacing: 0.01em;
  color: #fff;
  cursor: pointer;
  isolation: isolate; /* keep the ::before/::after layers under the label */
  overflow: hidden; /* clip every decoration layer to the pill */
  -webkit-tap-highlight-color: transparent;
  /* No scale/lift on the button itself — each material animates only its own
     look (a glint, a glow) on hover/press, nothing generic. */
  transition:
    filter 0.2s ease,
    box-shadow 0.2s ease;
}
.depth-label {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
}
/* icon variant: a square button (same material, different silhouette) */
.depth-btn.depth-icon {
  width: 44px;
  padding: 0;
  border-radius: 14px;
}

/* ── Toggle switch: the material is the TRACK; a solid knob slides on top ───── */
.depth-btn.depth-toggle {
  width: 76px;
  padding: 0;
  cursor: pointer;
}
/* the knob — a smaller, textured circle that rides above the material and glides.
   Texture: a soft top highlight + a faint bottom shade baked into the background,
   plus a hairline rim, so it reads as a rounded physical dot, not a flat disc. */
.depth-knob {
  position: absolute;
  z-index: 3;
  top: 7px;
  left: 7px;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background:
    radial-gradient(120% 120% at 50% 22%, rgba(255, 255, 255, var(--knob-hi, 0.55)), rgba(255, 255, 255, 0) 55%),
    radial-gradient(120% 120% at 50% 100%, rgba(0, 0, 0, var(--knob-lo, 0.22)), rgba(0, 0, 0, 0) 55%),
    var(--knob, #ffffff);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.35),
    0 2px 5px rgba(0, 0, 0, 0.22),
    inset 0 1px 1px rgba(255, 255, 255, var(--knob-hi, 0.5)),
    inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.depth-toggle[data-on="true"] .depth-knob {
  transform: translateX(32px);
}
/* off state reads a little dimmer, so "on" is clearly the lit one */
.depth-toggle[data-on="false"] {
  filter: saturate(0.6) brightness(0.94);
}
/* per-material knob colour: dark knob on the pale materials, white elsewhere.
   Dark knobs get much softer texture (the highlight/shade would read as heavy
   gloss on a near-black circle). */
.depth-inset,
.depth-satin,
.depth-metal,
.depth-glass {
  --knob: #2a2f3a;
  --knob-hi: 0.14;
  --knob-lo: 0.08;
}
.depth-btn::before,
.depth-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 1;
  pointer-events: none;
}
/* ::before defaults to visible now; materials that want it hidden set opacity:0
   themselves. (No generic white sheen-fade on hover.) */

/* ── Glossy — a specular highlight bar over a gradient body ──────────────────
   The classic app-button look. A bright-to-dark gradient body, faint inner rim
   light, a dark inset at the bottom for weight, and a blurred white bar that
   overhangs the top edge like studio lighting on plastic. */
.depth-glossy {
  overflow: hidden; /* clip the highlight bar to the pill */
  background: linear-gradient(180deg, #ffb347 0%, #e06c1f 100%);
  box-shadow:
    inset 0 -1px 4.1px 0.5px rgba(255, 224, 160, 0.55),
    inset 0 0 4px 0 rgb(255, 234, 200),
    inset 0 -36px 14.2px -28px rgba(180, 80, 20, 0.5),
    0 3px 8px rgba(200, 96, 30, 0.35);
  text-shadow: 0 1px 2px rgba(90, 40, 0, 0.5);
}
.depth-glossy::after {
  content: "";
  position: absolute;
  left: 10px;
  right: 10px;
  top: -5px;
  height: 28px;
  border-radius: 500px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0), #fff);
  filter: blur(1px);
  opacity: 0.7;
  transition: opacity 0.3s ease, top 0.3s ease;
  z-index: 1;
}
.depth-glossy:hover::after {
  opacity: 0.9;
  top: -3px;
}

/* ── Glow — a solid body lit from inside, hover turns the light up ───────────
   No specular. The depth is an internal glow: a dark-to-bright gradient with
   inset color glows, and a ::before that swaps to a brighter gradient with crisp
   light along the lower inner edge — the button appears to power on. */
.depth-glow {
  color: #fdeaff;
  text-shadow: 0 1px 2px rgba(40, 0, 48, 0.55);
  background: linear-gradient(180deg, #2a0a45 0%, #a01fd0 100%);
  box-shadow:
    inset 0 -1.5px 2px 0 #d67bff,
    inset 0 0 10px 0 #b01ffb,
    inset 0 0 8px 0 #b01ffb,
    0 2px 6px rgba(140, 20, 200, 0.35);
}
/* the brighter "light on" layer: hidden at rest, fades in on hover */
.depth-glow::before {
  opacity: 0;
  transition: opacity 0.2s ease;
  background: linear-gradient(180deg, #45108a 9%, #c31ffb 100%);
  box-shadow:
    inset 0 -0.5px 1px 0 #ff8cf0,
    inset 0 -1px 3px 0 #ff8cf0,
    inset 0 -1.5px 5px 0 #ff9ce8,
    inset 0 0 12px 0 #d155ff,
    inset 0 0 10px 0 #d155ff;
}
.depth-glow:hover::before {
  opacity: 1;
}

/* ── Metal — brushed surface with a bevel and a sheen that follows the cursor ─
   A cool vertical gradient with a bright top bevel and dark bottom bevel, a
   faint vertical "brushing", and a diagonal specular streak (::after) whose
   position tracks --pointer-x (a driver updates it while hovering; it rests in
   the centre). The glint slides to wherever the light "hits" as you move. */
.depth-metal {
  --pointer-x: 50%; /* driven by JS on hover; falls back to centre */
  color: #1c2230;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.55);
  overflow: hidden;
  background:
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 0px,
      rgba(0, 0, 0, 0.04) 1px,
      rgba(255, 255, 255, 0.05) 2px
    ),
    linear-gradient(180deg, #f4f6f9 0%, #c3cad6 48%, #aab2c0 52%, #d3d9e2 100%);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 1px 0 rgba(30, 38, 56, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25),
    0 3px 8px rgba(30, 38, 56, 0.28);
}
/* the moving glint: a soft band positioned at the cursor's x (smoothed in CSS) */
.depth-metal::after {
  opacity: 0.85;
  background: radial-gradient(
    120% 140% at var(--pointer-x, 50%) -20%,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(255, 255, 255, 0.25) 18%,
    rgba(255, 255, 255, 0) 42%
  );
  transition: opacity 0.3s ease, background 0.12s linear;
}
.depth-metal:hover::after {
  opacity: 1;
}

/* ── Layered — depth from soft translucent overlays over any fill ────────────
   No baked colours: a translucent black base plus faint layers, so it adds depth
   to a button of ANY fill. Kept smooth — one gentle top→bottom dome on the body,
   a soft top sheen (::before, fades on press), and a clean even hairline rim
   (::after). Nothing heavy or uneven. */
.depth-layered {
  overflow: hidden;
  /* One smooth translucent body — no heavy center-shade. A single gentle
     top-to-bottom lightening does the doming, so it reads clean over any fill. */
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 40%,
      rgba(0, 0, 0, 0.12) 100%
    ),
    rgba(0, 0, 0, 0.55);
}
/* layer 1 — a soft top sheen (fades in on hover, off on press) */
.depth-layered::before {
  opacity: 0.1;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 60%);
  transition: opacity 0.2s ease;
}
.depth-layered:hover::before {
  opacity: 0.15;
}
.depth-layered:active::before {
  opacity: 0;
  transition-duration: 0.05s;
}
/* layer 2 — a clean, even hairline rim (soft, not the uneven white/grey band) */
.depth-layered::after {
  opacity: 1;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.14);
}

/* ── Inset — carved INTO the surface (the only recessed one) ─────────────────
   Unlike every other type (which sit ON the page), this one reads as a hole cut
   into it. The trick: the fill is NEARLY the page colour, so it looks like the
   same surface pushed inward — then a hard dark shadow along the TOP inner edge
   (the near wall the light can't reach) and a bright highlight along the BOTTOM
   inner edge + a 1px light lip just BELOW the button (the far rim catching light).
   No outer drop shadow (recessed things don't float). Tuned for a light page. */
.depth-inset {
  color: #5b6473;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
  background: linear-gradient(180deg, #dfe3ea 0%, #eef1f6 100%);
  box-shadow:
    inset 0 3px 4px -1px rgba(60, 70, 90, 0.5),
    inset 0 6px 10px -6px rgba(60, 70, 90, 0.45),
    inset 0 -2px 2px -1px rgba(255, 255, 255, 0.95),
    inset 0 0 0 1px rgba(60, 70, 90, 0.12),
    0 1px 0 0 rgba(255, 255, 255, 0.9); /* the lit far lip below the cut */
}
.depth-inset:hover {
  transform: none; /* recessed things don't lift */
  box-shadow:
    inset 0 4px 6px -1px rgba(60, 70, 90, 0.58),
    inset 0 8px 12px -6px rgba(60, 70, 90, 0.5),
    inset 0 -2px 2px -1px rgba(255, 255, 255, 1),
    inset 0 0 0 1px rgba(60, 70, 90, 0.16),
    0 1px 0 0 rgba(255, 255, 255, 0.9);
}
.depth-inset:active {
  /* press flattens the depth — the cut shallows */
  box-shadow:
    inset 0 1px 2px 0 rgba(60, 70, 90, 0.4),
    inset 0 0 0 1px rgba(60, 70, 90, 0.12);
}

/* ── Glass — real refraction through an SVG displacement filter ──────────────
   The background is bent through the button, not just blurred. A tiny SVG filter
   (feImage of a red/blue gradient map -> three per-channel feDisplacementMaps ->
   blended) refracts what is behind it, then we stack glass highlights on top: a
   gradient border ring (::before), an inner diagonal shine (::after), a top edge
   light line, and a layered outer glow. Needs the <svg id="liquid-glass-filter">
   present in the document (see color-depth.html). Put it over something colorful.
   Falls back to a plain blur where url() backdrop filters aren't supported. */
.depth-glass {
  /* white text reads on the (often busy/photo) background behind the glass */
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.12) 100%
  );
  -webkit-backdrop-filter: blur(2px) saturate(1.5) brightness(1.05);
  backdrop-filter: blur(2px) saturate(1.5) brightness(1.05);
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.18),
    0 4px 24px rgba(0, 0, 0, 0.06),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
}
@supports (backdrop-filter: url(#liquid-glass-filter)) or
  (-webkit-backdrop-filter: url(#liquid-glass-filter)) {
  .depth-glass {
    -webkit-backdrop-filter: url(#liquid-glass-filter) saturate(1.5) brightness(1.05);
    backdrop-filter: url(#liquid-glass-filter) saturate(1.5) brightness(1.05);
  }
}
.depth-glass::before {
  opacity: 1;
  padding: 1px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.1) 45%,
    transparent 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.depth-glass::after {
  opacity: 0.8;
  inset: 2px;
  border-radius: inherit;
  background:
    linear-gradient(to right, transparent 10%, rgba(255, 255, 255, 0.6) 50%, transparent 90%)
      top / 100% 1px no-repeat,
    linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%);
}
.depth-glass:hover {
  box-shadow:
    0 12px 40px rgba(31, 38, 135, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25),
    0 6px 30px rgba(0, 0, 0, 0.08),
    inset 0 2px 2px rgba(255, 255, 255, 0.5);
}

/* ── Foil — iridescent metal that reacts to the cursor ───────────────────────
   The richest one: a silver metal base with a holographic rainbow that shifts,
   soft coloured "film" blobs, a pearly sheen, a moving shine band and a glare
   dot at the cursor. Built from stacked CHILD layers (not just pseudo-elements)
   because it needs five. A tiny JS driver feeds --pointer-x/y, --glare-x/y,
   --foil-shift and --shine-angle while hovering; without JS it still shows a
   handsome static foil. Markup:
     <button class="depth-btn depth-foil">
       <span class="depth-foil-l depth-foil-base"></span>
       <span class="depth-foil-l depth-foil-film"></span>
       <span class="depth-foil-l depth-foil-pearl"></span>
       <span class="depth-label">Get Started</span>
       <span class="depth-foil-l depth-foil-shine"></span>
       <span class="depth-foil-l depth-foil-glare"></span>
     </button>  */
.depth-foil {
  --foil-shift: 0%;
  --glare-x: 50%;
  --glare-y: 50%;
  --pointer-x: 50%;
  --pointer-y: 50%;
  --shine-angle: 135deg;
  color: #14202e;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  overflow: hidden;
  background: linear-gradient(135deg, #eee 0%, #dcdcdc 40%, #c9c9c9 72%, #e8e8e8 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.7),
    inset 0 -2px 4px rgba(60, 70, 90, 0.3),
    0 3px 10px rgba(30, 38, 56, 0.3);
}
.depth-foil-l {
  position: absolute;
  inset: -48%;
  z-index: 1;
  background-repeat: no-repeat;
  pointer-events: none;
}
/* the rainbow band over silver — visible at rest, and it drifts on its own so
   the foil shimmers without the cursor. The JS driver nudges --foil-shift on
   hover, which composes on top of the ambient drift via translateX. */
.depth-foil-base {
  background: linear-gradient(
    112deg,
    transparent 22%,
    rgba(0, 220, 255, 0.4) 30%,
    rgba(80, 255, 190, 0.34) 36%,
    rgba(190, 255, 80, 0.26) 41%,
    rgba(255, 230, 70, 0.24) 47%,
    rgba(255, 70, 180, 0.36) 55%,
    rgba(150, 90, 255, 0.36) 63%,
    rgba(60, 120, 255, 0.3) 70%,
    transparent 80%
  );
  background-size: 240% 100%;
  filter: saturate(1.3) contrast(1.25);
  /* Ambient drift ONLY (background-position). The pointer does NOT move this
     layer — that's what made it jump/lose state on hover. The rainbow just
     glides on its own; the cursor drives the highlight layers below instead. */
  animation: depth-foil-drift 7s ease-in-out infinite alternate;
}
/* soft coloured film blobs — also visible at rest, gently breathing */
.depth-foil-film {
  background:
    radial-gradient(ellipse at 20% 30%, rgba(255, 70, 180, 0.34) 0%, transparent 48%),
    radial-gradient(ellipse at 70% 20%, rgba(0, 220, 255, 0.34) 0%, transparent 52%),
    radial-gradient(ellipse at 78% 74%, rgba(80, 255, 190, 0.34) 0%, transparent 56%);
  background-size: 150% 150%, 160% 160%, 145% 145%;
  filter: blur(0.4px) saturate(1.4);
  mix-blend-mode: screen;
  opacity: 0.7;
  animation: depth-foil-drift 9s ease-in-out infinite alternate-reverse;
}
@keyframes depth-foil-drift {
  from {
    background-position: 0% center;
  }
  to {
    background-position: 100% center;
  }
}
@media (prefers-reduced-motion: reduce) {
  .depth-foil-base,
  .depth-foil-film {
    animation: none;
  }
}
/* pearly sheen — a soft moving highlight that tracks the cursor smoothly */
.depth-foil-pearl {
  z-index: 2;
  inset: 0; /* keep it on-box so its position math is stable, no jump */
  background: radial-gradient(
    120% 120% at var(--glare-x, 50%) var(--glare-y, 50%),
    rgba(230, 238, 245, 0.6) 0%,
    rgba(205, 217, 226, 0.2) 26%,
    transparent 58%
  );
  mix-blend-mode: soft-light;
  opacity: 0.95;
  transition: background 0.12s linear; /* smooth the cursor tracking */
}
/* the travelling shine band, angled by the cursor */
.depth-foil-shine {
  z-index: 4;
  inset: 0;
  background: linear-gradient(
    var(--shine-angle, 120deg),
    transparent 30%,
    rgba(226, 235, 242, 0.5) 48%,
    rgba(0, 124, 255, 0.1) 58%,
    rgba(255, 0, 147, 0.1) 66%,
    transparent 82%
  );
  background-size: 200% 100%;
  background-position: calc(var(--pointer-x, 50%)) center;
  filter: blur(0.25px);
  mix-blend-mode: screen;
  opacity: 0.6;
  transition: background-position 0.12s linear;
}
/* a bright glare dot right under the cursor */
.depth-foil-glare {
  z-index: 5;
  inset: 0;
  background: radial-gradient(
    circle at var(--glare-x, 50%) var(--glare-y, 50%),
    rgba(230, 238, 245, 0.55) 0%,
    rgba(205, 218, 228, 0.16) 10%,
    transparent 38%
  );
  mix-blend-mode: screen;
  opacity: 0.5;
  transition: background 0.12s linear;
}
@media (prefers-reduced-motion: reduce) {
  .depth-foil-l {
    transition: none;
  }
}

/* ── Neon — a crisp lit outline (a clean line, not a bloom) ──────────────────
   Restrained on purpose: the depth is one precise bright RING drawn as a solid
   line, with only a whisper of glow so it reads as a lit tube, not a shadow
   storm. A very slight inner tint from the bottom grounds the body. Hover firms
   the line and adds the faintest bloom. Refined, "in line", not shadowy. */
.depth-neon {
  --neon: #35f0ff;
  color: #eafeff;
  background:
    linear-gradient(180deg, rgba(53, 240, 255, 0) 55%, color-mix(in srgb, var(--neon) 12%, transparent) 100%),
    #0b1016;
  text-shadow: 0 0 5px color-mix(in srgb, var(--neon) 55%, transparent);
}
/* the ring: a clean 1px line with only the faintest inner glow — no outer bloom */
.depth-neon::before {
  opacity: 1;
  box-shadow:
    inset 0 0 0 1px var(--neon),
    inset 0 0 2px 0 color-mix(in srgb, var(--neon) 45%, transparent);
  transition: box-shadow 0.25s ease;
}
.depth-neon:hover::before {
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--neon) 55%, #fff),
    inset 0 0 4px 0 color-mix(in srgb, var(--neon) 60%, transparent),
    0 0 4px -2px color-mix(in srgb, var(--neon) 50%, transparent);
}

/* ── Duotone — a hard-bevel extruded key (crisp, not soft) ───────────────────
   No blur in the depth: a bright top FACE gradient, then a solid darker "side"
   under it built from stacked 1px box-shadows (the extrusion), so it looks like
   a chunky moulded plastic key. Pressing pushes it down onto its own side. */
.depth-duotone {
  background: linear-gradient(180deg, #ff8a4b 0%, #f2612f 100%);
  color: #fff;
  text-shadow: 0 1px 0 rgba(140, 50, 10, 0.6);
  box-shadow:
    inset 0 1px 0 rgba(255, 220, 190, 0.9),
    /* the extruded side: stacked hard shadows in the darker tone */
    0 1px 0 #c9481c,
    0 2px 0 #c9481c,
    0 3px 0 #b23f18,
    0 4px 0 #b23f18,
    0 5px 0 #9c3714,
    0 6px 0 #9c3714,
    0 8px 8px rgba(120, 40, 10, 0.35);
  transition:
    transform 0.12s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.12s ease;
}
.depth-duotone:hover {
  transform: translateY(-1px);
}
.depth-duotone:active {
  /* slam down onto the extrusion */
  transform: translateY(5px);
  box-shadow:
    inset 0 1px 0 rgba(255, 220, 190, 0.9),
    0 1px 0 #b23f18,
    0 2px 4px rgba(120, 40, 10, 0.35);
}

/* ── Satin — a single flat colour with the softest possible dome ─────────────
   Deliberately the OPPOSITE of Glossy: no gradient body, no specular, no top
   light bar. One solid pastel, and the only depth is a very soft radial vignette
   baked into the background (brighter centre, a hair darker at the rim) plus a
   whisper-thin inner ring. Nothing hard anywhere — pure smooth matte. */
.depth-satin {
  color: #6a4a86;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
  background:
    radial-gradient(
      120% 140% at 50% 38%,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0) 55%
    ),
    radial-gradient(
      130% 130% at 50% 100%,
      rgba(150, 120, 200, 0.22) 0%,
      rgba(150, 120, 200, 0) 60%
    ),
    #e7dcfb;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.45),
    0 6px 18px -6px rgba(160, 130, 210, 0.4);
  transition:
    filter 0.25s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.depth-satin:hover {
  filter: brightness(1.03);
}
.depth-satin:active {
  box-shadow:
    inset 0 2px 6px 0 rgba(150, 120, 200, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}

```

### color-depth/standalone/color-depth.html
```html
<!-- The Art of Color Depth — markup for the ten button materials + three shapes.
     Load color-depth.css, then use `depth-btn` plus one material class. The markup
     is identical for every material; only the second class changes.

     Pure CSS gets you every static look. Two things want the small companion
     script (color-depth.js): the cursor-reactive materials (Metal, Foil) and the
     toggle's slide. Glass also needs the SVG filter at the bottom, once. -->

<link rel="stylesheet" href="color-depth.css" />

<!-- the ten materials, on the default label pill -->
<button class="depth-btn depth-glossy"><span class="depth-label">Get Started</span></button>
<button class="depth-btn depth-glow"><span class="depth-label">Get Started</span></button>
<button class="depth-btn depth-metal"><span class="depth-label">Get Started</span></button>
<button class="depth-btn depth-layered"><span class="depth-label">Get Started</span></button>
<button class="depth-btn depth-inset"><span class="depth-label">Get Started</span></button>
<button class="depth-btn depth-glass"><span class="depth-label">Get Started</span></button>
<button class="depth-btn depth-neon"><span class="depth-label">Get Started</span></button>
<button class="depth-btn depth-duotone"><span class="depth-label">Get Started</span></button>
<button class="depth-btn depth-satin"><span class="depth-label">Get Started</span></button>

<!-- Foil needs its five stacked layers around the label. Without the script it
     is still a handsome static holographic silver; with it, it tracks the cursor. -->
<button class="depth-btn depth-foil">
  <span aria-hidden class="depth-foil-l depth-foil-base"></span>
  <span aria-hidden class="depth-foil-l depth-foil-film"></span>
  <span aria-hidden class="depth-foil-l depth-foil-pearl"></span>
  <span class="depth-label">Get Started</span>
  <span aria-hidden class="depth-foil-l depth-foil-shine"></span>
  <span aria-hidden class="depth-foil-l depth-foil-glare"></span>
</button>

<!-- other shapes, same material class. Icon button (a square) -->
<button class="depth-btn depth-icon depth-glossy" aria-label="Go">
  <span class="depth-label">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
  </span>
</button>

<!-- Toggle switch: material on the track, a sliding knob on top. The script flips
     data-on on click; start it on or off with the attribute. -->
<button class="depth-btn depth-toggle depth-glossy" role="switch" data-on="true" aria-label="Toggle">
  <span aria-hidden class="depth-knob"></span>
</button>

<!-- Glass refraction filter. Keep it once in the page (it can be visually
     hidden). The .depth-glass rule points at it via backdrop-filter: url(#…). -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <filter id="liquid-glass-filter" color-interpolation-filters="sRGB">
      <!-- map: neutral-grey centre (no shift) ramping to colour only at the rim,
           so glass bends the view at its edges and passes the centre through. -->
      <feImage x="0" y="0" width="100%" height="100%"
        href="data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%2080%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27r%27%20x2%3D%27100%25%27%3E%3Cstop%20stop-color%3D%27%23f00%27%2F%3E%3Cstop%20offset%3D%2750%25%27%20stop-color%3D%27%23808080%27%2F%3E%3Cstop%20offset%3D%27100%25%27%20stop-color%3D%27%230f0%27%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%27b%27%20y2%3D%27100%25%27%3E%3Cstop%20stop-color%3D%27%2300f%27%2F%3E%3Cstop%20offset%3D%2750%25%27%20stop-color%3D%27%23808080%27%2F%3E%3Cstop%20offset%3D%27100%25%27%20stop-color%3D%27%23ff0%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%27200%27%20height%3D%2780%27%20rx%3D%2740%27%20fill%3D%27url%28%23r%29%27%2F%3E%3Crect%20width%3D%27200%27%20height%3D%2780%27%20rx%3D%2740%27%20fill%3D%27url%28%23b%29%27%20style%3D%27mix-blend-mode%3Aoverlay%27%2F%3E%3Crect%20x%3D%2714%27%20y%3D%2714%27%20width%3D%27172%27%20height%3D%2752%27%20rx%3D%2726%27%20fill%3D%27%23808080%27%20style%3D%27filter%3Ablur%2814px%29%27%2F%3E%3C%2Fsvg%3E"
        result="map" />
      <feDisplacementMap in="SourceGraphic" in2="map" scale="-14" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
      <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
      <feDisplacementMap in="SourceGraphic" in2="map" scale="-13" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
      <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
      <feDisplacementMap in="SourceGraphic" in2="map" scale="-12" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
      <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
      <feBlend in="red" in2="green" mode="screen" result="rg" />
      <feBlend in="rg" in2="blue" mode="screen" result="output" />
      <feGaussianBlur in="output" stdDeviation="0.4" />
    </filter>
  </defs>
</svg>

<!-- optional: cursor-reactive materials + the toggle slide. Static without it. -->
<script src="color-depth.js"></script>

```

### color-depth/standalone/color-depth.js
```js
// Optional behaviour for the color-depth buttons. Pure CSS gets you every static
// look; this adds the two interactive bits:
//   1. the cursor-reactive materials (Metal's glint, Foil's sheen) follow the
//      pointer — it writes --pointer-x/y, --glare-x/y and --shine-angle on the
//      element; the smoothing lives in the CSS transitions, not here.
//   2. the toggle switch flips its `data-on` on click so the knob slides.
//
// Drop it in and call `initColorDepth()` once (or let it auto-run on load). It is
// framework-free and safe to run again after adding more buttons.

function initColorDepth(root = document) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // cursor-reactive materials
  if (!reduce) {
    root.querySelectorAll(".depth-metal, .depth-foil").forEach((el) => {
      if (el.dataset.depthBound) return;
      el.dataset.depthBound = "1";
      let raf = 0;
      let px = 0.5;
      let py = 0.5;
      const write = () => {
        raf = 0;
        const s = el.style;
        s.setProperty("--pointer-x", (px * 100).toFixed(1) + "%");
        s.setProperty("--pointer-y", (py * 100).toFixed(1) + "%");
        s.setProperty("--glare-x", (px * 100).toFixed(1) + "%");
        s.setProperty("--glare-y", (py * 100).toFixed(1) + "%");
        s.setProperty("--shine-angle", (110 + (px - 0.5) * 50).toFixed(1) + "deg");
      };
      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(write);
      };
      el.addEventListener(
        "pointermove",
        (e) => {
          const r = el.getBoundingClientRect();
          if (r.width && r.height) {
            px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
            py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
          }
          schedule();
        },
        { passive: true },
      );
      el.addEventListener("pointerleave", () => {
        px = 0.5;
        py = 0.5;
        schedule();
      });
    });
  }

  // toggle switches: flip data-on on click (the CSS slides the knob)
  root.querySelectorAll(".depth-toggle").forEach((el) => {
    if (el.dataset.depthToggleBound) return;
    el.dataset.depthToggleBound = "1";
    if (!el.hasAttribute("data-on")) el.setAttribute("data-on", "true");
    el.addEventListener("click", () => {
      el.setAttribute("data-on", el.getAttribute("data-on") === "true" ? "false" : "true");
    });
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initColorDepth());
  } else {
    initColorDepth();
  }
}

```

### color-depth/standalone/SKILL.md
```md
---
name: skeuomorphic-button-depth
description: >-
  Give any button, control, or surface real physical depth in CSS — glossy,
  metal, glass, matte, neon, recessed, and more — in any colour or mode, not just
  dark. Use whenever a button/pill/icon/toggle/card should read as a tactile
  object instead of a flat rectangle. Teaches the layering method (so you can
  build any material on any shape) plus ten ready techniques.
---

# Skeuomorphic button depth

Depth is never one drop shadow. It is many faint layers stacked on the same
element, each faking one part of how light meets a real surface: the body, the
bevel, the inner glow, the reflection. Learn the layers and you can dress any
button in any material — this works in light, dark, or full-colour palettes; the
colours are variables, the method is fixed.

## The one rule everything obeys

Pick a single light direction and commit every layer to it. By default the light
is from the **top**: bright edge on top, dark edge on the bottom, on every
element in the group. The moment two controls disagree about where the light is,
the illusion breaks. Flip the direction only on purpose (a pressed or recessed
control, below).

The surface also has to sit apart from what's behind it — a raised button needs a
background a step darker or lighter than itself, or its lift shadow has nothing to
lift off.

## The layer recipe

Build any material from the same four layers, outermost first:

1. **Body** — usually a top-to-bottom gradient, lighter at the top so the face
   reads as lit from above. `background: linear-gradient(180deg, <light>, <dark>)`.
   A flat fill is fine for matte materials; the doming then comes from step 2.

2. **Inset shadows** — the bevel and inner light, all `box-shadow` with `inset`:
   - a bright inset at the **top** = the lit bevel edge,
   - a dark inset at the **bottom** = weight and thickness,
   - broad soft inner glows = a domed, internally-lit face,
   - a hairline `inset 0 0 0 1px` = a crisp rim that catches light.

3. **Hover layer (`::before`)** — a second, brighter version of the body/insets
   that fades in on hover: "the light turning on." Keep the label above it with
   `isolation: isolate` (or a `z-index` on the text).

4. **Specular (`::after`)** — a soft bright bar or blob near the top edge
   (`linear-gradient` white → transparent, a touch of `blur`, low opacity): the
   reflection on glossy plastic or glass. Move or brighten it on hover for life.

Not every material uses all four — matte uses 1–2, neon leans on the rim, glass
adds real `backdrop-filter`. Add only the layers the material needs.

## Raised vs recessed

Two opposite reads, same toolkit, mirrored:

- **Raised** (sits on the page): bright inset on top, dark inset on the bottom,
  and an outer drop shadow to lift it off the background.
- **Recessed** (carved into the page): flip it — a dark inset on top (the near
  wall in shadow), a bright inset on the bottom (the far wall catching light),
  and **no** outer shadow. Make the fill close to the page colour so it looks
  like the same surface pushed inward, not a separate dark chip.

On press, a raised control should briefly become recessed (swap the outer lift
for inner shadows, ~50ms), so it visibly pushes in.

## Build order (for compound controls)

For anything with parts — a toggle, a segmented control, a stepper — layer from
the outside in, and don't skip a level:

1. the surface behind it (a step darker/lighter than the control),
2. the raised shell / track (the material lives here),
3. any recessed zones inside it (a track well, an active-segment notch),
4. the raised moving parts (a knob, a thumb) — same material as the shell unless
   you want deliberate contrast,
5. the readout on top (label, value, icon).

Put the material on the **container**, not each cell, so a compound control reads
as one carved piece.

## Rules

1. **One element, many layers.** Use `::before`/`::after` for the glow and sheen,
   not extra DOM. `isolation: isolate` keeps the label on top.
2. **Commit to the light direction** (see above). No element disagrees.
3. **Tint the layers toward the material**, don't just add black/white — cyan
   inside a blue glass, warm white inside a warm gel.
4. **Press = invert.** `:active` swaps lift for inner shadow (or collapses the
   sheen). Short transition (~50ms).
5. **Motion is subtle.** The material sells the depth; a hover doesn't need a big
   lift or scale. A moving highlight beats a moving button.
6. **Respect reduced motion.** Guard transforms/animations with
   `@media (prefers-reduced-motion: reduce)`.
7. **Stay compact.** Real controls are dense: tight padding, ~13–15px labels,
   restrained icons. Reach for smaller spacing before bigger type.

## Anti-patterns

- A flat block with a single soft shadow and no inset layers.
- Light coming from different directions on neighbouring controls.
- Glow so bright it erases the form underneath.
- A "recessed" control whose shadows are oriented like a raised one (it pops out).
- A raised control on a background lighter/brighter than itself (nothing to lift
  from).
- One shared inset behind several buttons when each wants its own well.

## Any shape, any palette

The same `depth-btn` base + one material class works on more than a text pill.
This entry ships the label pill, a square **icon** button (`.depth-icon`), and a
**toggle** switch (the material on the track, a sliding knob on top) — and the
method extends to steppers, cards, inputs, or any control you need. Colour is a
value you swap: retint the gradient stops and inset colours and the same material
becomes a new theme.

## Types

Ten techniques, named by method (colour is just a value you swap). Same markup,
one class swap:

- **Glossy** (`depth-glossy`) — a specular highlight bar over a gradient body.
- **Glow** (`depth-glow`) — a solid body lit from inside; hover turns it up.
- **Metal** (`depth-metal`) — a brushed bevel with a glint that follows the cursor.
- **Foil** (`depth-foil`) — iridescent holographic metal; five stacked light layers
  that shift and glare under the cursor (needs its child layers + a tiny pointer
  driver for --pointer-x/y, --glare-x/y, --shine-angle).
- **Layered** (`depth-layered`) — soft translucent overlays over any fill.
- **Inset** (`depth-inset`) — recessed into the surface; the bevel is flipped.
- **Glass** (`depth-glass`) — subtle refraction through an SVG displacement filter.
- **Neon** (`depth-neon`) — a crisp lit outline; a clean ring, not a bloom.
- **Duotone** (`depth-duotone`) — a hard-bevel extruded key from stacked shadows.
- **Satin** (`depth-satin`) — a soft smooth pastel; diffuse light, no gloss or grain.

## Drop-in CSS

A complete `color-depth.css` implementing all ten is the companion to this skill.
Markup is always the same; only the second class changes:

```html
<button class="depth-btn depth-glossy">
  <span class="depth-label">Get Started</span>
</button>
```

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"The art of color depth\",\"url\":\"https://arlan.me/vault/color-depth\",\"image\":\"/vault/color-depth.svg\",\"datePublished\":\"Jul 2, 2026\",\"about\":\"Study\",\"keywords\":\"CSS, Skeuomorphism, Buttons\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"The art of color depth\",\"item\":\"https://arlan.me/vault/color-depth\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"The art of color depth"}],["$","$L22",null,{"href":"/vault"}]]}],null,false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Buttons that feel like real objects, glossy glass or brushed metal or a soft cushion. They look expensive and slow to make. They are neither."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"The depth is just layers stacked on one button: a gradient body, inset shadows for the bevel and glow, a brighter layer that fades in on hover, and a soft bar of light along the top. Below is one button built ten different ways, by technique, not by color. Switch and grab the CSS you want."}]]}]]}],["$","$L23",null,{"children":[["$","$L24",null,{"playground":"color-depth"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L25",null,{"text":"$26","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L27"]}],"$L28","$L29"]}]]}],"$L2a"]}]]}]
