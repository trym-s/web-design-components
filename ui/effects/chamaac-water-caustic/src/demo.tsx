import WaterCaustic from "./water-caustic";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-[16px]">
      <WaterCaustic color="#00d1ff" />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center" style={pixelFont}>
        <h1 className="text-center text-4xl font-bold tracking-tighter uppercase text-white opacity-80 drop-shadow-lg md:text-8xl">
          Water Caustics
        </h1>
      </div>
    </div>
  );
}
