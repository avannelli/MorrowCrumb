import { BrandMark } from './BrandMark';
import { site } from '../data/site';
import type { Service } from '../data/site';
import { FacebookIcon, InstagramIcon, XIcon } from '../illustrations/SocialIcons';

/** The mark drawn for each account in `site.social`, by label. */
const icons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  X: XIcon,
};

/**
 * Three tight bands: the lockup with the pages and the accounts, then the
 * details on one line, then the small print. The week is not repeated here —
 * the hero already carries it — so this stays short. The line beside the mark
 * is written from the live service state, so late in the evening it reads
 * "See you tomorrow morning" and before opening, "Fresh again at 7".
 */
export function Footer({
  service,
  onNavigate,
}: {
  service: Service;
  onNavigate: (href: string) => void;
}) {
  return (
    <footer className="footer">
      <div className="shell footer__top">
        <a
          className="footer__brand"
          href="#top"
          aria-label={`${site.name} — back to the top`}
          onClick={(event) => {
            event.preventDefault();
            onNavigate('#top');
          }}
        >
          <BrandMark height={34} />
          <span className="footer__lockup">
            <span className="footer__name">{site.name}</span>
            <span className="footer__tagline">{site.tagline}</span>
          </span>
        </a>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="footer__social">
          {site.social.map((account) => {
            const Icon = icons[account.label];
            return (
              <li key={account.label}>
                <a
                  href={account.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={`${site.name} on ${account.label} — ${account.handle}`}
                >
                  {Icon && <Icon className="footer__social-icon" />}
                  <span className="visually-hidden">
                    {site.name} on {account.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shell footer__details">
        <address className="footer__contact">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
          <span>{site.address.join(', ')}</span>
        </address>

        <p className="footer__note" data-state={service.state}>
          <span className="footer__note-dot" aria-hidden="true" />
          {service.note}
        </p>
      </div>

      <div className="shell footer__base">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p className="footer__disclaimer">{site.disclaimer}</p>
      </div>
    </footer>
  );
}
