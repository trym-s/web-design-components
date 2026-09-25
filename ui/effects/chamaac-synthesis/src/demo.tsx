import Synthesis from "./synthesis";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <Synthesis speed={0.4} color1="#0f172a" color2="#3b0764" color3="#0ea5e9" />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4" style={pixelFont}>
        <h1 className="text-center text-7xl leading-tight font-bold tracking-tighter uppercase text-white opacity-80 drop-shadow-2xl md:text-9xl">
          Synthesis
        </h1>
      </div>
    </div>
  );
}
