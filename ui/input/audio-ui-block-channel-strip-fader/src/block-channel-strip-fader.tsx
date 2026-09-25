/**
 * BlockChannelStripFader — Audio UI's `block-channel-strip-fader` (see ../upstream/examples/block-channel-strip-fader.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { useId } from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Fader } from "./fader";

export type BlockChannelStripFaderProps = {
  label?: string;
  value: number;
  onValueChange: (value: number) => void;
  /** Fires once when a drag or key press settles. */
  onValueCommit?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Readout next to the fader; also its accessible description. */
  formatValue?: (value: number) => string;
  "aria-label"?: string;
};

export function BlockChannelStripFader({
  label = "Fader",
  value,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  formatValue = (v) => `${v}%`,
  "aria-label": ariaLabel = "Fader control",
}: BlockChannelStripFaderProps) {
  const faderId = useId();
  const labelId = useId();
  const valueId = useId();
  return (
    <ChannelStrip aria-label={ariaLabel}>
      <ChannelStripContent>
        <ChannelStripSection>
          <ChannelStripLabel id={labelId}>{label}</ChannelStripLabel>
          <Fader aria-describedby={valueId} aria-labelledby={labelId} id={faderId} max={max} min={min} onValueChange={onValueChange} onValueCommit={onValueCommit} step={step} value={value} />
          <ChannelStripValue id={valueId} title={formatValue(value)}>
            {formatValue(value)}
          </ChannelStripValue>
        </ChannelStripSection>
      </ChannelStripContent>
    </ChannelStrip>
  );
}
