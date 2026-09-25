import { useState } from "react";
import { FigmaFrame } from "./figma-frame";
import { parsePath, serializePath } from "./parse";
import { VectorEditor } from "./vector-editor";

const START = parsePath("M40 160 C 40 60, 200 60, 200 160 S 360 260, 360 160");
const BLOB = parsePath("M100 20 C 150 20 180 60 180 100 C 180 150 140 180 100 180 C 50 180 20 140 20 100 C 20 50 50 20 100 20 Z");

export default function Demo() {
  const [path, setPath] = useState(START);
  const [blob, setBlob] = useState(BLOB);

  return (
    <div className="flex flex-col items-center gap-14">
      <FigmaFrame width={400} height={240}>
        <VectorEditor path={path} onChange={setPath} viewBox={[0, 0, 400, 240]} />
      </FigmaFrame>
      <div className="flex items-center gap-12">
        <FigmaFrame>
          <VectorEditor path={blob} onChange={setBlob} viewBox={[0, 0, 200, 200]} width={160} height={160} mirror="angle" />
        </FigmaFrame>
        <FigmaFrame>
          <div className="rounded-md bg-muted px-6 py-4 text-sm">Any element</div>
        </FigmaFrame>
      </div>
      <code className="max-w-xl break-all font-mono text-muted-foreground text-xs">{serializePath(path)}</code>
    </div>
  );
}
