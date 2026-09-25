import * as React from "react";
import { AudioPlayerProvider, AudioTrack, AudioTrackCover, AudioTrackList, AudioTrackPlayPauseAction, type AudioPlayerState, type Track, useAudioPlayer } from "./player";

const tracks: Track[] = [
  { album: "Pixabay Music", artist: "Flavio Concini", duration: 146, id: "1", title: "Beautiful Loop" },
  { album: "Pixabay Music", artist: "Aliabbas Abasov", duration: 122, id: "2", title: "Type" },
  { artist: "Audio UI", id: "4", live: true, title: "Live Radio" },
];

/** Stand-in for your audio engine: holds the player state and advances the clock while playing. */
function useDemoPlayer(initial: Track[]) {
  const [state, setState] = React.useState<AudioPlayerState>({
    bufferedTime: 0,
    currentIndex: 0,
    currentTime: 0,
    duration: initial[0]?.duration ?? 0,
    insertMode: "last",
    isPlaying: false,
    muted: false,
    playbackRate: 1,
    queue: initial,
    repeatMode: "none",
    shuffle: false,
    volume: 0.8,
  });
  const load = (index: number) =>
    setState((s) => {
      const track = s.queue[index];
      if (!track) return s;
      return { ...s, bufferedTime: 0, currentIndex: index, currentTime: 0, duration: track.live ? Number.POSITIVE_INFINITY : (track.duration ?? 0), isPlaying: true };
    });
  const step = (by: number) =>
    setState((s) => {
      const next = s.currentIndex + by;
      const index = s.repeatMode === "all" ? (next + s.queue.length) % s.queue.length : next;
      const track = s.queue[index];
      if (!track) return { ...s, isPlaying: false };
      return { ...s, bufferedTime: 0, currentIndex: index, currentTime: 0, duration: track.live ? Number.POSITIVE_INFINITY : (track.duration ?? 0) };
    });
  React.useEffect(() => {
    if (!state.isPlaying) return;
    const timer = setInterval(() => {
      setState((s) => {
        if (!Number.isFinite(s.duration)) return s;
        const currentTime = s.currentTime + 0.25 * s.playbackRate;
        if (currentTime < s.duration) return { ...s, bufferedTime: Math.min(s.duration, currentTime + 30), currentTime };
        if (s.repeatMode === "one") return { ...s, currentTime: 0 };
        const index = s.currentIndex + 1 < s.queue.length ? s.currentIndex + 1 : s.repeatMode === "all" ? 0 : -1;
        const track = s.queue[index];
        return track ? { ...s, currentIndex: index, currentTime: 0, duration: track.live ? Number.POSITIVE_INFINITY : (track.duration ?? 0) } : { ...s, currentTime: 0, isPlaying: false };
      });
    }, 250);
    return () => clearInterval(timer);
  }, [state.isPlaying]);
  return {
    onClearQueue: () => setState((s) => ({ ...s, currentIndex: -1, isPlaying: false, queue: [] })),
    onInsertModeChange: (insertMode: AudioPlayerState["insertMode"]) => setState((s) => ({ ...s, insertMode })),
    onMutedChange: (muted: boolean) => setState((s) => ({ ...s, muted })),
    onNext: () => step(1),
    onPlayPause: () => setState((s) => ({ ...s, isPlaying: !s.isPlaying })),
    onPlaybackRateChange: (playbackRate: number) => setState((s) => ({ ...s, playbackRate })),
    onPlayTrack: load,
    onPrevious: () => step(-1),
    onRemoveTrack: (id: string) =>
      setState((s) => {
        const queue = s.queue.filter((t) => t.id !== id);
        return { ...s, currentIndex: queue.findIndex((t) => t.id === s.queue[s.currentIndex]?.id), queue };
      }),
    onReorder: (queue: Track[]) => setState((s) => ({ ...s, currentIndex: queue.findIndex((t) => t.id === s.queue[s.currentIndex]?.id), queue })),
    onRepeatModeChange: (repeatMode: AudioPlayerState["repeatMode"]) => setState((s) => ({ ...s, repeatMode })),
    onSeek: (currentTime: number) => setState((s) => ({ ...s, currentTime })),
    onShuffleChange: (shuffle: boolean) => setState((s) => ({ ...s, shuffle })),
    onVolumeChange: (volume: number) => setState((s) => ({ ...s, muted: false, volume })),
    state,
  };
}

function AudioTrackDemo() {
  return (
    <AudioTrack
      actions={<AudioTrackPlayPauseAction />}
      className="w-full"
      media={<AudioTrackCover />}
      track={tracks[2]}
    />
  );
}

function AudioTrackListDemo() {
  const { queue } = useAudioPlayer();

  return (
    <AudioTrackList
      className="w-full"
      onTrackSelect={(index) => {
        const track = queue[index];
        console.info(`Playing: ${track?.title}`);
      }}
    />
  );
}

function AudioTrackListGridDemo() {
  const { queue } = useAudioPlayer();

  return (
    <AudioTrackList
      className="w-full"
      onTrackSelect={(index) => {
        const track = queue[index];
        console.info(`Playing: ${track?.title}`);
      }}
      variant="grid"
    />
  );
}

function AudioTrackSortableListDemo() {
  const { queue } = useAudioPlayer();

  return (
    <AudioTrackList
      className="w-full"
      mode="sortable"
      onTrackSelect={(index) => {
        const track = queue[index];
        console.info(`Playing ${track?.title}`);
      }}
    />
  );
}

function AudioTrackSortableListGridDemo() {
  const { queue } = useAudioPlayer();

  return (
    <AudioTrackList
      className="w-full"
      mode="sortable"
      onTrackSelect={(index) => {
        const track = queue[index];
        console.info(`Playing ${track?.title}`);
      }}
      variant="grid"
    />
  );
}

const examples = [
  { component: AudioTrackDemo, title: "Track" },
  { component: AudioTrackListDemo, title: "Track List" },
  { component: AudioTrackListGridDemo, title: "Track List Grid" },
  { component: AudioTrackSortableListDemo, title: "Track Sortable List" },
  { component: AudioTrackSortableListGridDemo, title: "Track Sortable List Grid" },
];

export default function Demo() {
  const player = useDemoPlayer(tracks);
  return (
    <AudioPlayerProvider {...player}>
      <div className="flex w-full max-w-2xl justify-center">
        <div className="flex w-full max-w-2xl flex-col gap-6">
          {examples.map(({ title, component: Example }) => (
            <section className="flex flex-col gap-3" key={title}>
              <h3 className="text-muted-foreground text-xs">{title}</h3>
              <div className="flex min-h-40 items-center justify-center rounded-xl border p-6">
                <Example />
              </div>
            </section>
          ))}
        </div>
      </div>
    </AudioPlayerProvider>
  );
}
