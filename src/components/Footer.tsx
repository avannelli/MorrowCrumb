import { BrandMark } from './BrandMark';
import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <BrandMark height={44} />
          <p className="footer__name">{site.name}</p>
          <p className="footer__tagline">{site.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <h2 className="footer__heading">Pages</h2>
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__block">
          <h2 className="footer__heading">Contact</h2>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>{site.neighbourhood}</p>
        </div>

        <div className="footer__block">
          <h2 className="footer__heading">Hours</h2>
          <ul className="footer__hours">
            {site.hours.map((slot) => (
              <li key={slot.days}>
                <span>{slot.days}</span>
                <span>{slot.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell footer__base">
        <p>&copy; {new Date().getFullYear()} {site.name}</p>
        <p className="footer__disclaimer">{site.disclaimer}</p>
      </div>
    </footer>
  );
}
