import { useState } from "react";
import { BlockChannelStripKnobMulti } from "./block-channel-strip-knob-multi";

const labels = ["Gain", "Reverb", "Delay", "Drive"];

export default function Demo() {
  const [values, setValues] = useState(() => labels.map((label) => ({ id: label, label, value: 50 })));
  return (
    <BlockChannelStripKnobMulti
      effects={values}
      footer="FX"
      onValueChange={(id, value) => setValues((current) => current.map((item) => (item.id === id ? { ...item, value } : item)))}
    />
  );
}
