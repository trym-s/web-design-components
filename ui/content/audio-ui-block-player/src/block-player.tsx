/**
 * BlockPlayer — Audio UI's `block-player` (see ../upstream/examples/block-player.tsx). It reads the player state from the
 * nearest `AudioPlayerProvider`, so its content and behaviour arrive through that provider's props.
 * MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { AudioPlayer, AudioPlayerControlBar, AudioPlayerControlGroup, AudioPlayerPlay, AudioPlayerSeekBar, AudioPlayerSkipBack, AudioPlayerSkipForward, AudioPlayerTimeDisplay, AudioPlayerVolume, AudioQueue } from "./player";

export function BlockPlayer() {
  return (
    <AudioPlayer>
      <AudioPlayerControlBar variant="stacked">
        <AudioPlayerControlGroup>
          <AudioPlayerTimeDisplay />
          <AudioPlayerSeekBar />
          <AudioPlayerTimeDisplay remaining />
        </AudioPlayerControlGroup>
        <AudioPlayerControlGroup>
          <AudioPlayerControlGroup>
            <AudioPlayerSkipBack />
            <AudioPlayerPlay />
            <AudioPlayerSkipForward />
          </AudioPlayerControlGroup>
          <AudioPlayerVolume />
          <AudioQueue />
        </AudioPlayerControlGroup>
      </AudioPlayerControlBar>
    </AudioPlayer>
  );
}
