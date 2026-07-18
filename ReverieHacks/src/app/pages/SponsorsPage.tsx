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
    description: 'Seamless inference APIs, plus $300 in AI credits for participants.',
    x: 27,
    y: 30,
  },
  {
    id: 'xyz',
    name: 'XYZ',
    tier: 'Domains Partner',
    logo: '/sponsorLogos/xyz.png',
    fit: 'contain',
    url: 'https://gen.xyz',
    description: 'Domains for every project — including 36 free .xyz domains for participants.',
    x: 73,
    y: 30,
  },
  {
    id: 'wolfram',
    name: 'Wolfram',
    tier: 'Technology Partner',
    logo: '/sponsorLogos/wolfram.png',
    fit: 'cover',
    url: 'https://www.wolfram.com',
    description: 'Computational access for the next generation of innovators, via Wolfram|One.',
    x: 73,
    y: 72,
  },
  {
    id: 'codecrafters',
    name: 'Code Crafters',
    tier: 'Learning Partner',
    short: 'Code Crafters',
    monogram: 'CC',
    url: 'https://codecrafters.io',
    description: 'Hands-on programming challenges, plus 6 VIP memberships for winners.',
    x: 27,
    y: 72,
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
}

const teamSponsors: TeamSponsor[] = [
  { name: 'Spectre', tier: 'main', logo: '/sponsorLogos/spectre.png', fit: 'contain' },
  { name: 'Banana Bots', tier: 'gold', logo: '/sponsorLogos/bananabots.png', fit: 'cover' },
  { name: 'Cosmobotics', tier: 'gold', monogram: 'C' },
  { name: 'Learner Labs', tier: 'gold', monogram: 'LL', url: 'https://learnerlabs.app' },
  { name: 'Luminary', tier: 'silver', logo: '/sponsorLogos/LuminaryRobotics.png', fit: 'contain', light: true },
  { name: 'Eclipse', tier: 'silver', logo: '/sponsorLogos/eclipse.png', fit: 'cover' },
  { name: 'Roboplayers', tier: 'silver', logo: '/sponsorLogos/roboplayers.png', fit: 'cover' },
];

const tiers = [
  { key: 'main', label: 'Main Sponsor', color: 'text-primary', tile: 'h-28 w-28 md:h-32 md:w-32', name: 'text-base' },
  { key: 'gold', label: 'Gold', color: 'text-[#e0b83a]', tile: 'h-24 w-24', name: 'text-sm' },
  { key: 'silver', label: 'Silver', color: 'text-[#aeb6c2]', tile: 'h-20 w-20', name: 'text-sm' },
  { key: 'bronze', label: 'Bronze', color: 'text-[#c58a58]', tile: 'h-16 w-16', name: 'text-xs' },
] as const;

function TeamTile({ team, tileClass }: { team: TeamSponsor; tileClass: string }) {
  const inner = team.logo ? (
    <img
      src={team.logo}
      alt={`${team.name} logo`}
      className={`h-full w-full ${team.fit === 'contain' ? 'object-contain p-2.5' : 'object-cover'}`}
    />
  ) : (
    <span className="font-display text-xl text-muted-foreground">{team.monogram}</span>
  );

  const cls = `flex items-center justify-center overflow-hidden rounded-2xl border border-border ${tileClass} ${
    team.light ? 'bg-white' : 'bg-card'
  } ${team.url ? 'transition-colors hover:border-primary/50' : ''}`;

  return team.url ? (
    <a href={team.url} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="eyebrow text-muted-foreground">Partners &amp; Sponsors</p>
          <h1 className="mt-5" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Our Network
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            ReverieHacks is made possible by the teams and companies that back young builders.
          </p>
        </motion.div>

        {/* Team sponsors — tiered by contribution, shown first */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="eyebrow text-primary">Sponsors</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}>
              Powered by teams and partners
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Ranked by their contribution to this year&apos;s prize pool.
            </p>
          </motion.div>

          <div className="mt-14 space-y-14">
            {tiers.map((tier) => {
              const teams = teamSponsors.filter((t) => t.tier === tier.key);
              if (!teams.length) return null;
              return (
                <motion.div
                  key={tier.key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-border sm:w-16" />
                    <span className={`eyebrow ${tier.color}`}>{tier.label}</span>
                    <span className="h-px w-8 bg-border sm:w-16" />
                  </div>

                  <div className="mt-7 flex flex-wrap items-start justify-center gap-x-10 gap-y-8 md:gap-x-16">
                    {teams.map((team) => (
                      <div key={team.name} className="flex flex-col items-center gap-3">
                        <TeamTile team={team} tileClass={tier.tile} />
                        <span className={`${tier.name} leading-snug`}>{team.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Company sponsors — the constellation */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="eyebrow text-primary">Company Partners</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}>
              Backed by industry
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Companies powering the prizes, tools, and credits. Hover a node to learn more.
            </p>
          </motion.div>

          <div className="relative mx-auto mt-12 h-[520px] w-full max-w-[900px] border border-border md:h-[600px]">
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
                          className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border bg-card transition-colors hover:border-primary/50"
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
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-card">
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
              href="mailto:team@reveriehacks.com"
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
