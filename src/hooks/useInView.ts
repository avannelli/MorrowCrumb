import { useEffect, useRef, useState } from 'react';

type Options = {
  /** How far into the viewport the element must come. */
  threshold?: number;
  /** Trim the viewport, so things wake a little before the very edge. */
  rootMargin?: string;
  /** Keep the revealed state once it has fired. Default true. */
  once?: boolean;
};

/**
 * Scroll-entry reveal. Returns a ref to attach and whether the element has
 * entered the viewport; reduced-motion and browsers without the observer land
 * on `true` immediately so nothing can be left invisible.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.16,
  rootMargin = '0px 0px -12% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
