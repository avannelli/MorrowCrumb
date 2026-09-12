import type { ComponentType, CSSProperties } from 'react';
import {
  AlmondBranch,
  FlourRing,
  QuinceBranch,
  ThymeSprig,
  VanillaPod,
  WheatStalk,
  Whisk,
} from '../illustrations/Botanicals';

type Placement = {
  Art: ComponentType<{ className?: string }>;
  /** Percentages of the host section, so the field scales with the layout. */
  x: number;
  y: number;
  /** Rendered width, in px at desktop; scaled down by CSS on small screens. */
  w: number;
  rotate: number;
  /** Seconds for one sway, and where in that sway it starts. */
  sway: number;
  delay: number;
  /** Dropped on phones, where there is no room to spare. */
  compact?: boolean;
};

const fields: Record<string, Placement[]> = {
  hero: [
    { Art: WheatStalk, x: 92, y: 8, w: 54, rotate: 14, sway: 17, delay: 0, compact: true },
    { Art: ThymeSprig, x: 4, y: 76, w: 120, rotate: -6, sway: 21, delay: -6 },
    { Art: VanillaPod, x: 74, y: 68, w: 60, rotate: -12, sway: 19, delay: -11, compact: true },
  ],
  menu: [
    { Art: AlmondBranch, x: 2, y: 12, w: 128, rotate: -8, sway: 23, delay: -3 },
    { Art: FlourRing, x: 95, y: 30, w: 96, rotate: 0, sway: 27, delay: -14 },
    { Art: QuinceBranch, x: 96, y: 74, w: 112, rotate: 12, sway: 20, delay: -8 },
    { Art: Whisk, x: 3, y: 60, w: 62, rotate: 8, sway: 25, delay: -17, compact: true },
    { Art: WheatStalk, x: 50, y: 99, w: 46, rotate: -4, sway: 18, delay: -2, compact: true },
  ],
  story: [
    { Art: WheatStalk, x: 94, y: 24, w: 48, rotate: 10, sway: 20, delay: -4, compact: true },
    { Art: ThymeSprig, x: 5, y: 80, w: 110, rotate: -8, sway: 24, delay: -12 },
  ],
};

/**
 * The decorative ingredient sketches behind a section. Purely ornamental — the
 * layer is inert to the pointer and hidden from assistive tech, and each
 * drawing sways on its own slow cycle so the page is never quite still.
 */
export function Botany({ field }: { field: keyof typeof fields }) {
  const placements = fields[field] ?? [];
  return (
    <div className="botany" aria-hidden="true">
      {placements.map(({ Art, x, y, w, rotate, sway, delay, compact }, index) => (
        <span
          key={index}
          className="botany__sketch"
          data-compact={compact ? 'true' : undefined}
          style={
            {
              '--x': `${x}%`,
              '--y': `${y}%`,
              '--w': `${w}px`,
              '--r': `${rotate}deg`,
              '--sway': `${sway}s`,
              '--sway-delay': `${delay}s`,
            } as CSSProperties
          }
        >
          <Art className="botany__art" />
        </span>
      ))}
    </div>
  );
}
