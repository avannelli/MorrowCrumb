import { useId, useState } from 'react';
import { formatPrice } from '../data/pastries';
import type { Pastry } from '../data/pastries';

/**
 * One line of the printed menu. Hovering lifts the illustration, draws the rule
 * under the name and warms the price; the ingredient line is a real disclosure
 * so it works by tap and by keyboard, not only under a cursor.
 */
export function PastryCard({ pastry }: { pastry: Pastry }) {
  const { id, name, category, description, price, Art, note, ingredients, feature } = pastry;
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article
      className="pastry"
      data-feature={feature ? 'true' : undefined}
      data-open={open ? 'true' : undefined}
      aria-labelledby={`${id}-title`}
    >
      <div className="pastry__art">
        <span className="pastry__art-shadow" aria-hidden="true" />
        <Art className="pastry__svg" />
      </div>

      <div className="pastry__body">
        {/* the pick is marked with a line of type above the name, so the row
            itself stays the same shape as every other row on the sheet */}
        {feature && (
          <p className="pastry__ribbon">
            <span aria-hidden="true">✧</span>
            {feature}
          </p>
        )}

        <div className="pastry__title-line">
          <h4 className="pastry__name" id={`${id}-title`}>
            <span className="pastry__name-text">{name}</span>
          </h4>
          <span className="pastry__leaders" aria-hidden="true" />
          <span className="pastry__price">{formatPrice(price)}</span>
        </div>

        <p className="pastry__description">{description}</p>

        <div className="pastry__meta">
          <span className="pastry__category">{category}</span>
          {note && <span className="pastry__note">{note}</span>}
        </div>

        {ingredients && ingredients.length > 0 && (
          <>
            <button
              type="button"
              className="pastry__toggle"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="pastry__toggle-mark" aria-hidden="true" />
              <span className="pastry__toggle-label">
                {open ? 'Hide what’s inside' : 'What’s inside'}
              </span>
            </button>

            {/* Kept in the DOM so it can animate; `visibility` keeps it out of
                the accessibility tree while closed. */}
            <div className="pastry__panel" id={panelId}>
              <ul className="pastry__ingredients">
                {ingredients.map((item, index) => (
                  <li key={item} style={{ ['--i' as string]: index }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
