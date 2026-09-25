import BokehGrid from "./bokeh-grid";

// No demo upstream: the component with its default props, here filling a 500 px box instead of the viewport.
export default function Demo() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
      <BokehGrid className="absolute h-full w-full" />
    </div>
  );
}
