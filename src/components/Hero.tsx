import type { CSSProperties } from 'react';
import { site } from '../data/site';
import type { Schedule } from '../hooks/useService';
import { HeroWave } from '../illustrations/HeroWave';
import { Botany } from './Botany';
import { PastryRain } from './PastryRain';
import '../styles/hero.css';

/** Each staged element gets its own beat, in ms after the page is revealed. */
const beat = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/** One headline line, rising out of a mask so the type appears to be set. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="hero__line">
      <span className="hero__line-inner" style={beat(delay)}>
        {children}
      </span>
    </span>
  );
}

export function Hero({
  schedule,
  onNavigate,
}: {
  schedule: Schedule;
  onNavigate: (href: string) => void;
}) {
  const { service, progress, days } = schedule;

  return (
    <section className="hero" id="top">
      <div className="hero__ground" aria-hidden="true" />
      <PastryRain />
      <Botany field="hero" />

      <div className="shell hero__inner">
        <div className="hero__main">
          <div className="hero__headline">
            <p className="eyebrow reveal hero__eyebrow" style={beat(40)}>
              <span className="hero__eyebrow-rule" aria-hidden="true" />
              {site.neighbourhood} — est. no. 14
            </p>

            <h1 className="hero__title">
              <Line delay={140}>Baked slowly.</Line>
              <Line delay={260}>
                <em>Gone quickly.</em>
              </Line>
            </h1>

            <p className="hero__lede reveal" style={beat(420)}>
              {site.intro}
            </p>

            <div className="hero__actions reveal" style={beat(520)}>
              <a
                className="button"
                href="#menu"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate('#menu');
                }}
              >
                <span>Read the menu</span>
                <span className="button__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          <aside className="hero__aside">
            <div className="hero__panel reveal" style={beat(600)}>
              <div className="hero__panel-head">
                <h2 className="hero__panel-title">The week</h2>
                <p className="hero__service" data-state={service.state}>
                  <span className="hero__service-dot" aria-hidden="true" />
                  {service.label}
                </p>
              </div>

              <ol className="hero__week">
                {days.map((day) => (
                  <li
                    key={day.name}
                    className="hero__day"
                    data-today={day.today ? 'true' : undefined}
                    data-closed={day.closed ? 'true' : undefined}
                  >
                    <span className="hero__day-name">
                      <span className="hero__day-full">{day.name}</span>
                      <span className="hero__day-short" aria-hidden="true">
                        {day.short}
                      </span>
                    </span>
                    <span className="hero__day-leader" aria-hidden="true" />
                    <span className="hero__day-time">{day.time}</span>
                  </li>
                ))}
              </ol>

              <div className="hero__now" data-state={service.state}>
                {progress !== null && (
                  <div
                    className="hero__now-bar"
                    role="img"
                    aria-label={`Today's service, ${Math.round(progress * 100)} per cent through`}
                  >
                    <span
                      className="hero__now-fill"
                      style={{ ['--p' as string]: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                    />
                  </div>
                )}
                <p className="hero__now-note">{service.note}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <HeroWave className="hero__wave" />
    </section>
  );
}
