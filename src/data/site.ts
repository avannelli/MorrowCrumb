export type NavItem = { label: string; href: string };

/** Every detail below is invented for a portfolio concept. */
export const site = {
  name: 'Morrow & Crumb',
  tagline: 'Baked slowly. Gone quickly.',
  intro:
    'A small neighbourhood bakery working in laminated pastry, seasonal sweets and early morning baking. We make a short menu, once a day, and stop when it is gone.',
  neighbourhood: 'Market Row, Alder Quarter',
  address: ['14 Market Row', 'Alder Quarter', 'AQ1 4RW'],
  email: 'hello@morrowandcrumb.example',
  phone: '+44 20 7946 0114',
  hours: [
    { days: 'Tuesday – Friday', time: '7:00 – 15:00' },
    { days: 'Saturday – Sunday', time: '8:00 – 14:00' },
    { days: 'Monday', time: 'Closed — milling & prep' },
  ],
  /** Invented accounts for a fictional bakery. */
  social: [
    { label: 'Instagram', handle: '@morrowandcrumb', href: 'https://instagram.com/morrowandcrumb' },
    { label: 'Facebook', handle: 'Morrow & Crumb', href: 'https://facebook.com/morrowandcrumb' },
    { label: 'X', handle: '@morrowcrumb', href: 'https://x.com/morrowcrumb' },
  ],
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Menu', href: '#menu' },
  ] satisfies NavItem[],
  disclaimer:
    'A fictional design concept — the bakery, its menu, hours and details are invented.',
} as const;

/* =========================================================
   Opening hours, as data the page can actually reason about
   ========================================================= */

/** One trading window, in minutes from midnight. Monday has none. */
type Shift = { open: number; close: number } | null;

const HOUR = 60;
/** Indexed by `Date.getDay()` — 0 is Sunday. */
const week: Shift[] = [
  { open: 8 * HOUR, close: 14 * HOUR }, // Sunday
  null, // Monday — milling & prep
  { open: 7 * HOUR, close: 15 * HOUR }, // Tuesday
  { open: 7 * HOUR, close: 15 * HOUR },
  { open: 7 * HOUR, close: 15 * HOUR },
  { open: 7 * HOUR, close: 15 * HOUR }, // Friday
  { open: 8 * HOUR, close: 14 * HOUR }, // Saturday
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** 7 * 60 -> "7:00". Written the way the rest of the menu is set. */
export const clock = (minutes: number) =>
  `${Math.floor(minutes / HOUR)}:${String(minutes % HOUR).padStart(2, '0')}`;

/** Minutes before closing at which the counter starts running out. */
const CLOSING_SOON = 60;

export type ServiceState = 'open' | 'closing-soon' | 'closed';

export type Service = {
  state: ServiceState;
  /** Short status for the header pill — "Open now", "Closing soon", "Closed". */
  label: string;
  /** The supporting line: the window, or when the ovens are next on. */
  detail: string;
  /** Editorial line for the footer — "Fresh again at 7". */
  note: string;
  /** True while the doors are open, closing-soon included. */
  open: boolean;
};

/** The next day with a trading window, searching forward from `day`. */
function nextShift(day: number) {
  for (let step = 1; step <= 7; step += 1) {
    const index = (day + step) % 7;
    const shift = week[index];
    if (shift) return { index, shift, step };
  }
  return null;
}

/**
 * What the bakery is doing at `date`. Derived from `week` above, so editing the
 * hours moves the header indicator, the contact panel and the footer together.
 */
export function serviceStatus(date = new Date()): Service {
  const day = date.getDay();
  const now = date.getHours() * HOUR + date.getMinutes();
  const today = week[day];
  const upcoming = nextShift(day);

  /** "tomorrow at 7" / "Tuesday at 7" — how we refer to the next bake. */
  const nextWhen = () => {
    if (!upcoming) return 'soon';
    const hour = Math.floor(upcoming.shift.open / HOUR);
    const when = upcoming.step === 1 ? 'tomorrow' : dayNames[upcoming.index];
    return `${when} at ${hour}`;
  };
  const nextDetail = () => {
    if (!upcoming) return 'Back soon';
    const when = upcoming.step === 1 ? 'Tomorrow' : dayNames[upcoming.index];
    return `${when} ${clock(upcoming.shift.open)}`;
  };

  if (today && now >= today.open && now < today.close) {
    const window = `${clock(today.open)} – ${clock(today.close)}`;
    if (today.close - now <= CLOSING_SOON) {
      return {
        state: 'closing-soon',
        label: 'Closing soon',
        detail: `Until ${clock(today.close)}`,
        note: `Last of the trays until ${clock(today.close)}.`,
        open: true,
      };
    }
    return {
      state: 'open',
      label: 'Open now',
      detail: window,
      note: `Warm on the counter until ${clock(today.close)}.`,
      open: true,
    };
  }

  // Closed, but the ovens come on again later this morning.
  if (today && now < today.open) {
    return {
      state: 'closed',
      label: 'Closed',
      detail: `Opens ${clock(today.open)}`,
      note: `Fresh again at ${Math.floor(today.open / HOUR)}.`,
      open: false,
    };
  }

  // Closed for the day, or a Monday.
  const milling = !today;
  return {
    state: 'closed',
    label: milling ? 'Closed today' : 'Closed',
    detail: nextDetail(),
    note: milling
      ? `Milling & prep today — fresh again ${nextWhen()}.`
      : upcoming?.step === 1
        ? 'See you tomorrow morning.'
        : `Fresh again ${nextWhen()}.`,
    open: false,
  };
}

export type Day = {
  /** 'Monday' */
  name: string;
  /** 'Mon', for tight layouts. */
  short: string;
  /** '7:00 – 15:00', or the closed note. */
  time: string;
  closed: boolean;
  today: boolean;
};

/**
 * The week written out a day at a time, starting on Monday the way a shop
 * sign does. Derived from `week`, so editing the hours moves this too.
 */
export function weekSchedule(date = new Date()): Day[] {
  const today = date.getDay();
  // Monday first: 1, 2, 3, 4, 5, 6, 0
  return [1, 2, 3, 4, 5, 6, 0].map((index) => {
    const shift = week[index];
    return {
      name: dayNames[index],
      short: dayNames[index].slice(0, 3),
      time: shift ? `${clock(shift.open)} – ${clock(shift.close)}` : 'Closed',
      closed: !shift,
      today: index === today,
    };
  });
}

/**
 * How far through today's trading the clock is, 0 to 1 — or null when the
 * counter is shut. Drives the thin bar under the week.
 */
export function serviceProgress(date = new Date()): number | null {
  const shift = week[date.getDay()];
  if (!shift) return null;
  const now = date.getHours() * HOUR + date.getMinutes();
  if (now < shift.open || now >= shift.close) return null;
  return (now - shift.open) / (shift.close - shift.open);
}

/** Which of the three listed hour rows applies today, for highlighting. */
export function todaysHourRow(date = new Date()): number {
  const day = date.getDay();
  if (day === 1) return 2;
  if (day === 0 || day === 6) return 1;
  return 0;
}
