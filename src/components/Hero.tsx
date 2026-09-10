import { site } from '../data/site';
import { HeroWave } from '../illustrations/HeroWave';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero__inner">
        <div className="hero__main">
          <div className="hero__headline">
            <p className="eyebrow reveal" style={{ ['--d' as string]: '0ms' }}>
              {site.neighbourhood} — est. no. 14
            </p>
            <h1 className="hero__title reveal" style={{ ['--d' as string]: '80ms' }}>
              Baked slowly.
              <em> Gone quickly.</em>
            </h1>
          </div>

          <aside className="hero__aside">
            <p className="hero__lede reveal" style={{ ['--d' as string]: '180ms' }}>
              {site.intro}
            </p>
            <dl className="hero__hours reveal" style={{ ['--d' as string]: '260ms' }}>
              {site.hours.map((slot) => (
                <div key={slot.days} className="hero__row">
                  <dt>{slot.days}</dt>
                  <dd>{slot.time}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
      <HeroWave className="hero__wave" />
    </section>
  );
}
