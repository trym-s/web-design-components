import { useState } from "react";
import { BlockChannelStripTransportVertical } from "./block-channel-strip-transport-vertical";

export default function Demo() {
  const [time, setTime] = useState(35);
  return (
    <div className="w-full max-w-md">
      <BlockChannelStripTransportVertical bufferedTime={63} currentTime={time} duration={102} onSeek={setTime} title="Track 1" />
    </div>
  );
}
