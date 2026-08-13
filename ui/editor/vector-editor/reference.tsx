/* Use when: a canvas needs Figma-style selection chrome (blue box, corner
 * handles, size tag) or draggable path point editing. */

"use client";

import { useState } from "react";
import { parsePath } from "./src/svg-editor/standalone/parse";
import { VectorEditor } from "./src/svg-editor/standalone/VectorEditor";

const START = parsePath("M40 160 C 40 60, 200 60, 200 160 S 360 260, 360 160");

export default function VectorEditorReference() {
  const [path, setPath] = useState(START);
  return (
    <VectorEditor path={path} onChange={setPath} viewBox={[0, 0, 400, 240]} width={400} height={240} />
  );
}
