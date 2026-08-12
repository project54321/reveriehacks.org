import { useEffect, useState } from 'react';

export type DevpostStats = {
  participants: number;
  prizes: number;
  tracks: number;
  days: number;
  daysLeft: number;
  dateRange: string;
};

/**
 * Last known good figures, baked in so the page still shows something real if
 * /api/stats is unreachable — offline, a cold deploy, or Devpost changing its
 * markup. Run `npm run stats` to print the current values and bump these.
 */
export const DEVPOST_FALLBACK: DevpostStats = {
  participants: 1010,
  prizes: 404748,
  tracks: 6,
  days: 23,
  daysLeft: 13,
  dateRange: 'August 2–24, 2026',
};

/**
 * Everything the landing page can source from Devpost, scraped per-request by
 * the /api/stats edge function and cached at Vercel's edge for a few minutes.
 *
 * Returns null until the request settles, so the counters don't animate up to a
 * placeholder and then jump to the real figures.
 */
export function useDevpostStats(): DevpostStats | null {
  const [stats, setStats] = useState<DevpostStats | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch('/api/stats', { signal: controller.signal });

        if (!response.ok) throw new Error(`stats returned ${response.status}`);

        const data = await response.json();

        // Merged field by field: participants and prizes are guaranteed by the
        // endpoint, but the rest are best-effort and arrive null if Devpost
        // moved them. A null there shouldn't blank out the whole strip.
        setStats({
          participants: count(data.participants) ?? DEVPOST_FALLBACK.participants,
          prizes: count(data.prizes) ?? DEVPOST_FALLBACK.prizes,
          tracks: count(data.tracks) ?? DEVPOST_FALLBACK.tracks,
          days: count(data.days) ?? DEVPOST_FALLBACK.days,
          daysLeft: countOrZero(data.daysLeft) ?? DEVPOST_FALLBACK.daysLeft,
          dateRange: typeof data.dateRange === 'string' ? data.dateRange : DEVPOST_FALLBACK.dateRange,
        });
      } catch {
        if (controller.signal.aborted) return;
        setStats(DEVPOST_FALLBACK);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return stats;
}

function count(value: unknown): number | null {
  return Number.isInteger(value) && (value as number) > 0 ? (value as number) : null;
}

// daysLeft legitimately hits zero on the final day.
function countOrZero(value: unknown): number | null {
  return Number.isInteger(value) && (value as number) >= 0 ? (value as number) : null;
}
