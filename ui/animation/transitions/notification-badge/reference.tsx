/* Use when: A small badge appearing on top of a trigger (bell, inbox, button). Slides in diagonally and pops the dot independently of the trigger so the trigger itself never moves.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useState } from "react";

// Pair with the CSS from the CSS tab (classes + data-open).
export function NotificationBadge({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <button
      type="button"
      style={{ position: "relative" }}
      onClick={() => setOpen((v) => !v)}
    >
      {children /* your trigger (bell icon, etc.) */}
      <span className="t-badge" data-open={open}>
        <span className="t-badge-dot">1</span>
      </span>
    </button>
  );
}
