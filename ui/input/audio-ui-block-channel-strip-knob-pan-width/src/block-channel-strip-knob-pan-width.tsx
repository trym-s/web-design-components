/**
 * BlockChannelStripKnobPanWidth — Audio UI's `block-channel-strip-knob-pan-width` (see ../upstream/examples/block-channel-strip-knob-pan-width.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { useId } from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripFooter, ChannelStripHeader, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Knob } from "./knob";

/** `C` at zero, else `L<n>` / `R<n>`. */
export function formatPan(value: number): string {
  if (value === 0) return "C";
  return value < 0 ? `L${Math.abs(value)}` : `R${value}`;
}

/** Sign on positive values: `+12`, `0`, `-12`. */
export function formatSigned(value: number): string {
  return `${value > 0 ? "+" : ""}${value}`;
}

export type BlockChannelStripKnobPanWidthProps = {
  title?: string;
  footer?: string;
  /** -100 (left) … 100 (right). */
  pan: number;
  onPanChange: (value: number) => void;
  /** -100 (narrow) … 100 (wide). */
  width: number;
  onWidthChange: (value: number) => void;
  onPanCommit?: (value: number) => void;
  onWidthCommit?: (value: number) => void;
};

function Control({ label, value, format, onValueChange, onValueCommit }: { label: string; value: number; format: (value: number) => string; onValueChange: (value: number) => void; onValueCommit?: (value: number) => void }) {
  const knobId = useId();
  const labelId = useId();
  const valueId = useId();
  return (
    <ChannelStripSection>
      <ChannelStripLabel id={labelId}>{label}</ChannelStripLabel>
      <Knob
        anchor={0}
        aria-describedby={valueId}
        aria-labelledby={labelId}
        id={knobId}
        max={100}
        min={-100}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        size="lg"
        value={value}
      />
      <ChannelStripValue id={valueId}>{format(value)}</ChannelStripValue>
    </ChannelStripSection>
  );
}

/** Two centre-anchored knobs in one strip: stereo position and stereo width. */
export function BlockChannelStripKnobPanWidth({ title = "Pan / Width", footer = "Output", pan, onPanChange, onPanCommit, width, onWidthChange, onWidthCommit }: BlockChannelStripKnobPanWidthProps) {
  return (
    <ChannelStrip aria-label="Pan and width controls">
      <ChannelStripHeader>{title}</ChannelStripHeader>
      <ChannelStripContent layout="row">
        <Control format={formatPan} label="Pan" onValueChange={onPanChange} onValueCommit={onPanCommit} value={pan} />
        <Control format={formatSigned} label="Width" onValueChange={onWidthChange} onValueCommit={onWidthCommit} value={width} />
      </ChannelStripContent>
      <ChannelStripFooter>{footer}</ChannelStripFooter>
    </ChannelStrip>
  );
}
