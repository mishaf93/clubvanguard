/**
 * Bedrijfsgegevens van Club Vanguard. Eén plek, overal hergebruikt
 * (footer, /contact/, algemene voorwaarden, privacyverklaring).
 *
 * Velden die met "[" beginnen worden op de site als placeholder getoond.
 */
export const COMPANY = {
  /** Handelsnaam zoals op de site. */
  name: 'Club Vanguard',
  /** Rechtsvorm + eigenaar, zoals ingeschreven bij de KvK. */
  legalForm: 'eenmanszaak',
  owner: 'Misha Fedorov',
  kvk: '74408151',
  btw: 'NL002388775B81',
  address: {
    street: 'Reitscheweg 37, K4',
    postal: '5232 BX',
    city: 'Den Bosch',
    country: 'Nederland',
  },
  email: 'admin@clubvanguard.com',
  site: 'https://clubvanguard.com',
  /** Arrondissement voor de forumkeuze in de voorwaarden. */
  court: 'Oost-Brabant',
} as const;

/** Adres als één regel, voor footer en contactblok. */
export const addressLine = () =>
  `${COMPANY.address.street}, ${COMPANY.address.postal} ${COMPANY.address.city}`;

/** Zolang Misha de gegevens niet heeft ingevuld, laten we ze niet in de footer zien. */
export const companyDetailsFilled = () =>
  !COMPANY.kvk.startsWith('[') && !COMPANY.address.street.startsWith('[');
