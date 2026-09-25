import { CoverflowGallery, type CoverflowSlide } from "./coverflow-gallery";

/* Token-coloured placeholder cards instead of the upstream portrait photos. */
const NAMES = ["James Walker", "Olivia Carter", "Amelia Foster", "Benjamin Harris", "Lucas Martin"];
const FILLS = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"];
const SLIDES: CoverflowSlide[] = NAMES.map((title, i) => ({
  title,
  content: <div className={`size-full ${FILLS[i]} bg-linear-to-br from-transparent to-foreground/40`} />,
}));

export default function Demo() {
  return (
    <div className="h-[560px] w-full max-w-4xl">
      <CoverflowGallery slides={SLIDES} />
    </div>
  );
}
