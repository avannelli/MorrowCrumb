/**
 * The scalloped edge where the hero's warm panel meets the page below.
 * Stretched to any width with preserveAspectRatio="none".
 */
export function HeroWave({ className }: { className?: string }) {
  const humps = Array.from({ length: 6 })
    .map(() => 'q -60 30 -120 0 q -60 -30 -120 0')
    .join(' ');

  return (
    <svg
      className={className}
      viewBox="0 0 1440 46"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path d={`M0 0 H1440 V22 ${humps} Z`} fill="currentColor" />
    </svg>
  );
}
