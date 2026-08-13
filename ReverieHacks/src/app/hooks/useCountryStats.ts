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
    if (typeof row?.name !== 'string' || !Number.isInteger(row?.share)) return [];

    // A row that somehow arrives without its count still belongs on the map;
    // it just reads as an unknown headcount rather than dropping the country.
    const registrants = Number.isInteger(row?.registrants) ? (row.registrants as number) : 0;

    return [{ name: row.name, registrants, share: row.share as number }];
  });
}

function readTotals(value: unknown, countries: CountryRow[]): CountryStats['totals'] {
  const totals = (value ?? {}) as Record<string, unknown>;

  // Only the aggregates cross the wire, so a missing one can't be recomputed
  // from the rows — it falls back to zero and the page leaves it out.
  const int = (key: string, fallback: number) =>
    Number.isInteger(totals[key]) ? (totals[key] as number) : fallback;

  return {
    countries: int('countries', countries.length),
    registrants: int('registrants', 0),
    submitters: int('submitters', 0),
    unknown: int('unknown', 0),
  };
}
