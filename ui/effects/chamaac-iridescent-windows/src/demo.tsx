import IridescentWindows from "./iridescent-windows";

// No demo upstream: the component with its default props, filling a 500 px box.
export default function Demo() {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl">
      <IridescentWindows className="h-full" />
    </div>
  );
}
