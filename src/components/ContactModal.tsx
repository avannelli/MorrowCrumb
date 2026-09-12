import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { site } from '../data/site';
import type { Schedule } from '../hooks/useService';
import { FacebookIcon, InstagramIcon, XIcon } from '../illustrations/SocialIcons';
import '../styles/modal.css';

/** The mark drawn for each account in `site.social`, by label. */
const icons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  X: XIcon,
};

/** How long the card takes to leave. Kept in step with modal.css. */
const CLOSE = 300;

const RATINGS = [1, 2, 3, 4, 5] as const;
const RATING_WORDS: Record<number, string> = {
  1: 'Not for me',
  2: 'Fair',
  3: 'Good',
  4: 'Very good',
  5: 'Worth the queue',
};
const REVIEW_LIMIT = 240;

/** A five-point star, drawn in the same weight as the rest of the artwork. */
function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="rating__star">
      <path
        d="M12 2.6 14.9 9l7 .7-5.3 4.7 1.6 6.9-6.2-3.6-6.2 3.6 1.6-6.9L2.1 9.7l7-.7z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  schedule: Schedule;
};

/**
 * The contact card. It is a dialog rather than a page: the bakery's details and
 * the week on one side, a place to leave a note on the other.
 *
 * It stays mounted through its own closing transition so the card can leave as
 * smoothly as it arrives, traps focus while open, restores focus to whatever
 * opened it, and closes on Escape or on the scrim.
 */
export function ContactModal({ open, onClose, schedule }: ContactModalProps) {
  const { service, days } = schedule;
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /** Whatever had focus before the dialog opened, so it can be handed back. */
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const reviewId = useId();

  /**
   * 'shut' unmounts. 'enter' mounts the card in its from-state and paints it
   * there for a frame — without that the card is inserted already open and the
   * browser has nothing to transition from, so it pops instead of fading.
   */
  const [state, setState] = useState<'shut' | 'enter' | 'open' | 'closing'>('shut');
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  /* ---- mount, then play the card in; on close, play it out then unmount ---- */
  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement as HTMLElement | null;
      setState('enter');
      return;
    }
    setState((current) => (current === 'shut' ? 'shut' : 'closing'));
    const timer = window.setTimeout(() => {
      setState('shut');
      openerRef.current?.focus();
    }, CLOSE);
    return () => window.clearTimeout(timer);
  }, [open]);

  /**
   * Hand the card from its from-state to its open state once the browser has
   * actually painted the first. Two frames, because a single one can still be
   * batched into the same paint as the mount.
   */
  useEffect(() => {
    if (state !== 'enter') return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setState('open'));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [state]);

  /* ---- the page behind must not scroll away under the card ---- */
  useEffect(() => {
    if (state === 'shut') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [state]);

  /* ---- focus lands in the card, and Tab is kept inside it ---- */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const card = cardRef.current;
      if (!card) return;
      const focusable = card.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (state === 'enter') closeRef.current?.focus({ preventScroll: true });
  }, [state]);

  if (state === 'shut') return null;

  const shown = hovered || rating;
  const left = REVIEW_LIMIT - note.length;

  return (
    <div className="modal" data-state={state} onKeyDown={onKeyDown}>
      {/* the page dims and softens behind the card */}
      <button
        type="button"
        className="modal__scrim"
        aria-label="Close contact"
        tabIndex={-1}
        onClick={onClose}
      />

      <div
        className="modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={cardRef}
      >
        <span className="modal__frame" aria-hidden="true" />

        <button type="button" className="modal__close" ref={closeRef} onClick={onClose}>
          <span className="visually-hidden">Close</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M7 7 17 17M17 7 7 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="modal__scroll">
          <header className="modal__head">
            <p className="eyebrow">Come by</p>
            <h2 className="modal__title" id={titleId}>
              Find the <em>counter</em>
            </h2>
            <div className="modal__rule" aria-hidden="true">
              <span>✧</span>
            </div>
          </header>

          <div className="modal__cols">
            {/* ---------------- the details ---------------- */}
            <div className="modal__panel">
              <h3 className="modal__label">The address</h3>
              <address className="modal__address">
                {site.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>

              <h3 className="modal__label">Say hello</h3>
              <ul className="modal__links">
                <li>
                  <a className="link-rule" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
                <li>
                  <a className="link-rule" href={`tel:${site.phone.replace(/\s/g, '')}`}>
                    {site.phone}
                  </a>
                </li>
              </ul>

              <h3 className="modal__label">Follow along</h3>
              <ul className="modal__social">
                {site.social.map((account) => {
                  const Icon = icons[account.label];
                  return (
                    <li key={account.label}>
                      <a href={account.href} target="_blank" rel="noreferrer noopener">
                        {Icon && <Icon className="modal__social-icon" />}
                        <span>{account.handle}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ---------------- the week ---------------- */}
            <div className="modal__panel">
              <div className="modal__label-row">
                <h3 className="modal__label">Opening hours</h3>
                <p className="modal__state" data-state={service.state}>
                  <span className="modal__state-dot" aria-hidden="true" />
                  {service.label}
                </p>
              </div>

              <ol className="modal__week">
                {days.map((day) => (
                  <li
                    key={day.name}
                    data-today={day.today ? 'true' : undefined}
                    data-closed={day.closed ? 'true' : undefined}
                  >
                    <span className="modal__day">{day.name}</span>
                    <span className="modal__leader" aria-hidden="true" />
                    <span className="modal__time">{day.time}</span>
                  </li>
                ))}
              </ol>

              <p className="modal__note">{service.note}</p>
            </div>
          </div>

          {/* ---------------- leave a note ---------------- */}
          <section className="review" aria-labelledby={`${reviewId}-title`}>
            <div className="review__head">
              <h3 className="modal__label" id={`${reviewId}-title`}>
                Leave a note
              </h3>
              <p>Been in? Tell us how it was — we read every card on the counter.</p>
            </div>

            {sent ? (
              <p className="review__thanks" role="status">
                <span aria-hidden="true">✧</span>
                Thank you — your note is on the counter.
              </p>
            ) : (
              <form
                className="review__form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <fieldset className="rating">
                  <legend className="visually-hidden">Your rating</legend>
                  <div className="rating__stars" onMouseLeave={() => setHovered(0)}>
                    {RATINGS.map((value) => (
                      <label
                        key={value}
                        className="rating__option"
                        data-on={shown >= value ? 'true' : undefined}
                        onMouseEnter={() => setHovered(value)}
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={value}
                          checked={rating === value}
                          onChange={() => setRating(value)}
                          required
                        />
                        <Star filled={shown >= value} />
                        <span className="visually-hidden">
                          {value} out of 5 — {RATING_WORDS[value]}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="rating__word" aria-hidden="true">
                    {shown ? RATING_WORDS[shown] : 'Pick a rating'}
                  </p>
                </fieldset>

                <div className="review__field">
                  <label htmlFor={`${reviewId}-note`} className="visually-hidden">
                    Your review
                  </label>
                  <textarea
                    id={`${reviewId}-note`}
                    rows={3}
                    maxLength={REVIEW_LIMIT}
                    placeholder="A line or two about what you had…"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                  />
                  <p className="review__count" data-low={left < 40 ? 'true' : undefined}>
                    {left} left
                  </p>
                </div>

                <div className="review__actions">
                  <button type="submit" className="button">
                    <span>Leave the note</span>
                    <span className="button__arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                  <p className="review__aside">Nothing is sent — this is a design concept.</p>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
