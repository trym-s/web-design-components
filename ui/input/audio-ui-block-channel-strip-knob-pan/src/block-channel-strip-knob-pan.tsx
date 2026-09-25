/**
 * BlockChannelStripKnobPan — Audio UI's `block-channel-strip-knob-pan` (see ../upstream/examples/block-channel-strip-knob-pan.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { useId } from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripFooter, ChannelStripHeader, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Knob, type KnobProps } from "./knob";

/** `C` at zero, else `L<n>` / `R<n>`. */
export function formatPan(value: number): string {
  if (value === 0) return "C";
  return value < 0 ? `L${Math.abs(value)}` : `R${value}`;
}

export type BlockChannelStripKnobPanProps = {
  title?: string;
  label?: string;
  footer?: string;
  value: number;
  onValueChange: (value: number) => void;
  /** Fires once when a drag, wheel or key press settles. */
  onValueCommit?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: KnobProps["size"];
  formatValue?: (value: number) => string;
  "aria-label"?: string;
};

export function BlockChannelStripKnobPan({
  title = "Channel 1",
  label = "Pan",
  footer = "Output",
  value,
  onValueChange,
  onValueCommit,
  min = -100,
  max = 100,
  step = 1,
  size = "lg",
  formatValue = formatPan,
  "aria-label": ariaLabel = "Pan control strip",
}: BlockChannelStripKnobPanProps) {
  const knobId = useId();
  const labelId = useId();
  const valueId = useId();
  return (
    <ChannelStrip aria-label={ariaLabel}>
      <ChannelStripHeader>{title}</ChannelStripHeader>
      <ChannelStripContent>
        <ChannelStripSection>
          <ChannelStripLabel id={labelId}>{label}</ChannelStripLabel>
          <Knob anchor={0}
            aria-describedby={valueId}
            aria-labelledby={labelId}
            id={knobId}
            max={max}
            min={min}
            onValueChange={onValueChange}
            onValueCommit={onValueCommit}
            size={size}
            step={step}
            value={value}
          />
          <ChannelStripValue id={valueId} title={formatValue(value)}>
            {formatValue(value)}
          </ChannelStripValue>
        </ChannelStripSection>
      </ChannelStripContent>
      <ChannelStripFooter>{footer}</ChannelStripFooter>
    </ChannelStrip>
  );
}
