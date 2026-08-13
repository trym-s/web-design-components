Implement a CSS-only **Progressive Blur** in the existing project. Inspect the target project first, then adapt the markup and styles to its framework and styling conventions without changing the blur structure, layer order, mask stops, or blur values.

## What this resource is

The resource places a fixed progressive backdrop blur along the top and bottom edges of the viewport. Each edge uses eight overlapping, masked `backdrop-filter` layers. The blur strength doubles from one layer to the next, creating a gradual transition from clear page content to a strong edge blur.

The effect is decorative and non-interactive:

- It stays fixed to the viewport while the page scrolls.
- It does not block clicks or pointer input.
- The top and bottom versions use the same layers with mirrored mask directions.
- It is CSS-only and needs no scroll listeners or runtime initialization.

## Compatibility boundary

Use this implementation in projects that can render normal DOM elements and global or component-scoped CSS, including static HTML, Astro, React, Vue, Svelte, and server-rendered applications.

The target browser must support:

- `backdrop-filter`
- CSS `mask-image`
- Fixed positioning

Keep both the prefixed and unprefixed `backdrop-filter` and `mask-image` declarations. If the target environment cannot support those CSS features, stop and explain that this exact progressive backdrop blur cannot be reproduced faithfully instead of replacing it with a flat translucent gradient or a normal foreground `filter: blur()`.

## Source stack and dependencies

The core resource uses:

- Semantic HTML
- Plain CSS
- No JavaScript
- No third-party dependencies

The source preview is built with Astro, but Astro is not required for the effect. Framework-specific image components, theme tokens, and preview scripts are not part of the resource.

## Core resource versus preview-only extras

The core deliverable is only the two `.progressive-blur` containers, their eight `.layer` children, and the CSS that fixes, masks, and blurs those layers.

Do not copy these private-preview extras into the target project unless the user separately requests them:

- The centered lorem ipsum article
- The two architectural photos
- The “Scroll down” shimmer label
- The preview's spacing and typography
- Astro's image pipeline
- Consumer-platform color tokens or iframe theme synchronization

The progressive blur itself has no visible color palette, so it naturally works over light and dark content. The `#000` values in the gradients only define mask opacity; they do not paint black onto the page.

## Required markup

Place the blur containers near the end of the page shell, outside the page's scrolling content. The illustrative `<main>` can contain any page content; only the two blur containers and their children are required.

```html
<body>
  <main>
    <!-- Your page content -->
  </main>

  <div class="progressive-blur top-blur" aria-hidden="true">
    <div class="layer blur-1"></div>
    <div class="layer blur-2"></div>
    <div class="layer blur-3"></div>
    <div class="layer blur-4"></div>
    <div class="layer blur-5"></div>
    <div class="layer blur-6"></div>
    <div class="layer blur-7"></div>
    <div class="layer blur-8"></div>
  </div>

  <div class="progressive-blur bottom-blur" aria-hidden="true">
    <div class="layer blur-1"></div>
    <div class="layer blur-2"></div>
    <div class="layer blur-3"></div>
    <div class="layer blur-4"></div>
    <div class="layer blur-5"></div>
    <div class="layer blur-6"></div>
    <div class="layer blur-7"></div>
    <div class="layer blur-8"></div>
  </div>
</body>
```

Preserve these relationships:

- `.top-blur` and `.bottom-blur` must also have the `.progressive-blur` class.
- Each container must have exactly eight direct `.layer` children.
- The layer classes must stay ordered from `.blur-1` through `.blur-8`.
- Keep `aria-hidden="true"` because these elements are purely visual.

If the project only needs one blurred edge, omit the other complete container. Do not remove individual layers from the edge that remains unless the user explicitly accepts a less gradual effect.

## Complete CSS

Add this CSS to a stylesheet that reaches the blur markup. In component-scoped frameworks, keep these selectors global or place the CSS in the same component while preserving the compiled selector relationships.

```css
.progressive-blur {
  position: fixed;
  z-index: 10;
  right: 0;
  left: 0;
  height: 200px;
  overflow: hidden;
  pointer-events: none;
}

.progressive-blur.top-blur {
  --blur-direction: to bottom;
  top: -32px;
}

.progressive-blur.bottom-blur {
  --blur-direction: to top;
  bottom: -32px;
}

.progressive-blur .layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.progressive-blur .blur-1 {
  z-index: 1;
  -webkit-backdrop-filter: blur(0.078125px);
  backdrop-filter: blur(0.078125px);
  -webkit-mask-image: linear-gradient(
    var(--blur-direction),
    transparent 87.5%,
    #000 100%
  );
  mask-image: linear-gradient(
    var(--blur-direction),
    transparent 87.5%,
    #000 100%
  );
}

.progressive-blur .blur-2 {
  z-index: 2;
  -webkit-backdrop-filter: blur(0.15625px);
  backdrop-filter: blur(0.15625px);
  -webkit-mask-image: linear-gradient(
    var(--blur-direction),
    transparent 75%,
    #000 87.5% 100%
  );
  mask-image: linear-gradient(
    var(--blur-direction),
    transparent 75%,
    #000 87.5% 100%
  );
}

.progressive-blur .blur-3 {
  z-index: 3;
  -webkit-backdrop-filter: blur(0.3125px);
  backdrop-filter: blur(0.3125px);
  -webkit-mask-image: linear-gradient(
    var(--blur-direction),
    transparent 62.5%,
    #000 75% 87.5%,
    transparent 100%
  );
  mask-image: linear-gradient(
    var(--blur-direction),
    transparent 62.5%,
    #000 75% 87.5%,
    transparent 100%
  );
}

.progressive-blur .blur-4 {
  z-index: 4;
  -webkit-backdrop-filter: blur(0.625px);
  backdrop-filter: blur(0.625px);
  -webkit-mask-image: linear-gradient(
    var(--blur-direction),
    transparent 50%,
    #000 62.5% 75%,
    transparent 87.5%
  );
  mask-image: linear-gradient(
    var(--blur-direction),
    transparent 50%,
    #000 62.5% 75%,
    transparent 87.5%
  );
}

.progressive-blur .blur-5 {
  z-index: 5;
  -webkit-backdrop-filter: blur(1.25px);
  backdrop-filter: blur(1.25px);
  -webkit-mask-image: linear-gradient(
    var(--blur-direction),
    transparent 37.5%,
    #000 50% 62.5%,
    transparent 75%
  );
  mask-image: linear-gradient(
    var(--blur-direction),
    transparent 37.5%,
    #000 50% 62.5%,
    transparent 75%
  );
}

.progressive-blur .blur-6 {
  z-index: 6;
  -webkit-backdrop-filter: blur(2.5px);
  backdrop-filter: blur(2.5px);
  -webkit-mask-image: linear-gradient(
    var(--blur-direction),
    transparent 25%,
    #000 37.5% 50%,
    transparent 62.5%
  );
  mask-image: linear-gradient(
    var(--blur-direction),
    transparent 25%,
    #000 37.5% 50%,
    transparent 62.5%
  );
}

.progressive-blur .blur-7 {
  z-index: 7;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  -webkit-mask-image: linear-gradient(
    var(--blur-direction),
    transparent 12.5%,
    #000 25% 37.5%,
    transparent 50%
  );
  mask-image: linear-gradient(
    var(--blur-direction),
    transparent 12.5%,
    #000 25% 37.5%,
    transparent 50%
  );
}

.progressive-blur .blur-8 {
  z-index: 8;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  -webkit-mask-image: linear-gradient(
    var(--blur-direction),
    transparent 0%,
    #000 12.5% 25%,
    transparent 37.5%
  );
  mask-image: linear-gradient(
    var(--blur-direction),
    transparent 0%,
    #000 12.5% 25%,
    transparent 37.5%
  );
}

@media (max-width: 680px) {
  .progressive-blur {
    height: 160px;
  }
}
```

Do not collapse this into one `backdrop-filter` element. A single masked blur fades the opacity of one blur strength; it does not reproduce the stepped increase in blur strength created by these eight layers.

## JavaScript

No JavaScript is required. Do not add scroll listeners, `requestAnimationFrame`, observers, or theme listeners for the blur itself. Fixed positioning and backdrop compositing update the effect as the page scrolls.

## Integration rules

- Render the blur markup once in the top-level page or application shell. Do not repeat it inside every article or section.
- Keep the containers outside transformed ancestors. A transformed ancestor can change the containing block used by `position: fixed` and stop the blur from following the viewport.
- Keep `pointer-events: none` on both the containers and layers.
- Keep `overflow: hidden` on each blur container so the masked bands stay confined to the edge region.
- Preserve the layer `z-index` order from `1` through `8`.
- Adjust the container's `z-index: 10` only when the host project has a documented stacking scale. The blur should sit above page content but below controls that must remain completely clear and interactive.
- Do not give the blur layers a visible background color. They should sample the host page through `backdrop-filter`.
- Do not add resource-specific light or dark colors. The effect is theme-neutral and should blur whatever the host project already renders.

## Customization points

Keep the defaults for a faithful implementation. If the user asks for changes, these are the intended levers:

- `height: 200px` controls the desktop depth of the blurred edge.
- The mobile `height: 160px` controls the smaller-screen depth.
- `top: -32px` and `bottom: -32px` align the strongest masked bands with the viewport edges.
- `z-index: 10` controls where the effect sits in the host stacking system.
- `--blur-direction` mirrors the same masks between the top and bottom edges; keep `to bottom` for the top and `to top` for the bottom.

Changing the individual blur values or mask stops changes the progression itself. Do not rewrite those values unless the user explicitly asks for a different blur curve.

## Deliverable

Implement the effect in the target project's native structure and styling system while preserving:

- Both required edge containers unless the user requests only one
- Eight ordered layers per edge
- The exact blur values and mask stops
- Both prefixed and unprefixed CSS declarations
- Fixed viewport positioning
- Pointer transparency
- Theme neutrality
- A CSS-only implementation with no unnecessary JavaScript

After adapting the code, briefly identify which files were changed and any host-specific selector or stacking adjustments. If the platform cannot support the required CSS features, explain the limitation instead of silently substituting a visually different effect.
