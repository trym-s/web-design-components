import Gauge from "./gauge";

export default function Demo() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <Gauge value={75} size={400} gap={4} />
    </div>
  );
}
