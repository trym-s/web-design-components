import Nebula from "./nebula";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <Nebula speed={2} color1="#5efff4" color2="#763b65" color3="#1a0b2e" />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4" style={pixelFont}>
        <h1 className="text-center text-7xl font-bold uppercase text-white opacity-80 drop-shadow-lg md:text-8xl">
          Deep Space Nebula
        </h1>
      </div>
    </div>
  );
}
