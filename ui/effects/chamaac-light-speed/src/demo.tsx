import LightSpeed from "./light-speed";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <LightSpeed particleCount={1000} speed={2.4} lightColor="#b026ff" intensity={3} />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4" style={pixelFont}>
        <h1 className="text-center text-7xl leading-tight font-bold uppercase text-white opacity-90 drop-shadow-lg md:text-9xl">
          Light Speed
        </h1>
      </div>
    </div>
  );
}
