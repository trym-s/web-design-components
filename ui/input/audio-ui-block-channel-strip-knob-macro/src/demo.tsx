import { useState } from "react";
import { BlockChannelStripKnobMacro } from "./block-channel-strip-knob-macro";

export default function Demo() {
  const [value, setValue] = useState(40);
  return <BlockChannelStripKnobMacro footer="Output" label="Macro" onValueChange={setValue} title="Channel 1" value={value} />;
}
