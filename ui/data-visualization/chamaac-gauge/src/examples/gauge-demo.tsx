"use client";

import Gauge from "../../../../_sources/chamaac/app/components/sections/gauge/gauge";

export default function GaugeDemo() {
  return (
    <div className="flex justify-center items-center w-full h-[400px]">
      <Gauge value={75} size={400} gap={4} />
    </div>
  );
}
