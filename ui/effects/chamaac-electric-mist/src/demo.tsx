import ElectricMist from "./electric-mist";

// The site sets its headings in Geist Pixel Square; the target project supplies the font.
const pixelFont = { fontFamily: 'var(--font-pixel, "Geist Pixel Square", "Geist Mono", ui-monospace, monospace)' };

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
      <ElectricMist speed={1} color="#191970" detail={1.5} distortion={3} brightness={1} />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4" style={pixelFont}>
        <h1 className="text-center text-7xl leading-tight font-bold uppercase text-white opacity-80 drop-shadow-lg md:text-8xl">
          Electric Mist
        </h1>
      </div>
    </div>
  );
}
