import LiquidMorph from "./liquid-morph";

// No demo upstream: the component with its default props, filling a 500 px box.
export default function Demo() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
      <LiquidMorph />
    </div>
  );
}
