/**
 * Kit (voorheen ConvertKit) — e-maillijst van Club Vanguard.
 *
 * Het aanmeldformulier op /join/ post rechtstreeks naar het form-endpoint van
 * Kit (geen embed-script, dus geen "Built with Kit"-badge). Kit stuurt daarna
 * zelf de bevestigingsmail (double opt-in) en de welkomstmail.
 *
 * Instellen:
 *  1. Kit → Grow → Landing Pages & Forms → maak een form (type maakt niet uit,
 *     het ontwerp wordt niet gebruikt). Het ID staat in de embed-code:
 *     https://app.kit.com/forms/1234567/subscriptions  →  1234567
 *  2. Kit → Subscribers → Custom fields: maak `source`, `campaign` en `context`.
 *  3. Zet het ID hieronder of in .env als PUBLIC_KIT_FORM_ID.
 */
export const KIT_FORM_ID: string = import.meta.env.PUBLIC_KIT_FORM_ID ?? '';

export const KIT_FORM_ACTION = KIT_FORM_ID
  ? `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`
  : '';
