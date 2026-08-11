/* Use when: A hover/focus tooltip that fades + scales in with a short appear-delay but disappears immediately on leave. Pure CSS — the wrap (not the trigger) is the hover target so the pointer can drift onto the tooltip without flicker.
 * Source: transitions.dev — React tab. */

import "./styles.css";

// Pair with the CSS from the CSS tab.
// Pure CSS — hover / focus state lives entirely in selectors.
// Bring your own trigger styling.
export function Tooltip({ id, content, children }) {
  return (
    <span className="t-tt-wrap">
      {/* The trigger needs `aria-describedby` pointed at the
          tooltip's id; CSS uses :focus-visible + sibling selector
          so the tooltip also shows on keyboard focus. */}
      {children({ "aria-describedby": id, className: "t-tt-trigger" })}
      <span id={id} className="t-tt" role="tooltip">{content}</span>
    </span>
  );
}
