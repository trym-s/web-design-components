"use client";

import {
  AudioTrack,
  AudioTrackCover,
  AudioTrackPlayPauseAction,
} from "../../../../_sources/audio-ui/registry-audio/bases/base/audio/player";

export default function AudioTrackDemo() {
  return (
    <AudioTrack
      actions={<AudioTrackPlayPauseAction />}
      className="w-full"
      media={<AudioTrackCover />}
      trackId={"4"}
    />
  );
}
