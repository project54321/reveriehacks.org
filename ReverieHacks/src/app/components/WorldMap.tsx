import { useMemo, useState } from 'react';
import {
  WORLD_CENTROIDS,
  WORLD_COLS,
  WORLD_GRID,
  WORLD_LAT_MAX,
  WORLD_ROWS,
} from '../data/world-dots';
import { intensityOf, placeCountry, type CountryRow } from '../data/countries';

/** SVG units per grid cell. Only the ratio to DOT_R matters. */
const CELL = 10;
const DOT_R = 3.4;
/** Island states get a slightly larger mark — a lone dot reads as a stray otherwise. */
const ANCHOR_R = 4.2;

/**
 * Opacity ramp for the five intensity steps from intensityOf(). Countries with
 * no registrants use LAND instead, faint enough to read as a backdrop.
 */
const RAMP = [0.34, 0.48, 0.64, 0.82, 1];
const LAND = 0.15;

type Placed = {
  row: CountryRow;
  /** Grid cells this country occupies, as [col, row] pairs. */
  cells: [number, number][];
  /** Set for island states with no cells at this resolution. */
  anchor?: { x: number; y: number };
  intensity: number;
};

export function WorldMap({ countries }: { countries: CountryRow[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const { placed, quiet, missing } = useMemo(() => build(countries), [countries]);

  const active = placed.find((p) => p.row.name === hovered) ?? null;
  const leader = placed[0] ?? null;
  const readout = active ?? leader;

  return (
    <div>
      <div className="overflow-hidden border border-border bg-background">
        <svg
          viewBox={`0 0 ${WORLD_COLS * CELL} ${WORLD_ROWS * CELL}`}
          className="block w-full"
          role="img"
          aria-label={`World map of ReverieHacks registrations across ${placed.length} countries`}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Countries nobody registered from: the land the map is drawn on. */}
          <g fill="currentColor" className="text-muted-foreground" opacity={LAND}>
            {quiet.map(([col, row]) => (
              <circle key={`${col}-${row}`} cx={col * CELL + CELL / 2} cy={row * CELL + CELL / 2} r={DOT_R} />
            ))}
          </g>

          {placed.map((entry) => (
            <g
              key={entry.row.name}
              fill="currentColor"
              className="cursor-default text-primary transition-opacity"
              opacity={hovered && hovered !== entry.row.name ? 0.35 : RAMP[entry.intensity]}
              onMouseEnter={() => setHovered(entry.row.name)}
            >
              <title>
                {`${entry.row.name}: ${entry.row.registrants.toLocaleString('en-US')} registrants`}
              </title>
              {entry.cells.map(([col, row]) => (
                <circle
                  key={`${col}-${row}`}
                  cx={col * CELL + CELL / 2}
                  cy={row * CELL + CELL / 2}
                  r={DOT_R}
                />
              ))}
              {entry.anchor && (
                <circle cx={entry.anchor.x} cy={entry.anchor.y} r={ANCHOR_R} />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Hover readout. Falls back to the leading country so the row is never
          empty, including on touch devices where nothing is ever hovered. */}
      <div className="flex flex-col gap-3 border-x border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          {readout ? (
            <>
              <span className="text-foreground">{readout.row.name}</span>
              <span className="text-muted-foreground">
                {' — '}
                {readout.row.registrants.toLocaleString('en-US')} registrant
                {readout.row.registrants === 1 ? '' : 's'}
                {readout.row.submitters > 0 &&
                  `, ${readout.row.submitters.toLocaleString('en-US')} submitted`}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">No country data yet.</span>
          )}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Fewer</span>
          {RAMP.map((step) => (
            <span
              key={step}
              className="h-2.5 w-2.5 rounded-full bg-primary"
              style={{ opacity: step }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {missing > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          {missing} {missing === 1 ? 'country is' : 'countries are'} listed below but not drawn — the
          map&apos;s source borders don&apos;t include them.
        </p>
      )}
    </div>
  );
}

/**
 * Turns the sheet rows into drawable geometry: one pass over the grid to bucket
 * every land cell by country, then a join against the registration counts.
 */
function build(countries: CountryRow[]) {
  const cellsByIndex = new Map<number, [number, number][]>();
  const quiet: [number, number][] = [];

  for (let row = 0; row < WORLD_GRID.length; row++) {
    const line = WORLD_GRID[row];

    for (let col = 0; col < WORLD_COLS; col++) {
      const code = line.slice(col * 2, col * 2 + 2);
      if (code === '..') continue;

      const index = parseInt(code, 36);
      const bucket = cellsByIndex.get(index);

      if (bucket) bucket.push([col, row]);
      else cellsByIndex.set(index, [[col, row]]);
    }
  }

  const max = countries.reduce((run, row) => Math.max(run, row.registrants), 0);
  const placed: Placed[] = [];
  const claimed = new Set<number>();
  let missing = 0;

  for (const row of countries) {
    const placement = placeCountry(row.name);
    const intensity = intensityOf(row.registrants, max);

    if (placement.kind === 'shape') {
      const cells = cellsByIndex.get(placement.index);

      // Resolved to a real country, but one whose whole footprint fell between
      // sample points — Lebanon and Rwanda are each smaller than a cell here.
      // They get a single mark at their centroid instead of being dropped.
      if (!cells) {
        const [lat, lon] = WORLD_CENTROIDS[placement.index];
        placed.push({ row, cells: [], anchor: project(lat, lon), intensity });
        continue;
      }

      claimed.add(placement.index);
      placed.push({ row, cells, intensity });
      continue;
    }

    if (placement.kind === 'anchor') {
      placed.push({
        row,
        cells: [],
        anchor: project(placement.lat, placement.lon),
        intensity,
      });
      continue;
    }

    missing++;
  }

  for (const [index, cells] of cellsByIndex) {
    if (!claimed.has(index)) quiet.push(...cells);
  }

  placed.sort((a, b) => b.row.registrants - a.row.registrants);

  return { placed, quiet, missing };
}

/** Equirectangular, matching the projection the grid was rasterised with. */
function project(lat: number, lon: number) {
  const cellDegrees = 360 / WORLD_COLS;

  return {
    x: ((lon + 180) / cellDegrees) * CELL,
    y: ((WORLD_LAT_MAX - lat) / cellDegrees) * CELL,
  };
}

