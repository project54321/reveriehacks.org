import { motion } from 'motion/react';
import {
  Banknote,
  Briefcase,
  Crown,
  Cpu,
  FlaskConical,
  Globe,
  Layers,
  LineChart,
  Server,
} from 'lucide-react';

const prizes = [
  { icon: Banknote, title: '$800 in cash', body: 'Split across first and second place in all six tracks.' },
  { icon: Briefcase, title: '6 internships', body: 'At Learner Labs, an emerging AI startup, for the ML and Ideathon tracks.' },
  { icon: Server, title: '$900 in Render credits', body: 'Build credits for the top three of the software development track.' },
  { icon: Cpu, title: '$300 in Featherless credits', body: 'API access to every major LLM, from Featherless.AI.' },
  { icon: Crown, title: '3 Code Crafters memberships', body: 'Up to two years of VIP access for the software development track.' },
  { icon: Globe, title: '36 .xyz domains', body: 'A year of free domains for the top three of every track.' },
  { icon: FlaskConical, title: '20% off RISE Research', body: 'A discount on the RISE Research program for every track winner.' },
  { icon: LineChart, title: '$500 in Formaloo credits', body: 'For the top two of the Datathon, plus a mentoring session with the CEO.' },
  { icon: Layers, title: 'A year of Protoflow Pro', body: 'For the top three projects overall.' },
];

const perks = [
  { name: 'Wolfram|One', detail: '1 month, free' },
  { name: 'Featherless.AI', detail: '1 month subscription' },
  { name: 'Render', detail: '1 month of build credits' },
  { name: 'Protoflow', detail: '500 credits' },
  { name: 'Devswarm Pro', detail: '1 month — a full year for first-place teams' },
  { name: 'YouCam Pro API', detail: '500 API credits, first 700 to redeem' },
  { name: 'Tin Computer', detail: '$299 in growth credits, first 100 teams' },
  { name: 'Firecrawl', detail: '10,000 credits for every hacker' },
  { name: 'Certificate', detail: 'Proof you shipped something' },
];

export function PrizesPage() {
  return (
    <div className="min-h-screen px-6 pb-28 pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-muted-foreground">Prizes</p>
          <h1 className="mt-6 leading-[1.0]" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            What you can <span className="text-primary">win</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            This year&apos;s pool, backed by our sponsors and partner teams.
          </p>
        </motion.div>

        {/* Prizes */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="eyebrow text-primary">Prize Pool</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Everything on the table
            </h2>
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
          </div>
        </section>

        {/* Everyone who takes part */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="border border-primary/40 bg-gradient-to-br from-primary/[0.04] to-transparent p-8 sm:p-10"
          >
            <p className="eyebrow text-muted-foreground">Everyone who takes part</p>
            <dl className="mt-6 grid gap-x-12 sm:grid-cols-2">
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-4"
                >
                  <dt>{perk.name}</dt>
                  <dd className="text-right text-sm text-muted-foreground">{perk.detail}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
