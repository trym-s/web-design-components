/**
 * BlockChannelStripXypadReverb — Audio UI's `block-channel-strip-xypad-reverb` (see ../upstream/examples/block-channel-strip-xypad-reverb.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { useId } from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripHeader, ChannelStripLabel, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Knob } from "./knob";
import { XYPad } from "./xypad";

type Point = { x: number; y: number };

export type BlockChannelStripXypadReverbProps = {
  title?: string;
  /** x = colour, y = space, both -100…100. */
  morph: Point;
  onMorphChange: (value: Point) => void;
  onMorphCommit?: (value: Point) => void;
  /** Wet level, 0…100. */
  wet: number;
  onWetChange: (value: number) => void;
  onWetCommit?: (value: number) => void;
};

/** A reverb's character on a bipolar pad plus its wet level on a knob. */
export function BlockChannelStripXypadReverb({ title = "Reverb", morph, onMorphChange, onMorphCommit, wet, onWetChange, onWetCommit }: BlockChannelStripXypadReverbProps) {
  const knobId = useId();
  const knobLabelId = useId();
  const knobValueId = useId();
  return (
    <ChannelStrip aria-label="Reverb pad">
      <ChannelStripHeader>{title}</ChannelStripHeader>
      <ChannelStripContent>
        <ChannelStripSection>
          <XYPad
            className="aspect-square"
            formatValue={(next) => `Color ${next.x} | Space ${next.y}`}
            maxX={100}
            maxY={100}
            minX={-100}
            minY={-100}
            onValueChange={onMorphChange}
            onValueCommit={onMorphCommit}
            stepX={1}
            stepY={1}
            value={morph}
          />
        </ChannelStripSection>
        <ChannelStripSection>
          <ChannelStripLabel id={knobLabelId}>Wet</ChannelStripLabel>
          <Knob
            aria-describedby={knobValueId}
            aria-labelledby={knobLabelId}
            id={knobId}
            max={100}
            min={0}
            onValueChange={onWetChange}
            onValueCommit={onWetCommit}
            size="sm"
            value={wet}
          />
          <ChannelStripValue id={knobValueId}>{wet}%</ChannelStripValue>
        </ChannelStripSection>
      </ChannelStripContent>
    </ChannelStrip>
  );
}
