import type { VanguardEvent } from '../data/events.ts';
import { upcomingEvents } from '../data/events.ts';

const API_URL = import.meta.env.PUBLIC_EVENTS_API;

export async function getUpcomingEvents(): Promise<VanguardEvent[]> {
  if (!API_URL) return upcomingEvents;

  try {
    const res = await fetch(API_URL, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`Events API ${res.status}`);
    const data = (await res.json()) as VanguardEvent[];
    return data.length ? data : upcomingEvents;
  } catch {
    return upcomingEvents;
  }
}

export async function getFeaturedEvent(): Promise<VanguardEvent | undefined> {
  const events = await getUpcomingEvents();
  return events.find((e) => e.featured) ?? events[0];
}
