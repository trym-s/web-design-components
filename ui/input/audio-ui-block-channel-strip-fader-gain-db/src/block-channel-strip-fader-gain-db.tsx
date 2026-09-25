/**
 * BlockChannelStripFaderGainDb — Audio UI's `block-channel-strip-fader-gain-db` (see ../upstream/examples/block-channel-strip-fader-gain-db.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { useId } from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Fader } from "./fader";

export type BlockChannelStripFaderGainDbProps = {
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

export function BlockChannelStripFaderGainDb({
  label = "Gain",
  value,
  onValueChange,
  onValueCommit,
  min = -60,
  max = 6,
  step = 1,
  formatValue = (v) => `${v > 0 ? `+${v}` : v} dB`,
  "aria-label": ariaLabel = "Gain control",
}: BlockChannelStripFaderGainDbProps) {
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
