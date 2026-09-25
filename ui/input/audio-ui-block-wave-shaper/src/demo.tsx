import * as React from "react";
import { BlockWaveShaper, type ShaperParams, type Waveform } from "./block-wave-shaper";

// Example engine: the upstream block's Web Audio graph (two detuned oscillators -> dry + wave shaper -> low-pass -> gain).
const frequency = (x: number) => 55 * (880 / 55) ** x;
const resonance = (y: number) => 0.5 + y * 15;
function distortion(amount: number) {
  const curve = new Float32Array(44_100);
  for (let i = 0; i < curve.length; i++) {
    const x = (i * 2) / curve.length - 1;
    curve[i] = ((3 + amount) * x * 20 * (Math.PI / 180)) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}
let context: AudioContext | null = null;
const audio = () => (context ??= new AudioContext());

type Voice = { oscs: OscillatorNode[]; dry: GainNode; wet: GainNode; shaper: WaveShaperNode; filter: BiquadFilterNode; main: GainNode };

export default function Demo() {
  const [waveform, setWaveform] = React.useState<Waveform>("sine");
  const [params, setParams] = React.useState<ShaperParams>({ detune: 0, drive: 1, mix: 50, tone: 50 });
  const [volume, setVolume] = React.useState(0.5);
  const [position, setPosition] = React.useState({ x: 0.5, y: 0.5 });
  const voice = React.useRef<Voice | null>(null);

  const play = (p: { x: number; y: number }) => {
    setPosition(p);
    const ctx = audio();
    const now = ctx.currentTime;
    if (voice.current) {
      for (const osc of voice.current.oscs) osc.frequency.setTargetAtTime(frequency(p.x), now, 0.01);
      voice.current.filter.Q.setTargetAtTime(resonance(p.y), now, 0.01);
      return;
    }
    const oscs = [ctx.createOscillator(), ctx.createOscillator()];
    const mixBus = ctx.createGain();
    const dry = ctx.createGain();
    const wet = ctx.createGain();
    const main = ctx.createGain();
    const shaper = ctx.createWaveShaper();
    const filter = ctx.createBiquadFilter();
    for (const osc of oscs) {
      osc.type = waveform;
      osc.frequency.setValueAtTime(frequency(p.x), now);
      osc.connect(mixBus);
    }
    oscs[1].detune.setValueAtTime(params.detune, now);
    shaper.curve = distortion(params.drive);
    shaper.oversample = "4x";
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(500 + params.tone * 75, now);
    filter.Q.setValueAtTime(resonance(p.y), now);
    mixBus.gain.setValueAtTime(0.5, now);
    dry.gain.setValueAtTime((100 - params.mix) / 100, now);
    wet.gain.setValueAtTime(params.mix / 100, now);
    main.gain.setValueAtTime(0, now);
    main.gain.linearRampToValueAtTime(volume * 0.4, now + 0.02);
    mixBus.connect(dry).connect(filter);
    mixBus.connect(shaper).connect(wet).connect(filter);
    filter.connect(main).connect(ctx.destination);
    for (const osc of oscs) osc.start();
    voice.current = { dry, filter, main, oscs, shaper, wet };
  };

  const release = () => {
    const current = voice.current;
    if (!current) return;
    current.main.gain.linearRampToValueAtTime(0, audio().currentTime + 0.05);
    setTimeout(() => current.oscs.forEach((osc) => osc.stop()), 60);
    voice.current = null;
  };

  React.useEffect(() => {
    const v = voice.current;
    if (!v) return;
    const now = audio().currentTime;
    for (const osc of v.oscs) osc.type = waveform;
    v.oscs[1].detune.setTargetAtTime(params.detune, now, 0.01);
    v.shaper.curve = distortion(params.drive);
    v.filter.frequency.setTargetAtTime(500 + params.tone * 75, now, 0.01);
    v.dry.gain.setTargetAtTime((100 - params.mix) / 100, now, 0.01);
    v.wet.gain.setTargetAtTime(params.mix / 100, now, 0.01);
    v.main.gain.setTargetAtTime(volume * 0.4, now, 0.01);
  }, [waveform, params, volume]);

  return (
    <div className="w-full max-w-md">
      <BlockWaveShaper
        formatPosition={(p) => `${Math.round(frequency(p.x))}Hz, Q: ${resonance(p.y).toFixed(1)}`}
        onParamChange={(key, value) => setParams((current) => ({ ...current, [key]: value }))}
        onPositionChange={play}
        onRelease={release}
        onVolumeChange={setVolume}
        onWaveformChange={setWaveform}
        params={params}
        position={position}
        volume={volume}
        waveform={waveform}
      />
    </div>
  );
}
