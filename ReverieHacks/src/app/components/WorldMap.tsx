import { useMemo, useState } from 'react';
import {
  WORLD_CENTROIDS,
  WORLD_COLS,
  WORLD_GRID,
  WORLD_LAT_MAX,
  WORLD_ROWS,
} from '../data/world-dots';
import { SHARE_STEPS, placeCountry, type CountryRow } from '../data/countries';

/** SVG units per grid cell. Only the ratio to DOT_R matters. */
const CELL = 10;
const DOT_R = 3.4;
/** Island states get a slightly larger mark — a lone dot reads as a stray otherwise. */
const ANCHOR_R = 4.2;

/**
 * Opacity per shading step, as bucketed by /api/countries. Countries nobody
 * registered from use LAND instead, faint enough to read as a backdrop.
 */
const RAMP = [0.34, 0.48, 0.64, 0.82, 1].slice(0, SHARE_STEPS);
const LAND = 0.15;

type Placed = {
  row: CountryRow;
  /** Grid cells this country occupies, as [col, row] pairs. */
  cells: [number, number][];
  /** Set for island states with no cells at this resolution. */
  anchor?: { x: number; y: number };
};

export function WorldMap({ countries }: { countries: CountryRow[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const { placed, quiet, missing } = useMemo(() => build(countries), [countries]);

  const active = placed.find((p) => p.row.name === hovered) ?? null;

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

          {placed.map((entry) => {
            const isHovered = hovered === entry.row.name;

            return (
              <g
                key={entry.row.name}
                fill="currentColor"
                className={`cursor-pointer transition-colors duration-150 ${
                  isHovered ? 'text-white' : 'text-primary'
                }`}
                opacity={
                  isHovered
                    ? 1
                    : hovered
                    ? 0.35
                    : shade(entry.row.share)
                }
                onMouseEnter={() => setHovered(entry.row.name)}
              >
                <title>{entry.row.name}</title>
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
            );
          })}
        </svg>
      </div>

      {/* Names the country under the cursor. Shading is relative only; how many
          people registered from any one country is not published. */}
      <div className="flex flex-col gap-3 border-x border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          {active ? (
            <span className="text-foreground">{active.row.name}</span>
          ) : (
            <span className="text-muted-foreground">
              {placed.length} countries. Hover the map to name one
            </span>
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
          {missing} {missing === 1 ? 'country is' : 'countries are'} listed below but not
          drawn, because the map&apos;s source borders don&apos;t include them.
        </p>
      )}
    </div>
  );
}

/** Clamped so a step the endpoint grows later can't index off the ramp. */
function shade(share: number): number {
  return RAMP[Math.min(RAMP.length - 1, Math.max(0, share))];
}

/**
 * Turns the endpoint's rows into drawable geometry: one pass over the grid to
 * bucket every land cell by country, then a join against the countries that
 * anyone registered from.
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

  const placed: Placed[] = [];
  const claimed = new Set<number>();
  let missing = 0;

  for (const row of countries) {
    const placement = placeCountry(row.name);

    if (placement.kind === 'shape') {
      const cells = cellsByIndex.get(placement.index);

      // Resolved to a real country, but one whose whole footprint fell between
      // sample points — Lebanon and Rwanda are each smaller than a cell here.
      // They get a single mark at their centroid instead of being dropped.
      if (!cells) {
        const [lat, lon] = WORLD_CENTROIDS[placement.index];
        placed.push({ row, cells: [], anchor: project(lat, lon) });
        continue;
      }

      claimed.add(placement.index);
      placed.push({ row, cells });
      continue;
    }

    if (placement.kind === 'anchor') {
      placed.push({ row, cells: [], anchor: project(placement.lat, placement.lon) });
      continue;
    }

    missing++;
  }

  for (const [index, cells] of cellsByIndex) {
    if (!claimed.has(index)) quiet.push(...cells);
  }

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