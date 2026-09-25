/**
 * BlockChannelStripKnobMulti — Audio UI's `block-channel-strip-knob-multi` (see ../upstream/examples/block-channel-strip-knob-multi.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { useId } from "react";
import { ChannelStrip, ChannelStripContent, ChannelStripFooter, ChannelStripHeader, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Knob } from "./knob";

export type BlockChannelStripKnobMultiEffect = { id: string; label: string; value: number };

export type BlockChannelStripKnobMultiProps = {
  effects: BlockChannelStripKnobMultiEffect[];
  onValueChange: (id: string, value: number) => void;
  onValueCommit?: (id: string, value: number) => void;
  /** Caption under every strip. */
  footer?: string;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
};

function Strip({ item, footer, min, max, step, formatValue, onValueChange, onValueCommit }: { item: BlockChannelStripKnobMultiEffect } & Required<Pick<BlockChannelStripKnobMultiProps, "footer" | "min" | "max" | "step" | "formatValue" | "onValueChange">> & Pick<BlockChannelStripKnobMultiProps, "onValueCommit">) {
  const controlId = useId();
  const labelId = useId();
  const valueId = useId();
  return (
    <ChannelStrip aria-labelledby={labelId}>
      <ChannelStripHeader id={labelId}>{item.label}</ChannelStripHeader>
      <ChannelStripContent>
        <ChannelStripSection>
          <Knob
            aria-describedby={valueId}
            aria-labelledby={labelId}
            id={controlId}
            max={max}
            min={min}
            onValueChange={(value) => onValueChange(item.id, value)}
            onValueCommit={onValueCommit && ((value) => onValueCommit(item.id, value))} size="lg"
            step={step}
            value={item.value}
          />
          <ChannelStripValue id={valueId}>{formatValue(item.value)}</ChannelStripValue>
        </ChannelStripSection>
      </ChannelStripContent>
      <ChannelStripFooter>{footer}</ChannelStripFooter>
    </ChannelStrip>
  );
}

/** One strip per effect, side by side, like a mixer bank. */
export function BlockChannelStripKnobMulti({ effects, footer = "FX", min = 0, max = 100, step = 1, formatValue = (v) => `${v}%`, onValueChange, onValueCommit }: BlockChannelStripKnobMultiProps) {
  return (
    <section className="flex gap-3">
      {effects.map((item) => (
        <Strip footer={footer} formatValue={formatValue} item={item} key={item.id} max={max} min={min} onValueChange={onValueChange} onValueCommit={onValueCommit} step={step} />
      ))}
    </section>
  );
}
