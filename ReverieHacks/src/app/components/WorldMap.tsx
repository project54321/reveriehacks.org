import { useMemo, useRef, useState } from 'react';
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

/** Half the widest the tooltip gets, used to keep it off the map's edges. */
const TIP_REACH = 110;

/**
 * How close, in grid cells, the cursor has to get to claim an island state.
 * Wider than the mark itself, which is under half a cell across — a target that
 * small is unhittable. The cost is that Singapore takes a cell of Malaysia's
 * coast with it, which is the right way round: Malaysia has a hundred others.
 */
const ANCHOR_REACH = 1.2;

export function WorldMap({ countries }: { countries: CountryRow[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const frame = useRef<HTMLDivElement>(null);

  const { placed, quiet, owner, missing } = useMemo(() => build(countries), [countries]);

  const active = placed.find((p) => p.row.name === hovered) ?? null;

  /**
   * The dots, held still across cursor moves. Every pointermove sets the
   * tooltip's position, and re-diffing a few thousand circles at that rate is
   * what would make the map feel heavy; this only rebuilds when the country
   * under the cursor actually changes.
   */
  const dots = useMemo(
    () => (
      <>
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
            className="text-primary transition-opacity"
            opacity={hovered && hovered !== entry.row.name ? 0.35 : shade(entry.row.share)}
          >
            {/* The native tooltip, for anyone the floating one never reaches —
                a screen reader, or a browser without pointers. */}
            <title>{label(entry.row)}</title>
            {entry.cells.map(([col, row]) => (
              <circle
                key={`${col}-${row}`}
                cx={col * CELL + CELL / 2}
                cy={row * CELL + CELL / 2}
                r={DOT_R}
              />
            ))}
            {entry.anchor && <circle cx={entry.anchor.x} cy={entry.anchor.y} r={ANCHOR_R} />}
          </g>
        ))}
      </>
    ),
    [placed, quiet, hovered],
  );

  /**
   * Hit tests against the grid rather than the dots themselves. Testing the
   * circles would drop the hover in the gap between two of India's dots, and
   * would never let go of it out over the Indian Ocean.
   */
  function track(event: React.PointerEvent<SVGSVGElement>) {
    const box = frame.current?.getBoundingClientRect();
    if (!box || !box.width || !box.height) return;

    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    // Cursor in grid cells, the units both the dot grid and the anchors use.
    const col = (x / box.width) * WORLD_COLS;
    const row = (y / box.height) * WORLD_ROWS;

    setHovered(nearestAnchor(placed, col, row) ?? owner.get(cell(col, row)) ?? null);
    setPoint({
      // Clamped so a country against either edge doesn't push its tooltip off
      // the side of the frame.
      x:
        box.width > TIP_REACH * 2
          ? Math.min(Math.max(x, TIP_REACH), box.width - TIP_REACH)
          : box.width / 2,
      y,
    });
  }

  function clear() {
    setHovered(null);
    setPoint(null);
  }

  return (
    <div>
      <div ref={frame} className="relative">
        <div className="overflow-hidden border border-border bg-background">
          <svg
            viewBox={`0 0 ${WORLD_COLS * CELL} ${WORLD_ROWS * CELL}`}
            className="block w-full"
            role="img"
            aria-label={`World map of ReverieHacks registrations across ${placed.length} countries`}
            onPointerMove={track}
            onPointerDown={track}
            onPointerLeave={clear}
          >
            {dots}
          </svg>
        </div>

        {/* Sits above the cursor, outside the clipped map so it can overhang the
            border. Never takes the pointer — it would flicker as the country
            under the cursor changed to nothing. */}
        {active && point && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap border border-border bg-background px-3 py-2 text-sm shadow-lg"
            style={{ left: point.x, top: point.y - 10 }}
          >
            <span className="text-foreground">{active.row.name}</span>
            <span className="ml-2 text-primary">{count(active.row.registrants)}</span>
          </div>
        )}
      </div>

      {/* Names the country under the cursor and how many people registered from
          it — the same readout as the tooltip, for a cursor that never hovers. */}
      <div className="flex flex-col gap-3 border-x border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          {active ? (
            <span className="text-foreground">{label(active.row)}</span>
          ) : (
            <span className="text-muted-foreground">
              {placed.length} countries. Hover or tap the map for a count
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

/** Key into the owner lookup, or -1 for a point outside the grid. */
function cell(col: number, row: number): number {
  if (col < 0 || col >= WORLD_COLS || row < 0 || row >= WORLD_ROWS) return -1;

  return Math.floor(row) * WORLD_COLS + Math.floor(col);
}

/**
 * The island state under the cursor, if one is. Checked ahead of the grid
 * because several anchors — Hong Kong, Singapore — sit on a cell their larger
 * neighbour owns, and the smaller mark is the one being aimed at.
 */
function nearestAnchor(placed: Placed[], col: number, row: number): string | null {
  let found: string | null = null;
  let best = ANCHOR_REACH;

  for (const entry of placed) {
    if (!entry.anchor) continue;

    const dx = entry.anchor.x / CELL - col;
    const dy = entry.anchor.y / CELL - row;
    const distance = Math.hypot(dx, dy);

    if (distance <= best) {
      best = distance;
      found = entry.row.name;
    }
  }

  return found;
}

/** "India — 570 participants", the readout in both tooltips. */
function label(row: CountryRow): string {
  return `${row.name} — ${count(row.registrants)}`;
}

/**
 * Locale pinned to en-US: this renders during the prerender too, and a figure
 * grouped one way on the server and another in the browser breaks hydration.
 */
function count(registrants: number): string {
  return `${registrants.toLocaleString('en-US')} ${registrants === 1 ? 'participant' : 'participants'}`;
}

/** Clamped so a step the endpoint grows later can't index off the ramp. */
function shade(share: number): number {
  return RAMP[Math.min(RAMP.length - 1, Math.max(0, share))];
}

/**
 * Turns the endpoint's rows into drawable geometry: one pass over the grid to
 * bucket every land cell by country, then a join against the countries that
 * anyone registered from. Also returns the reverse lookup — cell to country
 * name — that the cursor is hit tested against.
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

  const owner = new Map<number, string>();

  for (const entry of placed) {
    for (const [col, row] of entry.cells) owner.set(cell(col, row), entry.row.name);
  }

  return { placed, quiet, owner, missing };
}

/** Equirectangular, matching the projection the grid was rasterised with. */
function project(lat: number, lon: number) {
  const cellDegrees = 360 / WORLD_COLS;

  return {
    x: ((lon + 180) / cellDegrees) * CELL,
    y: ((WORLD_LAT_MAX - lat) / cellDegrees) * CELL,
  };
}

