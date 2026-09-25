import { Fader } from "./fader";


function FaderVerticalDemo() {
  return <Fader defaultValue={50} max={100} min={0} step={1} />;
}

function FaderHorizontalDemo() {
  return (
    <Fader
      defaultValue={50}
      max={100}
      min={0}
      orientation="horizontal"
      step={1}
    />
  );
}

function FaderSizeVariantsDemo() {
  return (
    <div className="flex items-end gap-6">
      <div className="flex h-max flex-col items-center gap-2">
        <Fader defaultValue={38} max={100} min={0} size="sm" step={1} />
        <p className="text-muted-foreground text-xs">sm</p>
      </div>

      <div className="flex h-max flex-col items-center gap-2">
        <Fader defaultValue={50} max={100} min={0} size="default" step={1} />
        <p className="text-muted-foreground text-xs">default</p>
      </div>

      <div className="flex h-max flex-col items-center gap-2">
        <Fader defaultValue={62} max={100} min={0} size="lg" step={1} />
        <p className="text-muted-foreground text-xs">lg</p>
      </div>
    </div>
  );
}

function FaderThumbMarksVariantsDemo() {
  return (
    <div className="flex items-end gap-6">
      <div className="flex h-max flex-col items-center gap-2">
        <Fader
          defaultValue={50}
          max={100}
          min={0}
          step={1}
          thumbMarks={false}
        />
        <p className="text-center text-muted-foreground text-xs">No marks</p>
      </div>

      <div className="flex h-max flex-col items-center gap-2">
        <Fader defaultValue={50} max={100} min={0} step={1} thumbMarks={1} />
        <p className="text-center text-muted-foreground text-xs">1 mark</p>
      </div>

      <div className="flex h-max flex-col items-center gap-2">
        <Fader defaultValue={50} max={100} min={0} step={1} thumbMarks={4} />
        <p className="text-center text-muted-foreground text-xs">4 marks</p>
      </div>
    </div>
  );
}

const examples = [
  { component: FaderVerticalDemo, title: "Fader Vertical" },
  { component: FaderHorizontalDemo, title: "Fader Horizontal" },
  { component: FaderSizeVariantsDemo, title: "Fader Size Variants" },
  { component: FaderThumbMarksVariantsDemo, title: "Fader Thumb Marks Variants" },
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
