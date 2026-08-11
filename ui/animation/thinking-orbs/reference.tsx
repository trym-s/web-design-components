/* Use when: an agent needs a compact semantic loading orb for working,
 * searching, solving, listening, connecting, weaving, composing,
 * breathing, or shaping states.
 *
 * Upstream source lives beside this wrapper in `src/`.
 */

import { ThinkingOrb } from "./src";

export default function ThinkingOrbsReference() {
  return (
    <div className="flex items-center gap-4">
      <ThinkingOrb state="working" size={64} aria-label="Working" />
      <ThinkingOrb state="searching" size={20} aria-label="Searching" />
    </div>
  );
}
