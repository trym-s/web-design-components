import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioQueue,
  AudioQueueRepeatMode,
  AudioQueueShuffle,
} from "../../../../_sources/audio-ui/registry-audio/bases/base/audio/player";

export default function AudioQueueShuffleRepeatDemo() {
  return (
    <AudioPlayer className="w-max">
      <AudioPlayerControlBar>
        <AudioQueueShuffle />
        <AudioQueueRepeatMode />
        <AudioQueue />
      </AudioPlayerControlBar>
    </AudioPlayer>
  );
}
