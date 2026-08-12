import type { CountryRow, CountryStats } from '../data/countries';
import { COUNTRY_FALLBACK } from '../data/countries-fallback';
import { createLiveResource, useLiveResource } from './liveResource';

export type CountryFeed = {
  stats: CountryStats;
  /** ISO timestamp of the figures on screen: build time, then fetch time. */
  updatedAt: string | null;
};

/** The sheet is edited by hand, so it changes far more slowly than Devpost. */
const REFRESH_MS = 300_000;

type SeededStats = CountryStats & { generatedAt?: string };

declare global {
  var __COUNTRY_STATS__: SeededStats | undefined;
}

const resource = createLiveResource<CountryFeed>({
  initial() {
    const baked = globalThis.__COUNTRY_STATS__;
    if (!baked?.countries?.length) return { stats: COUNTRY_FALLBACK, updatedAt: null };

    const { generatedAt, ...stats } = baked;
    return { stats, updatedAt: generatedAt ?? null };
  },

  async load(signal) {
    const response = await fetch('/api/countries', { signal });

    if (!response.ok) throw new Error(`countries returned ${response.status}`);

    const data = await response.json();
    const countries = readCountries(data.countries);

    // A map with no countries on it is worse than a slightly stale one, so an
    // empty parse keeps whatever is already rendered.
    if (!countries.length) return null;

    return {
      stats: { countries, totals: readTotals(data.totals, countries) },
      updatedAt: new Date().toISOString(),
    };
  },

  refreshMs: REFRESH_MS,
});

/**
 * The participant-by-country breakdown, read from the team's published Google
 * Sheet by the /api/countries edge function.
 *
 * Unlike the Devpost figures this always has something to render — the sheet is
 * updated by hand, so the snapshot committed to the repo is never far off.
 */
export function useCountryStats(): CountryFeed {
  return useLiveResource(resource);
}

function readCountries(value: unknown): CountryRow[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((row) => {
    if (typeof row?.name !== 'string' || !Number.isInteger(row?.registrants)) return [];

    return [
      {
        name: row.name,
        registrants: row.registrants as number,
        submitters: Number.isInteger(row?.submitters) ? (row.submitters as number) : 0,
      },
    ];
  });
}

function readTotals(value: unknown, countries: CountryRow[]): CountryStats['totals'] {
  const totals = (value ?? {}) as Record<string, unknown>;
  const sum = (key: 'registrants' | 'submitters') =>
    countries.reduce((run, row) => run + row[key], 0);

  // Recomputed from the rows if the endpoint's own totals are missing or junk,
  // so the map's caption can't disagree with the list beneath it.
  const int = (key: string, fallback: number) =>
    Number.isInteger(totals[key]) ? (totals[key] as number) : fallback;

  return {
    countries: int('countries', countries.length),
    registrants: int('registrants', sum('registrants')),
    submitters: int('submitters', sum('submitters')),
    unknown: int('unknown', 0),
  };
}
