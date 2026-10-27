/**
 * Structured data (JSON-LD) voor Google en AI-zoekmachines.
 * Eén plek voor de feiten over de club; pagina's voegen alleen hun eigen FAQ/Event toe.
 *
 * Feiten hieronder zijn PUBLIEK (staan ook in tekst op de site). Prijzen staan er bewust niet in.
 */
import { COMPANY } from './company';
import type { FaqItem } from './faq';
import type { AgendaItem } from './agenda';

export const ORG_ID = `${COMPANY.site}/#organization`;

export const PUBLIC_FACTS = {
  members: '50+',
  momentsPerYear: 12,
  rating: '8,8',
  region: 'Den Bosch, Noord-Brabant; events in heel Nederland',
  audience:
    'eigenaren van e-commerce-merken (bol, Amazon, Shopify/D2C) voorbij de beginfase, plus geselecteerde dienstverleners en AI-bouwers die voor zulke merken werken',
} as const;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: COMPANY.name,
    alternateName: 'Vanguard',
    url: COMPANY.site,
    logo: `${COMPANY.site}/apple-touch-icon.png`,
    image: `${COMPANY.site}/images/og-default.jpg`,
    description:
      'Club Vanguard is een besloten Nederlandse ondernemersclub voor e-commerce- en AI-ondernemers: offline events, dinners en een internationale trip, met toelating via een kennismakingsgesprek. Gevestigd in Den Bosch.',
    slogan: 'Samen winnen. Zonder ego.',
    email: COMPANY.email,
    founder: { '@type': 'Person', name: COMPANY.owner },
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.postal,
      addressLocality: "'s-Hertogenbosch",
      addressRegion: 'Noord-Brabant',
      addressCountry: 'NL',
    },
    areaServed: { '@type': 'Country', name: 'Nederland' },
    knowsAbout: ['e-commerce', 'bol.com', 'Amazon', 'Shopify', 'D2C', 'AI voor ondernemers', 'ondernemersnetwerk'],
    sameAs: [
      'https://www.linkedin.com/company/club-vanguard/',
      'https://www.instagram.com/clubvanguard.nl/',
    ],
    identifier: [{ '@type': 'PropertyValue', propertyID: 'KvK', value: COMPANY.kvk }],
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.join(' ') },
    })),
  };
}

/** Event-schema voor de agenda. Dinners zijn op aanvraag → geen vrije ticketverkoop, wel vindbaar. */
export function eventsSchema(items: AgendaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': items.map((it) => ({
      '@type': it.type === 'Dinner' ? 'SocialEvent' : 'BusinessEvent',
      name: `${it.title} · Club Vanguard`,
      startDate: it.time ? `${it.date}T${it.time}:00+01:00` : it.date,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: it.location,
        address: { '@type': 'PostalAddress', addressCountry: 'NL', addressRegion: 'Noord-Brabant' },
      },
      organizer: { '@id': ORG_ID },
      url: it.detailUrl ? `${COMPANY.site}${it.detailUrl}` : `${COMPANY.site}/meetups/`,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/LimitedAvailability',
        url: it.signupUrl ?? `${COMPANY.site}/join/`,
        description: it.type === 'Dinner' ? 'Op aanvraag, voor leden en genodigden' : 'Leden en gasten op aanvraag',
      },
    })),
  };
}
