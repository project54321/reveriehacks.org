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
  /** Logo image path. If omitted, the node shows `short` text instead. */
  logo?: string;
  /** How a logo sits in its node. */
  fit?: 'cover' | 'contain';
  /** Text shown in the node when there is no logo yet (placeholder). */
  short?: string;
  /** Small initials used in the hover card when there is no logo. */
  monogram?: string;
}

// Company sponsors — the constellation. XYZ and Code Crafters are text
// placeholders until their logo PNGs arrive.
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
    short: '.xyz',
    monogram: 'XYZ',
    url: '#',
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
    url: '#',
    description: 'Hands-on programming challenges, plus 6 VIP memberships for winners.',
    x: 27,
    y: 72,
  },
];

// Financial team sponsors — names only. Luminary leads; the rest follow by contribution.
const teamSponsors: { name: string; monogram?: string; logo?: string; wordmark?: boolean }[] = [
  { name: 'Luminary', logo: '/sponsorLogos/LuminaryRobotics.png', wordmark: true },
  { name: 'Spectre', monogram: 'S' },
  { name: 'Gearchaeologists', monogram: 'G' },
  { name: 'Cosmobotics', monogram: 'C' },
  { name: 'Eclipse', monogram: 'E' },
  { name: 'Roboplayers', monogram: 'R' },
  { name: 'Learning Labs', monogram: 'LL' },
];

function NodeLogo({ s }: { s: Sponsor }) {
  if (s.logo) {
    return (
      <img
        src={s.logo}
        alt={`${s.name} logo`}
        className={`h-full w-full ${s.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
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
            ReverieHacks is made possible by the companies and teams that back young builders.
          </p>
        </motion.div>

        {/* Company constellation */}
        <div className="relative mx-auto mt-16 h-[520px] w-full max-w-[900px] border border-border md:h-[600px]">
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
                              <span className="text-[0.65rem] font-display uppercase text-muted-foreground">
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

        {/* Team sponsors */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="eyebrow text-primary">Team Sponsors</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}>
              Backed by teams
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Robotics teams whose contributions power this year&apos;s cash prize pool.
            </p>
          </motion.div>

          <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-10">
            {teamSponsors.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="flex w-28 flex-col items-center text-center"
              >
                {t.wordmark && t.logo ? (
                  <div className="flex h-16 w-28 items-center justify-center overflow-hidden rounded-md border border-border bg-white p-2">
                    <img src={t.logo} alt={`${t.name} logo`} className="h-full w-full object-contain" />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border bg-card">
                    {t.logo ? (
                      <img src={t.logo} alt={`${t.name} logo`} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-display text-lg text-muted-foreground">{t.monogram}</span>
                    )}
                  </div>
                )}
                <span className="mt-3 text-sm leading-snug">{t.name}</span>
              </motion.div>
            ))}
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
