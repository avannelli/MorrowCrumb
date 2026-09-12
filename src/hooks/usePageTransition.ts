import { useCallback, useEffect, useRef, useState } from 'react';

export type TransitionPhase = 'idle' | 'out' | 'in';

/** Veil in, move, veil out — kept short enough to read as a turn of the page. */
const OUT = 260;
const IN = 520;

/**
 * Turns the in-page anchors into something closer to a page transition: the
 * current view settles back a step behind a warm veil, the new section is put
 * in place, and it rises into view. The hash is kept in sync so links and the
 * back button still work, and reduced-motion falls back to a plain scroll.
 */
export function usePageTransition() {
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const timers = useRef<number[]>([]);
  /** The section the last transition landed on, so it can replay its entrance. */
  const [landed, setLanded] = useState<string | null>(null);

  const clear = useCallback(() => {
    for (const timer of timers.current) window.clearTimeout(timer);
    timers.current = [];
  }, []);

  useEffect(() => clear, [clear]);

  const navigate = useCallback(
    (href: string) => {
      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) return false;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const top = () => {
        const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
        // #top sits at the very top of the document; everything else clears the bar.
        return href === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
      };

      if (reduced) {
        window.scrollTo({ top: top(), behavior: 'auto' });
        history.replaceState(null, '', href);
        return true;
      }

      clear();
      setPhase('out');
      timers.current.push(
        window.setTimeout(() => {
          // Jump behind the veil rather than scrolling through the page.
          window.scrollTo({ top: top(), behavior: 'instant' as ScrollBehavior });
          history.replaceState(null, '', href);
          setLanded(href);
          setPhase('in');
        }, OUT),
        window.setTimeout(() => setPhase('idle'), OUT + IN),
      );
      return true;
    },
    [clear],
  );

  return { phase, landed, navigate };
}
