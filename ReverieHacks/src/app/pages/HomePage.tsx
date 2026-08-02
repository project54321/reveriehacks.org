import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Banknote, Briefcase, Cpu, Crown, FlaskConical, Globe } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Builders' },
  { value: '$650', label: 'In cash' },
  { value: '6', label: 'Tracks' },
  { value: '16', label: 'Days' },
];

const prizes = [
  { icon: Banknote, title: '$650 in cash', body: 'Prize money for the standout projects.' },
  { icon: Briefcase, title: '6 internships', body: 'At Learner Labs, an emerging AI startup.' },
  { icon: Cpu, title: '$300 in Featherless credits', body: 'AI inference credits from Featherless.' },
  { icon: Crown, title: '6 Code Crafters memberships', body: 'VIP access to Code Crafters.' },
  { icon: Globe, title: '36 .xyz domains', body: 'A domain for your project, from XYZ.' },
  { icon: FlaskConical, title: '20% off RISE Research', body: 'A discount on the RISE Research program for the winning track.' },
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
          style={{ fontSize: 'clamp(2.75rem, 9vw, 7rem)' }}
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
          A two-week hackathon for young builders. Pick a track, form a team, and ship something
          real.
        </motion.p>

        <motion.div
          {...fade}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
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
        </motion.div>

        <motion.p
          {...fade}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-14 text-sm tracking-wide text-muted-foreground"
        >
          August 2&ndash;17, 2026&nbsp;&nbsp;/&nbsp;&nbsp;Online&nbsp;&nbsp;/&nbsp;&nbsp;Open worldwide
        </motion.p>
      </section>

      {/* Stat strip */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-2 border-y border-border md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`px-2 py-8 ${
                i !== 0 ? 'border-l border-border' : ''
              } ${i === 2 ? 'border-l-0 md:border-l' : ''}`}
            >
              <div className="font-display text-4xl md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
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

      {/* Prizes */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="eyebrow text-primary">Prizes</p>
          <h2 className="mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            What you can win
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            This year&apos;s pool, backed by our sponsors and partner teams.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {prizes.map((prize, i) => (
            <motion.div
              key={prize.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              className="group bg-background p-8"
            >
              <prize.icon
                className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary"
                strokeWidth={1.5}
              />
              <h3 className="mt-6 text-xl">{prize.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{prize.body}</p>
            </motion.div>
          ))}
          {/* Fill the trailing cell so the grid border stays clean (5 items + 1 = even) */}
          <div className="bg-background" aria-hidden />
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
