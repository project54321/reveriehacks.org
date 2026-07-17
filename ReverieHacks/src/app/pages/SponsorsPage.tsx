import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Sponsor {
  id: string;
  name: string;
  tier: string;
  logo: string;
  url: string;
  description: string;
  x: number;
  y: number;
}

const sponsors: Sponsor[] = [
  {
    id: 'featherless',
    name: 'Featherless',
    tier: 'Compute Partner',
    logo: '/sponsorLogos/fM.svg',
    url: 'https://featherless.ai',
    description: 'Seamless inference APIs, plus $300 in credits for developers building with AI.',
    x: 24,
    y: 28,
  },
  {
    id: 'wolfram',
    name: 'Wolfram',
    tier: 'Technology Partner',
    logo: '/sponsorLogos/wolfram.png',
    url: 'https://www.wolfram.com',
    description: 'Computational access for the next generation of innovators, via Wolfram|One.',
    x: 76,
    y: 70,
  },
];

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
            ReverieHacks is made possible by the organizations that back young builders.
          </p>
        </motion.div>

        {/* Constellation */}
        <div className="relative mx-auto mt-16 h-[520px] w-full max-w-[900px] border border-border md:h-[600px]">
          {/* Connecting lines */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {sponsors.map((s) => (
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
              <span className="font-display text-base uppercase leading-[0.95] tracking-[0.08em]">
                Reverie
                <br />
                <span className="text-primary">Hacks</span>
              </span>
            </div>
          </div>

          {/* Sponsor nodes */}
          {sponsors.map((s, i) => {
            const isHovered = hovered === s.id;
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
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border bg-card transition-colors hover:border-primary/50"
                      >
                        <img
                          src={s.logo}
                          alt={`${s.name} logo`}
                          className="h-full w-full object-cover"
                        />
                      </motion.a>
                    ) : (
                      <motion.a
                        key="card"
                        layoutId={`node-${s.id}`}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        className="absolute flex w-72 flex-col border border-primary/50 bg-popover p-5 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
                            <img
                              src={s.logo}
                              alt={`${s.name} logo`}
                              className="h-full w-full object-cover"
                            />
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

        {/* Become a sponsor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 border-t border-border pt-10 text-center"
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
