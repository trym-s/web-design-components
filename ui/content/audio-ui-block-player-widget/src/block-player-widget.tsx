/**
 * BlockPlayerWidget — Audio UI's `block-player-widget` (see ../upstream/examples/block-player-widget.tsx). It reads the player state from the
 * nearest `AudioPlayerProvider`, so its content and behaviour arrive through that provider's props.
 * MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { AudioPlayer, AudioPlayerControlBar, AudioPlayerControlGroup, AudioPlayerPlay, AudioPlayerSeekBar, AudioPlayerSkipBack, AudioPlayerSkipForward, AudioPlayerTimeDisplay, AudioPlayerVolume, AudioQueueRepeatMode, AudioQueueShuffle, AudioTrackList } from "./player";

export function BlockPlayerWidget() {
  return (
    <AudioPlayer variant="widget">
      <AudioTrackList />
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
          <AudioQueueShuffle />
          <AudioQueueRepeatMode />
          <AudioPlayerVolume />
        </AudioPlayerControlGroup>
      </AudioPlayerControlBar>
    </AudioPlayer>
  );
}
