export type NavItem = { label: string; href: string };

/** Every detail below is invented for a portfolio concept. */
export const site = {
  name: 'Morrow & Crumb',
  tagline: 'Baked slowly. Gone quickly.',
  intro:
    'A small neighbourhood bakery working in laminated pastry, seasonal sweets and early morning baking. We make a short menu, once a day, and stop when it is gone.',
  neighbourhood: 'Market Row, Alder Quarter',
  email: 'hello@morrowandcrumb.example',
  hours: [
    { days: 'Tuesday – Friday', time: '7:00 – 15:00' },
    { days: 'Saturday – Sunday', time: '8:00 – 14:00' },
    { days: 'Monday', time: 'Closed — milling & prep' },
  ],
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Menu', href: '#menu' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavItem[],
  disclaimer:
    'Morrow & Crumb is a fictional design concept created for portfolio demonstration. The bakery, its menu, hours and contact details are invented.',
} as const;

export type Service = { open: boolean; label: string; time: string };

/** Which of the fictional opening slots applies today. */
export function todaysService(date = new Date()): Service {
  const day = date.getDay();
  if (day === 1) return { open: false, label: 'Closed today', time: 'Milling & prep' };
  if (day === 0 || day === 6) return { open: true, label: 'Open today', time: '8:00 – 14:00' };
  return { open: true, label: 'Open today', time: '7:00 – 15:00' };
}
