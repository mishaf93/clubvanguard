import type { APIRoute } from 'astro';
import { COMPANY } from '../data/company';

/** Statische sitemap zonder extra dependency. Nieuwe publieke pagina hier toevoegen. */
const PAGES: Array<[path: string, priority: string]> = [
  ['/', '1.0'],
  ['/over-club-vanguard/', '0.8'],
  ['/meetups/', '0.8'],
  ['/mastermind-e-commerce/', '0.8'],
  ['/ondernemersclub-den-bosch/', '0.8'],
  ['/ondernemersclubs-vergeleken/', '0.7'],
  ['/aanvragen/', '0.7'],
  ['/join/', '0.5'],
  ['/the-shift-event/', '0.4'],
  ['/contact/', '0.3'],
  ['/algemene-voorwaarden/', '0.1'],
  ['/privacy/', '0.1'],
];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    PAGES.map(([p, prio]) => `  <url><loc>${COMPANY.site}${p}</loc><lastmod>${today}</lastmod><priority>${prio}</priority></url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
