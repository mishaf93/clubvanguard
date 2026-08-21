import { YOUFORM_URL } from './form';

export interface VanguardEvent {
  slug: string;
  title: string;
  type: 'Meetup' | 'Dinner' | 'Activiteit' | 'Trip';
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  description: string;
  photo: string;
  signupUrl: string;
  featured: boolean;
}

// Fallback agenda. Voor live data: zet PUBLIC_EVENTS_API in .env en run build opnieuw.
export const upcomingEvents: VanguardEvent[] = [
  {
    slug: 'kasteel-maurick-2026',
    title: 'Volgend Club Event',
    type: 'Meetup',
    date: '2026-09-26',
    dateLabel: '26 september',
    time: '13:00 – 17:30',
    location: 'Kasteel Maurick, Vught (Den Bosch)',
    description:
      "Dit keer naar Kasteel Maurick in Vught: sterke sessies in het kasteel, eerlijke gesprekken en de ruimte om elkaar écht te spreken. De spreker tijdens dit event zet een nieuwe toon voor Vanguard. Don't miss out.",
    photo: 'event-maurick.jpg',
    signupUrl: YOUFORM_URL,
    featured: true,
  },
];

export const featuredEvent = upcomingEvents.find((e) => e.featured) ?? upcomingEvents[0];

export const eventCategories = [
  {
    title: 'Club events',
    text: 'Grotere bijeenkomsten met sterke sprekers, high level executives en doorgewinterde ondernemers.',
    photo: 'dinner.jpg',
    flip: true,
  },
  {
    title: 'Clubactiviteiten',
    text: 'Van relaxte uitjes tot actieve ervaringen. Plezier, herinneringen en sterkere banden tussen leden.',
    photo: 'activiteit.jpg',
  },
  {
    title: 'Diners & roundtables',
    text: 'Kleinere settings met geselecteerde leden. Diepgang en eerlijke input van ondernemers op niveau.',
    photo: 'club-event.jpg',
    flip: true,
  },
  {
    title: 'International Trips',
    text: 'Reizen en meetups over de hele wereld. Van Nederland of Spanje tot de Canton Fair in Guangzhou.',
    photo: 'pillars-trips.jpg',
  },
];
