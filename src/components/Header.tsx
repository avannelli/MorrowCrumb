import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { BrandMark } from './BrandMark';
import { useIntroAnimation } from '../hooks/useIntroAnimation';
import { site } from '../data/site';
import { FacebookIcon, InstagramIcon, XIcon } from '../illustrations/SocialIcons';
import '../styles/header.css';

/** The mark drawn for each account in `site.social`, by label. */
const icons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  X: XIcon,
};

type HeaderProps = {
  onRevealed: (revealed: boolean) => void;
  onNavigate: (href: string) => void;
  /** Opens the contact dialog; Contact is an action, not a destination. */
  onContact: () => void;
  /** The section a page transition has just landed on, if any. */
  landed: string | null;
};

export function Header({ onRevealed, onNavigate, onContact, landed }: HeaderProps) {
  const lockupRef = useRef<HTMLAnchorElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { stage, revealed } = useIntroAnimation({
    lockup: lockupRef,
    mark: markRef,
    word: wordRef,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState(site.nav[0].href);
  /** Geometry of the sliding rule under the active link. */
  const [indicator, setIndicator] = useState<CSSProperties | null>(null);

  useEffect(() => {
    onRevealed(revealed);
  }, [revealed, onRevealed]);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen]);

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

  // A transition lands before the observer catches up, so claim the nav at once.
  useEffect(() => {
    if (landed) setActive(landed);
  }, [landed]);

  /**
   * Park the sliding rule under the active link. Measured from the rendered
   * boxes rather than styled, so it travels the real distance between items at
   * any width — and in the drawer, down the left edge of the active row.
   */
  const placeIndicator = useCallback(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-href="${active}"]`);
    if (!list || !link) return;
    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    setIndicator({
      ['--x' as string]: `${linkBox.left - listBox.left}px`,
      ['--w' as string]: `${linkBox.width}px`,
      ['--y' as string]: `${linkBox.top - listBox.top}px`,
      ['--h' as string]: `${linkBox.height}px`,
    } as CSSProperties);
  }, [active]);

  useLayoutEffect(() => {
    placeIndicator();
    // The bar is still settling when this first runs — the nav fades in, the
    // drawer opens — so take the measurement again once it has come to rest.
    const frame = requestAnimationFrame(placeIndicator);
    const settle = window.setTimeout(placeIndicator, 700);
    const list = listRef.current;
    const stopSettling = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
    if (!list || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', placeIndicator);
      return () => {
        stopSettling();
        window.removeEventListener('resize', placeIndicator);
      };
    }
    const observer = new ResizeObserver(placeIndicator);
    observer.observe(list);
    // The wordmark font landing late reflows the bar underneath the rule, and
    // the list itself may not change size when it does — so watch the fonts too.
    const fonts = document.fonts;
    fonts?.addEventListener('loadingdone', placeIndicator);
    void fonts?.ready?.then(placeIndicator).catch(() => undefined);
    window.addEventListener('resize', placeIndicator);
    return () => {
      stopSettling();
      observer.disconnect();
      fonts?.removeEventListener('loadingdone', placeIndicator);
      window.removeEventListener('resize', placeIndicator);
    };
  }, [placeIndicator, menuOpen, revealed]);

  // The page must not scroll away underneath the centred mark.
  useEffect(() => {
    document.body.classList.toggle('is-locked', stage === 'playing');
    return () => document.body.classList.remove('is-locked');
  }, [stage]);

  const go = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    setActive(href);
    onNavigate(href);
  };

  return (
    <header
      className="header"
      ref={headerRef}
      data-stage={stage}
      data-revealed={revealed}
      data-condensed={condensed}
      data-open={menuOpen}
    >
      <div className="header__inner shell">
        <a
          className="lockup"
          href="#top"
          ref={lockupRef}
          aria-label={`${site.name} — home`}
          onClick={go('#top')}
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
          ref={toggleRef}
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

        <nav className="nav" id="primary-nav" aria-label="Primary" data-open={menuOpen}>
          <ul className="nav__list" ref={listRef} style={indicator ?? undefined}>
            {indicator && <li className="nav__indicator" aria-hidden="true" />}
            {site.nav.map((item, index) => (
              <li key={item.href} className="nav__item" style={{ ['--i' as string]: index } as CSSProperties}>
                <a
                  className="nav__link"
                  href={item.href}
                  data-href={item.href}
                  aria-current={active === item.href ? 'page' : undefined}
                  onClick={go(item.href)}
                >
                  <span className="nav__label">{item.label}</span>
                </a>
              </li>
            ))}

            {/* Contact opens the card in place rather than going anywhere */}
            <li
              className="nav__item"
              style={{ ['--i' as string]: site.nav.length } as CSSProperties}
            >
              <button
                type="button"
                className="nav__link"
                aria-haspopup="dialog"
                onClick={() => {
                  setMenuOpen(false);
                  onContact();
                }}
              >
                <span className="nav__label">Contact</span>
              </button>
            </li>
          </ul>

          <ul className="nav__social">
            {site.social.map((account) => {
              const Icon = icons[account.label];
              return (
                <li key={account.label}>
                  <a
                    className="nav__social-link"
                    href={account.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={`${site.name} on ${account.label} — ${account.handle}`}
                  >
                    {Icon && <Icon className="nav__social-icon" />}
                    <span className="visually-hidden">
                      {site.name} on {account.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
