import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

export type IntroStage = 'pending' | 'playing' | 'done';
const FADE_IN = 500;
const HOLD = 380;
const SHRINK = 720;
const TRAVEL = 660;
const DURATION = FADE_IN + HOLD + SHRINK + TRAVEL;
const REVEAL_AT = FADE_IN + HOLD + SHRINK + 180;

type Targets = {
  lockup: RefObject<HTMLElement | null>;
  mark: RefObject<HTMLElement | null>;
  word: RefObject<HTMLElement | null>;
};

/** Animate the real header logo, sizing the opening lockup from its rendered bounds. */
export function useIntroAnimation({ lockup, mark, word }: Targets) {
  const [stage, setStage] = useState<IntroStage>('pending');
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const lockupEl = lockup.current;
    const markEl = mark.current;
    const wordEl = word.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let finished = false;
    let animations: Animation[] = [];
    let measuredWordWidth = 0;
    let revealTimer: number | undefined;
    let fontTimer: number | undefined;

    const clear = () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(fontTimer);
      for (const animation of animations) animation.cancel();
    };
    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      clear();
      setStage('done');
      setRevealed(true);
    };

    const fonts = document.fonts;

    async function play() {
      if (!lockupEl || !markEl || !wordEl || motion.matches || !markEl.animate || !fonts) {
        finish();
        return;
      }

      // Measure the chosen font, with a bounded fallback for slow/offline connections.
      const style = getComputedStyle(wordEl);
      await Promise.race([
        fonts.load(`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`).catch(() => undefined),
        new Promise<void>((resolve) => { fontTimer = window.setTimeout(resolve, 1200); }),
      ]);
      window.clearTimeout(fontTimer);
      if (disposed || finished) return;

      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const markBox = markEl.getBoundingClientRect();
      const wordBox = wordEl.getBoundingClientRect();
      measuredWordWidth = wordEl.offsetWidth;
      const lockupBox = lockupEl.getBoundingClientRect();
      const safeWidth = Math.max(1, vw - 48);
      const markScale = Math.min(400 / markBox.height, vw * 0.5 / markBox.height, vh * 0.4 / markBox.height, safeWidth / markBox.width);
      // Font-size alone cannot predict the width of a full name, especially on phones.
      const wordScale = Math.min(76 / parseFloat(style.fontSize), safeWidth / wordBox.width, vh * 0.14 / wordBox.height);
      const markHeight = markBox.height * markScale;
      const wordHeight = wordBox.height * wordScale;
      const gap = markHeight * 0.18;
      const top = (vh - markHeight - gap - wordHeight) / 2;
      const shift = (box: DOMRect, x: number, y: number) =>
        `translate(${x - box.left - box.width / 2}px, ${y - box.top - box.height / 2}px)`;
      const markStart = `${shift(markBox, vw / 2, top + markHeight / 2)} scale(${markScale})`;
      const wordStart = `${shift(wordBox, vw / 2, top + markHeight + gap + wordHeight / 2)} scale(${wordScale})`;
      const settled = shift(lockupBox, vw / 2, vh / 2);
      const keyframes = (start: string): Keyframe[] => [
        { transform: start, opacity: 0, offset: 0, easing: 'ease-out' },
        { transform: start, opacity: 1, offset: FADE_IN / DURATION },
        { transform: start, opacity: 1, offset: (FADE_IN + HOLD) / DURATION, easing: 'cubic-bezier(0.5, 0, 0.2, 1)' },
        { transform: settled, opacity: 1, offset: (FADE_IN + HOLD + SHRINK) / DURATION, easing: 'cubic-bezier(0.62, 0, 0.14, 1)' },
        { transform: 'none', opacity: 1, offset: 1 },
      ];
      animations = [markEl.animate(keyframes(markStart), { duration: DURATION, fill: 'both' }), wordEl.animate(keyframes(wordStart), { duration: DURATION, fill: 'both' })];
      setStage('playing');
      revealTimer = window.setTimeout(() => setRevealed(true), REVEAL_AT);
      void Promise.all(animations.map((animation) => animation.finished)).then(finish).catch(() => undefined);
    }

    // If the viewport or font changes mid-flight, land in the responsive header.
    window.addEventListener('resize', finish);
    motion.addEventListener('change', finish);
    fonts?.addEventListener('loadingdone', onFontsLoaded);
    function onFontsLoaded() {
      if (animations.length && wordEl && Math.abs(wordEl.offsetWidth - measuredWordWidth) > 1) finish();
    }
    void play();
    return () => {
      disposed = true;
      clear();
      window.removeEventListener('resize', finish);
      motion.removeEventListener('change', finish);
      fonts?.removeEventListener('loadingdone', onFontsLoaded);
    };
  }, [lockup, mark, word]);

  return { stage, revealed };
}
