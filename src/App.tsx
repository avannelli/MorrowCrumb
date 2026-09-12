import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Story } from './components/Story';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { useService } from './hooks/useService';
import { usePageTransition } from './hooks/usePageTransition';

export default function App() {
  const [revealed, setRevealed] = useState(false);
  // Reveal is one-way: once the page is showing, nothing puts it back.
  const handleRevealed = useCallback((value: boolean) => {
    setRevealed((shown) => shown || value);
  }, []);

  /**
   * Failsafe. The page is held hidden for the opening lockup, so anything that
   * stops the intro reporting back — a font that never resolves, an engine
   * without Web Animations — would otherwise leave a blank screen. After a
   * beat, show the site regardless.
   */
  useEffect(() => {
    if (revealed) return;
    const timer = window.setTimeout(() => setRevealed(true), 3500);
    return () => window.clearTimeout(timer);
  }, [revealed]);
  const schedule = useService();
  const [contactOpen, setContactOpen] = useState(false);
  const { phase, landed, navigate } = usePageTransition();

  return (
    <div className="page" data-revealed={revealed} data-phase={phase}>
      <a className="skip-link" href="#menu">
        Skip to the menu
      </a>

      {/* the warm wash that carries one section into the next */}
      <div className="veil" aria-hidden="true" />

      <Header
        onRevealed={handleRevealed}
        onNavigate={navigate}
        onContact={() => setContactOpen(true)}
        landed={landed}
      />

      <main id="main">
        <Hero schedule={schedule} onNavigate={navigate} />
        <Menu />
        <Story />
      </main>

      <Footer
        service={schedule.service}
        onNavigate={navigate}
        onContact={() => setContactOpen(true)}
      />

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        schedule={schedule}
      />
    </div>
  );
}
