/* Use when: Toasts, snackbars, and transient confirmations that rise into view from the bottom edge — “Saved”, “Copied”, “Message sent”.
 * Source: transitions.dev CSS tab; the site has no React tab for this newer free transition. */

import { useState } from "react";
import "./styles.css";

export function Toast() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen((value) => !value)}>
        Toggle toast
      </button>
      <div className={`t-toast${open ? " is-open" : ""}`} role="status">
        Changes saved
      </div>
    </>
  );
}
