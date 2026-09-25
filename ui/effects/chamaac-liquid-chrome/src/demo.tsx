import LiquidChrome from "./liquid-chrome";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <LiquidChrome speed={0.35} timeScale={0.225} color="#C0C0C0" color2="#4A4A4A" />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4" style={pixelFont}>
        <h1 className="text-center text-7xl font-bold break-words uppercase text-white opacity-80 mix-blend-overlay drop-shadow-lg md:text-8xl">
          Liquid Chrome
        </h1>
      </div>
    </div>
  );
}
