/* Use when: a React interface needs the upstream gooey tabs interaction and its Move liquid behavior. */

import "../../_sources/liquid-gooey/styles.css";
import "../../_sources/liquid-gooey/demo.css";
import { Tabs } from "./src/demo";

const shadow = "0 0 0 1px rgba(255,255,255,.04) inset, 0 2px 6px rgba(0,0,0,.24)";

export default function LiquidGooeyReference() {
  return (
    <div className="page">
      <Tabs blur={6} contrast={18} shadow={shadow} dark pro={false} />
    </div>
  );
}
