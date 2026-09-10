import { formatPrice } from '../data/pastries';
import type { Pastry } from '../data/pastries';

type PastryCardProps = {
  pastry: Pastry;
  /** 1-based position, printed as a small counter number. */
  index: number;
};

export function PastryCard({ pastry, index }: PastryCardProps) {
  const { name, category, description, price, Art, note } = pastry;

  return (
    <article className="pastry">
      <div className="pastry__art">
        <Art className="pastry__svg" />
      </div>
      <div className="pastry__body">
        <p className="pastry__meta">
          <span className="pastry__index">{String(index).padStart(2, '0')}</span>
          <span className="pastry__category">{category}</span>
        </p>
        <h3 className="pastry__name">
          <span>{name}</span>
          <span className="pastry__leader" aria-hidden="true" />
          <span className="pastry__price">{formatPrice(price)}</span>
        </h3>
        <p className="pastry__description">{description}</p>
        {note ? <p className="pastry__note">{note}</p> : null}
      </div>
    </article>
  );
}
