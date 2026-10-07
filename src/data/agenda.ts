import { DINNER_SIGNUP_URL } from './form';

/**
 * Agenda voor de komende drie maanden, getoond op /join/.
 * Handmatig bijwerken; datums in het verleden vallen automatisch weg.
 * Let op: de site is statisch, na een wijziging opnieuw pushen/deployen.
 */
export interface AgendaItem {
  slug: string;
  type: 'Dinner' | 'Club event' | 'Activiteit' | 'Trip';
  title: string;
  date: string; // ISO, bv. 2026-10-30
  time?: string;
  location: string;
  /** Vrije plekken; alleen tonen bij kleine settings zoals dinners. */
  spotsLeft?: number;
  /** Externe aanmeldlink (Youform). Zonder link is de maillijst de CTA. */
  signupUrl?: string;
  /** Interne eventpagina, bv. /events/the-shift/ */
  detailUrl?: string;
}

export const agenda: AgendaItem[] = [
  {
    slug: 'dinner-2026-10',
    type: 'Dinner',
    title: 'Club Dinner · oktober',
    date: '2026-10-30',
    time: '18:30',
    location: 'Locatie volgt per mail',
    spotsLeft: 4,
    signupUrl: DINNER_SIGNUP_URL,
  },
  {
    slug: 'club-event-2026-11',
    type: 'Club event',
    title: 'Club Event · november',
    date: '2026-11-21',
    location: 'Locatie volgt',
  },
  {
    slug: 'christmas-dinner-2026',
    type: 'Dinner',
    title: 'Christmas Dinner',
    date: '2026-12-18',
    time: '18:30',
    location: 'Locatie volgt per mail',
    spotsLeft: 4,
    signupUrl: DINNER_SIGNUP_URL,
  },
];

/** Komende items binnen `months` maanden vanaf vandaag, op datum gesorteerd. */
export function upcomingAgenda(months = 3, now = new Date()): AgendaItem[] {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setMonth(end.getMonth() + months);
  return agenda
    .filter((item) => {
      const d = new Date(item.date);
      return d >= start && d <= end;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function formatAgendaDate(iso: string): { weekday: string; day: string; month: string } {
  const d = new Date(iso);
  return {
    weekday: d.toLocaleDateString('nl-NL', { weekday: 'long' }),
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleDateString('nl-NL', { month: 'short' }).replace('.', '').toUpperCase(),
  };
}
