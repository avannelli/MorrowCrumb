import type { ComponentType } from 'react';
import {
  AlmondCroissant,
  PearDanish,
  RyeTart,
  MorningBun,
  Financier,
  CaramelChoux,
  MilleFeuille,
  QuinceGalette,
} from '../illustrations/PastryArt';

export type Pastry = {
  id: string;
  name: string;
  category: string;
  description: string;
  /** Price in whole currency units; formatted at render time. */
  price: number;
  /** Vector illustration paired with the item. */
  Art: ComponentType<{ className?: string }>;
  /** Optional editorial note, e.g. limited availability. */
  note?: string;
};

/**
 * The full counter menu. Add, reorder or edit items here —
 * the layout reads whatever this array contains.
 */
export const pastries: Pastry[] = [
  {
    id: 'honey-almond-croissant',
    name: 'Honeyed Almond Croissant',
    category: 'Laminated',
    description:
      'Yesterday’s croissant soaked in wildflower honey syrup, filled with almond cream and baked a second time until the edges candy.',
    price: 5.75,
    Art: AlmondCroissant,
  },
  {
    id: 'brown-butter-pear-danish',
    name: 'Brown Butter Pear Danish',
    category: 'Viennoiserie',
    description:
      'Pears poached in vanilla and white wine, fanned over brown butter frangipane on a slow-proofed danish base.',
    price: 6.25,
    Art: PearDanish,
  },
  {
    id: 'dark-chocolate-rye-tart',
    name: 'Dark Chocolate Rye Tart',
    category: 'Tart',
    description:
      'A dark rye shell, bitter chocolate ganache set overnight, finished with flaked salt and a thin sheet of cocoa nib praline.',
    price: 6.5,
    Art: RyeTart,
  },
  {
    id: 'vanilla-bean-morning-bun',
    name: 'Vanilla Bean Morning Bun',
    category: 'Bun',
    description:
      'Croissant dough rolled with vanilla bean sugar and orange zest, baked in the pan so the base turns to caramel.',
    price: 5.25,
    Art: MorningBun,
  },
  {
    id: 'buckwheat-financier',
    name: 'Buckwheat & Brown Sugar Financier',
    category: 'Petit four',
    description:
      'Nutty buckwheat flour, beurre noisette and muscovado, baked small so the edges stay crisp and the centre stays damp.',
    price: 3.75,
    Art: Financier,
  },
  {
    id: 'sea-salt-caramel-choux',
    name: 'Sea Salt Caramel Choux',
    category: 'Choux',
    description:
      'Craquelin-topped choux filled with salted caramel crème diplomat, piped to order through the morning.',
    price: 5.0,
    Art: CaramelChoux,
  },
  {
    id: 'hazelnut-mille-feuille',
    name: 'Toasted Hazelnut Mille-Feuille',
    category: 'Layered',
    description:
      'Three sheets of caramelised puff, hazelnut praline crème légère, built to order so the layers still shatter.',
    price: 7.0,
    Art: MilleFeuille,
    note: 'Made in one small batch each afternoon',
  },
  {
    id: 'quince-thyme-galette',
    name: 'Quince & Thyme Galette',
    category: 'Seasonal',
    description:
      'Slow-roasted quince with lemon thyme, folded into rough puff and dusted with raw sugar. On the counter while the fruit lasts.',
    price: 6.75,
    Art: QuinceGalette,
    note: 'Autumn',
  },
];

export const formatPrice = (value: number) =>
  value.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  });
