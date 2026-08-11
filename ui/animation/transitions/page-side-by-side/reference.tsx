/* Use when: Sliding between two full pages or screens that live side-by-side: list ↔ detail, step 1 ↔ step 2 in a wizard. Page 1 exits left, page 2 exits right.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useState } from "react";

// Pair with the CSS from the CSS tab (.t-page-slide + data-page 1|2).
export function PageSlide() {
  const [page, setPage] = useState(1);

  return (
    <div className="t-page-slide" data-page={page}>
      <section className="t-page" data-page-id="1">
        <h2>Page 1</h2>
        <button type="button" onClick={() => setPage(2)}>Next</button>
      </section>
      <section className="t-page" data-page-id="2">
        <h2>Page 2</h2>
        <button type="button" onClick={() => setPage(1)}>Back</button>
      </section>
    </div>
  );
}
