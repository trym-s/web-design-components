import GridBloom from "./grid-bloom";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

// The bloom is additive over a transparent canvas; the site shows it on its dark theme.
export default function Demo() {
  return (
    <div className="dark relative h-[600px] w-full overflow-hidden rounded-xl bg-background">
      <GridBloom color="#e040fb" />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4" style={pixelFont}>
        <h1 className="text-center text-8xl font-bold uppercase text-foreground opacity-80 mix-blend-overlay drop-shadow-lg">
          Grid Bloom
        </h1>
      </div>
    </div>
  );
}
