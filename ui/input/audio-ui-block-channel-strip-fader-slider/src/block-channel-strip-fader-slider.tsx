/**
 * BlockChannelStripFaderSlider — Audio UI's `block-channel-strip-fader-slider` (see ../upstream/examples/block-channel-strip-fader-slider.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { useId } from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripHeader, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Fader } from "./fader";

export type BlockChannelStripFaderSliderProps = {
  label?: string;
  value: number;
  onValueChange: (value: number) => void;
  /** Fires once when a drag or key press settles. */
  onValueCommit?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  "aria-label"?: string;
};

/** A horizontal fader with its label and readout on one header row, like a settings slider. */
export function BlockChannelStripFaderSlider({
  label = "Fader",
  value,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  formatValue = (v) => `${v}%`,
  "aria-label": ariaLabel = "Fader control",
}: BlockChannelStripFaderSliderProps) {
  const faderId = useId();
  const labelId = useId();
  const valueId = useId();
  return (
    <ChannelStrip aria-label={ariaLabel} orientation="horizontal">
      <ChannelStripHeader>
        <ChannelStripLabel id={labelId}>{label}</ChannelStripLabel>
        <ChannelStripValue id={valueId} title={formatValue(value)}>
          {formatValue(value)}
        </ChannelStripValue>
      </ChannelStripHeader>
      <ChannelStripContent>
        <ChannelStripSection>
          <Fader aria-describedby={valueId} aria-labelledby={labelId} id={faderId} max={max} min={min} onValueChange={onValueChange} onValueCommit={onValueCommit} step={step} value={value} />
        </ChannelStripSection>
      </ChannelStripContent>
    </ChannelStrip>
  );
}
