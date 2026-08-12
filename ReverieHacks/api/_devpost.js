// Shared Devpost scraping logic.
//
// The organiser dashboard (/submit-to/.../manage/submissions) is 403 to anyone
// not signed in as an organiser, and Devpost sends no CORS headers on any page,
// so the browser can't read these numbers directly. They get pulled server-side
// by api/stats.js.
//
// Leading underscore keeps Vercel from routing this file as an endpoint.

export const HACKATHON_URL = 'https://reverie-hacks-2026.devpost.com/';

/**
 * The /api/stats handler itself, shared by both entry points — see the comment
 * in api/stats.js about which one Vercel actually routes.
 *
 * Devpost is hit at most once every few minutes no matter how much traffic the
 * landing page gets, because the response is cached at Vercel's edge.
 */
export async function statsResponse() {
  try {
    const stats = await scrapeDevpostStats();

    return new Response(JSON.stringify(stats), {
      headers: {
        'content-type': 'application/json',
        // Serve a cached copy for 5 minutes, then keep serving the stale one
        // (for up to an hour) while it refreshes in the background — so a slow
        // Devpost never makes a visitor wait.
        'cache-control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    // Don't cache failures: the next visitor should trigger a fresh attempt.
    // The client falls back to its own baked-in numbers on a non-200.
    return new Response(JSON.stringify({ error: error.message }), {
      status: 502,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    });
  }
}

// Without these two there is nothing worth rendering, so a miss is fatal.
const REQUIRED = [
  {
    key: 'participants',
    // <a href=".../participants">Participants (1010)</a>
    pattern: /Participants\s*\((\d[\d,]*)\)/i,
  },
  {
    key: 'prizes',
    // <span data-currency="true">$<span data-currency-value>404,748</span></span>+ in prizes
    pattern: /<span data-currency-value>([\d,]+)<\/span>[\s\S]{0,60}?in prizes/i,
  },
];

// Devpost embeds a schema.org Event with the real start and end dates.
const JSON_LD = /<script type="application\/ld\+json" id="challenge-json-ld">([\s\S]*?)<\/script>/;

const MS_PER_DAY = 86_400_000;

/**
 * Fetches the public hackathon page and pulls out every figure Devpost exposes.
 *
 * Throws if the participant count or prize total can't be read — a partial or
 * zeroed result is worse than none. Everything else is best-effort and comes
 * back null, letting the client fall back per field.
 */
export async function scrapeDevpostStats() {
  const response = await fetch(HACKATHON_URL, {
    headers: {
      // Devpost serves a stripped page to unrecognised clients.
      'user-agent': 'Mozilla/5.0 (compatible; ReverieHacksBot/1.0; +https://reveriehacks.org)',
      accept: 'text/html',
    },
  });

  if (!response.ok) {
    throw new Error(`Devpost returned ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const stats = {};

  for (const { key, pattern } of REQUIRED) {
    const match = pattern.exec(html);

    if (!match) {
      throw new Error(
        `Could not find "${key}" on the Devpost page — it most likely changed its markup.`,
      );
    }

    const value = Number(match[1].replace(/,/g, ''));

    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(`Parsed a nonsensical value for "${key}": ${match[1]}`);
    }

    stats[key] = value;
  }

  const event = parseEventJsonLd(html);

  return {
    ...stats,
    tracks: event ? countTracks(event.description) : null,
    ...describeSchedule(event),
  };
}

function parseEventJsonLd(html) {
  const match = JSON_LD.exec(html);
  if (!match) return null;

  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

/**
 * The tracks are the bulleted list under the "ABOUT OUR TRACKS" heading of the
 * challenge description — each one an `<li><span>Name</span>: blurb`. Scoped to
 * that section so an unrelated list elsewhere in the description can't inflate
 * the count.
 */
function countTracks(description) {
  if (typeof description !== 'string') return null;

  // The description arrives as HTML escaped inside a JSON string.
  const markup = description
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');

  const start = markup.search(/ABOUT OUR TRACKS/i);
  if (start === -1) return null;

  // Stop at the next heading so we only count that section's list.
  const rest = markup.slice(start);
  const end = rest.search(/<h[1-6][\s>]/i);
  const section = end === -1 ? rest : rest.slice(0, end);

  const count = [...section.matchAll(/<li>\s*<span>([^<]+)<\/span>/g)].length;

  // A hackathon with 0 or 40 tracks means the markup moved, not a real change.
  return count >= 1 && count <= 20 ? count : null;
}

/**
 * Turns the event's start and end dates into the figures the landing page shows:
 * total length, days remaining, and the human-readable date range.
 */
function describeSchedule(event) {
  const blank = { days: null, daysLeft: null, dateRange: null, startDate: null, endDate: null };

  const start = isoDateParts(event?.startDate);
  const end = isoDateParts(event?.endDate);
  if (!start || !end) return blank;

  const startUtc = Date.UTC(start.year, start.month - 1, start.day);
  const endUtc = Date.UTC(end.year, end.month - 1, end.day);
  if (endUtc < startUtc) return blank;

  // Inclusive: an Aug 2 – Aug 24 event runs for 23 days, not 22.
  const days = Math.round((endUtc - startUtc) / MS_PER_DAY) + 1;

  const todayUtc = startOfUtcDay(Date.now());
  const daysLeft = Math.max(0, Math.round((endUtc - todayUtc) / MS_PER_DAY));

  return {
    days,
    daysLeft,
    dateRange: formatRange(start, end),
    // Calendar dates only, no time or zone, which is what schema.org's Event
    // wants and what the JSON-LD on the site publishes.
    startDate: isoDate(start),
    endDate: isoDate(end),
  };
}

// Read the calendar date straight off the ISO string rather than through Date,
// so the displayed day never shifts with the server's timezone.
function isoDateParts(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? '');
  if (!match) return null;

  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}

function isoDate({ year, month, day }) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function startOfUtcDay(timestamp) {
  const now = new Date(timestamp);
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// "August 2–17, 2026", or "August 2 – September 3, 2026" across a month boundary.
function formatRange(start, end) {
  const startMonth = MONTHS[start.month - 1];
  const endMonth = MONTHS[end.month - 1];

  if (start.year === end.year && start.month === end.month) {
    return `${startMonth} ${start.day}–${end.day}, ${end.year}`;
  }

  const from = `${startMonth} ${start.day}${start.year === end.year ? '' : `, ${start.year}`}`;
  return `${from} – ${endMonth} ${end.day}, ${end.year}`;
}
