/* Use when: a button or circular control needs a live WebGL liquid-metal
 * ring with chromatic, silver, or gold presets. */

import { MetalFx } from "./src";

export default function MetalFxReference() {
  return (
    <MetalFx variant="button" preset="chromatic">
      <button type="button">Upgrade to Pro</button>
    </MetalFx>
  );
}
