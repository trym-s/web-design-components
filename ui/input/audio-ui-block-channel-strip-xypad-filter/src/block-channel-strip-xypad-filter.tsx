/**
 * BlockChannelStripXypadFilter — Audio UI's `block-channel-strip-xypad-filter` (see ../upstream/examples/block-channel-strip-xypad-filter.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { ChannelStrip, ChannelStripContent, ChannelStripFooter, ChannelStripHeader, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { XYPad } from "./xypad";

type Point = { x: number; y: number };

export type BlockChannelStripXypadFilterProps = {
  title?: string;
  label?: string;
  footer?: string;
  /** x = cutoff, y = resonance, both 0…100. */
  value: Point;
  onValueChange: (value: Point) => void;
  onValueCommit?: (value: Point) => void;
  formatValue?: (value: Point) => string;
};

/** A filter's cutoff and resonance on one square pad. */
export function BlockChannelStripXypadFilter({
  title = "Channel 1",
  label = "Filter",
  footer = "Output",
  value,
  onValueChange,
  onValueCommit,
  formatValue = (v) => `Cut ${v.x}% · Res ${v.y}%`,
}: BlockChannelStripXypadFilterProps) {
  return (
    <ChannelStrip aria-label="Channel strip with XY filter">
      <ChannelStripHeader>{title}</ChannelStripHeader>
      <ChannelStripContent>
        <ChannelStripSection>
          <ChannelStripLabel>{label}</ChannelStripLabel>
          <XYPad
            className="aspect-square"
            maxX={100}
            maxY={100}
            minX={0}
            minY={0}
            onValueChange={onValueChange}
            onValueCommit={onValueCommit}
            size="sm"
            stepX={1}
            stepY={1}
            value={value}
            valueDisplay="hidden"
          />
          <ChannelStripValue>{formatValue(value)}</ChannelStripValue>
        </ChannelStripSection>
      </ChannelStripContent>
      <ChannelStripFooter>{footer}</ChannelStripFooter>
    </ChannelStrip>
  );
}
