import { useEffect, useMemo, useRef, useState } from 'react';
import { BrandMark } from './BrandMark';
import { useIntroAnimation } from '../hooks/useIntroAnimation';
import { site, todaysService } from '../data/site';

type HeaderProps = {
  onRevealed: (revealed: boolean) => void;
};

export function Header({ onRevealed }: HeaderProps) {
  const lockupRef = useRef<HTMLAnchorElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const { stage, revealed } = useIntroAnimation({
    lockup: lockupRef,
    mark: markRef,
    word: wordRef,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState(site.nav[0].href);
  const service = useMemo(() => todaysService(), []);

  useEffect(() => {
    onRevealed(revealed);
  }, [revealed, onRevealed]);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Light-touch scroll spy: whichever section is crossing the middle of the
  // viewport owns the nav.
  useEffect(() => {
    const sections = site.nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el instanceof Element);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit?.target.id) setActive(`#${hit.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // The page must not scroll away underneath the centred mark.
  useEffect(() => {
    document.body.classList.toggle('is-locked', stage === 'playing');
    return () => document.body.classList.remove('is-locked');
  }, [stage]);

  return (
    <header
      className="header"
      data-stage={stage}
      data-revealed={revealed}
      data-condensed={condensed}
    >
      <div className="header__inner shell">
        <a
          className="lockup"
          href="#top"
          ref={lockupRef}
          aria-label={`${site.name} — home`}
        >
          <span className="lockup__mark" ref={markRef}>
            <BrandMark height="100%" />
          </span>
          <span className="lockup__word" ref={wordRef}>
            {site.name}
          </span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle__label">{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="nav-toggle__rules" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <nav
          className="nav"
          id="primary-nav"
          aria-label="Primary"
          data-open={menuOpen}
        >
          <ul className="nav__list">
            {site.nav.map((item, index) => (
              <li
                key={item.href}
                className="nav__item"
                style={{ ['--i' as string]: index }}
              >
                <a
                  className="nav__link"
                  href={item.href}
                  aria-current={active === item.href ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="nav__label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="nav__service" data-open={service.open}>
            <span className="nav__dot" aria-hidden="true" />
            <span className="nav__service-label">{service.label}</span>
            <span className="nav__service-time">{service.time}</span>
          </p>
        </nav>

      </div>
    </header>
  );
}
