import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

export type IntroStage = 'pending' | 'playing' | 'done';

const FADE_IN = 500;
const HOLD = 380;
/** The mark shrinks in place at centre stage before it travels. */
const SHRINK = 720;
const TRAVEL = 660;
const DURATION = FADE_IN + HOLD + SHRINK + TRAVEL; // ~2.26s
/** Navigation and page content arrive while the mark is still travelling. */
const REVEAL_AT = FADE_IN + HOLD + SHRINK + 180;

type Targets = {
  /** The whole header lockup — mark and wordmark together. */
  lockup: RefObject<HTMLElement | null>;
  mark: RefObject<HTMLElement | null>;
  word: RefObject<HTMLElement | null>;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Plays the brand reveal by starting the *header* lockup at screen centre and
 * animating it back to its own resting position. Because the final keyframe is
 * `transform: none`, the mark lands exactly where the layout already puts it —
 * there is no hand-off between two separate elements and no snap at the end.
 */
export function useIntroAnimation({ lockup, mark, word }: Targets) {
  const [stage, setStage] = useState<IntroStage>('pending');
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const lockupEl = lockup.current;
    const markEl = mark.current;
    const wordEl = word.current;

    if (!lockupEl || !markEl || !wordEl || prefersReducedMotion() || !markEl.animate) {
      setStage('done');
      setRevealed(true);
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const markBox = markEl.getBoundingClientRect();
    const wordBox = wordEl.getBoundingClientRect();

    // How large the mark should be while it is centre stage.
    const heroMarkHeight = Math.min(400, vw * 0.5, vh * 0.44);
    const scale = heroMarkHeight / markBox.height;
    const heroWordSize = Math.min(76, vw * 0.115);
    const wordScale =
      heroWordSize / parseFloat(getComputedStyle(wordEl).fontSize || '18');

    const gap = heroMarkHeight * 0.18;
    const wordHeight = heroWordSize * 1.1;
    const stackTop = vh / 2 - (heroMarkHeight + gap + wordHeight) / 2;
    const markCentreY = stackTop + heroMarkHeight / 2;
    const wordCentreY = stackTop + heroMarkHeight + gap + wordHeight / 2;

    const shiftTo = (box: DOMRect, centreY: number) =>
      `translate(${(vw / 2 - (box.left + box.width / 2)).toFixed(2)}px, ${(
        centreY -
        (box.top + box.height / 2)
      ).toFixed(2)}px)`;

    const markStart = `${shiftTo(markBox, markCentreY)} scale(${scale.toFixed(4)})`;
    const wordStart = `${shiftTo(wordBox, wordCentreY)} scale(${wordScale.toFixed(4)})`;

    // Once shrunk, mark and wordmark hold their finished lockup relationship —
    // both carry the same offset — so the last move is one glide to the header.
    const lockupBox = lockupEl.getBoundingClientRect();
    const settled = `translate(${(vw / 2 - (lockupBox.left + lockupBox.width / 2)).toFixed(
      2,
    )}px, ${(vh / 2 - (lockupBox.top + lockupBox.height / 2)).toFixed(2)}px)`;

    // Paint the centred state before the browser ever shows the header position.
    markEl.style.transform = markStart;
    markEl.style.opacity = '0';
    wordEl.style.transform = wordStart;
    wordEl.style.opacity = '0';

    const keyframes = (start: string, shrunk: string): Keyframe[] => [
      { transform: start, opacity: 0, offset: 0, easing: 'cubic-bezier(0.3, 0, 0.2, 1)' },
      { transform: start, opacity: 1, offset: FADE_IN / DURATION },
      {
        transform: start,
        opacity: 1,
        offset: (FADE_IN + HOLD) / DURATION,
        easing: 'cubic-bezier(0.5, 0, 0.2, 1)',
      },
      {
        transform: shrunk,
        opacity: 1,
        offset: (FADE_IN + HOLD + SHRINK) / DURATION,
        easing: 'cubic-bezier(0.62, 0, 0.14, 1)',
      },
      { transform: 'none', opacity: 1, offset: 1 },
    ];

    const options: KeyframeAnimationOptions = { duration: DURATION, fill: 'both' };
    const animations = [
      markEl.animate(keyframes(markStart, settled), options),
      wordEl.animate(keyframes(wordStart, settled), options),
    ];

    const settle = () => {
      // Clear the inline start state first, then drop the animation, so the
      // element is never briefly left at its centred position.
      for (const el of [markEl, wordEl]) {
        el.style.transform = '';
        el.style.opacity = '';
      }
      for (const animation of animations) animation.cancel();
    };

    setStage('playing');
    const revealTimer = window.setTimeout(() => setRevealed(true), REVEAL_AT);

    let cancelled = false;
    void Promise.all(animations.map((a) => a.finished))
      .then(() => {
        if (cancelled) return;
        settle();
        setStage('done');
        setRevealed(true);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      window.clearTimeout(revealTimer);
      settle();
    };
  }, [lockup, mark, word]);

  return { stage, revealed };
}
