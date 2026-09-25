import { useState } from "react";
import { BlockChannelStripFaderSlider } from "./block-channel-strip-fader-slider";

export default function Demo() {
  const [value, setValue] = useState(72);
  return (
    <div className="w-full max-w-md">
      <BlockChannelStripFaderSlider label="Fader" onValueChange={setValue} value={value} />
    </div>
  );
}
