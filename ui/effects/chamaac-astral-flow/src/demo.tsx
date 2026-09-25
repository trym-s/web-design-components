import AstralFlow from "./astral-flow";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <AstralFlow speed={1.5} color1="#05070a" color2="#2e1a38" color3="#a0769a" flowMin={3} flowMax={7} />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4" style={pixelFont}>
        <h1 className="text-center text-7xl font-bold uppercase text-white opacity-80 drop-shadow-lg md:text-8xl">Astral Flow</h1>
      </div>
    </div>
  );
}
