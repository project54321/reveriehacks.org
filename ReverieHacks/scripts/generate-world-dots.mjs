// Rasterises world borders into the dot grid the Impact map draws.
//
// Run once, by hand, and commit the output — the build never touches the
// network:
//
//   node scripts/generate-world-dots.mjs path/to/ne_110m_admin_0_countries.geojson
//
// Source geometry is Natural Earth 1:110m Admin 0 (public domain):
// https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson
//
// Output is src/app/data/world-dots.ts: one row string per grid row, two
// base-36 characters per cell holding an index into the country list, or ".."
// for ocean. Fixed-width so a lookup is a slice, and repetitive enough that it
// gzips down to a few kilobytes.

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const COLS = 150;
// Antarctica is dropped and the Arctic trimmed to where anyone actually lives,
// which spends the pixels on land rather than empty ice.
const LAT_MAX = 84;
const LAT_MIN = -58;

const CELL = 360 / COLS;
const ROWS = Math.round((LAT_MAX - LAT_MIN) / CELL);

const source = process.argv[2];

if (!source) {
  console.error('usage: node scripts/generate-world-dots.mjs <ne_110m_admin_0_countries.geojson>');
  process.exit(1);
}

const geo = JSON.parse(await readFile(source, 'utf8'));

/** @type {{name: string, iso2: string | null, rings: number[][][], bbox: number[]}[]} */
const countries = [];

for (const feature of geo.features) {
  const props = feature.properties ?? {};
  const name = props.NAME_EN || props.NAME || props.ADMIN;
  if (!name || name === 'Antarctica') continue;

  const iso2 = typeof props.ISO_A2 === 'string' && props.ISO_A2 !== '-99' ? props.ISO_A2 : null;
  const rings = polygonRings(feature.geometry);
  if (!rings.length) continue;

  countries.push({ name, iso2, rings, bbox: boundingBox(rings) });
}

// Biggest first, so that when two footprints round to the same coarse cell the
// larger country keeps it — otherwise a micro-state can blank out its neighbour.
countries.sort((a, b) => area(b.rings) - area(a.rings));

const rows = [];
let land = 0;

for (let row = 0; row < ROWS; row++) {
  const lat = LAT_MAX - (row + 0.5) * CELL;
  let line = '';

  for (let col = 0; col < COLS; col++) {
    const lon = -180 + (col + 0.5) * CELL;
    const index = countryAt(lon, lat);

    if (index === -1) {
      line += '..';
    } else {
      land++;
      line += index.toString(36).padStart(2, '0');
    }
  }

  rows.push(line);
}

function countryAt(lon, lat) {
  for (let i = 0; i < countries.length; i++) {
    const { bbox, rings } = countries[i];

    if (lon < bbox[0] || lon > bbox[2] || lat < bbox[1] || lat > bbox[3]) continue;
    if (inRings(lon, lat, rings)) return i;
  }

  return -1;
}

function polygonRings(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'Polygon') return geometry.coordinates;
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat();
  return [];
}

function boundingBox(rings) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const ring of rings) {
    for (const [x, y] of ring) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  return [minX, minY, maxX, maxY];
}

// Even-odd across every ring of the country at once. Holes (a ring inside
// another) fall out of the parity for free.
function inRings(x, y, rings) {
  let inside = false;

  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];

      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
  }

  return inside;
}

// Shoelace, summed over rings. Only ever compared against another country's, so
// the units (square degrees) don't matter.
function area(rings) {
  return rings.reduce((total, ring) => total + Math.abs(ringArea(ring)), 0);
}

// Shoelace proper, so the sign agrees with the cross products the centroid
// below sums. The trapezoid form gives the same magnitude but the opposite
// sign, which silently mirrors every centroid through the origin.
function ringArea(ring) {
  let sum = 0;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    sum += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }

  return sum / 2;
}

/**
 * Centre of the country's largest landmass, as [lat, lon].
 *
 * The map only reads this for countries too small to catch a grid cell, so the
 * largest ring is the whole country in practice. Taking the largest rather than
 * averaging all of them keeps a country with distant territories from being
 * placed in the ocean between them.
 */
function centroid(rings) {
  const ring = rings.reduce((biggest, candidate) =>
    Math.abs(ringArea(candidate)) > Math.abs(ringArea(biggest)) ? candidate : biggest,
  );

  const signed = ringArea(ring);

  // A ring with no area (a degenerate sliver) would divide by zero.
  if (signed === 0) {
    const [minX, minY, maxX, maxY] = boundingBox([ring]);
    return [round((minY + maxY) / 2), round((minX + maxX) / 2)];
  }

  let x = 0;
  let y = 0;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const cross = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    x += (ring[j][0] + ring[i][0]) * cross;
    y += (ring[j][1] + ring[i][1]) * cross;
  }

  return [round(y / (6 * signed)), round(x / (6 * signed))];
}

function round(value) {
  return Math.round(value * 100) / 100;
}

const list = countries.map((c) => (c.iso2 ? `${c.name}|${c.iso2}` : c.name));

const file = `// GENERATED by scripts/generate-world-dots.mjs — do not edit by hand.
//
// A ${COLS}x${ROWS} equirectangular raster of the world's land, covering
// ${LAT_MAX}°N to ${Math.abs(LAT_MIN)}°S. Each cell is two base-36 characters:
// an index into WORLD_COUNTRIES, or ".." for ocean.
//
// Geometry: Natural Earth 1:110m Admin 0 (public domain).

export const WORLD_COLS = ${COLS};
export const WORLD_ROWS = ${ROWS};
export const WORLD_LAT_MAX = ${LAT_MAX};
export const WORLD_LAT_MIN = ${LAT_MIN};

/** "Name" or "Name|ISO2", indexed by the codes in WORLD_GRID. */
export const WORLD_COUNTRIES: string[] = ${JSON.stringify(list, null, 2)};

/**
 * [lat, lon] of each country's largest landmass, in the same order. Used to
 * place a mark for countries too small to occupy a grid cell.
 */
export const WORLD_CENTROIDS: [number, number][] = [
${countries.map((c) => `  [${centroid(c.rings).join(', ')}],`).join('\n')}
];

export const WORLD_GRID: string[] = [
${rows.map((r) => `  '${r}',`).join('\n')}
];
`;

const out = resolve(import.meta.dirname, '../src/app/data/world-dots.ts');
await writeFile(out, file);

console.log(`${COLS}x${ROWS} grid, ${land} land cells, ${countries.length} countries`);
console.log(`wrote ${out} (${(file.length / 1024).toFixed(1)} KB)`);
