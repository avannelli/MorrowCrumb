/**
 * Social marks, drawn in the same thin single-weight line as the rest of the
 * artwork rather than dropped in as brand glyphs, so they sit in the header
 * beside the wordmark without shouting. Every stroke is `currentColor`, so the
 * icons take the colour of the link around them.
 */
type IconProps = { className?: string };

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const svg = {
  viewBox: '0 0 20 20',
  'aria-hidden': true,
  focusable: 'false',
  role: 'presentation',
} as const;

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svg}>
      <g {...line}>
        <rect x="3.2" y="3.2" width="13.6" height="13.6" rx="4.2" />
        <circle cx="10" cy="10" r="3.5" />
      </g>
      <circle cx="14.1" cy="5.9" r="0.95" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svg}>
      <g {...line}>
        <circle cx="10" cy="10" r="6.8" />
        <path d="M11.9 6.9h-1.2a1.4 1.4 0 0 0-1.4 1.4v8.4" />
        <path d="M8.1 10.4h3.6" />
      </g>
    </svg>
  );
}

/** Held inside the app's rounded square, so a bare cross is never mistaken
 *  for a close button sitting in the bar. */
export function XIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svg}>
      <g {...line}>
        <rect x="3.2" y="3.2" width="13.6" height="13.6" rx="4.2" />
        <path d="M7.1 7.1 12.9 12.9" />
        <path d="M12.9 7.1 7.1 12.9" />
      </g>
    </svg>
  );
}
