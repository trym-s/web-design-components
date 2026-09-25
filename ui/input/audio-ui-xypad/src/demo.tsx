import { useState } from "react";
import { XYPad } from "./xypad";


function XYPadLiveValueDemo() {
  const [value, setValue] = useState({ x: 50, y: 50 });

  return (
    <div className="flex flex-col items-center gap-2">
      <XYPad
        className="aspect-square"
        maxX={100}
        maxY={100}
        minX={0}
        minY={0}
        onValueChange={setValue}
        value={value}
      />
      <output
        aria-live="polite"
        className="font-mono text-foreground text-sm tabular-nums"
      >
        X: {value.x} - Y: {value.y}
      </output>
    </div>
  );
}

function XYPadSizeSmDemo() {
  return (
    <XYPad
      className="aspect-square"
      defaultValue={{ x: 40, y: 65 }}
      size="sm"
    />
  );
}

function XYPadSizeDefaultDemo() {
  return (
    <XYPad
      className="aspect-square"
      defaultValue={{ x: 40, y: 65 }}
      size="default"
    />
  );
}

function XYPadSizeLgDemo() {
  return (
    <XYPad
      className="aspect-square"
      defaultValue={{ x: 40, y: 65 }}
      size="lg"
    />
  );
}

function XYPadSizeXlDemo() {
  return (
    <XYPad
      className="aspect-square"
      defaultValue={{ x: 40, y: 65 }}
      size="xl"
    />
  );
}

function XYPadDisabledDemo() {
  return (
    <XYPad className="aspect-square" defaultValue={{ x: 50, y: 50 }} disabled />
  );
}

function XypadFormatValueDemo() {
  return (
    <XYPad
      className="aspect-square"
      defaultValue={{ x: 50, y: 50 }}
      formatValue={(val) => `X: ${val.x}, Y: ${val.y}`}
      maxX={100}
      maxY={100}
      minX={0}
      minY={0}
    />
  );
}

function XYPadBipolarRangeDemo() {
  const [value, setValue] = useState({ x: 0, y: 0 });

  return (
    <div className="flex flex-col items-center gap-2">
      <XYPad
        className="aspect-square"
        defaultValue={{ x: 0, y: 0 }}
        formatValue={(next) => `Pan ${next.x} | Mix ${next.y.toFixed(2)}`}
        maxX={100}
        maxY={1}
        minX={-100}
        minY={-1}
        onValueChange={setValue}
        stepX={1}
        stepY={0.01}
        value={value}
      />
      <output
        aria-live="polite"
        className="font-mono text-foreground text-sm tabular-nums"
      >
        Pan: {value.x} - Mix: {value.y.toFixed(2)}
      </output>
    </div>
  );
}

function XYPadChangeVsCommitDemo() {
  const [live, setLive] = useState({ x: 50, y: 50 });
  const [committed, setCommitted] = useState({ x: 50, y: 50 });

  return (
    <div className="flex flex-col items-center gap-2">
      <XYPad
        className="aspect-square"
        maxX={100}
        maxY={100}
        minX={0}
        minY={0}
        onValueChange={setLive}
        onValueCommit={setCommitted}
        value={live}
      />
      <div className="text-center font-mono text-foreground text-sm tabular-nums">
        <div>
          Live: X {live.x} - Y {live.y}
        </div>
        <div className="text-muted-foreground">
          Committed: X {committed.x} - Y {committed.y}
        </div>
      </div>
    </div>
  );
}

function XypadHideValueDemo() {
  return (
    <XYPad
      className="aspect-square"
      defaultValue={{ x: 50, y: 50 }}
      maxX={100}
      maxY={100}
      minX={0}
      minY={0}
      valueDisplay="hidden"
    />
  );
}

const examples = [
  { component: XYPadLiveValueDemo, title: "Xypad Live Value" },
  { component: XYPadSizeSmDemo, title: "Xypad Size Sm" },
  { component: XYPadSizeDefaultDemo, title: "Xypad Size Default" },
  { component: XYPadSizeLgDemo, title: "Xypad Size Lg" },
  { component: XYPadSizeXlDemo, title: "Xypad Size Xl" },
  { component: XYPadDisabledDemo, title: "Xypad Disabled" },
  { component: XypadFormatValueDemo, title: "Xypad Format Value" },
  { component: XYPadBipolarRangeDemo, title: "Xypad Bipolar Range" },
  { component: XYPadChangeVsCommitDemo, title: "Xypad Change Vs Commit" },
  { component: XypadHideValueDemo, title: "Xypad Hide Value" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-4xl sm:grid-cols-2 gap-6">
      {examples.map(({ title, component: Example }) => (
        <section className="flex flex-col gap-3" key={title}>
          <h3 className="text-muted-foreground text-xs">{title}</h3>
          <div className="flex min-h-40 items-center justify-center rounded-xl border p-6">
            <Example />
          </div>
        </section>
      ))}
    </div>
  );
}
