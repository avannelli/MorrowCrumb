import { useEffect, useRef } from 'react';
import type { DriftShape } from '../illustrations/DriftShapes';

type DriftingBackdropProps = {
  shapes: DriftShape[];
  tone?: 'light' | 'deep';
};

/** How close to a drawn line the cursor counts as a touch, in screen px. */
const TOUCH_TOLERANCE = 9;
/** Speed a shape is knocked to when the cursor catches it. */
const KNOCK = 3.4;
/** Per-frame bleed back towards the shape's own drift speed. */
const SETTLE = 0.985;
/** Frames a shape ignores the cursor after being hit, so it can get clear. */
const COOLDOWN = 12;
/** Cursor point plus a ring around it, in units of the tolerance. */
const OFFSETS = [
  [0, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [0.7, 0.7],
  [-0.7, 0.7],
  [0.7, -0.7],
  [-0.7, -0.7],
] as const;

/** The wave's own geometry, so shapes bounce off the actual squiggle. */
const WAVE_BASELINE = 22 / 46;
const WAVE_AMPLITUDE = 15 / 46;
const WAVE_PERIODS = 6;

type Body = {
  el: HTMLElement;
  geometry: SVGGeometryElement[];
  shape: DriftShape;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rx: number;
  ry: number;
  angle: number;
  cooldown: number;
};

/**
 * Free-floating line art behind the menu. Each shape drifts at its own slow
 * pace and bounces off the walls of the field: the scalloped wave along the
 * top — sampled from the same curve the divider draws — and the footer edge
 * below.
 *
 * The cursor is not a force field. A shape only reacts when the pointer
 * actually touches one of its drawn strokes, which is tested with
 * `isPointInStroke` against the real SVG geometry, so the hollow middle of a
 * ring lets the cursor straight through.
 */
export function DriftingBackdrop({ shapes, tone = 'light' }: DriftingBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = 0;
    let height = 0;
    let waveHeight = 0;
    const bodies: Body[] = [];

    /** Underside of the scalloped divider at a given x. */
    const waveAt = (x: number) => {
      if (waveHeight <= 0) return 0;
      const phase = (2 * Math.PI * WAVE_PERIODS * (width - x)) / (width || 1);
      return waveHeight * (WAVE_BASELINE + WAVE_AMPLITUDE * Math.sin(phase));
    };

    const measure = () => {
      const box = root.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const wave = document.querySelector('.hero__wave');
      waveHeight = wave ? wave.getBoundingClientRect().height : 0;

      for (const body of bodies) {
        body.rx = body.el.offsetWidth / 2;
        body.ry = body.el.offsetHeight / 2;
      }
    };

    for (const shape of shapes) {
      const el = root.querySelector<HTMLElement>(`[data-shape="${shape.id}"]`);
      if (!el) continue;
      const heading = (shape.heading * Math.PI) / 180;
      bodies.push({
        el,
        geometry: Array.from(el.querySelectorAll<SVGGeometryElement>('path, circle')),
        shape,
        x: 0,
        y: 0,
        vx: Math.cos(heading) * shape.speed,
        vy: Math.sin(heading) * shape.speed,
        rx: 0,
        ry: 0,
        angle: shape.heading * 0.2,
        cooldown: 0,
      });
    }
    if (!bodies.length) return;

    measure();
    for (const body of bodies) {
      body.x = (width * body.shape.x) / 100;
      body.y = (height * body.shape.y) / 100;
    }

    const pointer = { clientX: 0, clientY: 0, inside: false };
    let frame = 0;
    let visible = true;

    /**
     * Does the cursor sit on one of this shape's drawn strokes? Chromium wants
     * a real SVGPoint here, so the client point is mapped into the element's
     * own user space by hand and fed through a reused point object.
     */
    const touches = (body: Body) => {
      const rect = body.el.getBoundingClientRect();
      if (
        pointer.clientX < rect.left - TOUCH_TOLERANCE ||
        pointer.clientX > rect.right + TOUCH_TOLERANCE ||
        pointer.clientY < rect.top - TOUCH_TOLERANCE ||
        pointer.clientY > rect.bottom + TOUCH_TOLERANCE
      ) {
        return false;
      }

      for (const geo of body.geometry) {
        const svg = geo.ownerSVGElement;
        const ctm = geo.getScreenCTM();
        if (!svg || !ctm) continue;

        const inverse = ctm.inverse();
        const lx =
          inverse.a * pointer.clientX + inverse.c * pointer.clientY + inverse.e;
        const ly =
          inverse.b * pointer.clientX + inverse.d * pointer.clientY + inverse.f;
        const tol = TOUCH_TOLERANCE / (Math.hypot(ctm.a, ctm.b) || 1);

        const point = svg.createSVGPoint();
        // the cursor itself, plus a small ring, so thin strokes stay catchable
        for (const [ox, oy] of OFFSETS) {
          point.x = lx + ox * tol;
          point.y = ly + oy * tol;
          try {
            if (geo.isPointInStroke(point)) return true;
          } catch {
            return false;
          }
        }
      }
      return false;
    };

    const step = () => {
      const box = root.getBoundingClientRect();

      for (const body of bodies) {
        if (body.cooldown > 0) body.cooldown -= 1;

        if (pointer.inside && body.cooldown === 0 && touches(body)) {
          // bounce off the cursor, away from where it made contact
          const cx = box.left + body.x;
          const cy = box.top + body.y;
          let nx = cx - pointer.clientX;
          let ny = cy - pointer.clientY;
          const len = Math.hypot(nx, ny) || 1;
          nx /= len;
          ny /= len;

          const along = body.vx * nx + body.vy * ny;
          if (along < 0) {
            // reflect whatever momentum was heading into the cursor
            body.vx -= 2 * along * nx;
            body.vy -= 2 * along * ny;
          }
          body.vx += nx * KNOCK;
          body.vy += ny * KNOCK;
          body.cooldown = COOLDOWN;
        }

        body.x += body.vx;
        body.y += body.vy;

        // walls: page edges, the scalloped divider above, the footer below
        if (body.x - body.rx < 0) {
          body.x = body.rx;
          body.vx = Math.abs(body.vx);
        } else if (body.x + body.rx > width) {
          body.x = width - body.rx;
          body.vx = -Math.abs(body.vx);
        }

        const ceiling = waveAt(body.x) + body.ry;
        if (body.y < ceiling) {
          body.y = ceiling;
          body.vy = Math.abs(body.vy);
        } else if (body.y + body.ry > height) {
          body.y = height - body.ry;
          body.vy = -Math.abs(body.vy);
        }

        // ease back down to the shape's own drift speed after a knock
        const speed = Math.hypot(body.vx, body.vy);
        if (speed > body.shape.speed) {
          const eased = Math.max(body.shape.speed, speed * SETTLE);
          body.vx = (body.vx / speed) * eased;
          body.vy = (body.vy / speed) * eased;
        } else if (speed > 0.001) {
          body.vx = (body.vx / speed) * body.shape.speed;
          body.vy = (body.vy / speed) * body.shape.speed;
        }

        body.angle += body.shape.spin;
        body.el.style.transform = `translate3d(${(body.x - body.rx).toFixed(2)}px, ${(
          body.y - body.ry
        ).toFixed(2)}px, 0) rotate(${body.angle.toFixed(2)}deg)`;
      }

      frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };

    // The backdrop ignores pointer events, so listen on the section itself.
    const host = root.parentElement ?? root;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', measure);

    // don't burn frames while the section is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(frame);
        if (visible) frame = requestAnimationFrame(step);
      },
      { threshold: 0 },
    );
    observer.observe(root);

    frame = requestAnimationFrame(step);

    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', measure);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [shapes]);

  return (
    <div className="drift" ref={rootRef} data-tone={tone} aria-hidden="true">
      {shapes.map(({ id, Art, size }) => (
        <span
          key={id}
          className="drift__shape"
          data-shape={id}
          style={{ width: `${size}px` }}
        >
          <Art className="drift__art" />
        </span>
      ))}
    </div>
  );
}
