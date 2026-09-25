/**
 * BlockChannelStripTransport — Audio UI's `block-channel-strip-transport` (see ../upstream/examples/block-channel-strip-transport.tsx) with its content and state
 * lifted into props. MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { ChannelStrip, ChannelStripContent, ChannelStripFooter, ChannelStripHeader, ChannelStripSection, ChannelStripValue } from "./channel-strip";
import { Transport } from "./transport";

export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export type BlockChannelStripTransportProps = {
  title?: string;
  /** Seconds. */
  currentTime: number;
  /** Seconds; must be > 0. */
  duration: number;
  /** Seconds buffered from the start. */
  bufferedTime?: number;
  /** Called with the new position in seconds while scrubbing. */
  onSeek: (time: number) => void;
};

/** A track's playhead in a channel strip, with `current / total` underneath. */
export function BlockChannelStripTransport({ title = "Track 1", currentTime, duration, bufferedTime = 0, onSeek }: BlockChannelStripTransportProps) {
  return (
    <ChannelStrip aria-label="Transport" orientation="horizontal">
      <ChannelStripHeader>{title}</ChannelStripHeader>
      <ChannelStripContent>
        <ChannelStripSection>
          <Transport
            aria-label="Seek"
            bufferedValue={(bufferedTime / duration) * 100}
            onSeek={(percent) => onSeek((percent / 100) * duration)}
            value={(currentTime / duration) * 100}
          />
        </ChannelStripSection>
      </ChannelStripContent>
      <ChannelStripFooter>
        <ChannelStripValue>
          {formatTime(currentTime)} / {formatTime(duration)}
        </ChannelStripValue>
      </ChannelStripFooter>
    </ChannelStrip>
  );
}
