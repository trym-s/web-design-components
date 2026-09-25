// Any CSS colour (hex, oklch, a resolved token…) → sRGB 0..1 for shader uniforms / per-cell colours.
// Parsed once through a 1×1 canvas and cached, since the stage asks every frame.
const cache = new Map<string, [number, number, number]>();
let ctx: CanvasRenderingContext2D | null = null;

export function cssToRgb01(value: string): [number, number, number] {
  const key = value.trim();
  const hit = cache.get(key);
  if (hit) return hit;
  ctx ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = key;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  const rgb: [number, number, number] = [r / 255, g / 255, b / 255];
  cache.set(key, rgb);
  return rgb;
}
