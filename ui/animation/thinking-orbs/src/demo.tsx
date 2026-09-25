import { ThinkingOrb } from './thinking-orb';
import type { OrbState } from './types';

const STATES: OrbState[] = ['working', 'searching', 'solving', 'listening', 'connecting', 'weaving', 'composing', 'breathing', 'shaping'];

export default function Demo() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {STATES.map((state) => (
        <div key={state} className="flex flex-col items-center gap-2">
          <ThinkingOrb state={state} size={64} />
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ThinkingOrb state={state} size={20} />
            {state}
          </div>
        </div>
      ))}
    </div>
  );
}
