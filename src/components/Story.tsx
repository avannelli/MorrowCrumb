import type { CSSProperties } from 'react';
import { site } from '../data/site';
import { pastries } from '../data/pastries';
import { Botany } from './Botany';
import { useInView } from '../hooks/useInView';
import '../styles/story.css';

/**
 * The bakery's own account of itself, set beneath the menu and built like the
 * hero: a tactile ground, a heading that rises out of its own mask, a drop cap
 * opening the copy, and the day's figures printed along the foot the way a
 * colophon is set.
 */
export function Story() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.16 });
  /** The count is read off the menu itself rather than written down twice. */
  const figures = site.story.figures.map((figure) => ({
    ...figure,
    value: figure.value ?? String(pastries.length).padStart(2, '0'),
  }));

  return (
    <section className="section story" aria-labelledby="story-title">
      <div className="story__ground" aria-hidden="true" />
      <Botany field="story" />

      <div className="shell story__inner" ref={ref} data-in={inView ? 'true' : 'false'}>
        <div className="story__main">
          <header className="story__head">
            <p className="eyebrow story__eyebrow">
              <span className="story__mark" aria-hidden="true" />
              {site.story.eyebrow}
            </p>

            <h2 className="story__title" id="story-title">
              {site.story.headingLines.map((line, index) => (
                <span className="story__line" key={line}>
                  <span
                    className="story__line-inner"
                    style={{ ['--d' as string]: `${index * 110}ms` } as CSSProperties}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <p className="story__ornament" aria-hidden="true">
              <span>✧</span>
            </p>
          </header>

          <div className="story__body">
            {site.story.paragraphs.map((paragraph, index) => (
              <p key={index} style={{ ['--i' as string]: index } as CSSProperties}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <ul className="story__figures">
          {figures.map((figure, index) => (
            <li key={figure.caption} style={{ ['--i' as string]: index } as CSSProperties}>
              <span className="story__figure">{figure.value}</span>
              <span className="story__caption">{figure.caption}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
