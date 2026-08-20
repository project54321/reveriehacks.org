import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Calendar, Layers, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { WorldMap } from '../components/WorldMap';
import BorderGlow from '../components/BorderGlow';
import DriftWall from '../components/DriftWall';
import AccordionGallery from '../components/AccordionGallery';
import LogoLoop from '../components/LogoLoop';
import { ParticleHero } from '../components/ParticleHero';
import { galleryItems } from '../data/gallery';
import { DEVPOST_FALLBACK, useDevpostStats } from '../hooks/useDevpostStats';
import { useCountryStats } from '../hooks/useCountryStats';

const DISCORD_URL = 'https://discord.gg/gDQGYSQKrH';
const DEVPOST_URL = 'https://reverie-hacks-2026.devpost.com/';

const heroAccordion = [
  { image: '/images/opening.png', label: 'Opening Ceremony' },
  { image: '/images/sponsor.png', label: 'Sponsor Presentations' },
  { image: '/images/bounty.png', label: 'Bounty System' },
  { image: '/images/agent.png', label: 'Agentic Coding' },
  { image: '/images/momen.png', label: 'Workshops' },
  { image: '/images/devpost.png', label: 'Submission' },
];

const sponsorLogos = [
  { src: '/sponsorLogos/render.png', alt: 'Render', href: 'https://render.com' },
  { src: '/sponsorLogos/Firecrawl.png', alt: 'Firecrawl', href: 'https://firecrawl.dev' },
  { src: '/sponsorLogos/protoflow.svg', alt: 'Protoflow', href: 'https://protoflow.ai' },
  { src: '/sponsorLogos/wolfram.png', alt: 'Wolfram', href: 'https://wolfram.com' },
  { src: '/sponsorLogos/xyz.png', alt: 'XYZ', href: 'https://gen.xyz' },
  { src: '/sponsorLogos/mobbin.png', alt: 'Mobbin', href: 'https://mobbin.com' },
  { src: '/sponsorLogos/momen.png', alt: 'Momen', href: 'https://momen.app' },
  { src: '/sponsorLogos/CleanShot.png', alt: 'CleanShot', href: 'https://cleanshot.com' },
  { src: '/sponsorLogos/formaloo.png', alt: 'Formaloo', href: 'https://formaloo.com' },
  { src: '/sponsorLogos/tin.png', alt: 'Tin', href: 'https://tincomputer.com' },
  { src: '/sponsorLogos/devswarm.png', alt: 'DevSwarm', href: 'https://devswarm.ai' },
  { src: '/sponsorLogos/somba.png', alt: 'Somba', href: 'https://somba.dev' },
  { src: '/sponsorLogos/fM.svg', alt: 'Featherless', href: 'https://featherless.io' },
  { src: '/sponsorLogos/ll.png', alt: 'Learner Labs', href: 'https://learnerlabs.com' }, 
  { src: '/sponsorLogos/neon.png', alt: 'Neon', href: 'https://neon.tech' },
];

function useDaysLeft(endDate: string): number {
  const end = new Date(endDate + 'T23:59:59Z').getTime();
  const now = Date.now();
  const diff = Math.ceil((end - now) / 86400000);
  return Math.max(0, diff);
}

export function HomePage() {
  const { stats: devpost } = useDevpostStats();
  const { stats: countryStats } = useCountryStats();
  const liveStats = devpost ?? DEVPOST_FALLBACK;
  const { countries, totals } = countryStats;
  const daysLeft = useDaysLeft(liveStats.endDate);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* HERO — DriftWall background + ParticleText title */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <DriftWall items={galleryItems} columns={6} tileWidth={220} tileHeight={150} gap={14} speed={28} tilt={10} turn={-8} parallax={0.4} fade={0.72} dim={0.58} grayscale={false} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#060010]/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_50%_42%,rgba(139,92,246,0.18),transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="truncate text-[10px] uppercase tracking-[0.16em] text-white/90 sm:text-[11px] sm:tracking-[0.18em]">{liveStats.dateRange} · Virtual · Worldwide</span>
          </motion.div>

          <div className="mt-3 w-full sm:mt-4">
            <ParticleHero text="Let's change the world, together." align="left" />
          </div>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }} className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
            <span className="font-medium text-white">The largest virtual high school hackathon.</span> Three weeks, six tracks — ship something real with builders from {totals.countries}+ countries.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32 }} className="mt-6 grid w-full max-w-3xl gap-3 sm:mt-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-widest text-white/60">Participants</div>
              <div className="mt-2 font-display text-2xl text-white"><CountUp to={liveStats.participants} reserve={DEVPOST_FALLBACK.participants} /></div>
              <div className="mt-1 text-xs text-white/50">{liveStats.participants > 1502 ? 'Largest high-school hackathon' : `${(1503 - liveStats.participants).toLocaleString()} to record`}</div>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary p-4 shadow-[0_8px_30px_rgba(139,92,246,0.4)] backdrop-blur-xl">
              <div className="text-xs uppercase tracking-widest text-white/80">Prize pool</div>
              <div className="mt-2 flex flex-wrap items-baseline gap-1 font-display text-2xl text-white"><CountUp to={liveStats.prizes} reserve={DEVPOST_FALLBACK.prizes} prefix="$" suffix="+" /><span className="text-sm font-sans font-medium opacity-80">valuation</span></div>
              <div className="mt-1 text-xs text-white/80">$800 cash · 6 internships · credits</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-widest text-white/60">{liveStats.days} days</div>
              <div className="mt-2 font-display text-lg leading-none text-white">{liveStats.dateRange}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-white/60"><Clock className="h-3 w-3" /> {daysLeft} days left · {liveStats.tracks} tracks</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.35)] transition-all hover:bg-accent sm:w-auto">
              Join Discord <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={DEVPOST_URL} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md hover:bg-white/15 sm:w-auto">
              View Devpost <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/about" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-6 py-3.5 text-sm text-white/80 backdrop-blur hover:bg-black/30 sm:ml-1 sm:w-auto">
              Explore tracks
            </Link>
          </motion.div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent sm:h-20" />
      </section>

      {/* SPONSOR CAROUSEL — right under hero, bigger */}
      <section className="border-y border-border bg-muted/20 py-6 sm:py-7">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">Backed by 25 partners — and more to come</span>
            <Link to="/sponsors" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">All sponsors <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
        <div className="mt-4">
          <LogoLoop logos={sponsorLogos as any} speed={75} gap={52} logoHeight={40} fadeOut fadeOutColor="var(--background)" hoverSpeed={0} />
        </div>
      </section>

      {/* ACCORDION GALLERY */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <h2 className="mt-4 font-display text-2xl tracking-tight md:text-3xl">Workshops, opening, socials</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">The moments — hover or tap to expand</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-sm">
          <AccordionGallery items={heroAccordion} accentColor="#8b5cf6" height={380} gap={8} radius={14} expandRatio={0.5} />
        </div>
      </section>

      {/* PRIZE SPOTLIGHT — emphasized */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/15 via-card to-card p-6 shadow-sm sm:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">Prize spotlight</div>
              <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">Not just stickers — <span className="text-primary">real stakes</span></h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">$800 cash split across 6 tracks, 6 Learner Labs internships, plus Render, Wolfram, Featherless credits worth thousands.</p>
            </div>
            <div className="grid w-full max-w-sm grid-cols-3 gap-3">
              <div className="rounded-2xl bg-primary p-4 text-center text-white shadow-lg">
                <div className="font-display text-2xl">$800</div>
                <div className="mt-1 text-xs uppercase tracking-widest opacity-80">cash</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 text-center">
                <div className="font-display text-2xl">6</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">internships</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 text-center">
                <div className="font-display text-xl">$1.3M+</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">value</div>
              </div>
            </div>
          </div>
          <Link to="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">See full breakdown <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* OVERVIEW — 2 cards only */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <BorderGlow borderRadius={20} className="h-full">
            <div className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Calendar className="h-5 w-5" /></div>
              <h3 className="mt-5 text-lg font-medium">Dates & Deadlines</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{liveStats.dateRange} — 23 days, fully virtual. Submissions close Aug 24, 11:59pm local.</p>
              <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
                <div className="flex justify-between"><span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5" />Days left</span><span className="font-medium text-primary">{daysLeft}</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />Format</span><span className="font-medium">Virtual · Global</span></div>
              </div>
            </div>
          </BorderGlow>
          <BorderGlow borderRadius={20} className="h-full">
            <div className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Layers className="h-5 w-5" /></div>
              <h3 className="mt-5 text-lg font-medium">Six tracks, one mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Ideathon, ML & Prompt, Software, Datathon, Embedded, App Dev — pick one, go deep.</p>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5">
                {['Ideathon','ML','Software','Datathon','Embedded','App'].map(t=>(
                  <span key={t} className="rounded-full border border-border bg-muted/50 px-2 py-1.5 text-center text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* IMPACT MAP */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <h2 className="mt-4 font-display text-2xl md:text-3xl">{totals.countries} countries, one hackathon</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{totals.registrants.toLocaleString('en-US')} registrations · {totals.submitters.toLocaleString('en-US')} projects</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-1 shadow-sm">
          <WorldMap countries={countries} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>{totals.countries} countries · Live from Devpost</span>
          <Link to="/about" className="inline-flex items-center gap-1 text-primary">Learn more <ArrowUpRight className="h-3 w-3" /></Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.12),transparent_60%)]" />
          <p className="eyebrow text-primary">Applications open</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">Ready to build <span className="text-primary">the future?</span></h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Three weeks. Six tracks. A community that ships together.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={DEVPOST_URL} target="_blank" rel="noreferrer" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-accent sm:w-auto">Register on Devpost <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></a>
            <Link to="/about" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm hover:bg-muted sm:w-auto">Learn more <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
