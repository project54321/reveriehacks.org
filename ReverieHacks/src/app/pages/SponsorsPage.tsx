import { useEffect, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

interface Sponsor {
  id: string;
  name: string;
  tier: string;
  url: string;
  description: string;
  logo?: string;
  fit?: 'cover' | 'contain';
  short?: string;
  monogram?: string;
  /** Put the logo on a white chip (for dark/gradient logos). */
  light?: boolean;
  /**
   * Flip the logo to its negative in light mode. For single-colour white marks,
   * which would otherwise vanish against the light theme's white card.
   */
  invertOnLight?: boolean;
}

// Company sponsors: the honeycomb (in-kind partners). Order is the reading
// order of the grid, so moving a logo is a matter of moving it in this list.
const companySponsors: Sponsor[] = [
{
    id: 'featherless',
    name: 'Featherless',
    tier: 'Compute Partner',
    logo: '/sponsorLogos/fM.svg',
    fit: 'cover',
    url: 'https://featherless.ai',
    description:
      'Seamless inference APIs, with $300 in credits for the ML Prompt Engineering winner plus a month of subscription for every participant.',
  },
  {
    id: 'xyz',
    name: 'XYZ',
    tier: 'Domains Partner',
    logo: '/sponsorLogos/xyz.png',
    fit: 'contain',
    url: 'https://gen.xyz',
    description: 'Domains for every project, with free .xyz domains for everyone who places.',
  },
  {
    id: 'protoflow',
    name: 'Protoflow',
    tier: 'Prototyping Partner',
    logo: '/sponsorLogos/protoflow.svg',
    fit: 'contain',
    invertOnLight: true,
    url: 'https://protoflow.ai',
    description:
      'Hardware prototyping for makers, with a year of Protoflow Pro for the top three projects overall and 500 credits for every participant.',
  },
  {
    id: 'render',
    name: 'Render',
    tier: 'Cloud Partner',
    logo: '/sponsorLogos/render.png',
    fit: 'contain',
    light: true,
    url: 'https://render.com',
    description: '$50 in building credits for general attendees, plus up to $500 for Best Use of Render track winners.',
  },
  {
    id: 'tin-computer',
    name: 'Tin Computer',
    tier: 'Growth Partner',
    logo: '/sponsorLogos/tin.png',
    fit: 'contain',
    light: true,
    url: 'https://tincomputer.com',
    description: '$299 in credits (one month of Growth plan) for up to 100 eligible development teams.',
  },
  {
    id: 'codecrafters',
    name: 'Code Crafters',
    tier: 'Learning Partner',
    logo: '/sponsorLogos/cc.svg',
    fit: 'contain',
    light: true,
    url: 'https://codecrafters.io',
    description:
      'Hands-on programming challenges, with VIP memberships for the Software Development podium: 2 years ($720) for 1st, 1 year ($360) for 2nd, and 6 months for 3rd.',
  },
  //hi.
  {
    id: 'wolfram',
    name: 'Wolfram',
    tier: 'Technology Partner',
    logo: '/sponsorLogos/wolfram.png',
    fit: 'cover',
    url: 'https://www.wolfram.com',
    description: 'Computational access for the next generation of innovators, via Wolfram|One.',
  },
  {
    id: 'devswarm',
    name: 'DevSwarm',
    tier: 'Agents Partner',
    logo: '/sponsorLogos/devswarm.png',
    fit: 'contain',
    light: true,
    url: 'https://devswarm.ai',
    description:
      'Parallel AI coding agents across isolated Git branches, with a month of DevSwarm Pro for every participant and a full year for the winners.',
  },
  {
    id: 'rise-research',
    name: 'RISE Research',
    tier: 'Research Partner',
    logo: '/sponsorLogos/rise.png',
    fit: 'contain',
    light: true,
    url: 'https://riseglobaleducation.com',
    description:
      'Research mentorship with PhD mentors, including 20% off the RISE Research program for the winning track.',
  },
  {
    id: 'formaloo',
    name: 'Formaloo',
    tier: 'No-Code Partner',
    logo: '/sponsorLogos/formaloo.png',
    fit: 'cover',
    url: 'https://formaloo.com',
    description: 'No-code forms, surveys, and data apps for collecting and acting on submissions.',
  },
  {
    id: 'perfect-corp',
    name: 'Perfect Corp',
    tier: 'Beauty AI Partner',
    logo: '/sponsorLogos/youcam.png',
    fit: 'cover',
    url: 'https://www.perfectcorp.com/business',
    description:
      'The YouCam Pro API for AI skin analysis and virtual try-on, with 500 free API credits for the first 700 participants to redeem.',
  },
  {
    id: 'firecrawl',
    name: 'Firecrawl',
    tier: 'Web Scraping Partner',
    logo: '/sponsorLogos/Firecrawl.png',
    fit: 'cover',
    url: 'https://www.firecrawl.dev',
    description: 'Turn websites into LLM-ready data, with 10,000 credits for every hacker.',
  },
  {
    id: 'cleanshot',
    name: 'CleanShot X',
    tier: 'Screen Capture Partner',
    logo: '/sponsorLogos/CleanShot.png',
    fit: 'contain',
    light: true,
    url: 'https://cleanshot.com',
    description:
      'Screenshot and screen recording built for Mac, with 18 licenses for the top three of every track.',
  },
  {
    id: 'mobbin',
    name: 'Mobbin',
    tier: 'Design Partner',
    logo: '/sponsorLogos/mobbin.png',
    fit: 'contain',
    light: true,
    url: 'https://mobbin.com',
    description:
      'A searchable library of real mobile and web app design patterns and flows, with a 3-month Mobbin Pro subscription free for all participants and 1-year Mobbin Pro free for winners.',
  },
  {
    id: 'learner-labs',
    name: 'Learner Labs',
    tier: 'Internship Partner',
    logo: '/sponsorLogos/ll.png',
    fit: 'cover',
    url: 'https://learnerlabs.app',
    description:
      'An emerging AI startup, offering six internships across the ML Prompt Engineering and Ideathon tracks.',
  },
  {
    id: 'momen',
    name: 'Momen',
    tier: 'App Building Partner',
    logo: '/sponsorLogos/momen.png',
    fit: 'contain',
    url: 'https://momen.app',
    description:
      'A no-code platform for building full-stack web apps, with $100 in credits for every participant and $2,000 for each Software Development track winner.',
  },
];

// Financial team sponsors, grouped by contribution tier.
interface TeamSponsor {
  name: string;
  tier: 'diamond' | 'main' | 'gold' | 'silver' | 'bronze';
  logo?: string;
  fit?: 'cover' | 'contain';
  light?: boolean;
  monogram?: string;
  url?: string;
  /** Render in a wide rectangular tile (for horizontal wordmark logos). */
  wide?: boolean;
  /** Render the transparent logo with no tile/box around it. */
  bare?: boolean;
  /** FTC team number. */
  number?: string;
}

const teamSponsors: TeamSponsor[] = [
  { name: 'Spectre', tier: 'diamond', logo: '/sponsorLogos/spectre.png', fit: 'contain', bare: true, number: '36363' },
  { name: 'Learner Labs', tier: 'gold', logo: '/sponsorLogos/ll.png', url: 'https://learnerlabs.app' },
  { name: 'Banana Bots', tier: 'silver', logo: '/sponsorLogos/bananabots.png', fit: 'cover', number: '30358' },
  { name: 'Cosmobotics', tier: 'silver', logo: '/sponsorLogos/cosmo.png', number: '23361' },
  { name: 'ViperBots Recoil', tier: 'silver', logo: '/sponsorLogos/recoil.png', fit: 'cover', light: true, number: '16311' },
  { name: 'Eclipse', tier: 'bronze', logo: '/sponsorLogos/eclipse.png', fit: 'cover', number: '12670' },
  {
    name: 'Luminary',
    tier: 'bronze',
    logo: '/sponsorLogos/LuminaryRobotics.png',
    fit: 'contain',
    light: true,
    wide: true,
    url: 'https://luminaryrobotics.org',
    number: '36633',
  },
  { name: 'Quantum Coders', tier: 'bronze', logo: '/sponsorLogos/QuantamCoders.png', fit: 'cover', number: '32001' },
  { name: 'Roboplayers', tier: 'bronze', logo: '/sponsorLogos/roboplayers.png', fit: 'cover', number: '18270' },
];

const tiers = [
  { key: 'diamond', label: 'Diamond', color: 'text-[#7fd8e8]' },
  { key: 'main', label: 'Main', color: 'text-primary' },
  { key: 'gold', label: 'Gold', color: 'text-[#e0b83a]' },
  { key: 'silver', label: 'Silver', color: 'text-[#aeb6c2]' },
  { key: 'bronze', label: 'Bronze', color: 'text-[#c58a58]' },
] as const;

function TeamTile({ team, size }: { team: TeamSponsor; size: string }) {
  // Bare: transparent logo with no tile/box (e.g. Spectre's ghost).
  if (team.bare && team.logo) {
    const img = (
      <img
        src={team.logo}
        alt={`${team.name} logo`}
        className={`shrink-0 object-contain ${size}`}
      />
    );
    return team.url ? (
      <a href={team.url} target="_blank" rel="noreferrer" title={team.name}>
        {img}
      </a>
    ) : (
      img
    );
  }

  const inner = team.logo ? (
    <img
      src={team.logo}
      alt={`${team.name} logo`}
      className={`h-full w-full ${team.fit === 'contain' ? 'object-contain p-1' : 'object-cover'}`}
    />
  ) : (
    <span className="font-display text-lg text-muted-foreground">{team.monogram}</span>
  );

  const cls = `flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border ${size} ${
    team.light ? 'bg-white' : 'bg-card'
  } ${team.url ? 'transition-colors hover:border-primary/50' : ''}`;

  return team.url ? (
    <a href={team.url} target="_blank" rel="noreferrer" className={cls} title={team.name}>
      {inner}
    </a>
  ) : (
    <div className={cls} title={team.name}>
      {inner}
    </div>
  );
}

/**
 * A pointy-top hexagon: flat left and right edges so cells sit flush in a row,
 * points top and bottom so the next row nests into the notches. Height is
 * 2/√3 of the width, and rows overlap by a quarter of that height.
 */
const HEX_RATIO = 1.1547;
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
const HEX_POINTS = '50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87';

// Widest a row may get: 3 on phones, 6 from md up. The row builder balances
// the actual counts against the list length.
function useHexPerRow() {
  const [perRow, setPerRow] = useState(6);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)');
    const sync = () => setPerRow(wide.matches ? 6 : 3);
    sync();
    wide.addEventListener('change', sync);
    return () => wide.removeEventListener('change', sync);
  }, []);

  return perRow;
}

/**
 * Split into the fewest rows that respect `max`, then even them out rather than
 * filling each to the brim — 16 with a max of 6 is 5/6/5, not 6/6/4. Spare
 * cells go to the middle rows first, so the block bulges at the waist like a
 * hexagon instead of trailing off, and the top row keeps a true centre.
 */
function honeycombRows<T>(items: T[], max: number): T[][] {
  const rowCount = Math.max(1, Math.ceil(items.length / max));
  const sizes = Array.from({ length: rowCount }, () => Math.floor(items.length / rowCount));

  const middleOut = [...sizes.keys()].sort((a, b) => {
    const mid = (rowCount - 1) / 2;
    return Math.abs(a - mid) - Math.abs(b - mid) || a - b;
  });
  for (let i = 0; i < items.length % rowCount; i++) sizes[middleOut[i]] += 1;

  const rows: T[][] = [];
  let cut = 0;
  for (const size of sizes) {
    rows.push(items.slice(cut, cut + size));
    cut += size;
  }
  return rows;
}

/**
 * How far each row slides sideways, in cell-pitches, so every row nests into
 * the one above. A centred row already sits half a cell off from its neighbour
 * when their lengths differ by one, so a shift is only needed where two rows
 * share a parity. The whole set is then recentred on the block.
 */
function rowOffsets(rows: unknown[][]): number[] {
  // A row of odd length centres a cell on the axis; an even one straddles it.
  const shifts = rows.map((row, r) => ((r % 2) - (row.length % 2 === 0 ? 1 : 0) + 2) % 2 / 2);
  const middle = (Math.min(...shifts) + Math.max(...shifts)) / 2;
  return shifts.map((shift) => shift - middle);
}

function HexLogo({ s }: { s: Sponsor }) {
  if (s.logo) {
    // 'cover' fills the cell edge to edge; 'contain' is inset far enough to
    // clear the sloping walls, which cut in hard at the top and bottom.
    return (
      <img
        src={s.logo}
        alt={`${s.name} logo`}
        className={`${
          s.fit === 'contain' ? 'h-3/5 w-3/5 object-contain' : 'h-full w-full object-cover'
        } ${s.invertOnLight ? '[[data-theme=light]_&]:invert' : ''}`}
      />
    );
  }
  return (
    <span className="px-3 text-center font-display text-sm uppercase leading-tight tracking-wide text-foreground">
      {s.short ?? s.name}
    </span>
  );
}

function HexCell({
  s,
  open,
  dimmed,
  onOpen,
  onClose,
}: {
  s: Sponsor;
  open: boolean;
  dimmed: boolean;
  onOpen: (anchor: HTMLElement) => void;
  onClose: () => void;
}) {
  return (
    <div className="relative shrink-0" style={{ width: 'var(--hex-w)', height: 'var(--hex-h)' }}>
      <a
        href={s.url}
        target="_blank"
        rel="noreferrer"
        title={s.name}
        onMouseEnter={(e) => onOpen(e.currentTarget)}
        onMouseLeave={onClose}
        onFocus={(e) => onOpen(e.currentTarget)}
        onBlur={onClose}
        className="block h-full w-full transition-[transform,opacity] duration-300 focus:outline-none"
        style={{ transform: open ? 'scale(1.07)' : undefined, opacity: dimmed ? 0.4 : 1 }}
      >
        <span
          className={`flex h-full w-full items-center justify-center ${s.light ? 'bg-white' : 'bg-card'}`}
          style={{ clipPath: HEX_CLIP }}
        >
          <HexLogo s={s} />
        </span>
        {/* The outline rides on top: clip-path crops a border away. */}
        <svg
          viewBox="0 0 100 115.47"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <polygon
            points={HEX_POINTS}
            fill="none"
            vectorEffect="non-scaling-stroke"
            stroke={open ? 'var(--primary)' : 'var(--border-strong)'}
            strokeWidth={open ? 1.5 : 1}
            className="transition-all duration-300"
          />
        </svg>
      </a>
    </div>
  );
}

const CARD_W = 'min(20rem, calc(100vw - 1.5rem))';
/** Room the card needs below a cell before it flips above it. */
const CARD_ROOM = 240;

/**
 * The card is portalled to <body> and positioned against the viewport, for two
 * reasons: the animated rows each carry a transform, which creates a stacking
 * context that would paint a card from an upper row underneath the rows below
 * it; and anchoring to the viewport keeps the card wholly on screen from any
 * scroll position rather than hanging off the top or bottom edge.
 *
 * Horizontal placement is a CSS clamp so it never needs the card's own width,
 * and the vertical side is anchored by whichever edge faces the cell, so it
 * never needs the height either — no measure-then-reposition frame.
 */
function SponsorCard({ s, anchor }: { s: Sponsor; anchor: HTMLElement }) {
  const [, reposition] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    // Capture phase: an ancestor may be the scroll container, not the window.
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, []);

  const cell = anchor.getBoundingClientRect();
  const edge = 12;
  const gap = 10;
  const below = window.innerHeight - cell.bottom - gap - edge;
  const above = cell.top - gap - edge;
  const flip = below < CARD_ROOM && above > below;
  const centre = cell.left + cell.width / 2;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: flip ? 6 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: flip ? 6 : -6 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      // Inert: the cell underneath owns the hover, so the card can never steal
      // it back and flicker.
      className="pointer-events-none fixed z-[70] overflow-y-auto border border-primary/50 bg-popover p-5 text-left shadow-2xl"
      style={{
        width: CARD_W,
        left: `clamp(${edge}px, calc(${centre}px - ${CARD_W} / 2), calc(100vw - ${CARD_W} - ${edge}px))`,
        top: flip ? undefined : cell.bottom + gap,
        bottom: flip ? window.innerHeight - cell.top + gap : undefined,
        maxHeight: flip ? above : below,
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border ${
            s.light ? 'bg-white' : 'bg-card'
          }`}
        >
          {s.logo ? (
            <img
              src={s.logo}
              alt=""
              className={`h-full w-full ${s.fit === 'contain' ? 'object-contain' : 'object-cover'} ${
                s.invertOnLight ? '[[data-theme=light]_&]:invert' : ''
              }`}
            />
          ) : (
            <span className="font-display text-[0.65rem] uppercase text-muted-foreground">
              {s.monogram ?? s.name.slice(0, 2)}
            </span>
          )}
        </span>
        <span>
          <span className="eyebrow block text-primary/80">{s.tier}</span>
          <span className="font-display text-lg">{s.name}</span>
        </span>
      </div>
      <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
        {s.description}
      </p>
    </motion.div>,
    document.body,
  );
}

export function SponsorsPage() {
  const [active, setActive] = useState<{ s: Sponsor; anchor: HTMLElement } | null>(null);
  const rows = honeycombRows(companySponsors, useHexPerRow());
  const offsets = rowOffsets(rows);

  return (
    <div className="min-h-screen px-6 pb-24 pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Header: left aligned to match the rest of the site */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-muted-foreground">Partners &amp; Sponsors</p>
          <h1 className="mt-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Our <span className="text-primary">Network</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            The teams and companies that make ReverieHacks possible.
          </p>
        </motion.div>

        {/* Sponsors: tiered, compact divided rows */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="text-2xl">Sponsors</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">By tier</span>
          </div>

          <div className="divide-y divide-border">
            {tiers.map((tier) => {
              const teams = teamSponsors.filter((t) => t.tier === tier.key);
              if (!teams.length) return null;
              return (
                <motion.div
                  key={tier.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-8"
                >
                  <span className={`eyebrow shrink-0 sm:w-14 ${tier.color}`}>{tier.label}</span>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                    {teams.map((team) => {
                      const size = team.wide
                        ? 'h-16 w-44'
                        : tier.key === 'main'
                          ? 'h-20 w-20'
                          : 'h-16 w-16';
                      return (
                        <div key={team.name} className="flex items-center gap-2.5">
                          <TeamTile team={team} size={size} />
                          <div className="leading-tight">
                            <span className="block text-sm">{team.name}</span>
                            {team.number && (
                              <span className="block text-xs text-muted-foreground">
                                #{team.number}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Company partners: the honeycomb */}
        <section className="mt-20">
          <div className="flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="text-2xl">Partners</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">In-kind</span>
          </div>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="max-w-xl text-sm text-muted-foreground">
              Companies providing the tools, credits, and prizes.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
              Hover a cell
            </p>
          </div>

          <div
            className="mt-12 flex flex-col items-center pb-8"
            style={
              {
                '--hex-w': 'clamp(4.5rem, 14vw, 8rem)',
                '--hex-h': `calc(var(--hex-w) * ${HEX_RATIO})`,
                '--hex-gap': '0.5rem',
              } as React.CSSProperties
            }
          >
            {rows.map((row, r) => (
              <div
                key={r}
                style={{
                  marginTop: r === 0 ? undefined : 'calc(var(--hex-h) * -0.25 + var(--hex-gap) * 0.6)',
                  transform: `translateX(calc((var(--hex-w) + var(--hex-gap)) * ${offsets[r]}))`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: r * 0.08 }}
                  className="flex justify-center"
                  style={{ gap: 'var(--hex-gap)' }}
                >
                  {row.map((s) => (
                    <HexCell
                      key={s.id}
                      s={s}
                      open={active?.s.id === s.id}
                      dimmed={active !== null && active.s.id !== s.id}
                      onOpen={(anchor) => setActive({ s, anchor })}
                      onClose={() => setActive(null)}
                    />
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {active && <SponsorCard key={active.s.id} s={active.s} anchor={active.anchor} />}
          </AnimatePresence>
        </section>

        {/* Become a sponsor */}
        <motion.div
          initial={{ opacity: 0 }} //hi
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 border-t border-border pt-10 text-center"
        >
          <p className="text-muted-foreground">
            Interested in joining the network?{' '}
            <a
              href="mailto:info@reveriehacks.org"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Request the info pack
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
