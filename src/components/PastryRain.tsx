import type { ComponentType, CSSProperties } from 'react';
import {
  AlmondCroissant,
  CaramelChoux,
  Financier,
  MilleFeuille,
  MorningBun,
  PearDanish,
  QuinceGalette,
  RyeTart,
} from '../illustrations/PastryArt';

type Drop = {
  Art: ComponentType<{ className?: string }>;
  /** Where the drop falls, as a percentage across the hero. */
  x: number;
  /** Rendered width in px. */
  size: number;
  /** Seconds for one fall, and how far into that fall it starts. */
  dur: number;
  delay: number;
  /** Sideways travel over the fall, in px, so nothing drops dead straight. */
  drift: number;
  /** Degrees of turn, start to finish. */
  from: number;
  to: number;
  /** Opacity once clear of the top edge. */
  fade: number;
};

/**
 * Twelve drops, spread unevenly across the width with no two sharing a speed,
 * so the pattern never visibly repeats. Every delay is negative: the rain is
 * already falling when the page opens rather than starting from an empty sky.
 */
const drops: Drop[] = [
  { Art: AlmondCroissant, x: 7, size: 76, dur: 21, delay: -4, drift: 18, from: -8, to: 14, fade: 0.2 },
  { Art: MilleFeuille, x: 12, size: 48, dur: 27, delay: -22, drift: -10, from: 14, to: -6, fade: 0.16 },
  { Art: Financier, x: 19, size: 52, dur: 25, delay: -15, drift: -14, from: 12, to: -10, fade: 0.16 },
  { Art: RyeTart, x: 28, size: 64, dur: 23, delay: -9, drift: 22, from: -6, to: 18, fade: 0.18 },
  { Art: MorningBun, x: 36, size: 58, dur: 28, delay: -20, drift: -18, from: 8, to: -16, fade: 0.15 },
  { Art: MilleFeuille, x: 46, size: 70, dur: 19, delay: -6, drift: 14, from: -10, to: 10, fade: 0.19 },
  { Art: QuinceGalette, x: 56, size: 60, dur: 26, delay: -17, drift: -20, from: 6, to: -12, fade: 0.17 },
  { Art: CaramelChoux, x: 64, size: 50, dur: 22, delay: -12, drift: 16, from: -4, to: 16, fade: 0.16 },
  { Art: PearDanish, x: 73, size: 66, dur: 29, delay: -3, drift: -16, from: 10, to: -8, fade: 0.18 },
  { Art: AlmondCroissant, x: 82, size: 54, dur: 24, delay: -14, drift: 20, from: -12, to: 12, fade: 0.15 },
  { Art: RyeTart, x: 90, size: 62, dur: 20, delay: -8, drift: -12, from: 4, to: -14, fade: 0.17 },
  { Art: Financier, x: 96, size: 46, dur: 30, delay: -25, drift: 12, from: -6, to: 20, fade: 0.14 },
];

/**
 * Pastries falling slowly behind the hero. Purely ornamental — the layer is
 * inert to the pointer, hidden from assistive tech, and sits under the type,
 * faint enough that the headline still carries. The fall is driven entirely in
 * CSS; see `.rain` in hero.css.
 */
export function PastryRain() {
  return (
    <div className="rain" aria-hidden="true">
      {drops.map(({ Art, x, size, dur, delay, drift, from, to, fade }, index) => (
        <span
          key={index}
          className="rain__drop"
          style={
            {
              '--x': `${x}%`,
              '--size': `${size}px`,
              '--dur': `${dur}s`,
              '--delay': `${delay}s`,
              '--drift': `${drift}px`,
              '--from': `${from}deg`,
              '--to': `${to}deg`,
              '--fade': fade,
            } as CSSProperties
          }
        >
          <Art className="rain__art" />
        </span>
      ))}
    </div>
  );
}
