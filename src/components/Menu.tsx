import type { CSSProperties } from 'react';
import { pastries } from '../data/pastries';
import type { Pastry } from '../data/pastries';
import { PastryCard } from './PastryCard';
import { Botany } from './Botany';
import { useInView } from '../hooks/useInView';
import { site } from '../data/site';
import '../styles/menu.css';

function WheatSprig() {
  return (
    <svg viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <path d="M22 94Q43 60 52 10M39 61Q17 55 22 39Q40 43 39 61ZM44 44Q27 36 32 23Q48 29 44 44ZM48 30Q42 15 53 5Q62 19 48 30ZM40 59Q62 62 66 43Q48 42 40 59ZM32 76Q12 69 16 54Q34 59 32 76ZM33 76Q52 80 59 64Q42 59 33 76Z" />
    </svg>
  );
}

/** Featured items lead their section; the rest keep the order they are written in. */
const byFeature = (a: Pastry, b: Pastry) => Number(Boolean(b.feature)) - Number(Boolean(a.feature));

function MenuGroup({
  group,
  title,
  subtitle,
  from,
}: {
  group: Pastry['group'];
  title: string;
  subtitle: string;
  /** Where this group sits in the page's stagger, so entries keep cascading. */
  from: number;
}) {
  const slug = group.toLowerCase().replace(' ', '-');
  const items = pastries.filter((pastry) => pastry.group === group).sort(byFeature);

  return (
    <section className={`menu__group menu__group--${slug}`} aria-labelledby={`menu-${slug}`}>
      <header className="menu__group-head">
        <h3 id={`menu-${slug}`}>{title}</h3>
        <p>{subtitle}</p>
      </header>
      <ul className="menu__list">
        {items.map((pastry, index) => (
          <li key={pastry.id} className="menu__entry" style={{ ['--i' as string]: from + index } as CSSProperties}>
            <PastryCard pastry={pastry} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Menu() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

  return (
    <section className="section menu" id="menu" aria-labelledby="menu-title">
      <Botany field="menu" />

      <div className="shell">
        <div className="menu__paper-stack" ref={ref} data-in={inView ? 'true' : 'false'}>
          {/* the sheet underneath, so the menu reads as one of a stack */}
          <span className="menu__leaf" aria-hidden="true" />

          <div className="menu__paper">
            {/* paper detail: the crease down the middle and the worn edges */}
            <span className="menu__fold" aria-hidden="true" />
            <span className="menu__deckle" aria-hidden="true" />
            <span className="menu__inner-shadow" aria-hidden="true" />

            <div className="menu__print-details">
              <span>{site.neighbourhood}</span>
              <span>Pastries &amp; small pleasures</span>
            </div>

            <header className="menu__head">
              <div className="menu__ornament">
                <WheatSprig />
                <span className="eyebrow">Morrow &amp; Crumb</span>
                <WheatSprig />
              </div>
              <h2 className="menu__title" id="menu-title">
                The bakery <em>menu</em>
              </h2>
              <p>Golden edges, soft centres, little everyday rituals.</p>
              <div className="menu__head-rule" aria-hidden="true">
                <span>✧</span>
              </div>
            </header>

            <div className="menu__columns">
              <div className="menu__column">
                <MenuGroup
                  group="Morning"
                  title="Morning pastries"
                  subtitle="Buttery layers & sugar-dusted favourites"
                  from={0}
                />
                <MenuGroup
                  group="Seasonal"
                  title="In season"
                  subtitle="From the orchard, with a little thyme"
                  from={3}
                />
              </div>
              <div className="menu__column">
                <MenuGroup
                  group="All Day"
                  title="From the pâtisserie"
                  subtitle="Small cakes, delicate layers & something chocolate"
                  from={1}
                />
                <div className="menu__bakers-note">
                  <span aria-hidden="true">✧</span>
                  <p>
                    A little note from the bakery
                    <small>Take your time. There’s always room for something sweet.</small>
                  </p>
                </div>
              </div>
            </div>

            <footer className="menu__foot">
              <span>For the table, or to take home</span>
              <p>
                Whole loaves and pastry boxes are set aside on request — send a note the day
                before.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
