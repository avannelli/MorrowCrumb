import { pastries } from '../data/pastries';
import { MenuMark } from '../illustrations/MenuMark';
import { DriftingBackdrop } from './DriftingBackdrop';
import { driftShapes } from '../illustrations/DriftShapes';
import { PastryCard } from './PastryCard';

export function Menu() {
  return (
    <section className="section menu" id="menu">
      <DriftingBackdrop shapes={driftShapes} />
      <div className="shell">
        <header className="menu__head">
          <MenuMark className="menu__mark" />
          <h2 className="menu__title">
            A list of our <em>featured</em> pastries
          </h2>
          <span className="menu__flourish" aria-hidden="true" />
        </header>

        <div className="menu__grid">
          {pastries.map((pastry, i) => (
            <PastryCard key={pastry.id} pastry={pastry} index={i + 1} />
          ))}
        </div>

        <p className="menu__foot">
          Whole loaves and pastry boxes are set aside on request — send a note the
          day before.
        </p>
      </div>
    </section>
  );
}
