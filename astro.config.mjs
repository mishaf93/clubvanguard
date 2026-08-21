import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://clubvanguard.com',
  redirects: {
    '/verhaal': '/over-club-vanguard',
    '/verhaal/': '/over-club-vanguard/',
  },
});
