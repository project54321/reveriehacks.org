/**
 * Every figure the Impact page publishes, in one place.
 *
 * Both the React page and the build-time prerenderer read from here, so the
 * numbers a crawler lifts out of the static HTML are the same ones a visitor
 * sees. Anything marked `live: true` is re-read from Devpost at runtime; the
 * rest are counted off this repo's own data and change only when it does.
 */

import type { DevpostStats } from '../hooks/useDevpostStats';

/**
 * Participants at the largest high school-run hackathon on record. Clearing it
 * is what moves ReverieHacks from second place to first, so the ranking below
 * is a comparison against this single number rather than a hardcoded claim.
 */
export const PARTICIPANT_RECORD = 1501;

/** Counted off SponsorsPage: 16 companies plus 9 robotics teams. */
export const SPONSOR_COUNT = 25;
export const COMPANY_SPONSOR_COUNT = 16;
export const TEAM_SPONSOR_COUNT = 9;

/** Counted off JudgesPage: 24 track judges plus the 4-person bounty panel. */
export const JUDGE_COUNT = 28;

/** Counted off TeamPage. */
export const ORGANIZER_COUNT = 7;

/** Not derivable from Devpost, which publishes only the aggregate valuation. */
export const CASH_PRIZES = 800;
export const INTERNSHIPS = 6;

export const DEVPOST_URL = 'https://reverie-hacks-2026.devpost.com/';

export type Rank = {
  /** True once the participant count clears the standing record. */
  first: boolean;
  /** "largest" / "2nd largest", for dropping into a sentence. */
  superlative: string;
  /** Participants still needed to take first place; 0 once there. */
  toFirst: number;
};

export function rankByParticipants(participants: number): Rank {
  const first = participants > PARTICIPANT_RECORD;

  return {
    first,
    superlative: first ? 'largest' : '2nd largest',
    toFirst: Math.max(0, PARTICIPANT_RECORD + 1 - participants),
  };
}

export type ImpactMetric = {
  key: string;
  label: string;
  detail: string;
  value: number;
  prefix?: string;
  suffix?: string;
  /** Scraped from Devpost per request, rather than fixed in this file. */
  live: boolean;
};

/**
 * The headline figures, in the order they appear on the page. Participants and
 * the prize valuation come first because they are the two records being claimed.
 */
export function impactMetrics(stats: DevpostStats): ImpactMetric[] {
  return [
    {
      key: 'participants',
      label: 'Participants',
      detail: 'Registered on Devpost',
      value: stats.participants,
      live: true,
    },
    {
      key: 'prizes',
      label: 'In total prize valuation',
      detail: 'Cash, credits, subscriptions, and hardware',
      value: stats.prizes,
      prefix: '$',
      suffix: '+',
      live: true,
    },
    {
      key: 'cash',
      label: 'In cash prizes',
      detail: 'Split across first and second in all six tracks',
      value: CASH_PRIZES,
      prefix: '$',
      live: false,
    },
    {
      key: 'sponsors',
      label: 'Sponsors and partners',
      detail: `${COMPANY_SPONSOR_COUNT} companies and ${TEAM_SPONSOR_COUNT} robotics teams`,
      value: SPONSOR_COUNT,
      live: false,
    },
    {
      key: 'judges',
      label: 'Judges',
      detail: 'From Meta, Amazon, Microsoft, Adobe, Coinbase, and more',
      value: JUDGE_COUNT,
      live: false,
    },
    {
      key: 'internships',
      label: 'Internships awarded',
      detail: 'At Learner Labs, for the ML and Ideathon tracks',
      value: INTERNSHIPS,
      live: false,
    },
    {
      key: 'tracks',
      label: 'Competition tracks',
      detail: 'Software, apps, data, ML, embedded, and ideation',
      value: stats.tracks,
      live: true,
    },
    {
      key: 'days',
      label: 'Days of build time',
      detail: 'Three weeks, fully virtual and open worldwide',
      value: stats.days,
      live: true,
    },
    {
      key: 'organizers',
      label: 'Student organizers',
      detail: 'The high schoolers who run the whole thing',
      value: ORGANIZER_COUNT,
      live: false,
    },
  ];
}

export function formatMetric(metric: ImpactMetric): string {
  return `${metric.prefix ?? ''}${metric.value.toLocaleString('en-US')}${metric.suffix ?? ''}`;
}

/**
 * The claim itself, kept close to how the team words it and with the two
 * figures swapped in live so the page can never quote a number the Devpost
 * listing has since moved past.
 */
export function recordNarrative(stats: DevpostStats): string[] {
  const prizes = `$${stats.prizes.toLocaleString('en-US')}`;
  const participants = stats.participants.toLocaleString('en-US');

  return [
    'While individual student organizers may throw around unverified numbers like $500k or $700k on social media flyers, ReverieHacks holds the highest documented valuation on official hackathon aggregators.',
    `Even as an overall prize valuation rather than liquid cash, hitting ${prizes} firmly secures its spot as the largest prize pool ever created by a high school-run hackathon. Hitting that scale with ${participants} participants is an incredible achievement for a student team.`,
  ];
}

/** One sentence of plain fact, for the meta description and structured data. */
export function impactSummary(stats: DevpostStats): string {
  const rank = rankByParticipants(stats.participants);

  return (
    `ReverieHacks 2026 has ${stats.participants.toLocaleString('en-US')} participants and ` +
    `$${stats.prizes.toLocaleString('en-US')} in total prize valuation — the largest prize pool ` +
    `ever created by a high school-run hackathon, and the ${rank.superlative} such hackathon by ` +
    'participation.'
  );
}
