import { useState } from "react";
import { GooeyLiquidSlider } from "./gooey-liquid-slider";

export default function GooeyLiquidSliderDemo() {
  const [value, setValue] = useState(45);
  return (
    <div className="grid h-[280px] w-full max-w-md place-items-center overflow-hidden rounded-lg bg-muted/30">
      <GooeyLiquidSlider aria-label="Volume" value={value} onValueChange={setValue} />
    </div>
  );
}
