/**
 * BlockWaveShaper — Audio UI's `block-wave-shaper` (see ../upstream/examples/block-wave-shaper.tsx) as a
 * control surface: pad, waveform selector, four shaper knobs and volume report through callbacks, and
 * the sound engine stays with the caller (demo.tsx wires a Web Audio graph as an example).
 * MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import * as React from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Fader } from "./fader";
import { Knob } from "./knob";
import { cn } from "./lib/utils";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { XYPad } from "./xypad";

export type Waveform = "sine" | "triangle" | "sawtooth" | "square";
type Point = { x: number; y: number };

export type ShaperParams = {
  /** Distortion amount, 0…100. */
  drive: number;
  /** Post-shaper low-pass brightness, 0…100. */
  tone: number;
  /** Second oscillator detune in cents, -50…50. */
  detune: number;
  /** Dry/wet, 0…100 %. */
  mix: number;
};

const WAVEFORMS: { label: string; value: Waveform; path: string }[] = [
  { label: "Sine wave", path: "M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0", value: "sine" },
  { label: "Triangle wave", path: "M2 12l5-6 5 12 5-12 5 6", value: "triangle" },
  { label: "Sawtooth wave", path: "M2 18l8-12v12l8-12v12", value: "sawtooth" },
  { label: "Square wave", path: "M2 18h4V6h6v12h4V6h6", value: "square" },
];

const KNOBS: { key: keyof ShaperParams; label: string; min: number; max: number; anchor?: number; format: (v: number) => string }[] = [
  { format: String, key: "drive", label: "Drive", max: 100, min: 0 },
  { format: String, key: "tone", label: "Tone", max: 100, min: 0 },
  { anchor: 0, format: (v) => `${v > 0 ? "+" : ""}${v}`, key: "detune", label: "Detune", max: 50, min: -50 },
  { format: (v) => `${v}%`, key: "mix", label: "Mix", max: 100, min: 0 },
];

function ShaperKnob({ label, value, min, max, anchor, format, onValueChange }: (typeof KNOBS)[number] & { value: number; onValueChange: (v: number) => void }) {
  const id = React.useId();
  const labelId = React.useId();
  const valueId = React.useId();
  return (
    <ChannelStripSection>
      <ChannelStripLabel id={labelId}>{label}</ChannelStripLabel>
      <Knob anchor={anchor} aria-describedby={valueId} aria-labelledby={labelId} id={id} max={max} min={min} onValueChange={onValueChange} size="sm" step={1} value={value} />
      <ChannelStripValue id={valueId}>{format(value)}</ChannelStripValue>
    </ChannelStripSection>
  );
}

export type BlockWaveShaperProps = {
  /** Pad position, each axis 0…1 (x = pitch, y = filter resonance in the upstream mapping). */
  position: Point;
  /** While the pad is pressed or dragged: start or update the note. */
  onPositionChange: (position: Point) => void;
  /** Pointer released / key press settled: stop the note. */
  onRelease?: () => void;
  waveform: Waveform;
  onWaveformChange: (waveform: Waveform) => void;
  params: ShaperParams;
  onParamChange: (key: keyof ShaperParams, value: number) => void;
  /** 0…1. */
  volume: number;
  onVolumeChange: (volume: number) => void;
  /** Pad readout; receives the position (0…1 per axis). Defaults to percentages. */
  formatPosition?: (position: Point) => React.ReactNode;
  className?: string;
};

export function BlockWaveShaper({
  position,
  onPositionChange,
  onRelease,
  waveform,
  onWaveformChange,
  params,
  onParamChange,
  volume,
  onVolumeChange,
  formatPosition = (p) => `${Math.round(p.x * 100)}, ${Math.round(p.y * 100)}`,
  className,
}: BlockWaveShaperProps) {
  const faderId = React.useId();
  const faderLabelId = React.useId();
  const faderValueId = React.useId();
  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-4 rounded-xl border bg-card p-4", className)}>
      <XYPad
        formatValue={(v) => formatPosition({ x: v.x / 100, y: v.y / 100 })}
        maxX={100}
        maxY={100}
        minX={0}
        minY={0}
        onValueChange={(v) => onPositionChange({ x: v.x / 100, y: v.y / 100 })}
        onValueCommit={() => onRelease?.()}
        value={{ x: position.x * 100, y: position.y * 100 }}
      />
      <ToggleGroup className="w-full" onValueChange={(values) => values[0] && onWaveformChange(values[0] as Waveform)} size="sm" value={[waveform]} variant="outline">
        {WAVEFORMS.map(({ label, path, value }) => (
          <ToggleGroupItem aria-label={label} className="flex-1" key={value} value={value}>
            <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <title>{label}</title>
              <path d={path} />
            </svg>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ChannelStrip aria-label="Shaper controls" className="w-full">
        <ChannelStripContent layout="row">
          {KNOBS.map((knob) => (
            <ShaperKnob {...knob} key={knob.key} onValueChange={(v) => onParamChange(knob.key, v)} value={params[knob.key]} />
          ))}
        </ChannelStripContent>
      </ChannelStrip>
      <ChannelStrip aria-label="Volume" orientation="horizontal">
        <ChannelStripContent>
          <ChannelStripSection>
            <ChannelStripLabel id={faderLabelId}>Volume</ChannelStripLabel>
            <Fader aria-describedby={faderValueId} aria-labelledby={faderLabelId} id={faderId} max={1} min={0} onValueChange={onVolumeChange} step={0.01} value={volume} />
            <ChannelStripValue id={faderValueId}>{Math.round(volume * 100)}%</ChannelStripValue>
          </ChannelStripSection>
        </ChannelStripContent>
      </ChannelStrip>
    </div>
  );
}
