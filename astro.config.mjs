// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Single source of truth for production URL.
// If the site moves to a different domain later, change ONLY this value
// (and the matching SITE_URL constant in src/consts.ts).
const SITE = 'https://www.srkrec.ac.in';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Exclude template demo / backup / test pages from the sitemap so Google
      // never sees them. Matching paths still build (until we delete them),
      // but they won't be advertised to search engines.
      filter: (page) => {
        const blocked = [
          '/index-bk',
          '/index-copy',
          '/index-two',
          '/index-three',
          '/index-four',
          '/index-five',
          '/test',
          '/blog/first-post',
          '/blog/second-post',
        ];
        return !blocked.some((b) => page.includes(b));
      },
      serialize: (item) => {
        // Higher priority for top-level/important pages
        if (item.url === `${SITE}/` || item.url === `${SITE}`) {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (/\/departments\/[^/]+\/?$/.test(item.url)) {
          return { ...item, priority: 0.9 };
        }
        if (/\/(programmes|admission-brochure|placements|college-profile|departments)\/?$/.test(item.url)) {
          return { ...item, priority: 0.9 };
        }
        return item;
      },
    }),
  ],
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
