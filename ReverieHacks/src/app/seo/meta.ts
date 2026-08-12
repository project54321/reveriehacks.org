/**
 * Per-route titles, descriptions and structured data.
 *
 * Used twice: the prerenderer writes these straight into each route's static
 * HTML at build time, and <Seo> re-applies them in the browser on client-side
 * navigation. Anything crawling the site — Googlebot, Google-Extended, or a
 * plain HTTP fetch that never runs JavaScript — reads the first copy.
 */

import type { DevpostStats } from '../hooks/useDevpostStats';
import type { CountryStats } from '../data/countries';
import {
  CASH_PRIZES,
  DEVPOST_URL,
  JUDGE_COUNT,
  ORGANIZER_COUNT,
  PARTICIPANT_RECORD,
  SPONSOR_COUNT,
  impactSummary,
  rankByParticipants,
} from '../data/impact';

export const SITE_URL = 'https://www.reveriehacks.org';
export const SITE_NAME = 'ReverieHacks';
export const DISCORD_URL = 'https://discord.gg/gDQGYSQKrH';
export const OG_IMAGE = `${SITE_URL}/image.png`;

/** Every route the prerenderer builds and the sitemap lists. */
export const ROUTES = [
  '/',
  '/about',
  '/impact',
  '/prizes',
  '/sponsors',
  '/judges',
  '/team',
  '/contact',
] as const;

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
};

export type SeoInput = {
  stats: DevpostStats;
  countries: CountryStats;
};

/**
 * Titles and descriptions carry the live figures on the pages where they are
 * the point, so a search result or an AI summary quotes the current number
 * rather than whatever was true the day the copy was written.
 */
export function seoFor(path: string, { stats, countries }: SeoInput): PageSeo {
  const participants = stats.participants.toLocaleString('en-US');
  const prizes = `$${stats.prizes.toLocaleString('en-US')}`;

  const pages: Record<string, { title: string; description: string }> = {
    '/': {
      title: `${SITE_NAME} | A Virtual Hackathon for Young Builders`,
      description:
        `${SITE_NAME} is a three-week virtual hackathon for high school builders, running ` +
        `${stats.dateRange} across ${stats.tracks} tracks. ${participants} participants and ` +
        `${prizes} in total prize valuation.`,
    },
    '/about': {
      title: `About ${SITE_NAME} | Six Tracks, Three Weeks, Open Worldwide`,
      description:
        `What ${SITE_NAME} is, who it is for, and the ${stats.tracks} tracks you can build in: ` +
        'ideathon, ML and prompt engineering, software, data, embedded systems, and apps.',
    },
    '/impact': {
      title: `${SITE_NAME} Impact | ${participants} Participants, ${prizes} in Prizes`,
      description: `${impactSummary(stats)} Registrations from ${countries.totals.countries} countries.`,
    },
    '/prizes': {
      title: `${SITE_NAME} Prizes | ${prizes} Across ${stats.tracks} Tracks`,
      description:
        `The full ${SITE_NAME} 2026 prize pool: $${CASH_PRIZES.toLocaleString('en-US')} in cash, ` +
        'six internships, and credits, subscriptions and hardware from every sponsor.',
    },
    '/sponsors': {
      title: `${SITE_NAME} Sponsors | ${SPONSOR_COUNT} Partners Backing 2026`,
      description:
        `The companies and robotics teams funding ${SITE_NAME} 2026, and what each of them puts ` +
        'into the prize pool.',
    },
    '/judges': {
      title: `${SITE_NAME} Judges | ${JUDGE_COUNT} Engineers and Founders`,
      description:
        `The ${JUDGE_COUNT} judges scoring ${SITE_NAME} 2026, from Meta, Amazon, Microsoft, ` +
        'Adobe, Coinbase, Disney Streaming and more, listed by track.',
    },
    '/team': {
      title: `${SITE_NAME} Team | The Students Behind It`,
      description: `The high school students who organize ${SITE_NAME}, and what each of them does.`,
    },
    '/contact': {
      title: `Contact ${SITE_NAME}`,
      description: `How to reach the ${SITE_NAME} team about sponsoring, judging, or taking part.`,
    },
  };

  const page = pages[path] ?? pages['/'];

  return {
    ...page,
    canonical: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
  };
}

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const EVENT_ID = `${SITE_URL}/#event-2026`;

/**
 * The JSON-LD graph for a route. Facts only, and only facts that also appear in
 * the visible copy — structured data that says more than the page does is the
 * fastest way to get a site distrusted.
 */
export function jsonLdFor(path: string, input: SeoInput): object[] {
  const graph: object[] = [organization(), event(input.stats)];

  if (path === '/impact') graph.push(...impactGraph(input));

  return graph;
}

function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: 'Reverie Hacks',
    url: `${SITE_URL}/`,
    logo: OG_IMAGE,
    description:
      'A student-run organization of high schoolers that hosts ReverieHacks, a virtual hackathon open to young builders worldwide.',
    foundingDate: '2024',
    sameAs: [DEVPOST_URL, DISCORD_URL],
  };
}

function event(stats: DevpostStats) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': EVENT_ID,
    name: 'ReverieHacks 2026',
    url: `${SITE_URL}/`,
    startDate: stats.startDate,
    endDate: stats.endDate,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: OG_IMAGE,
    description:
      `A ${stats.days}-day virtual hackathon for high school builders across ${stats.tracks} ` +
      'tracks, open worldwide and free to enter.',
    location: {
      '@type': 'VirtualLocation',
      url: DEVPOST_URL,
    },
    organizer: { '@id': ORGANIZATION_ID },
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: DEVPOST_URL,
    },
    additionalProperty: [
      property('Participants', stats.participants),
      property('Total prize valuation', stats.prizes, 'USD'),
      property('Cash prizes', CASH_PRIZES, 'USD'),
      property('Competition tracks', stats.tracks),
      property('Judges', JUDGE_COUNT),
      property('Sponsors and partners', SPONSOR_COUNT),
      property('Student organizers', ORGANIZER_COUNT),
    ],
  };
}

function impactGraph({ stats, countries }: SeoInput) {
  const rank = rankByParticipants(stats.participants);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}/impact#webpage`,
      url: `${SITE_URL}/impact`,
      name: `${SITE_NAME} Impact`,
      description: impactSummary(stats),
      about: { '@id': EVENT_ID },
      publisher: { '@id': ORGANIZATION_ID },
      significantLink: [DEVPOST_URL],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      '@id': `${SITE_URL}/impact#countries`,
      name: 'ReverieHacks 2026 reach by country',
      description:
        `${countries.totals.registrants.toLocaleString('en-US')} registrations and ` +
        `${countries.totals.submitters.toLocaleString('en-US')} submitted projects across ` +
        `${countries.totals.countries} countries.`,
      creator: { '@id': ORGANIZATION_ID },
      isAccessibleForFree: true,
      variableMeasured: [
        property('Countries represented', countries.totals.countries),
        property('Registrations', countries.totals.registrants),
        property('Participants who submitted a project', countries.totals.submitters),
        property('Participation record to beat', PARTICIPANT_RECORD),
        {
          '@type': 'PropertyValue',
          name: 'Rank by participation among high school hackathons',
          value: rank.first ? 1 : 2,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${SITE_URL}/impact#country-list`,
      name: 'Countries represented at ReverieHacks 2026',
      numberOfItems: countries.countries.length,
      // Names only, ordered by volume. The per-country registration counts are
      // deliberately unpublished, so there is no value to attach here.
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: countries.countries.map((country, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: country.name,
      })),
    },
  ];
}

function property(name: string, value: number, currency?: string) {
  return {
    '@type': 'PropertyValue',
    name,
    value,
    ...(currency ? { unitText: currency } : {}),
  };
}
