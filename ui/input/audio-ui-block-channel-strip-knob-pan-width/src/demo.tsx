import { useState } from "react";
import { BlockChannelStripKnobPanWidth } from "./block-channel-strip-knob-pan-width";

export default function Demo() {
  const [pan, setPan] = useState(0);
  const [width, setWidth] = useState(0);
  return <BlockChannelStripKnobPanWidth onPanChange={setPan} onWidthChange={setWidth} pan={pan} width={width} />;
}
