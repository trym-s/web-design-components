import DeformTunnel from "./deform-tunnel";
// Sample texture: Unsplash photo-1508349937151-22b68b72d5b1 (Unsplash License), the upstream default.
import tunnel from "./demo-assets/tunnel.jpg";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
      <DeformTunnel imageSrc={tunnel} />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center" style={pixelFont}>
        <h1 className="text-center text-4xl font-bold uppercase text-white opacity-80 drop-shadow-lg md:text-8xl">Warp Drive</h1>
      </div>
    </div>
  );
}
