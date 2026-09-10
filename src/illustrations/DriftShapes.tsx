import type { ComponentType } from 'react';

type ShapeProps = { className?: string };

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function Croissant({ className }: ShapeProps) {
  return (
    <svg className={className} viewBox="84 36 146 88" aria-hidden="true" focusable="false">
      <g {...line} strokeWidth="3">
        <path
          d="M96 110 C86 80 102 54 132 48 C158 43 184 48 200 60 C218 74 224 96 214 110
             C206 115 198 111 196 101 C191 95 172 92 150 92 C126 92 108 95 104 101
             C102 111 102 115 96 110 Z"
        />
        <path d="M118 60 C122 72 124 82 124 93" strokeWidth="2" />
        <path d="M155 51 C154 65 154 78 154 90" strokeWidth="2" />
        <path d="M190 57 C186 69 185 80 186 92" strokeWidth="2" />
      </g>
    </svg>
  );
}

function Wheat({ className }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 56 128" aria-hidden="true" focusable="false">
      <g {...line} strokeWidth="2.6">
        <path d="M28 126 C28 96 28 66 28 26" />
        <path d="M28 96 C16 92 10 82 12 70 C24 74 30 84 28 96 Z" />
        <path d="M28 96 C40 92 46 82 44 70 C32 74 26 84 28 96 Z" />
        <path d="M28 72 C16 68 10 58 12 46 C24 50 30 60 28 72 Z" />
        <path d="M28 72 C40 68 46 58 44 46 C32 50 26 60 28 72 Z" />
        <path d="M28 48 C16 44 10 34 12 22 C24 26 30 36 28 48 Z" />
        <path d="M28 48 C40 44 46 34 44 22 C32 26 26 36 28 48 Z" />
        <path d="M28 26 C24 18 24 10 28 4 C32 10 32 18 28 26 Z" />
      </g>
    </svg>
  );
}

function Ring({ className }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g {...line}>
        <circle cx="50" cy="50" r="44" strokeWidth="3" />
        <circle cx="50" cy="50" r="29" strokeWidth="2" strokeDasharray="5 7" />
        <circle cx="50" cy="50" r="10" strokeWidth="2" />
      </g>
    </svg>
  );
}

function Spiral({ className }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g {...line} strokeWidth="3">
        <circle cx="50" cy="50" r="44" strokeWidth="2.4" />
        <path
          d="M50 50 C50 41 41 36 33 40 C22 45 20 62 31 72 C44 84 68 80 78 65
             C88 49 81 26 62 18"
        />
      </g>
    </svg>
  );
}

function RollingPin({ className }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 140 44" aria-hidden="true" focusable="false">
      <g {...line} strokeWidth="2.8">
        <path d="M34 10 H106 A12 12 0 0 1 106 34 H34 A12 12 0 0 1 34 10 Z" />
        <path d="M34 10 V34" strokeWidth="2" />
        <path d="M106 10 V34" strokeWidth="2" />
        <path d="M30 22 H8" />
        <path d="M110 22 H132" />
      </g>
    </svg>
  );
}

function Sprig({ className }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 110 60" aria-hidden="true" focusable="false">
      <g {...line} strokeWidth="2.6">
        <path d="M6 52 C34 48 68 34 104 8" />
        <path d="M30 46 C30 34 38 26 50 24" />
        <path d="M52 36 C54 24 62 17 74 16" />
        <path d="M74 24 C78 14 86 8 96 8" />
      </g>
    </svg>
  );
}

export type DriftShape = {
  id: string;
  Art: ComponentType<ShapeProps>;
  /** Starting position as a percentage of the field. */
  x: number;
  y: number;
  /** Rendered width in px. */
  size: number;
  /** Starting heading in degrees, and how fast it drifts. */
  heading: number;
  speed: number;
  /** Degrees of spin per frame. */
  spin: number;
};

export const driftShapes: DriftShape[] = [
  { id: 'croissant-a', Art: Croissant, x: 9, y: 14, size: 100, heading: 24, speed: 0.22, spin: 0.05 },
  { id: 'wheat-a', Art: Wheat, x: 91, y: 10, size: 44, heading: 152, speed: 0.28, spin: -0.07 },
  { id: 'ring-a', Art: Ring, x: 85, y: 40, size: 70, heading: 208, speed: 0.2, spin: 0.04 },
  { id: 'pin-a', Art: RollingPin, x: 13, y: 52, size: 100, heading: 336, speed: 0.24, spin: -0.04 },
  { id: 'spiral-a', Art: Spiral, x: 90, y: 72, size: 64, heading: 112, speed: 0.26, spin: 0.06 },
  { id: 'sprig-a', Art: Sprig, x: 7, y: 82, size: 86, heading: 40, speed: 0.21, spin: -0.05 },
  { id: 'croissant-b', Art: Croissant, x: 52, y: 93, size: 78, heading: 288, speed: 0.23, spin: 0.05 },
  { id: 'ring-b', Art: Ring, x: 47, y: 6, size: 48, heading: 68, speed: 0.3, spin: -0.06 },
  { id: 'wheat-b', Art: Wheat, x: 30, y: 66, size: 40, heading: 244, speed: 0.27, spin: 0.07 },
  { id: 'spiral-b', Art: Spiral, x: 70, y: 26, size: 54, heading: 12, speed: 0.25, spin: -0.05 },
];
