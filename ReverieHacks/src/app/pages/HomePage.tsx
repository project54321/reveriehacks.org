import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { DEVPOST_FALLBACK, useDevpostStats, type DevpostStats } from '../hooks/useDevpostStats';

type Stat = {
  label: string;
  /** Live figure pulled from Devpost, or null for the one we can't source. */
  from?: (stats: DevpostStats) => number;
  prefix?: string;
  suffix?: string;
  /** Fixed value, for stats Devpost doesn't publish. */
  value?: string;
};

/** Always live — no fixed-value variant, so no null check at the call site. */
type HeroStat = Stat & { from: (stats: DevpostStats) => number };

// The two headline figures. These sit beside the hero's calls to action rather
// than in the strip below, so they're on screen without scrolling.
const heroStats: HeroStat[] = [
  { label: 'Participants', from: (s) => s.participants },
  { label: 'In prizes', from: (s) => s.prizes, prefix: '$', suffix: '+' },
];

const stats: Stat[] = [
  { label: 'In cash', value: '$800' },
  { label: 'Tracks', from: (s) => s.tracks },
  { label: 'Days', from: (s) => s.days },
];

const perks = [
  { name: 'Wolfram|One', detail: '1 month, free' },
  { name: 'Featherless.AI', detail: '1 month subscription' },
  { name: 'Render', detail: '1 month of build credits' },
  { name: 'Protoflow', detail: '500 credits' },
  { name: 'Devswarm Pro', detail: '1 month — a full year for first-place teams' },
  { name: 'Mobbin Pro', detail: '3 months free — a full year for winners' },
  { name: 'YouCam Pro API', detail: '500 API credits, first 700 to redeem' },
  { name: 'Tin Computer', detail: '$299 in growth credits, first 100 teams' },
  { name: 'Firecrawl', detail: '10,000 credits for every hacker' },
  { name: 'Certificate', detail: 'Proof you shipped something' },
];

const points = [
  {
    n: '01',
    title: 'Build',
    body: 'Bring an idea to life on your own or with a team, across six tracks spanning software, data, and hardware.',
  },
  {
    n: '02',
    title: 'Learn',
    body: 'Get honest feedback from judges and mentors who have shipped real work in the industry.',
  },
  {
    n: '03',
    title: 'Win',
    body: 'Compete for prizes, subscriptions, and gifts from the sponsors backing this year’s event.',
  },
];

const DISCORD_URL = 'https://discord.gg/gDQGYSQKrH';
const DEVPOST_URL = 'https://reverie-hacks-2026.devpost.com/';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function HomePage() {
  const devpost = useDevpostStats();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto flex min-h-[92vh] max-w-5xl flex-col justify-center px-6 pt-28">
        <motion.p
          {...fade}
          transition={{ duration: 0.5 }}
          className="eyebrow text-muted-foreground"
        >
          Virtual Hackathon
        </motion.p>

        <motion.h1
          {...fade}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-6 font-display leading-[0.98] tracking-tight"
          // Capped at 6rem, not 7: "Let's change the world," needs ~9.9x the
          // font size in width, so anything above ~6.1rem overflows the 976px
          // content box and wraps to a third line, pushing the row below off
          // screen. The <br/> is meant to be the only break.
          style={{ fontSize: 'clamp(2.75rem, 9vw, 6rem)' }}
        >
          Let’s change the world,
          <br />
          <span className="text-primary">together.</span>
        </motion.h1>

        <motion.p
          {...fade}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl"
        >
          <span className="text-foreground">
            Currently the largest virtual high school hackathon.
          </span>{' '}
          Two weeks, six tracks. Pick one, form a team, and ship something real.
        </motion.p>

        {/* Calls to action on the left, headline figures on the right. Sharing
            a row keeps both on screen without scrolling while costing the hero
            no extra vertical space. */}
        <motion.div
          {...fade}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-8"
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-primary-foreground transition-colors hover:bg-accent"
            >
              Join Discord
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={DEVPOST_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-1 py-3.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              View Devpost
            </a>
          </div>

          <div className="flex shrink-0">
            {heroStats.map((stat, i) => (
              <div key={stat.label} className={i === 0 ? 'pr-8' : 'border-l border-border pl-8'}>
                <div
                  className="font-display leading-none"
                  // Scales with the column so "$404,748+" never wraps or clips.
                  style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)' }}
                >
                  <CountUp
                    to={devpost ? stat.from(devpost) : null}
                    reserve={stat.from(DEVPOST_FALLBACK)}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          {...fade}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-14 text-sm tracking-wide text-muted-foreground"
        >
          {devpost?.dateRange ?? DEVPOST_FALLBACK.dateRange}
          &nbsp;&nbsp;/&nbsp;&nbsp;Online&nbsp;&nbsp;/&nbsp;&nbsp;Open worldwide
        </motion.p>
      </section>

      {/* Stat strip */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-3 border-y border-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`px-2 py-8 ${i !== 0 ? 'border-l border-border' : ''}`}
            >
              <div className="font-display text-4xl md:text-5xl">
                {stat.from ? (
                  <CountUp
                    to={devpost ? stat.from(devpost) : null}
                    reserve={stat.from(DEVPOST_FALLBACK)}
                  />
                ) : (
                  stat.value
                )}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Prizes teaser */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"
        >
          <div>
            <p className="eyebrow text-primary">Prizes</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              $800 cash, real internships, and thousands in sponsor credits
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              A stacked prize pool from the sponsors and partners backing this year&apos;s event, on
              top of perks every hacker walks away with.
            </p>
          </div>
          <Link
            to="/prizes"
            className="group inline-flex shrink-0 items-center gap-2 bg-primary px-7 py-3.5 text-primary-foreground transition-colors hover:bg-accent"
          >
            See all prizes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </section>

      {/* Everyone who takes part */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow text-muted-foreground">Everyone who takes part</p>
          <dl className="mt-6 grid gap-x-12 sm:grid-cols-2">
            {perks.map((perk, i) => {
              const isLastOdd = i === perks.length - 1 && perks.length % 2 === 1;
              return (
                <div
                  key={perk.name}
                  className={`flex items-baseline gap-6 border-b border-border py-4 ${
                    isLastOdd
                      ? 'justify-center text-center sm:col-span-2'
                      : 'justify-between'
                  }`}
                >
                  <dt>{perk.name}</dt>
                  <dd className="text-right text-sm text-muted-foreground">{perk.detail}</dd>
                </div>
              );
            })}
          </dl>
        </motion.div>
      </section>

      {/* Three points */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-9"
            >
              <div className="eyebrow text-primary">{p.n}</div>
              <h3 className="mt-5 text-2xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-5xl px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-border pt-16"
        >
          <h2 className="max-w-2xl leading-[1.02]" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
            Applications for 2026 are open.
          </h2>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-primary-foreground transition-colors hover:bg-accent"
            >
              Get notified
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-1 py-3.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              Learn more
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
