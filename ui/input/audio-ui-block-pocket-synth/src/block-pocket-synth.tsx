/**
 * BlockPocketSynth — Audio UI's `block-pocket-synth` (see ../upstream/examples/block-pocket-synth.tsx) as a
 * control surface: the XY pad, waveform and filter selectors and volume report through callbacks, and
 * the sound engine stays with the caller (demo.tsx wires a Web Audio oscillator as an example).
 * MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import * as React from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Fader } from "./fader";
import { cn } from "./lib/utils";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { XYPad } from "./xypad";

export type Waveform = "sine" | "triangle" | "sawtooth" | "square";
export type FilterType = "lowpass" | "highpass" | "bandpass" | "allpass";
type Point = { x: number; y: number };

export const WAVEFORMS: { label: string; value: Waveform; path: string }[] = [
  { label: "Sine wave", path: "M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0", value: "sine" },
  { label: "Triangle wave", path: "M2 12l5-6 5 12 5-12 5 6", value: "triangle" },
  { label: "Sawtooth wave", path: "M2 18l8-12v12l8-12v12", value: "sawtooth" },
  { label: "Square wave", path: "M2 18h4V6h6v12h4V6h6", value: "square" },
];

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "AP", value: "allpass" },
  { label: "LP", value: "lowpass" },
  { label: "HP", value: "highpass" },
  { label: "BP", value: "bandpass" },
];

export function WaveformIcon({ path, label }: { path: string; label: string }) {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <title>{label}</title>
      <path d={path} />
    </svg>
  );
}

export type BlockPocketSynthProps = {
  /** Pad position, each axis 0…1 (x = pitch, y = filter cutoff in the upstream mapping). */
  position: Point;
  /** While the pad is pressed or dragged: start or update the note. */
  onPositionChange: (position: Point) => void;
  /** Pointer released / key press settled: stop the note. */
  onRelease?: () => void;
  waveform: Waveform;
  onWaveformChange: (waveform: Waveform) => void;
  filterType: FilterType;
  onFilterTypeChange: (filterType: FilterType) => void;
  /** 0…1. */
  volume: number;
  onVolumeChange: (volume: number) => void;
  /** Pad readout; receives the position (0…1 per axis). Defaults to percentages. */
  formatPosition?: (position: Point) => React.ReactNode;
  className?: string;
};

export function BlockPocketSynth({
  position,
  onPositionChange,
  onRelease,
  waveform,
  onWaveformChange,
  filterType,
  onFilterTypeChange,
  volume,
  onVolumeChange,
  formatPosition = (p) => `${Math.round(p.x * 100)}, ${Math.round(p.y * 100)}`,
  className,
}: BlockPocketSynthProps) {
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
            <WaveformIcon label={label} path={path} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup className="w-full" onValueChange={(values) => values[0] && onFilterTypeChange(values[0] as FilterType)} size="sm" value={[filterType]} variant="outline">
        {FILTERS.map(({ label, value }) => (
          <ToggleGroupItem aria-label={label} className="flex-1" key={value} value={value}>
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
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
