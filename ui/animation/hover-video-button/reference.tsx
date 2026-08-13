/* Use when: a pill button should reveal a short 3D/puffy video on hover, with
 * magnetism and a click-pop spring. */

"use client";

import { HoverVideoButton } from "./src/hover-video/HoverVideoButton";

/* `video` is a base path without extension; video-sources.ts resolves it against
 * the upstream R2 bucket, so this reference needs network. */
export default function HoverVideoButtonReference() {
  return <HoverVideoButton label="amo" video="/vault/amo" width={320} variant="light" />;
}
