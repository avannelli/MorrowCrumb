/**
 * Ingredient-inspired line art: the things that actually go into the bake,
 * drawn as thin single-weight sketches. These sit in the background at low
 * opacity, so every path is stroke-only and every viewBox is trimmed tight to
 * the drawing — the CSS positions them by width alone.
 */
type SketchProps = { className?: string };

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const;

const svg = {
  'aria-hidden': true,
  focusable: 'false',
  role: 'presentation',
} as const;

/** Wheat, the whole reason for the room. */
export function WheatStalk({ className }: SketchProps) {
  return (
    <svg className={className} viewBox="0 0 62 150" {...svg}>
      <g {...line} strokeWidth="1.1">
        <path d="M31 148 C31 112 31 74 31 30" />
        <path d="M31 112 C18 108 11 97 13 84 C26 88 33 99 31 112 Z" />
        <path d="M31 112 C44 108 51 97 49 84 C36 88 29 99 31 112 Z" />
        <path d="M31 86 C18 82 11 71 13 58 C26 62 33 73 31 86 Z" />
        <path d="M31 86 C44 82 51 71 49 58 C36 62 29 73 31 86 Z" />
        <path d="M31 60 C18 56 11 45 13 32 C26 36 33 47 31 60 Z" />
        <path d="M31 60 C44 56 51 45 49 32 C36 36 29 47 31 60 Z" />
        <path d="M31 32 C26 22 26 12 31 4 C36 12 36 22 31 32 Z" />
        <path d="M31 124 C24 120 20 114 20 106" strokeWidth="0.9" />
        <path d="M31 124 C38 120 42 114 42 106" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

/** Lemon thyme, off the quince galette. */
export function ThymeSprig({ className }: SketchProps) {
  return (
    <svg className={className} viewBox="0 0 150 74" {...svg}>
      <g {...line} strokeWidth="1.1">
        <path d="M4 70 C40 64 88 44 144 6" />
        <path d="M26 63 C22 52 26 43 36 38 C40 48 36 58 26 63 Z" />
        <path d="M44 55 C40 44 44 35 54 30 C58 40 54 50 44 55 Z" />
        <path d="M64 45 C60 34 64 25 74 20 C78 30 74 40 64 45 Z" />
        <path d="M86 34 C82 23 86 14 96 9 C100 19 96 29 86 34 Z" />
        <path d="M38 60 C46 58 54 52 58 44" strokeWidth="0.9" />
        <path d="M74 38 C82 36 90 30 94 22" strokeWidth="0.9" />
        <path d="M110 22 C118 18 126 12 132 4" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

/** An almond branch — two leaves and a nut in its husk. */
export function AlmondBranch({ className }: SketchProps) {
  return (
    <svg className={className} viewBox="0 0 140 96" {...svg}>
      <g {...line} strokeWidth="1.1">
        <path d="M6 88 C38 78 72 58 134 12" />
        <path d="M30 78 C24 62 32 48 48 44 C52 60 44 74 30 78 Z" />
        <path d="M44 76 C52 64 68 58 82 62 C74 76 58 82 44 76 Z" />
        <path d="M96 42 C88 30 92 14 104 8 C114 16 114 32 104 40 C101 42 98 43 96 42 Z" />
        <path d="M99 40 C97 29 100 19 106 11" strokeWidth="0.8" />
        <path d="M38 60 C42 54 46 50 50 47" strokeWidth="0.8" />
        <path d="M56 74 C62 69 68 66 74 64" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/** Vanilla — two pods and a flower, the way they are drawn on old labels. */
export function VanillaPod({ className }: SketchProps) {
  return (
    <svg className={className} viewBox="0 0 96 152" {...svg}>
      <g {...line} strokeWidth="1.1">
        <path d="M30 146 C16 118 16 78 34 44 C40 32 48 22 58 14" />
        <path d="M36 146 C24 118 24 80 40 48 C46 36 52 27 60 20" strokeWidth="0.8" />
        <path d="M62 142 C52 116 54 82 70 52" />
        <path d="M58 14 C50 8 50 0 58 -2" />
        <path d="M70 52 C74 40 80 30 88 22" strokeWidth="0.8" />
        <path d="M58 16 C66 8 76 6 84 10 C78 18 68 21 58 16 Z" />
        <path d="M70 54 C80 48 90 48 94 54 C86 60 76 60 70 54 Z" />
      </g>
    </svg>
  );
}

/** Quince on the branch, while the fruit lasts. */
export function QuinceBranch({ className }: SketchProps) {
  return (
    <svg className={className} viewBox="0 0 130 118" {...svg}>
      <g {...line} strokeWidth="1.1">
        <path d="M8 8 C30 26 48 44 58 62" />
        <path d="M58 62 C40 66 28 60 24 48 C40 44 54 50 58 62 Z" />
        <path d="M62 54 C70 40 84 34 96 38 C90 52 76 58 62 54 Z" />
        <path d="M64 68 C56 82 60 100 74 108 C90 114 104 104 104 88 C104 74 92 64 78 64 C72 64 67 65 64 68 Z" />
        <path d="M80 64 C80 58 84 52 90 48" strokeWidth="0.9" />
        <path d="M76 72 C72 84 74 96 82 104" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/** A whisk, for the crème. */
export function Whisk({ className }: SketchProps) {
  return (
    <svg className={className} viewBox="0 0 74 146" {...svg}>
      <g {...line} strokeWidth="1.1">
        <path d="M37 6 V42" />
        <path d="M30 6 H44 A5 5 0 0 1 44 16 H30 A5 5 0 0 1 30 6 Z" strokeWidth="0.9" />
        <path d="M37 42 C18 58 12 90 22 122 C28 138 46 138 52 122 C62 90 56 58 37 42 Z" />
        <path d="M37 42 C30 66 28 98 34 132" strokeWidth="0.8" />
        <path d="M37 42 C44 66 46 98 40 132" strokeWidth="0.8" />
        <path d="M22 122 C34 128 42 128 52 122" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/** A ring of scattered flour, mid-dust. */
export function FlourRing({ className }: SketchProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" {...svg}>
      <g {...line} strokeWidth="1.1">
        <circle cx="60" cy="60" r="52" strokeDasharray="2 9" strokeWidth="0.9" />
        <circle cx="60" cy="60" r="34" />
        <path d="M60 26 C44 34 38 50 42 66" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
