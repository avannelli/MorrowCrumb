import { useEffect, useState } from 'react';
import { serviceProgress, serviceStatus, weekSchedule } from '../data/site';
import type { Day, Service } from '../data/site';

/** Re-check often enough that "Closing soon" arrives on time. */
const TICK = 30_000;

export type Schedule = {
  service: Service;
  /** How far through today's trading, 0–1, or null when shut. */
  progress: number | null;
  /** The week, Monday first, with today marked. */
  days: Day[];
};

const snapshot = (): Schedule => {
  const now = new Date();
  return { service: serviceStatus(now), progress: serviceProgress(now), days: weekSchedule(now) };
};

/**
 * The bakery's live state, recomputed on a timer and whenever the tab comes
 * back to the foreground — so a page left open overnight is not still claiming
 * the counter is open, and "today" moves at midnight.
 */
export function useService(): Schedule {
  const [schedule, setSchedule] = useState(snapshot);

  useEffect(() => {
    const sync = () => setSchedule(snapshot());
    const timer = window.setInterval(sync, TICK);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('focus', sync);
    sync();
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('focus', sync);
    };
  }, []);

  return schedule;
}
