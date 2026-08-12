/**
 * Ties the country names in the published sheet to the map geometry.
 *
 * The sheet is filled from Devpost's own export, so the names arrive however
 * registrants' browsers spelled them: "Perú", "Hồng Kông", "ليبيا". Matching is
 * therefore accent- and case-insensitive, with an alias table for the rest.
 */

import { WORLD_COUNTRIES } from './world-dots';

/** The published sheet the country breakdown is read from, for citation. */
export const SHEET_VIEW_URL =
  'https://docs.google.com/spreadsheets/d/1I-HpVH0s3KwHcCibd_qOKO3Uz_MdH-9-abuwZoqaYYs/edit';

export type CountryRow = {
  name: string;
  registrants: number;
  submitters: number;
};

export type CountryTotals = {
  countries: number;
  registrants: number;
  submitters: number;
  /** Registrants whose country Devpost never recorded. */
  unknown: number;
};

export type CountryStats = {
  countries: CountryRow[];
  totals: CountryTotals;
};

/** Sheet spelling (normalised) -> the name Natural Earth uses. */
const ALIASES: Record<string, string> = {
  'united states': 'United States of America',
  usa: 'United States of America',
  us: 'United States of America',
  china: "People's Republic of China",
  'iran islamic republic of': 'Iran',
  'iran, islamic republic of': 'Iran',
  'russian federation': 'Russia',
  'republic of korea': 'South Korea',
  korea: 'South Korea',
  'viet nam': 'Vietnam',
  czechia: 'Czech Republic',
  turkiye: 'Turkey',
  'ivory coast': 'Ivory Coast',
  "cote d'ivoire": 'Ivory Coast',
  'cote divoire': 'Ivory Coast',
  swaziland: 'Eswatini',
  macedonia: 'North Macedonia',
  'cape verde': 'Cabo Verde',
  'democratic republic of congo': 'Democratic Republic of the Congo',
  'congo kinshasa': 'Democratic Republic of the Congo',
  'republic of congo': 'Republic of the Congo',
  'congo brazzaville': 'Republic of the Congo',
  bahamas: 'The Bahamas',
  gambia: 'The Gambia',
  'burma': 'Myanmar',
  'timor leste': 'East Timor',
  uk: 'United Kingdom',
  'great britain': 'United Kingdom',
  // Arabic, as Devpost recorded it.
  'ليبيا': 'Libya',
  'مصر': 'Egypt',
  'الجزائر': 'Algeria',
  'المغرب': 'Morocco',
  'السعودية': 'Saudi Arabia',
  // Vietnamese, likewise — Hong Kong is an anchor rather than a shape below.
  'hong kong': 'Hong Kong',
  'hong kong sar china': 'Hong Kong',
};

/**
 * Places too small to survive a 1:110m generalisation, so they have no cells in
 * the dot grid. They get plotted as their own marks at these coordinates.
 */
const ANCHORS: Record<string, { lat: number; lon: number }> = {
  'hong kong': { lat: 22.3, lon: 114.2 },
  singapore: { lat: 1.35, lon: 103.8 },
  mauritius: { lat: -20.3, lon: 57.6 },
  malta: { lat: 35.9, lon: 14.4 },
  bahrain: { lat: 26.1, lon: 50.6 },
  maldives: { lat: 3.2, lon: 73.2 },
  barbados: { lat: 13.2, lon: -59.5 },
  seychelles: { lat: -4.7, lon: 55.5 },
  'antigua and barbuda': { lat: 17.1, lon: -61.8 },
  andorra: { lat: 42.5, lon: 1.5 },
  monaco: { lat: 43.7, lon: 7.4 },
  liechtenstein: { lat: 47.2, lon: 9.5 },
  'san marino': { lat: 43.9, lon: 12.5 },
  'saint lucia': { lat: 13.9, lon: -61.0 },
  grenada: { lat: 12.1, lon: -61.7 },
  'cabo verde': { lat: 16.0, lon: -24.0 },
  comoros: { lat: -11.6, lon: 43.3 },
  'sao tome and principe': { lat: 0.3, lon: 6.6 },
  tonga: { lat: -21.2, lon: -175.2 },
  samoa: { lat: -13.8, lon: -172.1 },
  'marshall islands': { lat: 7.1, lon: 171.2 },
  micronesia: { lat: 6.9, lon: 158.2 },
  palau: { lat: 7.5, lon: 134.6 },
  nauru: { lat: -0.5, lon: 166.9 },
  tuvalu: { lat: -8.5, lon: 179.2 },
  kiribati: { lat: 1.4, lon: 173.0 },
  dominica: { lat: 15.4, lon: -61.4 },
  'saint kitts and nevis': { lat: 17.3, lon: -62.7 },
  'saint vincent and the grenadines': { lat: 13.2, lon: -61.2 },
};

/** Normalised Natural Earth name -> its index in WORLD_COUNTRIES. */
const BY_NAME = new Map<string, number>(
  WORLD_COUNTRIES.map((entry, index) => [normalize(entry.split('|')[0]), index]),
);

/** Normalised ISO 3166-1 alpha-2 -> index, so "AE" resolves as well as the name. */
const BY_ISO = new Map<string, number>(
  WORLD_COUNTRIES.flatMap((entry, index) => {
    const iso = entry.split('|')[1];
    return iso && iso.length === 2 ? [[iso.toLowerCase(), index] as [string, number]] : [];
  }),
);

/**
 * Strips case, accents, punctuation, and the boilerplate Devpost tacks onto
 * some names, so "Perú", "PERU" and "Peru," all land on the same key.
 */
export function normalize(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // combining accents, split out by NFD
    .toLowerCase()
    .replace(/[.,'’()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export type CountryPlacement =
  | { kind: 'shape'; index: number }
  | { kind: 'anchor'; lat: number; lon: number }
  | { kind: 'none' };

/** Where a sheet row belongs on the map, if anywhere. */
export function placeCountry(name: string): CountryPlacement {
  const key = normalize(name);
  const aliased = ALIASES[key];
  const resolved = aliased ? normalize(aliased) : key;

  const index = BY_NAME.get(resolved) ?? BY_ISO.get(resolved);
  if (index !== undefined) return { kind: 'shape', index };

  const anchor = ANCHORS[resolved];
  if (anchor) return { kind: 'anchor', ...anchor };

  return { kind: 'none' };
}

/**
 * The map's colour ramp: which of five intensity steps a country sits in.
 *
 * Registrations are wildly skewed — India and the United States together are
 * most of the field — so this is a log scale. A linear one would render every
 * country outside the top two in the same faintest shade.
 */
export function intensityOf(registrants: number, max: number): number {
  if (registrants <= 0 || max <= 0) return 0;

  const scaled = Math.log(registrants) / Math.log(Math.max(max, Math.E));
  return Math.min(4, Math.max(0, Math.round(scaled * 4)));
}
