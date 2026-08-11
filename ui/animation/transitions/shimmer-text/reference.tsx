/* Use when: A loading / "thinking" label that shimmers — streaming status, "Generating…", any in-progress copy that should feel alive without a spinner. Pure CSS: duplicate the string into `data-text` on `.t-shimmer` and tune `--shimmer-base` / `--shimmer-highlight` per theme.
 * Source: transitions.dev — React tab. */

import "./styles.css";

// Pair with the CSS from the CSS tab.
// Pure CSS — no hooks, no state. The `data-text` attribute
// duplicates the visible string into the masked ::before layer.
// Keep them in sync if the text changes.
export function Shimmer({ children }) {
  return (
    <span className="t-shimmer" data-text={children}>
      {children}
    </span>
  );
}
