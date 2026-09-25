import { useState } from "react";
import { Knob } from "./knob";


function KnobDemo() {
  return <Knob defaultValue={50} max={100} min={0} step={1} />;
}

function KnobDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Knob defaultValue={38} disabled max={100} min={0} step={1} />
        <p className="text-center text-muted-foreground text-xs">Disabled</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Knob defaultValue={38} max={100} min={0} step={1} />
        <p className="text-center text-muted-foreground text-xs">Enabled</p>
      </div>
    </div>
  );
}

function KnobSizeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Knob defaultValue={50} max={100} min={0} size="sm" step={1} />
      <Knob defaultValue={50} max={100} min={0} size="default" step={1} />
      <Knob defaultValue={50} max={100} min={0} size="lg" step={1} />
      <Knob defaultValue={50} max={100} min={0} size="xl" step={1} />
    </div>
  );
}

function KnobFineStepDemo() {
  const [value, setValue] = useState(0.5);

  return (
    <div className="flex flex-col items-center gap-2">
      <Knob
        defaultValue={0.5}
        max={1}
        min={0}
        onValueChange={setValue}
        step={0.01}
        value={value}
      />
      <output
        aria-live="polite"
        className="font-mono text-foreground text-sm tabular-nums"
      >
        {value.toFixed(2)}
      </output>
    </div>
  );
}

function KnobFilterControlDemo() {
  const [cutoff, setCutoff] = useState(1000);

  return (
    <div className="flex flex-col items-center gap-2">
      <Knob
        max={20_000}
        min={20}
        onValueChange={setCutoff}
        step={1}
        value={cutoff}
      />
      <output className="text-sm">{cutoff} Hz</output>
    </div>
  );
}

function KnobChangeVsCommitDemo() {
  const [liveValue, setLiveValue] = useState(64);
  const [committedValue, setCommittedValue] = useState(64);

  return (
    <div className="flex flex-col items-center gap-2">
      <Knob
        max={100}
        min={0}
        onValueChange={setLiveValue}
        onValueCommit={setCommittedValue}
        step={1}
        value={liveValue}
      />
      <div className="text-center font-mono text-foreground text-sm tabular-nums">
        <div>Live: {liveValue}</div>
        <div className="text-muted-foreground">Committed: {committedValue}</div>
      </div>
    </div>
  );
}

function KnobArcAndAnchorDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Knob defaultValue={72} max={100} min={0} step={1} />
        <p className="text-center text-muted-foreground text-xs">Value only</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Knob anchor={30} defaultValue={75} max={100} min={0} step={1} />
        <p className="text-center text-muted-foreground text-xs">
          With <code className="text-foreground">anchor</code> range
        </p>
      </div>
    </div>
  );
}

function KnobCircularArcDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex flex-col items-center gap-2">
      <Knob max={100} min={0} onValueChange={setValue} step={1} value={value} />
      <output
        aria-live="polite"
        className="font-mono text-foreground text-sm tabular-nums"
      >
        {value}
      </output>
    </div>
  );
}

function KnobDoubleTapResetDemo() {
  const [value, setValue] = useState(72);

  return (
    <div className="flex max-w-xs flex-col items-center gap-2">
      <Knob
        defaultValue={30}
        max={100}
        min={0}
        onValueChange={setValue}
        step={1}
        value={value}
      />
      <output
        aria-live="polite"
        className="font-mono text-foreground text-sm tabular-nums"
      >
        {value}
      </output>
      <p className="text-center text-muted-foreground text-xs leading-snug">
        Double-tap the control to jump back to{" "}
        <span className="text-foreground">30</span> (
        <code className="text-foreground">defaultValue</code>).
      </p>
    </div>
  );
}

function KnobRevolutionDragDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex flex-col items-center gap-2">
      <Knob
        dragSensitivity="revolution"
        max={100}
        min={0}
        onValueChange={setValue}
        step={1}
        value={value}
      />
      <output
        aria-live="polite"
        className="font-mono text-foreground text-sm tabular-nums"
      >
        {value}
      </output>
    </div>
  );
}

function KnobVerticalDragDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex flex-col items-center gap-2">
      <Knob
        dragOptions={{ verticalPanEnabled: true }}
        dragSensitivity="arc"
        max={100}
        min={0}
        onValueChange={setValue}
        step={1}
        value={value}
      />
      <output
        aria-live="polite"
        className="font-mono text-foreground text-sm tabular-nums"
      >
        {value}
      </output>
    </div>
  );
}

const examples = [
  { component: KnobDemo, title: "Knob" },
  { component: KnobDisabledDemo, title: "Knob Disabled" },
  { component: KnobSizeVariantsDemo, title: "Knob Size Variants" },
  { component: KnobFineStepDemo, title: "Knob Fine Step" },
  { component: KnobFilterControlDemo, title: "Knob Filter Control" },
  { component: KnobChangeVsCommitDemo, title: "Knob Change Vs Commit" },
  { component: KnobArcAndAnchorDemo, title: "Knob Arc And Anchor" },
  { component: KnobCircularArcDemo, title: "Knob Circular Arc" },
  { component: KnobDoubleTapResetDemo, title: "Knob Double Tap Reset" },
  { component: KnobRevolutionDragDemo, title: "Knob Revolution Drag" },
  { component: KnobVerticalDragDemo, title: "Knob Vertical Drag" },
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
