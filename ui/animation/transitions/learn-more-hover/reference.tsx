/* Use when: A compact “learn more” action needs a restrained hover cue rather than a separate loading or navigation animation.
 * Source: transitions.dev CSS tab; the site has no React tab for this newer free transition. */

import "./styles.css";

export function LearnMoreHover() {
  return (
    <button type="button" className="t-learn">
      Learn more
      <span className="t-learn-chevron" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  );
}
