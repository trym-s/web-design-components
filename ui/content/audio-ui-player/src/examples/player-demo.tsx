import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerPlay,
  AudioPlayerSeekBar,
  AudioPlayerTimeDisplay,
  AudioPlayerVolume,
} from "../../../../_sources/audio-ui/registry-audio/bases/base/audio/player";

export default function AudioDemoPlayer() {
  return (
    <AudioPlayer>
      <AudioPlayerControlBar>
        <AudioPlayerPlay />
        <AudioPlayerSeekBar />
        <AudioPlayerTimeDisplay />
        <AudioPlayerVolume />
      </AudioPlayerControlBar>
    </AudioPlayer>
  );
}
