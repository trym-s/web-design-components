/**
 * BlockChannelStripHorizontal — Audio UI's `block-channel-strip-horizontal` (see ../upstream/examples/block-channel-strip-horizontal.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { useId } from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripFooter, ChannelStripHeader, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Fader } from "./fader";

export type BlockChannelStripHorizontalProps = {
  /** Strip title. */
  title?: string;
  /** Control label. */
  label?: string;
  /** Caption under the strip, such as the bus it feeds. */
  footer?: string;
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

export function BlockChannelStripHorizontal({
  title = "Channel 1",
  label = "Volume",
  footer = "Output",
  value,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  formatValue = (v) => `${v}%`,
  "aria-label": ariaLabel = "Channel 1 strip horizontal",
}: BlockChannelStripHorizontalProps) {
  const id = useId();
  return (
    <ChannelStrip aria-label={ariaLabel} orientation="horizontal">
      <ChannelStripHeader>{title}</ChannelStripHeader>
      <ChannelStripContent>
        <ChannelStripSection>
          <ChannelStripLabel>{label}</ChannelStripLabel>
          <Fader aria-label={label} id={id} max={max} min={min} onValueChange={onValueChange} onValueCommit={onValueCommit} step={step} value={value} />
          <ChannelStripValue>{formatValue(value)}</ChannelStripValue>
        </ChannelStripSection>
      </ChannelStripContent>
      <ChannelStripFooter>{footer}</ChannelStripFooter>
    </ChannelStrip>
  );
}
