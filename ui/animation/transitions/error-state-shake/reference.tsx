/* Use when: Form validation feedback — invalid email, wrong password, missing required field, mismatched confirmation. The input shakes left/right with overshoot, the border switches to error color, and a message reveals beneath. After a hold timer (long enough to read the message), border + message fade back to neutral. Optional: typing into the input cancels the auto-revert immediately. The `t-` snippet is also a fit for any "this is wrong, try again" moment that needs a percussive hint without an OS-level alert — a wrong-PIN field on a lock screen, a duplicate-tag warning in a tag editor, a "name already taken" username field.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useRef, useState } from "react";

// Pair with the CSS from the CSS tab.
// This hook owns ONLY the shake + error-state wiring; the input
// markup, message text, sizing, and border colors are yours.
//
// Wire it in as:
//   <InputShake message="Please enter a valid email.">
//     <input type="text" onInput={onUserEdit} />
//   </InputShake>
//
// `Animate` always triggers the error state — this is a demo, not
// real validation. The shake replay pattern is the same as the rest
// of the gallery: drop the class, force a reflow, re-add it. We
// then auto-revert after --revert-hold so the demo self-resets.
// Pass an `onCancel` if you want to clear the error early when the
// user starts editing (e.g. on the input's `onInput` event).
export function InputShake({ children, message, onCancel }) {
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const [error, setError] = useState(false);

  const trigger = () => {
    if (!inputRef.current) return;
    setError(true);
    inputRef.current.classList.remove("is-shaking");
    void inputRef.current.offsetWidth;
    inputRef.current.classList.add("is-shaking");

    if (timerRef.current) window.clearTimeout(timerRef.current);
    const shakeMs =
      readMs("--shake-dur-a", 80) * 2 +
      readMs("--shake-dur-b", 60) * 2;
    const hold = readMs("--revert-hold", 3000);
    timerRef.current = window.setTimeout(() => {
      setError(false);
      timerRef.current = null;
    }, shakeMs + hold);
  };

  // Call this from your input's onInput / onChange handler if you
  // want typing to cancel the auto-revert and clear the error.
  const cancel = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setError(false);
    onCancel?.();
  };

  return (
    <>
      <button type="button" onClick={trigger}>Animate</button>
      <div className={"t-input-wrap" + (error ? " is-error" : "")}>
        <div
          ref={inputRef}
          className={"t-input" + (error ? " is-error" : "")}
          onInput={cancel}
        >
          {children}
        </div>
        <p className="t-error-msg">{message}</p>
      </div>
    </>
  );
}

function readMs(name, fallback) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name).trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}
