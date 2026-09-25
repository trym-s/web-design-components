import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioQueue,
  AudioQueuePreferences,
  AudioQueueRepeatMode,
  AudioQueueShuffle,
} from "../../../../_sources/audio-ui/registry-audio/bases/base/audio/player";

export default function AudioQueueAllControlsDemo() {
  return (
    <AudioPlayer className="w-max">
      <AudioPlayerControlBar>
        <AudioQueueShuffle />
        <AudioQueueRepeatMode />
        <AudioQueuePreferences />
        <AudioQueue />
      </AudioPlayerControlBar>
    </AudioPlayer>
  );
}
