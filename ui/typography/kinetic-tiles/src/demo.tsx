import { KineticTiles } from "./kinetic-tiles";

export default function Demo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <KineticTiles />
      <KineticTiles text="wave" tiles={24} offset={34} spread={0.06} />
    </div>
  );
}
