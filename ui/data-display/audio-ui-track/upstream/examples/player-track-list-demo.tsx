"use client";
import { toast } from "sonner";
import { AudioTrackList } from "../../../../_sources/audio-ui/registry-audio/bases/base/audio/player";
import { useQueueState } from "../../../../_sources/audio-ui/registry-audio/bases/base/lib/audio-store";

export default function AudioTrackListDemo() {
  const { queue } = useQueueState();

  return (
    <AudioTrackList
      className="w-full"
      onTrackSelect={(index) => {
        const track = queue[index];
        toast.info(`Playing: ${track?.title}`);
      }}
    />
  );
}
