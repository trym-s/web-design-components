/**
 * Audio Player — Audio UI's registry element (registry-audio/bases/base/audio/player.tsx) with the same
 * composable parts, made presentational: every part reads playback state from `AudioPlayerProvider`
 * and reports intent through its callbacks. Wire those to your own audio engine (an `<audio>` element,
 * Web Audio, a streaming SDK); nothing here plays sound. The Nova style hooks (`.cn-audio-*`) are inlined.
 * MIT License, Copyright (c) 2025 Ouest Labs — see ./audio-ui/LICENSE.
 */
import { cva, type VariantProps } from "class-variance-authority";
import {
  FastForwardIcon,
  ListMusicIcon,
  MusicIcon,
  PauseIcon,
  PlayIcon,
  RadioIcon,
  Repeat1Icon,
  RepeatIcon,
  RewindIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SlidersHorizontalIcon,
  GaugeIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { Fader } from "./fader";
import { cn } from "./lib/utils";
import { SortableDragHandle, SortableItem, SortableList } from "./sortable-list";
import { Transport } from "./transport";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, type buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";
import { Input } from "./ui/input";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item";
import { Spinner } from "./ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// ---------------------------------------------------------------- state and callbacks

export type Track = {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  artwork?: string;
  /** Seconds; omit when unknown. */
  duration?: number;
  /** A live stream: no seeking, no duration, "LIVE" instead of the remaining time. */
  live?: boolean;
};

export type RepeatMode = "none" | "one" | "all";
export type InsertMode = "first" | "last" | "after";

export type AudioPlayerState = {
  /** Tracks in play order. */
  queue: Track[];
  /** Index into `queue` of the loaded track; -1 when nothing is loaded. */
  currentIndex: number;
  isPlaying: boolean;
  /** Loading or buffering: the play button shows a spinner and is disabled. */
  isLoading?: boolean;
  /** Seconds. */
  currentTime: number;
  /** Seconds; `Infinity` for a live stream, 0 while unknown. */
  duration: number;
  /** Seconds buffered ahead of the start. */
  bufferedTime?: number;
  /** 0…1. */
  volume: number;
  muted: boolean;
  playbackRate: number;
  repeatMode: RepeatMode;
  shuffle: boolean;
  insertMode: InsertMode;
};

export type AudioPlayerCallbacks = {
  onPlayPause?: () => void;
  /** Seconds. */
  onSeek?: (time: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  /** 0…1. */
  onVolumeChange?: (volume: number) => void;
  onMutedChange?: (muted: boolean) => void;
  onPlaybackRateChange?: (rate: number) => void;
  onRepeatModeChange?: (mode: RepeatMode) => void;
  onShuffleChange?: (shuffle: boolean) => void;
  onInsertModeChange?: (mode: InsertMode) => void;
  /** Load and play `queue[index]`. */
  onPlayTrack?: (index: number) => void;
  onRemoveTrack?: (id: string) => void;
  /** The queue after a drag or keyboard reorder. */
  onReorder?: (queue: Track[]) => void;
  onClearQueue?: () => void;
};

type AudioPlayerContextValue = AudioPlayerState & AudioPlayerCallbacks & { currentTrack?: Track; isLive: boolean };

const AudioPlayerContext = React.createContext<AudioPlayerContextValue | null>(null);

export function useAudioPlayer() {
  const context = React.use(AudioPlayerContext);
  if (!context) throw new Error("Audio player parts must be rendered inside <AudioPlayerProvider>");
  return context;
}

/** Whether a duration means a live stream (0 only means "not known yet"). */
export function isLive(duration: number): boolean {
  return duration !== 0 && !Number.isFinite(duration);
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${rest < 10 ? "0" : ""}${rest}`;
}

/** Holds the player state for every part below it. Several players may share one provider. */
export function AudioPlayerProvider({ state, children, ...callbacks }: { state: AudioPlayerState; children: React.ReactNode } & AudioPlayerCallbacks) {
  const currentTrack = state.queue[state.currentIndex];
  const value = { ...state, ...callbacks, currentTrack, isLive: Boolean(currentTrack?.live) || isLive(state.duration) };
  return <AudioPlayerContext value={value}>{children}</AudioPlayerContext>;
}

// Space toggles playback when nothing else has focus; one listener however many play buttons are mounted.
let spacebarOwners = 0;
let spacebarToggle: (() => void) | undefined;
function onSpace(event: KeyboardEvent) {
  if (event.code === "Space" && event.target === document.body) {
    event.preventDefault();
    spacebarToggle?.();
  }
}
function useSpacebarTogglePlay(toggle: (() => void) | undefined) {
  React.useEffect(() => {
    spacebarToggle = toggle;
  }, [toggle]);
  React.useEffect(() => {
    if (spacebarOwners++ === 0) document.addEventListener("keydown", onSpace);
    return () => {
      if (--spacebarOwners === 0) document.removeEventListener("keydown", onSpace);
    };
  }, []);
}

// ---------------------------------------------------------------- glyphs

function PlayPauseGlyphSwap({ isPlaying }: { isPlaying: boolean }) {
  const swap = "flex items-center justify-center transition-[opacity,filter,scale] duration-250 ease-in-out will-change-[opacity,filter,scale] motion-reduce:transition-none";
  return (
    <span className="relative flex items-center justify-center">
      <span aria-hidden="true" className={cn("absolute inset-0", swap, isPlaying ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[2px]")}>
        <PauseIcon />
      </span>
      <span aria-hidden="true" className={cn(swap, isPlaying ? "scale-[0.25] opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-0")}>
        <PlayIcon />
      </span>
    </span>
  );
}

// ---------------------------------------------------------------- surface and layout

const audioPlayerVariants = cva(
  "before:-z-1 relative w-full before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:backdrop-blur-xl before:backdrop-saturate-150",
  {
    defaultVariants: { size: "default", variant: "default" },
    variants: {
      size: { default: "rounded-xl py-4", sm: "rounded-xl py-3" },
      variant: {
        default: "bg-card/70 ring-1 ring-foreground/10",
        ghost: "bg-transparent hover:bg-muted/30",
        widget: "bg-card/70 ring-1 ring-foreground/10",
      },
    },
  }
);

type AudioPlayerProps = React.ComponentProps<"div"> & VariantProps<typeof audioPlayerVariants>;

function AudioPlayer({ children, className, size, variant, ...props }: AudioPlayerProps) {
  return (
    <div
      className={cn(audioPlayerVariants({ size, variant }), className)}
      data-size={size ?? "default"}
      data-slot="audio-player"
      data-variant={variant ?? "default"}
      role="presentation"
      {...props}
    >
      {children}
    </div>
  );
}

interface AudioPlayerButtonProps extends React.ComponentProps<typeof Button> {
  tooltipLabel?: string;
}

function AudioPlayerButton({ tooltipLabel, className, ...props }: AudioPlayerButtonProps) {
  const button = (
    <Button aria-label={props["aria-label"] ?? tooltipLabel} className={cn("[&_svg]:text-primary", className)} data-slot="audio-player-button" {...props} />
  );
  if (!tooltipLabel) return button;
  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipContent sideOffset={4}>{tooltipLabel}</TooltipContent>
    </Tooltip>
  );
}

const audioControlBarVariants = cva(
  "flex w-full min-w-0 items-center gap-4 in-data-[size=sm]:gap-3 in-data-[size=sm]:px-3 px-4 in-data-[size=sm]:in-data-[variant=widget]:pt-3 in-data-[variant=widget]:pt-4",
  { defaultVariants: { variant: "compact" }, variants: { variant: { compact: "flex-row", stacked: "flex-col" } } }
);

function AudioPlayerControlBar({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof audioControlBarVariants>) {
  return <div className={cn(audioControlBarVariants({ variant }), className)} data-slot="audio-control-bar" data-variant={variant} {...props} />;
}

function AudioPlayerControlGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "-m-1 flex w-full snap-x snap-mandatory items-center gap-3 overflow-x-auto p-1 [scrollbar-width:none] in-data-[size=sm]:gap-2 *:snap-start [&::-webkit-scrollbar]:hidden",
        className
      )}
      data-slot="audio-control-group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------- time, seek, volume

function AudioPlayerTimeDisplay({ className, remaining, ...props }: React.ComponentProps<"time"> & { remaining?: boolean }) {
  const { currentTime, duration, isLive: live } = useAudioPlayer();
  const showLive = live && remaining;
  const value = showLive ? "LIVE" : formatDuration(remaining ? duration - currentTime : currentTime);
  return (
    <time
      className={cn(
        "min-w-12 shrink-0 text-left font-mono text-sm tabular-nums",
        remaining && "text-right",
        showLive && "flex items-center gap-1 text-destructive text-xs",
        className
      )}
      data-live={live ? "true" : undefined}
      data-remaining={remaining ? "true" : undefined}
      data-slot="audio-time-display"
      {...props}
    >
      {showLive && <RadioIcon className="size-3 shrink-0 animate-pulse" />}
      {value}
    </time>
  );
}

function AudioPlayerSeekBar({ className, ...props }: Omit<React.ComponentProps<typeof Transport>, "value" | "onSeek" | "bufferedValue">) {
  const { currentTime, duration, bufferedTime = 0, isLive: live, onSeek } = useAudioPlayer();
  const percent = (time: number) => (live ? 100 : duration ? (time / duration) * 100 : 0);
  return (
    <Transport
      aria-label="Seek"
      bufferedValue={percent(bufferedTime)}
      className={cn("min-w-20 flex-1", className)}
      data-slot="audio-seek-bar"
      disabled={live}
      freezeValuesWhileDragging
      onSeek={(next) => {
        if (!live && duration > 0) onSeek?.((next / 100) * duration);
      }}
      value={percent(currentTime)}
      {...props}
    />
  );
}

function VolumeGlyph({ muted, percent }: { muted: boolean; percent: number }) {
  if (muted || percent === 0) return <VolumeXIcon />;
  if (percent < 33) return <VolumeIcon />;
  if (percent < 66) return <Volume1Icon />;
  return <Volume2Icon />;
}

function AudioPlayerVolume({
  className,
  size = "icon",
  variant = "outline",
  ...props
}: Omit<React.ComponentProps<typeof Fader>, "value" | "onValueChange" | "min" | "max" | "orientation" | "size"> & {
  size?: VariantProps<typeof buttonVariants>["size"];
  variant?: VariantProps<typeof buttonVariants>["variant"];
}) {
  const { volume, muted, onVolumeChange, onMutedChange } = useAudioPlayer();
  const percent = Math.round(volume * 100);
  const effective = muted ? 0 : percent;
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={<AudioPlayerButton className={cn("hidden md:flex", className)} data-slot="audio-volume-button" size={size} variant={variant} />}
            >
              <span className={cn(muted && "opacity-40")}>
                <VolumeGlyph muted={muted} percent={percent} />
              </span>
            </DropdownMenuTrigger>
          }
        />
        <TooltipContent sideOffset={4}>{muted ? "Muted" : `Volume ${effective}%`}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="center" className="flex w-(--dropdown-menu-content-width) flex-col gap-0">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Volume</span>
            <output className="font-mono text-foreground text-xs tabular-nums">{effective}</output>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem closeOnClick={false}>
            <div className="flex items-center gap-2">
              <AudioPlayerButton
                aria-label={muted ? "Unmute" : "Mute"}
                onClick={() => onMutedChange?.(!muted)}
                size="icon-sm"
                tooltipLabel={muted ? "Unmute" : "Mute"}
                variant="ghost"
              >
                <span className={cn("text-primary", muted ? "opacity-40" : "opacity-60")}>
                  <VolumeXIcon />
                </span>
              </AudioPlayerButton>
              <Fader
                max={100}
                min={0}
                onValueChange={(next) => onVolumeChange?.(next / 100)}
                orientation="horizontal"
                size="sm"
                step={1}
                value={effective}
                {...props}
              />
              <AudioPlayerButton aria-hidden="true" disabled size="icon-sm" tooltipLabel="Maximum volume" variant="ghost">
                <Volume2Icon aria-hidden="true" className="text-primary opacity-60" />
              </AudioPlayerButton>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------- transport buttons

type ControlProps = React.ComponentProps<typeof AudioPlayerButton>;

function AudioPlayerPlay({ onClick, size = "icon", variant = "ghost", ...props }: ControlProps) {
  const { isPlaying, isLoading, currentTrack, onPlayPause } = useAudioPlayer();
  useSpacebarTogglePlay(currentTrack && !isLoading ? onPlayPause : undefined);
  return (
    <AudioPlayerButton
      aria-label={isPlaying ? "Pause" : "Play"}
      data-slot="audio-play-button"
      disabled={isLoading || !currentTrack}
      onClick={(event) => {
        onClick?.(event);
        onPlayPause?.();
      }}
      size={size}
      tooltipLabel={isPlaying ? "Pause" : "Play"}
      variant={variant}
      {...props}
    >
      {isLoading ? <Spinner /> : <PlayPauseGlyphSwap isPlaying={isPlaying} />}
    </AudioPlayerButton>
  );
}

/** Seeks 10 s back. */
function AudioPlayerRewind({ onClick, size = "icon", variant = "ghost", ...props }: ControlProps) {
  const { currentTime, currentTrack, isLive: live, onSeek } = useAudioPlayer();
  return (
    <AudioPlayerButton
      aria-label={live ? "Skip backward disabled" : "Skip backward"}
      data-slot="audio-rewind-button"
      disabled={!currentTrack || currentTime <= 0 || live}
      onClick={(event) => {
        onClick?.(event);
        onSeek?.(Math.max(currentTime - 10, 0));
      }}
      size={size}
      tooltipLabel={live ? "Not available for live streams" : "Skip backward"}
      variant={variant}
      {...props}
    >
      <RewindIcon />
    </AudioPlayerButton>
  );
}

/** Seeks 10 s forward. */
function AudioPlayerFastForward({ onClick, size = "icon", variant = "ghost", ...props }: ControlProps) {
  const { currentTime, duration, currentTrack, isLive: live, onSeek } = useAudioPlayer();
  return (
    <AudioPlayerButton
      aria-label={live ? "Skip forward disabled" : "Skip forward"}
      data-slot="audio-fast-forward-button"
      disabled={!currentTrack || live || (duration > 0 && currentTime >= duration)}
      onClick={(event) => {
        onClick?.(event);
        onSeek?.(Math.min(currentTime + 10, duration));
      }}
      size={size}
      tooltipLabel={live ? "Not available for live streams" : "Skip forward"}
      variant={variant}
      {...props}
    >
      <FastForwardIcon />
    </AudioPlayerButton>
  );
}

function AudioPlayerSkipForward({ onClick, size = "icon", variant = "ghost", ...props }: ControlProps) {
  const { queue, currentIndex, currentTrack, repeatMode, onNext } = useAudioPlayer();
  return (
    <AudioPlayerButton
      aria-label="Next"
      data-slot="audio-skip-forward-button"
      disabled={!currentTrack || (currentIndex === queue.length - 1 && repeatMode !== "all")}
      onClick={(event) => {
        onClick?.(event);
        onNext?.();
      }}
      size={size}
      tooltipLabel="Next"
      variant={variant}
      {...props}
    >
      <SkipForwardIcon />
    </AudioPlayerButton>
  );
}

function AudioPlayerSkipBack({ onClick, size = "icon", variant = "ghost", ...props }: ControlProps) {
  const { currentIndex, currentTrack, repeatMode, onPrevious } = useAudioPlayer();
  return (
    <AudioPlayerButton
      aria-label="Previous"
      data-slot="audio-skip-back-button"
      disabled={!currentTrack || (currentIndex === 0 && repeatMode !== "all")}
      onClick={(event) => {
        onClick?.(event);
        onPrevious?.();
      }}
      size={size}
      tooltipLabel="Previous"
      variant={variant}
      {...props}
    >
      <SkipBackIcon />
    </AudioPlayerButton>
  );
}

// ---------------------------------------------------------------- tracks

type AudioTrackActionMode = "none" | "play-pause" | "remove" | "play-pause-with-remove";

type AudioTrackContextValue = {
  track: Track;
  index?: number;
  isCurrent: boolean;
  isPlaying: boolean;
  onTogglePlayPause: (event: React.MouseEvent) => void;
  onRemove?: (event: React.MouseEvent) => void;
};

const AudioTrackContext = React.createContext<AudioTrackContextValue | null>(null);

function useAudioTrack() {
  const context = React.use(AudioTrackContext);
  if (!context) throw new Error("AudioTrack parts must be rendered inside <AudioTrack>");
  return context;
}

type AudioTrackProps = {
  track: Track;
  index?: number;
  onClick?: () => void;
  /** Shows the remove action; called with the track id. */
  onRemove?: (id: string) => void;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

function AudioTrack({ track, index, onClick, onRemove, media, actions, className }: AudioTrackProps) {
  const { queue, currentTrack, isPlaying, duration, onPlayPause, onPlayTrack } = useAudioPlayer();
  const isCurrent = currentTrack?.id === track.id;
  const trackDuration = isCurrent && duration > 0 ? duration : track.duration;
  const live = Boolean(track.live || (trackDuration !== undefined && isLive(trackDuration)));
  const stop = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  const context: AudioTrackContextValue = {
    index,
    isCurrent,
    isPlaying: isPlaying && isCurrent,
    onRemove: onRemove
      ? (event) => {
          stop(event);
          onRemove(track.id);
        }
      : undefined,
    onTogglePlayPause: (event) => {
      stop(event);
      if (isCurrent) onPlayPause?.();
      else {
        const queueIndex = queue.findIndex((t) => t.id === track.id);
        if (queueIndex >= 0) onPlayTrack?.(queueIndex);
      }
    },
    track,
  };
  return (
    <AudioTrackContext value={context}>
      <Item
        className={cn("w-full cursor-pointer backdrop-blur-sm transition-colors hover:bg-secondary/50", className)}
        data-current={isCurrent ? "true" : undefined}
        data-slot="audio-track"
        onClick={(event) => {
          stop(event);
          onClick?.();
        }}
        size="sm"
        variant={isCurrent ? "outline" : "default"}
      >
        {media != null && <ItemMedia className="gap-2">{media}</ItemMedia>}
        <ItemContent className="min-w-0 flex-1 gap-0 overflow-hidden">
          <div className="flex items-center gap-1.5">
            <ItemTitle className="line-clamp-1">{track.title}</ItemTitle>
            {live && (
              <Badge variant="destructive">
                <RadioIcon />
                Live
              </Badge>
            )}
          </div>
          <ItemDescription className="truncate">{track.artist}</ItemDescription>
        </ItemContent>
        {!live && trackDuration !== undefined && (
          <ItemContent className="flex-none text-center">
            <ItemDescription>{formatDuration(trackDuration)}</ItemDescription>
          </ItemContent>
        )}
        {actions != null && <ItemActions>{actions}</ItemActions>}
      </Item>
    </AudioTrackContext>
  );
}

function AudioTrackCover({ className }: { className?: string }) {
  const { track } = useAudioTrack();
  if (!track.artwork) {
    return (
      <div className={cn("flex size-10 items-center justify-center rounded-full bg-muted", className)}>
        <MusicIcon className="size-4 text-muted-foreground" />
      </div>
    );
  }
  return (
    <Avatar className={className}>
      <AvatarImage alt={track.title} src={track.artwork} />
      <AvatarFallback>
        <MusicIcon />
      </AvatarFallback>
    </Avatar>
  );
}

function AudioTrackIndex({ className }: { className?: string }) {
  const { index } = useAudioTrack();
  return <span className={cn("text-muted-foreground/60 text-xs", className)}>{index === undefined ? "" : index + 1}</span>;
}

function AudioTrackPlayPauseAction({ className }: { className?: string }) {
  const { isCurrent, isPlaying, onTogglePlayPause } = useAudioTrack();
  const title = !isCurrent ? "Play this track" : isPlaying ? "Pause" : "Play";
  return (
    <Button aria-label={title} className={cn("[&_svg]:text-primary", className)} onClick={onTogglePlayPause} size="icon-sm" title={title} variant="ghost">
      <PlayPauseGlyphSwap isPlaying={isPlaying} />
    </Button>
  );
}

/** Hidden on the current track, as upstream. */
function AudioTrackRemoveAction({ className }: { className?: string }) {
  const { isCurrent, onRemove } = useAudioTrack();
  if (isCurrent || !onRemove) return null;
  return (
    <Button aria-label="Remove track" className={cn("[&_svg]:text-primary", className)} onClick={onRemove} size="icon-sm" title="Remove" variant="ghost">
      <XIcon />
    </Button>
  );
}

function trackActions(mode: AudioTrackActionMode): React.ReactNode {
  if (mode === "none") return null;
  if (mode === "remove") return <AudioTrackRemoveAction />;
  if (mode === "play-pause-with-remove") {
    return (
      <>
        <AudioTrackRemoveAction />
        <AudioTrackPlayPauseAction />
      </>
    );
  }
  return <AudioTrackPlayPauseAction />;
}

const audioTrackListVariants = cva("w-full", {
  defaultVariants: { variant: "default" },
  variants: { variant: { default: "flex flex-col gap-2", grid: "grid grid-cols-1 gap-2 xl:grid-cols-2" } },
});

type AudioTrackListProps = {
  /** Defaults to the provider's queue. Pass your own list to render tracks that are not queued. */
  tracks?: Track[];
  /** Called with the index in `tracks` (or in the queue when `tracks` is omitted). */
  onTrackSelect?: (index: number, track: Track) => void;
  /** Shows a remove action on every track except the current one. */
  onTrackRemove?: (id: string) => void;
  /** `sortable` adds a drag handle and reports the new order through the provider's `onReorder`. */
  mode?: "static" | "sortable";
  media?: "cover" | "index";
  actions?: AudioTrackActionMode;
  emptyLabel?: string;
  emptyDescription?: string;
  /** Case-insensitive title/artist filter. Sorting is disabled while filtering. */
  filterQuery?: string;
  className?: string;
} & VariantProps<typeof audioTrackListVariants>;

function AudioTrackList({
  tracks: externalTracks,
  onTrackSelect,
  onTrackRemove,
  mode = "static",
  media = "cover",
  actions,
  variant = "default",
  emptyLabel = "No tracks found",
  emptyDescription = "Try adding some tracks",
  filterQuery,
  className,
}: AudioTrackListProps) {
  const { queue, currentTrack, onPlayPause, onPlayTrack, onReorder } = useAudioPlayer();
  const all = externalTracks ?? queue;
  const query = filterQuery?.trim().toLowerCase() ?? "";
  const tracks = query ? all.filter((t) => t.title.toLowerCase().includes(query) || t.artist?.toLowerCase().includes(query)) : all;
  const sortable = mode === "sortable" && !query && !externalTracks;
  const resolvedActions = actions ?? (onTrackRemove ? "play-pause-with-remove" : "play-pause");

  if (tracks.length === 0) {
    return (
      <Empty className={className}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ListMusicIcon />
          </EmptyMedia>
          <EmptyTitle>{emptyLabel}</EmptyTitle>
          <EmptyDescription>{emptyDescription}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const renderTrack = (track: Track, index: number) => {
    const select = () => {
      if (externalTracks) {
        onTrackSelect?.(index, track);
        return;
      }
      const queueIndex = queue.findIndex((t) => t.id === track.id);
      if (currentTrack?.id === track.id) onPlayPause?.();
      else onPlayTrack?.(queueIndex);
      onTrackSelect?.(queueIndex, track);
    };
    const cover = media === "index" ? <AudioTrackIndex /> : <AudioTrackCover />;
    return (
      <AudioTrack
        actions={trackActions(resolvedActions)}
        index={index}
        key={track.id}
        media={
          sortable ? (
            <>
              <SortableDragHandle />
              {media === "cover" && cover}
            </>
          ) : (
            cover
          )
        }
        onClick={select}
        onRemove={onTrackRemove}
        track={track}
      />
    );
  };

  return (
    <div
      className={cn(
        "w-full overflow-y-auto pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "in-data-[variant=widget]:h-40 in-data-[variant=widget]:px-4 in-data-[variant=widget]:pb-4",
        "in-data-[size=sm]:in-data-[variant=widget]:h-32 in-data-[size=sm]:in-data-[variant=widget]:px-3 in-data-[size=sm]:in-data-[variant=widget]:pb-3",
        "in-data-[variant=widget]:snap-y in-data-[variant=widget]:snap-mandatory in-data-[variant=widget]:**:data-[slot=audio-track]:snap-start",
        className
      )}
      data-slot="audio-track-list"
    >
      {sortable ? (
        <SortableList
          className={variant === "grid" ? "grid grid-cols-1 gap-2 xl:grid-cols-2" : "gap-1"}
          items={tracks}
          onChange={(next) => onReorder?.(next)}
          renderItem={(track, index) => (
            <SortableItem id={track.id} key={track.id}>
              {renderTrack(track, index)}
            </SortableItem>
          )}
        />
      ) : (
        <div className={audioTrackListVariants({ variant })}>{tracks.map(renderTrack)}</div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- queue controls

function AudioQueueRepeatMode({ className, ...props }: ControlProps) {
  const { repeatMode, onRepeatModeChange } = useAudioPlayer();
  const next: Record<RepeatMode, RepeatMode> = { all: "one", none: "all", one: "none" };
  const label = repeatMode === "one" ? "Repeat this track" : repeatMode === "all" ? "Repeat playlist" : "Disable repeat";
  const active = repeatMode !== "none";
  return (
    <AudioPlayerButton
      aria-label={label}
      aria-pressed={active}
      className={className}
      data-slot="audio-queue-repeat-mode"
      onClick={() => onRepeatModeChange?.(next[repeatMode])}
      size="icon"
      tooltipLabel={label}
      variant={active ? "secondary" : "ghost"}
      {...props}
    >
      {repeatMode === "one" ? <Repeat1Icon /> : <RepeatIcon />}
    </AudioPlayerButton>
  );
}

function AudioQueueShuffle({ className, ...props }: ControlProps) {
  const { shuffle, onShuffleChange } = useAudioPlayer();
  const label = `Shuffle ${shuffle ? "on" : "off"}`;
  return (
    <AudioPlayerButton
      aria-label={label}
      aria-pressed={shuffle}
      className={className}
      data-slot="audio-queue-shuffle"
      onClick={() => onShuffleChange?.(!shuffle)}
      size="icon"
      tooltipLabel={label}
      variant={shuffle ? "secondary" : "ghost"}
      {...props}
    >
      <ShuffleIcon />
    </AudioPlayerButton>
  );
}

function AudioQueuePreferences({ className, variant = "outline", size = "icon", tooltipLabel = "Queue preferences", ...props }: ControlProps) {
  const { repeatMode, insertMode, onRepeatModeChange, onInsertModeChange } = useAudioPlayer();
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={<AudioPlayerButton className={className} data-slot="audio-queue-preferences-trigger" size={size} variant={variant} {...props} />}
            >
              <SlidersHorizontalIcon />
            </DropdownMenuTrigger>
          }
        />
        <TooltipContent sideOffset={4}>{tooltipLabel}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" data-slot="audio-queue-preferences-content">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Repeat Mode</DropdownMenuLabel>
          <DropdownMenuRadioGroup onValueChange={(value) => onRepeatModeChange?.(value as RepeatMode)} value={repeatMode}>
            <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="one">One</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Insert Mode</DropdownMenuLabel>
          <DropdownMenuRadioGroup onValueChange={(value) => onInsertModeChange?.(value as InsertMode)} value={insertMode}>
            <DropdownMenuRadioItem value="first">First</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="last">Last</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="after">After Current</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type AudioQueueProps = {
  onTrackSelect?: (index: number) => void;
  searchPlaceholder?: string;
  emptyLabel?: string;
  emptyDescription?: string;
};

/** Queue dialog: search, play, reorder (when not searching), remove, clear. */
function AudioQueue({
  onTrackSelect,
  searchPlaceholder = "Search for a track...",
  emptyLabel = "No tracks found",
  emptyDescription = "Try searching for a different track",
}: AudioQueueProps) {
  const { onRemoveTrack, onClearQueue } = useAudioPlayer();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  return (
    <Dialog
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
      open={open}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <DialogTrigger render={<AudioPlayerButton data-slot="audio-queue-trigger" size="icon" variant="outline" />}>
              <ListMusicIcon />
            </DialogTrigger>
          }
        />
        <TooltipContent sideOffset={4}>Queue</TooltipContent>
      </Tooltip>
      <DialogContent aria-label="Select a track" data-slot="audio-queue" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Audio Queue</DialogTitle>
          <DialogDescription>Select a track from the queue to play</DialogDescription>
        </DialogHeader>
        <Input aria-label="Search the queue" onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} value={query} />
        <div className="max-h-80 overflow-y-auto">
          <AudioTrackList
            emptyDescription={emptyDescription}
            emptyLabel={emptyLabel}
            filterQuery={query}
            mode="sortable"
            onTrackRemove={onRemoveTrack}
            onTrackSelect={(index) => {
              onTrackSelect?.(index);
              setOpen(false);
            }}
          />
        </div>
        <DialogFooter>
          <AudioPlayerButton className="w-full" onClick={() => onClearQueue?.()} title="Clear queue" variant="destructive">
            Clear
          </AudioPlayerButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const PLAYBACK_SPEEDS = [
  { label: "0.5x", value: 0.5 },
  { label: "0.75x", value: 0.75 },
  { label: "1x", value: 1 },
  { label: "1.25x", value: 1.25 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2 },
] as const;

type AudioPlaybackSpeedProps = React.ComponentProps<typeof Button> & { speeds?: readonly { value: number; label: string }[] };

function AudioPlaybackSpeed({ className, size, variant = "outline", speeds = PLAYBACK_SPEEDS, ...props }: AudioPlaybackSpeedProps) {
  const { playbackRate, isLive: live, onPlaybackRateChange } = useAudioPlayer();
  const label = (speeds.find((s) => s.value === playbackRate) ?? speeds[2])?.label;
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              disabled={live}
              render={<AudioPlayerButton className={className} data-slot="audio-playback-speed-button" disabled={live} size={size} variant={variant} {...props} />}
            >
              {size !== "icon" && <GaugeIcon />}
              <span
                className="inline-block font-mono text-xs transition-[opacity,filter,translate] duration-150 ease-in-out will-change-[opacity,filter,translate] starting:translate-y-1 starting:opacity-0 starting:blur-[2px] motion-reduce:transition-none"
                key={label}
              >
                {label}
              </span>
            </DropdownMenuTrigger>
          }
        />
        <TooltipContent sideOffset={4}>{live ? "Not available for live streams" : "Playback speed"}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" data-slot="audio-playback-speed-content">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
          <DropdownMenuRadioGroup onValueChange={(value) => !live && onPlaybackRateChange?.(Number.parseFloat(String(value)))} value={String(playbackRate)}>
            {speeds.map((speed) => (
              <DropdownMenuRadioItem key={speed.value} value={String(speed.value)}>
                {speed.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  AudioPlaybackSpeed,
  AudioPlayer,
  AudioPlayerButton,
  AudioPlayerControlBar,
  AudioPlayerControlGroup,
  AudioPlayerFastForward,
  AudioPlayerPlay,
  AudioPlayerRewind,
  AudioPlayerSeekBar,
  AudioPlayerSkipBack,
  AudioPlayerSkipForward,
  AudioPlayerTimeDisplay,
  AudioPlayerVolume,
  AudioQueue,
  AudioQueuePreferences,
  AudioQueueRepeatMode,
  AudioQueueShuffle,
  AudioTrack,
  AudioTrackCover,
  AudioTrackIndex,
  AudioTrackList,
  AudioTrackPlayPauseAction,
  AudioTrackRemoveAction,
  audioPlayerVariants,
};
