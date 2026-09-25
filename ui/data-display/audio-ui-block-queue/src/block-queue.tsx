/**
 * BlockQueue — Audio UI's `block-queue` (see ../upstream/examples/block-queue.tsx). It reads the player state from the
 * nearest `AudioPlayerProvider`, so its content and behaviour arrive through that provider's props.
 * MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { AudioPlayer, AudioPlayerControlBar, AudioPlayerControlGroup, AudioQueue, AudioQueuePreferences, AudioQueueRepeatMode, AudioQueueShuffle } from "./player";

export function BlockQueue() {
  return (
    <AudioPlayer>
      <AudioPlayerControlBar>
        <AudioPlayerControlGroup className="justify-end">
          <AudioQueueShuffle />
          <AudioQueueRepeatMode />
          <AudioQueuePreferences />
          <AudioQueue />
        </AudioPlayerControlGroup>
      </AudioPlayerControlBar>
    </AudioPlayer>
  );
}
