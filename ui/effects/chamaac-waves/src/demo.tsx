import Waves from "./waves";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <Waves waveColor1="#071697" waveColor2="#00d4ff" waveColor3="#000000" backgroundColor="#000000" />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4" style={pixelFont}>
        <h1 className="text-center text-7xl font-bold uppercase text-white opacity-80 mix-blend-overlay drop-shadow-lg md:text-8xl">
          Waves are cool
        </h1>
      </div>
    </div>
  );
}
