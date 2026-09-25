import { useState } from "react";
import {
  PresenceAvatars,
  type PresencePerson,
} from "./presence-avatars";

const POOL: PresencePerson[] = [
  { id: "ana", name: "Ana Ruiz" },
  { id: "ivo", name: "Ivo Bergman" },
  { id: "noor", name: "Noor Haddad" },
  { id: "kei", name: "Kei Tanaka" },
  { id: "sam", name: "Sam Okonkwo" },
  { id: "lila", name: "Lila Fontaine" },
  { id: "gus", name: "Gus Martel" },
  { id: "mira", name: "Mira Sandoval" },
];

const cap = "h-8 rounded-[calc(var(--radius)-3px)] border border-border bg-card px-2.5 text-[12px] font-medium text-foreground shadow-xs transition-[transform,background-color] duration-150 hover:bg-accent active:translate-y-px";

export default function PresenceAvatarsDemo() {
  const [here, setHere] = useState<string[]>(["ana", "ivo", "noor"]);
  const people = here
    .map((id) => POOL.find((p) => p.id === id))
    .filter(Boolean) as PresencePerson[];

  return (
    <div className="mx-auto flex w-full max-w-[340px] flex-col items-center gap-7">
      <PresenceAvatars
        people={people}
        max={4}
        size={48}
        overlap={14}
        label="On this board"
      />
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() =>
            setHere((ids) => {
              const next = POOL.find((p) => !ids.includes(p.id));
              return next ? [...ids, next.id] : ids;
            })
          }
          className={cap}
        >
          Someone joins
        </button>
        <button
          type="button"
          onClick={() => setHere((ids) => ids.slice(1))}
          className={cap}
        >
          Longest here leaves
        </button>
      </div>
    </div>
  );
}
