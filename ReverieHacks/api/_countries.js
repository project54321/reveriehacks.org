// Shared Google Sheets scraping logic for the participant-by-country map.
//
// The sheet is link-shareable, and Google's CSV export does echo an
// Access-Control-Allow-Origin header, so in principle the browser could fetch
// it directly. It goes through here anyway for three reasons: the response gets
// cached at our edge instead of hammering Google on every page view, a
// malformed sheet fails in one place we control, and the build-time
// prerenderer can reuse the exact same parser.
//
// Leading underscore keeps Vercel from routing this file as an endpoint.

export const SHEET_ID = '1I-HpVH0s3KwHcCibd_qOKO3Uz_MdH-9-abuwZoqaYYs';
export const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
export const SHEET_VIEW_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

/**
 * How many shading steps the map has. Each country's registration count is
 * bucketed onto that ramp here rather than on the client, so the log scale the
 * shading depends on lives in one place; the count itself travels alongside it
 * for the map's hover readout.
 */
const STEPS = 5;

/** Rows whose country is really "we couldn't tell", kept out of the map. */
const UNKNOWN = new Set(['unknown', 'n/a', '', '-']);

export async function countriesResponse() {
  try {
    const data = await scrapeCountryStats();

    return new Response(JSON.stringify(data), {
      headers: {
        'content-type': 'application/json',
        // Same policy as /api/stats: a five minute edge cache, then keep
        // serving the stale copy for an hour while it refreshes behind the
        // scenes, so a slow Google never makes a visitor wait.
        'cache-control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 502,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    });
  }
}

/**
 * Reads the country breakdown out of the published sheet.
 *
 * Returns countries ordered by registrations — most first — each carrying its
 * registration count and a shading step, plus the totals the Impact page
 * quotes. Throws rather than returning a half-parsed sheet; the client falls
 * back to the snapshot baked in at build time on a non-200.
 */
export async function scrapeCountryStats() {
  const response = await fetch(SHEET_URL, {
    headers: { accept: 'text/csv' },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Google Sheets returned ${response.status} ${response.statusText}`);
  }

  const rows = parseCsv(await response.text());

  if (!rows.length) throw new Error('The country sheet came back empty.');

  const header = rows[0].map((cell) => cell.trim().toLowerCase());
  const nameAt = header.findIndex((cell) => cell.includes('country'));
  const registrantsAt = header.findIndex((cell) => cell.includes('registrant'));
  const submittersAt = header.findIndex((cell) => cell.includes('submitter'));

  if (nameAt === -1 || registrantsAt === -1) {
    throw new Error(`The country sheet is missing its header columns: ${header.join(', ')}`);
  }

  const countries = [];
  let unknown = 0;
  let registrants = 0;
  let submitters = 0;

  for (const row of rows.slice(1)) {
    const name = (row[nameAt] ?? '').trim();
    const rowRegistrants = number(row[registrantsAt]);
    const rowSubmitters = submittersAt === -1 ? 0 : number(row[submittersAt]);

    if (!name || rowRegistrants === null) continue;

    registrants += rowRegistrants;
    submitters += rowSubmitters ?? 0;

    if (UNKNOWN.has(name.toLowerCase())) {
      unknown += rowRegistrants;
      continue;
    }

    countries.push({ name, registrants: rowRegistrants, submitters: rowSubmitters ?? 0 });
  }

  if (!countries.length) throw new Error('The country sheet parsed to zero countries.');

  countries.sort((a, b) => b.registrants - a.registrants || a.name.localeCompare(b.name));

  const busiest = countries[0].registrants;

  return {
    // Name, headcount, and shading step. The submitter column stays on this
    // side of the wire — only its total is quoted.
    countries: countries.map(({ name, registrants: count }) => ({
      name,
      registrants: count,
      share: shareOf(count, busiest),
    })),
    totals: {
      countries: countries.length,
      registrants,
      submitters,
      unknown,
    },
  };
}

/**
 * Which shading step a country sits on, 0 to STEPS - 1.
 *
 * Registrations are wildly skewed — India and the United States together are
 * most of the field — so this is a log scale. A linear one would put every
 * country outside the top two in the same faintest step.
 */
function shareOf(registrants, busiest) {
  if (registrants <= 0 || busiest <= 0) return 0;

  const scaled = Math.log(registrants) / Math.log(Math.max(busiest, Math.E));
  return Math.min(STEPS - 1, Math.max(0, Math.round(scaled * (STEPS - 1))));
}

function number(value) {
  if (typeof value !== 'string') return null;

  const parsed = Number(value.trim().replace(/,/g, ''));
  return Number.isFinite(parsed) && parsed >= 0 ? Math.round(parsed) : null;
}

/**
 * Minimal RFC 4180 reader: quoted fields, doubled quotes inside them, and both
 * line ending conventions. Country names in this sheet include commas and
 * non-Latin scripts, so splitting on commas isn't enough.
 */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (quoted) {
      if (char !== '"') {
        field += char;
      } else if (text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        quoted = false;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((cells) => cells.some((cell) => cell.trim() !== ''));
}
