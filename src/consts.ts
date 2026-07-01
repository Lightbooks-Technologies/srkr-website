/**
 * Site-wide constants. Imported anywhere via `import { SITE_NAME } from '../consts'`.
 * Production URL is centralised in astro.config.mjs (`site:`) — keep SITE_URL in sync.
 */

export const SITE_URL = 'https://www.srkrec.ac.in';
export const SITE_NAME = 'SRKR Engineering College';
export const SITE_SHORT_NAME = 'SRKR';
export const SITE_TAGLINE = 'Where Innovation Meets Excellence — Estd. 1980, Bhimavaram';

export const SITE_TITLE = `${SITE_NAME} | NAAC A+ Autonomous Engineering College, Bhimavaram`;
export const SITE_DESCRIPTION =
  'SRKR Engineering College, Bhimavaram — NAAC A+ accredited autonomous institution (Est. 1980) offering NBA-accredited B.Tech, M.Tech, MBA & MCA programs in CSE, ECE, EEE, Civil, Mechanical, IT, AI/ML, AI/DS and emerging tech. Top placements, world-class labs, premier engineering education in Andhra Pradesh.';

export const DEFAULT_OG_IMAGE = '/assets/images/og-image.png';

export const ORG_TELEPHONE = '+91-8816-223332';
export const ORG_EMAIL = 'info@srkrec.ac.in';

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

export const UPCOMING_EVENTS = [
  {
    title: 'One Week Faculty Development Programme on Applications of Blockchain',
    date: '29 June - 3 July, 2026',
    description: 'Faculty Development Programme on Applications of Blockchain',
    link: '#',
    venue: 'CSE Department, SRKREC',
  },
  {
    title: 'Faculty Development Program on "Advances In Computing Technology for Sustainable Mechanical Engineering"',
    date: '29 June - 3 July, 2026',
    description: 'Faculty Development Program on Advances In Computing Technology for Sustainable Mechanical Engineering',
    link: '#',
    venue: 'Mechanical Engineering Department, SRKREC',
  },
  {
    title: 'Pre-conference workshop on "Next-Gen Coastal Infrastructure: Sustainability in Action"',
    date: '6 August, 2026',
    description: 'Pre-conference workshop on "Next-Gen Coastal Infrastructure: Sustainability in Action"',
    link: '#',
    venue: 'Civil Engineering Department, SRKREC',
  },
  {
    title: '1st International Conference on Sustainable Advancements in Green Infrastructure (SAGI 2026)',
    date: '7-8 August, 2026',
    description: '1st International Conference on Sustainable Advancements in Green Infrastructure (SAGI 2026)',
    link: '#',
    venue: 'SRKR Engineering College',
  },
];

export const NEWS = [
  {
    title:
      'AICTE ATAL Faculty Development Program (2026–2027) has been sanctioned on the theme “Sustainable Energy Solutions: Emerging Technologies in Electric Vehicles and Hydrogen Energy Storage” coordinated by Dr. Mohammed Azaharahmed.',
    day: '30',
    month: 'Jun',
    link: '#',
  },

  {
    title: 'Dr. T. Vamsi Nagaraju, Associate Professor of Civil, receives recognition for a Wiley Top Cited Article in Structural Concrete.',
    day: '24',
    month: 'Jun',
    link: '#',
  },
  {
    title: 'Dr. Ch. Ravi Swaroop was recognized for chairing technical sessions and facilitating scholarly discussions at SCI 2026, Vietnam.',
    day: '03',
    month: 'Jun',
    link: '#',
  },
  {
    title: 'Mr. L. V. Srinivas, Assistant Professor of CSE, received the Best Paper Award at the 6th International Conference on Intelligent Systems and Machine Learning (ICISML 2026)',
    day: '28',
    month: 'May',
    link: '#',
  },
];