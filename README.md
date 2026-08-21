# Club Vanguard — clubvanguard.com

Astro-site voor Club Vanguard. Navy / ivory / brass, drie pagina's:

- `/` — homepage (hero, cijfers, pijlers, membership in de praktijk, member-stemmen + reviews, selectie, proces, founder, slot-CTA)
- `/verhaal/` — het verhaal (voormalig about + benefits samengevoegd)
- `/aanvragen/` — aanvraagformulier

## Starten

```bash
npm install
npm run dev        # -> http://localhost:4321
```

## Voordat je live gaat

1. **Foto's** — zie `public/images/LEES-MIJ.txt`, vervang de placeholders.
2. **Logo** — vervang het tekst-wordmark in `src/components/Header.astro` door je logo-SVG.
3. **Formulier** — draait op Youform (form.clubvanguard.io/intake), embedded als
   iframe in `src/pages/aanvragen.astro`. Verander je de Youform-URL, pas dan
   `YOUFORM_URL` aan. Liever doorlinken i.p.v. embedden? De knop-variant staat
   als comment in hetzelfde bestand.
4. **Reviews** — plak jullie echte Google- en Trustpilot-links in
   `src/components/Quotes.astro` (`reviewLinks`), en vul eventueel 1-2 quotes
   uit die reviews aan.

NB: de Vanguard Insider is members-only en staat daarom niet als publieke
signup op de site. Maken jullie hem later openbaar, dan kan er een
Beehiiv-signupsectie terug (clubvanguard.beehiiv.com/subscribe).

## Deployen (Cloudflare Pages)

1. Push deze repo naar GitHub.
2. Cloudflare dashboard -> Workers & Pages -> Create -> Pages -> koppel de repo.
3. Build command: `npm run build`, output directory: `dist`.
4. Custom domain: clubvanguard.com (staat al in je Cloudflare-account).

Elke `git push` deployt daarna automatisch.
