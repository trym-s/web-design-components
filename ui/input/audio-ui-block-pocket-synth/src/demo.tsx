import * as React from "react";
import { BlockPocketSynth, type FilterType, type Waveform } from "./block-pocket-synth";

// Example engine: the upstream block's Web Audio graph (oscillator -> biquad filter -> gain), driven by the block's callbacks.
const frequency = (x: number) => 30 * (1046 / 30) ** x;
const cutoff = (y: number) => 200 * (8000 / 200) ** y;
let context: AudioContext | null = null;
const audio = () => (context ??= new AudioContext());

export default function Demo() {
  const [waveform, setWaveform] = React.useState<Waveform>("square");
  const [filterType, setFilterType] = React.useState<FilterType>("allpass");
  const [volume, setVolume] = React.useState(0.5);
  const [position, setPosition] = React.useState({ x: 0.5, y: 0.5 });
  const voice = React.useRef<{ osc: OscillatorNode; filter: BiquadFilterNode; gain: GainNode } | null>(null);

  const play = (p: { x: number; y: number }) => {
    setPosition(p);
    const ctx = audio();
    const now = ctx.currentTime;
    if (voice.current) {
      voice.current.osc.frequency.setTargetAtTime(frequency(p.x), now, 0.01);
      voice.current.filter.frequency.setTargetAtTime(cutoff(p.y), now, 0.01);
      return;
    }
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency(p.x), now);
    filter.type = filterType;
    filter.frequency.setValueAtTime(cutoff(p.y), now);
    filter.Q.setValueAtTime(5, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.3, now + 0.02);
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start();
    voice.current = { filter, gain, osc };
  };

  const release = () => {
    const current = voice.current;
    if (!current) return;
    current.gain.gain.linearRampToValueAtTime(0, audio().currentTime + 0.05);
    setTimeout(() => current.osc.stop(), 60);
    voice.current = null;
  };

  React.useEffect(() => {
    if (voice.current) voice.current.osc.type = waveform;
    if (voice.current) voice.current.filter.type = filterType;
    if (voice.current) voice.current.gain.gain.setTargetAtTime(volume * 0.3, audio().currentTime, 0.01);
  }, [waveform, filterType, volume]);

  return (
    <div className="w-full max-w-md">
      <BlockPocketSynth
        filterType={filterType}
        formatPosition={(p) => `${Math.round(frequency(p.x))}Hz, ${Math.round(cutoff(p.y))}Hz`}
        onFilterTypeChange={setFilterType}
        onPositionChange={play}
        onRelease={release}
        onVolumeChange={setVolume}
        onWaveformChange={setWaveform}
        position={position}
        volume={volume}
        waveform={waveform}
      />
    </div>
  );
}
