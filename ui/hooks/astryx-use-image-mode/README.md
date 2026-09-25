# useImageMode

Detects whether an image is predominantly dark or light by sampling pixels via OffscreenCanvas. Uses APCA perceptual lightness (sRGB linearization + power curve) for accurate detection, especially on saturated colors. Runs entirely off the paint path: no visible canvas, no layout thrash. Supports regional sampling for detecting luminance where text overlays will appear. Returns null while loading and falls back gracefully on CORS or network errors.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useImageMode.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Detects whether an image is predominantly dark or light by sampling pixels via OffscreenCanvas.
- Avoid when: Use for images that change rapidly (e.g., video frames); each src change triggers a new fetch and analysis.
- Provides: useImageMode
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · media
- Keywords: image, dark, light, mode, luminance, color, detect, theme, media, apca, contrast

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `upstream/examples/` as-is, or read `upstream/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- None of its own upstream; the demo is its family's: `ui/hooks/astryx-use-container-reveal`.

## Documentation

### useImageMode

Import: `@astryxdesign/core/hooks`

Detects whether an image is predominantly dark or light by sampling pixels via OffscreenCanvas. Uses APCA perceptual lightness (sRGB linearization + power curve) for accurate detection, especially on saturated colors. Runs entirely off the paint path: no visible canvas, no layout thrash. Supports regional sampling for detecting luminance where text overlays will appear. Returns null while loading and falls back gracefully on CORS or network errors.

**Do**

- Pair with MediaTheme to automatically adapt text color over dynamic background images.
- Use the region option to sample only the area where text overlays will appear for more accurate results.

**Don't**

- Use for images that change rapidly (e.g., video frames); each src change triggers a new fetch and analysis.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` * | `string \| null \| undefined` |  | Image source URL to analyze. When null/undefined, returns the fallback value. |
| `options` | `UseImageModeOptions` |  | Optional configuration for image analysis. |
| `options.region` | `ImageSampleRegion` |  | Region to sample within the image using normalized 0-1 coordinates ({ x, y, width, height }). Defaults to the full image. |
| `options.threshold` | `number` | `0.5` | Luminance threshold for the dark/light split. Below = dark, above = light. |
| `options.fallback` | `'dark' \| 'light' \| null` | `null` | Fallback value while loading or on error. |

**Returns**

```ts
[
  {
    "name": "mode",
    "type": "'dark' | 'light' | null",
    "description": "Detected luminance mode of the image. Returns null while loading or if src is null/undefined."
  }
]
```

## Files

- `upstream/useImageMode.doc.mjs`
- `upstream/useImageMode.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useImageMode
