import { motion } from 'motion/react';
import { Cpu, Trophy, Banknote, Blocks, Briefcase, Camera, Crown, FlaskConical, Globe, Layers, LineChart, Server, ArrowRight, Zap, Target, Sparkles } from 'lucide-react';
import MagicBento from '../components/MagicBento';
import AccordionGallery from '../components/AccordionGallery';
import ParticleText from '../components/ParticleText';
import { Link } from 'react-router';

const trackCards = [
  { label: 'Ideathon', title: 'Ideathon', description: 'Validate and plan ambitious ideas into actionable projects.', color: '#0a0614' },
  { label: 'ML & Prompt', title: 'ML & Prompt Eng', description: 'Build AI workflows with ChatGPT, Claude, Gemini.', color: '#0f0a1e' },
  { label: 'Software', title: 'Software Dev', description: 'Platforms and tools solving real-world problems.', color: '#12051f' },
  { label: 'Datathon', title: 'Datathon', description: 'ML & data science for real insights.', color: '#0a0614' },
  { label: 'Embedded', title: 'Embedded Systems', description: 'PCB, ECAD and embedded computing.', color: '#0f0a1e' },
  { label: 'App Dev', title: 'App Development', description: 'iOS & Android accessible experiences.', color: '#12051f' },
];

const reasonCards = [
  { label: 'Learn', title: 'Learn & Build', description: 'Pitch an idea or join a team you love.', color: '#0a0614' },
  { label: 'Connect', title: 'Connect', description: 'Friendships that outlast the event.', color: '#0f0a1e' },
  { label: 'Compete', title: 'Compete', description: 'Cash, internships, recognition.', color: '#12051f' },
  { label: 'Innovate', title: 'Innovate', description: 'Push ideas further than before.', color: '#0a0614' },
  { label: 'Community', title: 'Community First', description: 'A playground, not just a contest.', color: '#0f0a1e' },
  { label: 'Welcome', title: 'Ideas Welcome', description: 'Beginner or expert, you belong.', color: '#12051f' },
];

const gallery = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Ideation' },
  { image: 'https://picsum.photos/id/1025/900/1200', label: 'Build' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Mentor' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Team' },
  { image: 'https://picsum.photos/id/1062/900/1200', label: 'Ship' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Premium hero — centered, not misaligned */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.12),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">

                        <div className="h-[180px] w-full sm:h-[220px]">
              <ParticleText text="Where every builder belongs" particleSize={1.4} density={2} color="#ffffff" highlightColor="#8b5cf6" scatter={14} gatherDuration={1000} stagger={30} pointerRepel={20} repelRadius={80} idleDrift={0.15} trigger="mount" fontSize="clamp(2.2rem, 6vw, 4.2rem)" fontWeight={800} glow />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Virtual, three weeks, worldwide — whether you ship hardware, AI, apps, or ideas, you have a place to build. Not a pressure cooker — a creative playground.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-accent">Contact us <ArrowRight className="h-4 w-4" /></Link>
              <a href="https://reverie-hacks-2026.devpost.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border-0 bg-transparent px-6 py-3 text-sm hover:bg-muted">View Devpost <ArrowRight className="h-3.5 w-3.5" /></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto mt-12 max-w-2xl rounded-2xl border-0 bg-transparent/50 p-6 text-center backdrop-blur sm:p-8">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              What if a hackathon felt like a creative playground, not a pressure cooker? For three weeks, builders from <span className="font-semibold text-foreground">82 countries</span> create things they actually care about — guided by mentors from industry, not just judged by them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracks — MagicBento wider, no container border */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <p className="eyebrow mt-3 flex items-center justify-center gap-2 text-primary"><Target className="h-4 w-4" /> Tracks</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Six ways to build</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">Pick one, go deep. All tracks judged equally — from ideation to embedded.</p>
        </div>
        {/* Wider bento, no border container */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-[72rem]">
            <MagicBento cards={trackCards} textAutoHide={false} enableStars enableSpotlight enableBorderGlow enableTilt enableMagnetism clickEffect glowColor="132, 0, 255" spotlightRadius={280} particleCount={10} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow flex items-center justify-center gap-2 text-primary"><Zap className="h-4 w-4" /> Moments</p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl">Inside the build</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Your workshops, socials, opening ceremony — drop images in <code className="rounded bg-muted px-1.5 py-0.5 text-xs">public/gallery</code></p>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border-0 bg-transparent p-1.5">
          <AccordionGallery items={gallery} accentColor="#8b5cf6" height={420} />
        </div>
      </section>

      {/* Prizes — less overwhelming, grouped */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <p className="eyebrow mt-3 flex items-center justify-center gap-2 text-primary"><Trophy className="h-4 w-4" /> Prizes</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">What you can win</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">Cash, internships, and tools you’ll actually use — not swag filler.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-primary/20 bg-primary p-6 text-white shadow-lg">
            <Banknote className="h-6 w-6 opacity-90" />
            <h3 className="mt-4 font-display text-xl">$800 cash</h3>
            <p className="mt-2 text-sm opacity-80">Split across first & second in all six tracks. Real money, not credits.</p>
          </div>
          <div className="rounded-2xl border-0 bg-transparent p-6">
            <Briefcase className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">6 internships</h3>
            <p className="mt-2 text-sm text-muted-foreground">Learner Labs — ML & Ideathon winners ship with a startup.</p>
          </div>
          <div className="rounded-2xl border-0 bg-transparent p-6">
            <Layers className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">$10k+ in credits</h3>
            <p className="mt-2 text-sm text-muted-foreground">Render, Featherless, Wolfram, Formaloo, Protoflow & more.</p>
          </div>
        </div>

        <details className="group mt-6 rounded-2xl border-0 bg-transparent">
          <summary className="flex cursor-pointer list-none items-center justify-between p-6">
            <span className="font-medium">See all perks & credits (11 items)</span>
            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs group-open:hidden">Show</span>
            <span className="hidden rounded-full bg-primary px-3 py-1 text-xs text-white group-open:inline">Hide</span>
          </summary>
          <div className="grid gap-3 border-t border-border p-6 sm:grid-cols-2">
            {[
              ['Wolfram|One','1 month'],['Featherless.AI','1 month'],['Render','build credits'],['Protoflow','500 credits'],
              ['Devswarm Pro','1 mo / 1 yr winners'],['Mobbin Pro','3 mo / 1 yr'],['Momen','$100 each'],['YouCam API','500 credits'],
              ['Tin Computer','$299'],['Firecrawl','10k credits'],['CleanShot X','18 licenses'],['.xyz domains','36 free'],
            ].map(([k,v])=>(
              <div key={k} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
                <span className="text-sm font-medium">{k}</span>
                <span className="text-xs text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </details>
      </section>

      {/* Why join — simple premium grid, not bento */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl">More than a hackathon</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Community first — learn, connect, compete, innovate.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border-0 bg-transparent p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c-4-2-7-5-7-9 0-3 2-6 7-9 5 3 7 6 7 9 0 4-3 7-7 9z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div>
            <h3 className="mt-4 font-medium">Community First</h3>
            <p className="mt-2 text-sm text-muted-foreground">A playground, not a pressure cooker. 82 countries, one Discord.</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary p-6 text-center text-white shadow-md">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
            <h3 className="mt-4 font-medium">Ship Real</h3>
            <p className="mt-2 text-sm opacity-80">Mentors from industry, not just judges. Build what matters.</p>
          </div>
          <div className="rounded-2xl border-0 bg-transparent p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/><path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><path d="M6 9a6 6 0 0 0 12 0"/><path d="M12 15v3"/><path d="M8 19h8"/></svg></div>
            <h3 className="mt-4 font-medium">Win & Learn</h3>
            <p className="mt-2 text-sm text-muted-foreground">Cash, internships, and skills that outlast the event.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
