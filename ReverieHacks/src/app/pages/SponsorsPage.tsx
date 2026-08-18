import { useEffect, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleHero } from '../components/ParticleHero';

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
  light?: boolean;
  invertOnLight?: boolean;
}

const companySponsors: Sponsor[] = [
  { id: 'featherless', name: 'Featherless', tier: 'Compute Partner', logo: '/sponsorLogos/fM.svg', fit: 'cover', url: 'https://featherless.ai', description: 'Seamless inference APIs, with $300 in credits for the ML Prompt Engineering winner plus a month of subscription for every participant.' },
  { id: 'xyz', name: 'XYZ', tier: 'Domains Partner', logo: '/sponsorLogos/xyz.png', fit: 'contain', url: 'https://gen.xyz', description: 'Domains for every project, with free .xyz domains for everyone who places.' },
  { id: 'protoflow', name: 'Protoflow', tier: 'Prototyping Partner', logo: '/sponsorLogos/protoflow.svg', fit: 'contain', invertOnLight: true, url: 'https://protoflow.ai', description: 'Hardware prototyping for makers, with a year of Protoflow Pro for the top three projects overall and 500 credits for every participant.' },
  { id: 'render', name: 'Render', tier: 'Cloud Partner', logo: '/sponsorLogos/render.png', fit: 'contain', light: true, url: 'https://render.com', description: '$50 in building credits for general attendees, plus up to $500 for Best Use of Render track winners.' },
  { id: 'tin-computer', name: 'Tin Computer', tier: 'Growth Partner', logo: '/sponsorLogos/tin.png', fit: 'contain', light: true, url: 'https://tincomputer.com', description: '$299 in credits (one month of Growth plan) for up to 100 eligible development teams.' },
  { id: 'codecrafters', name: 'Code Crafters', tier: 'Learning Partner', logo: '/sponsorLogos/cc.svg', fit: 'contain', light: true, url: 'https://codecrafters.io', description: 'Hands-on programming challenges, with VIP memberships for the Software Development podium: 2 years ($720) for 1st, 1 year ($360) for 2nd, and 6 months for 3rd.' },
  { id: 'wolfram', name: 'Wolfram', tier: 'Technology Partner', logo: '/sponsorLogos/wolfram.png', fit: 'cover', url: 'https://www.wolfram.com', description: 'Computational access for the next generation of innovators, via Wolfram|One.' },
  { id: 'devswarm', name: 'DevSwarm', tier: 'Agents Partner', logo: '/sponsorLogos/devswarm.png', fit: 'contain', light: true, url: 'https://devswarm.ai', description: 'Parallel AI coding agents across isolated Git branches, with a month of DevSwarm Pro for every participant and a full year for the winners.' },
  { id: 'rise-research', name: 'RISE Research', tier: 'Research Partner', logo: '/sponsorLogos/rise.png', fit: 'contain', light: true, url: 'https://riseglobaleducation.com', description: 'Research mentorship with PhD mentors, including 20% off the RISE Research program for the winning track.' },
  { id: 'formaloo', name: 'Formaloo', tier: 'No-Code Partner', logo: '/sponsorLogos/formaloo.png', fit: 'cover', url: 'https://formaloo.com', description: 'No-code forms, surveys, and data apps for collecting and acting on submissions.' },
  { id: 'perfect-corp', name: 'Perfect Corp', tier: 'Beauty AI Partner', logo: '/sponsorLogos/youcam.png', fit: 'cover', url: 'https://www.perfectcorp.com/business', description: 'The YouCam Pro API for AI skin analysis and virtual try-on, with 500 free API credits for the first 700 participants to redeem.' },
  { id: 'firecrawl', name: 'Firecrawl', tier: 'Web Scraping Partner', logo: '/sponsorLogos/Firecrawl.png', fit: 'cover', url: 'https://www.firecrawl.dev', description: 'Turn websites into LLM-ready data, with 10,000 credits for every hacker.' },
  { id: 'cleanshot', name: 'CleanShot X', tier: 'Screen Capture Partner', logo: '/sponsorLogos/CleanShot.png', fit: 'contain', light: true, url: 'https://cleanshot.com', description: 'Screenshot and screen recording built for Mac, with 18 licenses for the top three of every track.' },
  { id: 'mobbin', name: 'Mobbin', tier: 'Design Partner', logo: '/sponsorLogos/mobbin.png', fit: 'contain', light: true, url: 'https://mobbin.com', description: 'A searchable library of real mobile and web app design patterns and flows, with a 3-month Mobbin Pro subscription free for all participants and 1-year Mobbin Pro free for winners.' },
  { id: 'learner-labs', name: 'Learner Labs', tier: 'Internship Partner', logo: '/sponsorLogos/ll.png', fit: 'cover', url: 'https://learnerlabs.app', description: 'An emerging AI startup, offering six internships across the ML Prompt Engineering and Ideathon tracks.' },
  { id: 'momen', name: 'Momen', tier: 'App Building Partner', logo: '/sponsorLogos/momen.png', fit: 'contain', url: 'https://momen.app', description: 'A no-code platform for building full-stack web apps, with $100 in credits for every participant and $2,000 for each Software Development track winner.' },
  { id: 'somba', name: 'Somba', tier: 'Dev Partner', logo: '/sponsorLogos/somba.png', fit: 'contain', light: true, url: 'https://somba.dev', description: 'A private network for ambitious teenagers to find collaborators and build together in private, goal-driven working rooms called Nets.' },
];

interface TeamSponsor { name: string; tier: 'diamond' | 'main' | 'gold' | 'silver' | 'bronze'; logo?: string; fit?: 'cover' | 'contain'; light?: boolean; monogram?: string; url?: string; wide?: boolean; bare?: boolean; number?: string; }
const teamSponsors: TeamSponsor[] = [
  { name: 'Spectre', tier: 'diamond', logo: '/sponsorLogos/spectre.png', fit: 'contain', bare: true, number: '36363' },
  { name: 'Learner Labs', tier: 'gold', logo: '/sponsorLogos/ll.png', url: 'https://learnerlabs.app' },
  { name: 'Banana Bots', tier: 'silver', logo: '/sponsorLogos/bananabots.png', fit: 'cover', number: '30358' },
  { name: 'Cosmobotics', tier: 'silver', logo: '/sponsorLogos/cosmo.png', number: '23361' },
  { name: 'ViperBots Recoil', tier: 'silver', logo: '/sponsorLogos/recoil.png', fit: 'cover', light: true, number: '16311' },
  { name: 'Eclipse', tier: 'bronze', logo: '/sponsorLogos/eclipse.png', fit: 'cover', number: '12670' },
  { name: 'Luminary', tier: 'bronze', logo: '/sponsorLogos/LuminaryRobotics.png', fit: 'contain', light: true, wide: true, url: 'https://luminaryrobotics.org', number: '36633' },
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
  if (team.bare && team.logo) {
    const img = (<img src={team.logo} alt={`${team.name} logo`} className={`shrink-0 object-contain ${size}`} />);
    return team.url ? (<a href={team.url} target="_blank" rel="noreferrer" title={team.name}>{img}</a>) : (img);
  }
  const inner = team.logo ? (<img src={team.logo} alt={`${team.name} logo`} className={`h-full w-full ${team.fit === 'contain' ? 'object-contain p-1' : 'object-cover'}`} />) : (<span className="font-display text-lg text-muted-foreground">{team.monogram}</span>);
  const cls = `flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border ${size} ${team.light ? 'bg-white' : 'bg-card'} ${team.url ? 'transition-colors hover:border-primary/50' : ''}`;
  return team.url ? (<a href={team.url} target="_blank" rel="noreferrer" className={cls} title={team.name}>{inner}</a>) : (<div className={cls} title={team.name}>{inner}</div>);
}
const HEX_RATIO = 1.1547;
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
const HEX_POINTS = '50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87';
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
function honeycombRows<T>(items: T[], max: number): T[][] {
  const rowCount = Math.max(1, Math.ceil(items.length / max));
  const sizes = Array.from({ length: rowCount }, () => Math.floor(items.length / rowCount));
  const middleOut = [...sizes.keys()].sort((a, b) => { const mid = (rowCount - 1) / 2; return Math.abs(a - mid) - Math.abs(b - mid) || a - b; });
  for (let i = 0; i < items.length % rowCount; i++) sizes[middleOut[i]] += 1;
  const rows: T[][] = [];
  let cut = 0;
  for (const size of sizes) { rows.push(items.slice(cut, cut + size)); cut += size; }
  return rows;
}
function rowOffsets(rows: unknown[][]): number[] {
  const shifts = rows.map((row, r) => ((r % 2) - (row.length % 2 === 0 ? 1 : 0) + 2) % 2 / 2);
  const middle = (Math.min(...shifts) + Math.max(...shifts)) / 2;
  return shifts.map((shift) => shift - middle);
}
function HexLogo({ s }: { s: Sponsor }) {
  if (s.logo) {
    return (<img src={s.logo} alt={`${s.name} logo`} className={`${s.fit === 'contain' ? 'h-3/5 w-3/5 object-contain' : 'h-full w-full object-cover'} ${s.invertOnLight ? '[[data-theme=light]_&]:invert' : ''}`} />);
  }
  return (<span className="px-3 text-center font-display text-sm uppercase leading-tight tracking-wide text-foreground">{s.short ?? s.name}</span>);
}
function HexCell({ s, open, dimmed, onOpen, onClose }: { s: Sponsor; open: boolean; dimmed: boolean; onOpen: (anchor: HTMLElement) => void; onClose: () => void; }) {
  return (
    <div className="relative shrink-0" style={{ width: 'var(--hex-w)', height: 'var(--hex-h)' }}>
      <a href={s.url} target="_blank" rel="noreferrer" title={s.name} onMouseEnter={(e) => onOpen(e.currentTarget)} onMouseLeave={onClose} onFocus={(e) => onOpen(e.currentTarget)} onBlur={onClose} className="block h-full w-full transition-[transform,opacity] duration-300 focus:outline-none" style={{ transform: open ? 'scale(1.07)' : undefined, opacity: dimmed ? 0.4 : 1 }}>
        <span className={`flex h-full w-full items-center justify-center ${s.light ? 'bg-white' : 'bg-card'}`} style={{ clipPath: HEX_CLIP }}>
          <HexLogo s={s} />
        </span>
        <svg viewBox="0 0 100 115.47" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
          <polygon points={HEX_POINTS} fill="none" vectorEffect="non-scaling-stroke" stroke={open ? 'var(--primary)' : 'var(--border-strong)'} strokeWidth={open ? 1.5 : 1} className="transition-all duration-300" />
        </svg>
      </a>
    </div>
  );
}
const CARD_W = 'min(20rem, calc(100vw - 1.5rem))';
const CARD_ROOM = 240;
function SponsorCard({ s, anchor }: { s: Sponsor; anchor: HTMLElement }) {
  const [, reposition] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => { window.removeEventListener('scroll', reposition, true); window.removeEventListener('resize', reposition); };
  }, []);
  const cell = anchor.getBoundingClientRect();
  const edge = 12;
  const gap = 10;
  const below = window.innerHeight - cell.bottom - gap - edge;
  const above = cell.top - gap - edge;
  const flip = below < CARD_ROOM && above > below;
  const centre = cell.left + cell.width / 2;
  return createPortal(
    <motion.div initial={{ opacity: 0, y: flip ? 6 : -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: flip ? 6 : -6 }} transition={{ duration: 0.16, ease: 'easeOut' }} className="pointer-events-none fixed z-[70] overflow-y-auto border border-primary/50 bg-popover p-5 text-left shadow-2xl" style={{ width: CARD_W, left: `clamp(${edge}px, calc(${centre}px - ${CARD_W} / 2), calc(100vw - ${CARD_W} - ${edge}px))`, top: flip ? undefined : cell.bottom + gap, bottom: flip ? window.innerHeight - cell.top + gap : undefined, maxHeight: flip ? above : below }}>
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border ${s.light ? 'bg-white' : 'bg-card'}`}>
          {s.logo ? (<img src={s.logo} alt="" className={`h-full w-full ${s.fit === 'contain' ? 'object-contain' : 'object-cover'} ${s.invertOnLight ? '[[data-theme=light]_&]:invert' : ''}`} />) : (<span className="font-display text-[0.65rem] uppercase text-muted-foreground">{s.monogram ?? s.name.slice(0, 2)}</span>)}
        </span>
        <span>
          <span className="eyebrow block text-primary/80">{s.tier}</span>
          <span className="font-display text-lg">{s.name}</span>
        </span>
      </div>
      <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
    </motion.div>,
    document.body,
  );
}
export function SponsorsPage() {
  const [active, setActive] = useState<{ s: Sponsor; anchor: HTMLElement } | null>(null);
  const rows = honeycombRows(companySponsors, useHexPerRow());
  const offsets = rowOffsets(rows);
  return (
    <div className="min-h-screen">
      {/* Premium hero — centered, not misaligned */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
          <div className="mx-auto max-w-6xl text-center">
            <ParticleHero text="Meet the builders behind the builders" />
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
              Cloud, AI, design, hardware — the teams and companies providing the tools, credits, and prizes for 1,749 hackers.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* ParticleText divider — cool but not header */}

        {/* Team sponsors — elegant grid, not repetitive */}
        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl tracking-tight">Robotics & community</h2>
            <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:inline">9 teams</span>
          </div>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">FTC teams and community orgs who fund the fund — from $200 to Diamond.</p>
          <div className="mt-8 grid gap-4 rounded-2xl border-0 bg-transparent p-4 sm:grid-cols-2 sm:p-6">
            {tiers.map((tier) => {
              const teams = teamSponsors.filter((t) => t.tier === tier.key);
              if (!teams.length) return null;
              return (
                <div key={tier.key} className="rounded-xl border border-border bg-muted/20 p-4">
                  <span className={`eyebrow text-xs ${tier.color}`}>{tier.label}</span>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {teams.map((team) => {
                      const size = team.wide ? 'h-14 w-36' : tier.key === 'diamond' ? 'h-16 w-16' : 'h-12 w-12';
                      return (
                        <div key={team.name} className="flex items-center gap-2">
                          <TeamTile team={team} size={size} />
                          <div className="text-xs leading-tight">
                            <div className="font-medium">{team.name}</div>
                            {team.number && <div className="text-muted-foreground">#{team.number}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Honeycomb only — no carousel here */}
        <section className="mt-16">
          <h2 className="font-display text-2xl tracking-tight">In-kind partners</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">Hover any cell — the honeycomb is the whole story.</p>
          <div className="mt-10 flex flex-col items-center pb-8" style={{ '--hex-w': 'clamp(4.2rem, 13vw, 7.5rem)', '--hex-h': `calc(var(--hex-w) * ${HEX_RATIO})`, '--hex-gap': '0.5rem' } as React.CSSProperties}>
            {rows.map((row, r) => (
              <div key={r} style={{ marginTop: r === 0 ? undefined : 'calc(var(--hex-h) * -0.25 + var(--hex-gap) * 0.6)', transform: `translateX(calc((var(--hex-w) + var(--hex-gap)) * ${offsets[r]}))` }}>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4, delay: r * 0.05 }} className="flex justify-center" style={{ gap: 'var(--hex-gap)' }}>
                  {row.map((s) => (<HexCell key={s.id} s={s} open={active?.s.id === s.id} dimmed={active !== null && active.s.id !== s.id} onOpen={(anchor) => setActive({ s, anchor })} onClose={() => setActive(null)} />))}
                </motion.div>
              </div>
            ))}
          </div>
          <AnimatePresence>{active && <SponsorCard key={active.s.id} s={active.s} anchor={active.anchor} />}</AnimatePresence>
        </section>

        <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6 text-center sm:p-8">
          <h3 className="font-display text-xl">Want to support 1,700+ builders?</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">Packets for companies ($1k+) and teams ($200+) — workshop slots, logo placement, judging.</p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="/packets/reveriehacks-company-packet.pdf" target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-accent">Company packet</a>
            <a href="/packets/reveriehacks-team-packet.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-border/60 bg-transparent px-5 py-2.5 text-center text-sm hover:bg-muted">Team packet</a>
          </div>
        </div>
      </div>
    </div>
  );
}
