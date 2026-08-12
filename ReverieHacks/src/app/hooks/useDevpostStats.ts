import { createLiveResource, useLiveResource } from './liveResource';

export type DevpostStats = {
  participants: number;
  prizes: number;
  tracks: number;
  days: number;
  daysLeft: number;
  dateRange: string;
  /** Calendar dates, YYYY-MM-DD, as published in the site's Event JSON-LD. */
  startDate: string;
  endDate: string;
};

export type DevpostFeed = {
  /**
   * Null until the first response settles on a page that wasn't prerendered,
   * so counters don't animate up to a placeholder and then jump.
   */
  stats: DevpostStats | null;
  /** ISO timestamp of the figures on screen: build time, then fetch time. */
  updatedAt: string | null;
};

/**
 * Last known good figures, baked in so the page still shows something real if
 * /api/stats is unreachable — offline, a cold deploy, or Devpost changing its
 * markup. Run `npm run stats` to print the current values and bump these.
 */
export const DEVPOST_FALLBACK: DevpostStats = {
  participants: 1378,
  prizes: 891300,
  tracks: 6,
  days: 23,
  daysLeft: 12,
  dateRange: 'August 2–24, 2026',
  startDate: '2026-08-02',
  endDate: '2026-08-24',
};

/** How often an open tab re-checks Devpost. The endpoint is edge-cached for 5
 *  minutes, so anything much tighter than this just hits the same cached copy. */
const REFRESH_MS = 120_000;

/**
 * Figures the prerenderer scraped at build time and inlined into the HTML, so a
 * crawler that never runs this fetch still reads real numbers off the page.
 */
type SeededStats = DevpostStats & { generatedAt?: string };

declare global {
  var __DEVPOST_STATS__: SeededStats | undefined;
}

const resource = createLiveResource<DevpostFeed>({
  initial() {
    const baked = globalThis.__DEVPOST_STATS__;
    if (!baked) return { stats: null, updatedAt: null };

    const { generatedAt, ...stats } = baked;
    return { stats, updatedAt: generatedAt ?? null };
  },

  // Annotated because the body reads back through `resource`, which would
  // otherwise make the store's type circular.
  async load(signal): Promise<DevpostFeed> {
    const response = await fetch('/api/stats', { signal });

    if (!response.ok) throw new Error(`stats returned ${response.status}`);

    const data = await response.json();
    const base = resource.snapshot().stats ?? DEVPOST_FALLBACK;

    // Merged field by field: participants and prizes are guaranteed by the
    // endpoint, but the rest are best-effort and arrive null if Devpost moved
    // them. A null there shouldn't blank out the whole strip.
    return {
      stats: {
        participants: count(data.participants) ?? base.participants,
        prizes: count(data.prizes) ?? base.prizes,
        tracks: count(data.tracks) ?? base.tracks,
        days: count(data.days) ?? base.days,
        daysLeft: countOrZero(data.daysLeft) ?? base.daysLeft,
        dateRange: typeof data.dateRange === 'string' ? data.dateRange : base.dateRange,
        startDate: date(data.startDate) ?? base.startDate,
        endDate: date(data.endDate) ?? base.endDate,
      },
      updatedAt: new Date().toISOString(),
    };
  },

  refreshMs: REFRESH_MS,
});

/**
 * Everything the site can source from Devpost, scraped per-request by the
 * /api/stats edge function and cached at Vercel's edge for a few minutes.
 *
 * Refreshes on an interval and whenever the tab comes back to the foreground,
 * so a counter left open on screen keeps climbing with the real registrations.
 */
export function useDevpostStats(): DevpostFeed {
  return useLiveResource(resource);
}

function count(value: unknown): number | null {
  return Number.isInteger(value) && (value as number) > 0 ? (value as number) : null;
}

// daysLeft legitimately hits zero on the final day.
function countOrZero(value: unknown): number | null {
  return Number.isInteger(value) && (value as number) >= 0 ? (value as number) : null;
}

function date(value: unknown): string | null {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}
