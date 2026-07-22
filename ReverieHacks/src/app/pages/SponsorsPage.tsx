import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Sponsor {
  id: string;
  name: string;
  tier: string;
  url: string;
  description: string;
  x: number;
  y: number;
  logo?: string;
  fit?: 'cover' | 'contain';
  short?: string;
  monogram?: string;
  /** Put the logo on a white chip (for dark/gradient logos). */
  light?: boolean;
}

// Company sponsors — the constellation (in-kind partners).
const companySponsors: Sponsor[] = [
{
    id: 'featherless',
    name: 'Featherless',
    tier: 'Compute Partner',
    logo: '/sponsorLogos/fM.svg',
    fit: 'cover',
    url: 'https://featherless.ai',
    description:
      'Seamless inference APIs — $300 in credits for the ML Prompt Engineering winner, plus a month of subscription for every participant.',
    x: 15,
    y: 20,
  },
  {
    id: 'xyz',
    name: 'XYZ',
    tier: 'Domains Partner',
    logo: '/sponsorLogos/xyz.png',
    fit: 'contain',
    url: 'https://gen.xyz',
    description: 'Domains for every project — free .xyz domains for everyone who places.',
    x: 85,
    y: 20,
  },
  {
    id: 'render',
    name: 'Render',
    tier: 'Cloud Partner',
    logo: '/sponsorLogos/render.png',
    fit: 'contain',
    url: 'https://render.com',
    description: '$50 in building credits for general attendees, plus up to $500 for Best Use of Render track winners.',
    x: 15,
    y: 50,
  },
  {
    id: 'tin-computer',
    name: 'Tin Computer',
    tier: 'Growth Partner',
    logo: '/sponsorLogos/tincomputers.png',
    fit: 'contain',
    url: 'https://tincomputer.com',
    description: '$299 in credits (one month of Growth plan) for up to 100 eligible development teams.',
    x: 85,
    y: 50,
  },
  {
    id: 'codecrafters',
    name: 'Code Crafters',
    tier: 'Learning Partner',
    logo: '/sponsorLogos/codecrafters.svg',
    fit: 'contain',
    light: true,
    url: 'https://codecrafters.io',
    description:
      'Hands-on programming challenges — VIP memberships for the Software Development podium: 2 years ($720) for 1st, 1 year ($360) for 2nd, and 6 months for 3rd.',
    x: 30,
    y: 82,
  },
  {
    id: 'wolfram',
    name: 'Wolfram',
    tier: 'Technology Partner',
    logo: '/sponsorLogos/wolfram.png',
    fit: 'cover',
    url: 'https://www.wolfram.com',
    description: 'Computational access for the next generation of innovators, via Wolfram|One.',
    x: 70,
    y: 82,
  },
];

// Financial team sponsors, grouped by contribution tier.
interface TeamSponsor {
  name: string;
  tier: 'main' | 'gold' | 'silver' | 'bronze';
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
  { name: 'Spectre', tier: 'gold', logo: '/sponsorLogos/spectre.png', fit: 'contain', bare: true, number: '36363' },
  { name: 'Learner Labs', tier: 'gold', logo: '/sponsorLogos/ll.png', url: 'https://learnerlabs.app' },
  { name: 'Banana Bots', tier: 'silver', logo: '/sponsorLogos/bananabots.png', fit: 'cover', number: '30358' },
  { name: 'Cosmobotics', tier: 'silver', logo: '/sponsorLogos/cosmo.png', number: '23361' },
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
  { name: 'Roboplayers', tier: 'bronze', logo: '/sponsorLogos/roboplayers.png', fit: 'cover', number: '18270' },
];

const tiers = [
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

function NodeLogo({ s }: { s: Sponsor }) {
  if (s.logo) {
    return (
      <img
        src={s.logo}
        alt={`${s.name} logo`}
        className={`h-full w-full ${s.fit === 'contain' ? 'object-contain p-3.5' : 'object-cover'}`}
      />
    );
  }
  return (
    <span className="px-2 text-center font-display text-sm uppercase leading-tight tracking-wide text-foreground">
      {s.short ?? s.name}
    </span>
  );
}

export function SponsorsPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen px-6 pb-24 pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Header — left aligned to match the rest of the site */}
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

        {/* Sponsors — tiered, compact divided rows */}
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

        {/* Company partners — the constellation */}
        <section className="mt-20">
          <div className="flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="text-2xl">Partners</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">In-kind</span>
          </div>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Companies providing the tools, credits, and prizes.
          </p>

          <div className="relative mx-auto mt-8 h-[440px] w-full max-w-[900px] border border-border md:h-[520px]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              {companySponsors.map((s) => (
                <line
                  key={`line-${s.id}`}
                  x1="50%"
                  y1="50%"
                  x2={`${s.x}%`}
                  y2={`${s.y}%`}
                  stroke={hovered === s.id ? 'var(--primary)' : 'var(--border-strong)'}
                  strokeWidth={1}
                  strokeDasharray="3 5"
                  className="transition-all duration-300"
                />
              ))}
            </svg>

            {/* Center node */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border border-primary/40 bg-background text-center md:h-36 md:w-36">
                <span className="font-wordmark text-base uppercase leading-[0.9] tracking-[0.08em]">
                  Reverie
                  <br />
                  <span className="text-primary">Hacks</span>
                </span>
              </div>
            </div>

            {/* Sponsor nodes */}
            {companySponsors.map((s, i) => {
              const isHovered = hovered === s.id;
              const external = s.url !== '#';
              return (
                <motion.div
                  key={s.id}
                  animate={isHovered ? { y: 0 } : { y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                  transition={
                    isHovered
                      ? { duration: 0 }
                      : { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${s.x}%`, top: `${s.y}%`, zIndex: isHovered ? 40 : 30 }}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="relative flex h-28 w-28 items-center justify-center">
                    <AnimatePresence initial={false} mode="popLayout">
                      {!isHovered ? (
                        <motion.a
                          key="node"
                          layoutId={`node-${s.id}`}
                          href={external ? s.url : undefined}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noreferrer' : undefined}
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                          className={`flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border transition-colors hover:border-primary/50 ${
                            s.light ? 'bg-white' : 'bg-card'
                          }`}
                        >
                          <NodeLogo s={s} />
                        </motion.a>
                      ) : (
                        <motion.a
                          key="card"
                          layoutId={`node-${s.id}`}
                          href={external ? s.url : undefined}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noreferrer' : undefined}
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                          className="absolute flex w-72 flex-col border border-primary/50 bg-popover p-5 text-left"
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
                                  alt={`${s.name} logo`}
                                  className={`h-full w-full ${
                                    s.fit === 'contain' ? 'object-contain' : 'object-cover'
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
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            {s.description}
                          </motion.p>
                        </motion.a>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Become a sponsor */}
        <motion.div
          initial={{ opacity: 0 }}
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
