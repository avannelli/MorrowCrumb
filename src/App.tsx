import { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const handleRevealed = useCallback((value: boolean) => setRevealed(value), []);

  return (
    <div className="page" data-revealed={revealed}>
      <a className="skip-link" href="#menu">
        Skip to the menu
      </a>
      <Header onRevealed={handleRevealed} />
      <main id="main">
        <Hero />
        <Menu />
      </main>
      <Footer />
    </div>
  );
}
