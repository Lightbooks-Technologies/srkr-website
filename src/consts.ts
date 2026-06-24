/**
 * Site-wide constants. Imported anywhere via `import { SITE_NAME } from '../consts'`.
 * Production URL is centralised in astro.config.mjs (`site:`) — keep SITE_URL in sync.
 */

export const SITE_URL = 'https://www.srkrec.edu.in';
export const SITE_NAME = 'SRKR Engineering College';
export const SITE_SHORT_NAME = 'SRKR';
export const SITE_TAGLINE = 'Where Innovation Meets Excellence — Estd. 1980, Bhimavaram';

export const SITE_TITLE = `${SITE_NAME} | NAAC A++ Autonomous Engineering College, Bhimavaram`;
export const SITE_DESCRIPTION =
  'SRKR Engineering College, Bhimavaram — NAAC A++ accredited autonomous institution (Est. 1980) offering NBA-accredited B.Tech, M.Tech, MBA & MCA programs in CSE, ECE, EEE, Civil, Mechanical, IT, AI/ML, AI/DS and emerging tech. Top placements, world-class labs, premier engineering education in Andhra Pradesh.';

export const DEFAULT_OG_IMAGE = '/assets/images/og-image.png';

export const ORG_TELEPHONE = '+91-8816-223332';
export const ORG_EMAIL = 'info@srkrec.edu.in';

export const ORG_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'SRKR Marg, Chinna Amiram',
  addressLocality: 'Bhimavaram',
  addressRegion: 'Andhra Pradesh',
  postalCode: '534204',
  addressCountry: 'IN',
} as const;

export const ORG_SAME_AS = [
  'https://www.facebook.com/SRKRECOFFICIAL',
  'https://x.com/SRKR_EC',
  'https://www.instagram.com/srkr_engineering_college/',
  'https://www.youtube.com/@srkreclive8303',
  'https://www.linkedin.com/school/srkr-engineering-college/',
] as const;
