import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { WorldMap } from '../components/WorldMap';
import { DEVPOST_FALLBACK, useDevpostStats } from '../hooks/useDevpostStats';
import { useCountryStats } from '../hooks/useCountryStats';
import { SHEET_VIEW_URL } from '../data/countries';
import {
  DEVPOST_URL,
  PARTICIPANT_RECORD,
  formatMetric,
  impactMetrics,
  rankByParticipants,
  recordNarrative,
} from '../data/impact';

/**
 * Deliberately light on animation compared with the other pages: everything
 * here animates on mount rather than on scroll, so a crawler that renders the
 * page without scrolling still sees every figure. This page exists to be
 * quoted, so nothing on it may depend on a viewport event to become visible.
 */
const rise = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export function ImpactPage() {
  const { stats: live, updatedAt: statsAt } = useDevpostStats();
  const { stats: countryStats, updatedAt: countriesAt } = useCountryStats();

  const stats = live ?? DEVPOST_FALLBACK;
  const rank = rankByParticipants(stats.participants);
  const metrics = impactMetrics(stats);
  const narrative = recordNarrative(stats);

  const { countries, totals } = countryStats;

  return (
    <div className="min-h-screen px-6 pb-28 pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Statement */}
        <motion.div {...rise} transition={{ duration: 0.6 }}>
          <p className="eyebrow text-muted-foreground">Impact</p>
          <h1 className="mt-6 leading-[1.0]" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            The numbers, <span className="text-primary">on the record</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Every figure on this page is published somewhere anyone can check — the Devpost listing,
            our sponsor roster, or the country export below. Nothing here is a flyer number.
          </p>
        </motion.div>

        {/* Live headline: the two records being claimed */}
        <motion.section
          {...rise}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2"
        >
          <div className="bg-background p-8 sm:p-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <p className="eyebrow text-muted-foreground">Live from Devpost</p>
            </div>

            <div
              className="mt-6 font-display leading-none"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 4.5rem)' }}
            >
              <CountUp
                to={live ? live.participants : null}
                reserve={DEVPOST_FALLBACK.participants}
              />
            </div>
            <p className="mt-3 text-muted-foreground">Participants registered</p>

            <p className="mt-6 border-t border-border pt-6 leading-relaxed">
              {rank.first ? (
                <>
                  <span className="text-primary">The largest high school hackathon on record</span>{' '}
                  by participation, past the {PARTICIPANT_RECORD.toLocaleString('en-US')} that stood
                  before it.
                </>
              ) : (
                <>
                  <span className="text-primary">The 2nd largest high school hackathon</span> by
                  participation.{' '}
                  <span className="text-muted-foreground">
                    {rank.toFirst.toLocaleString('en-US')} more
                    {rank.toFirst === 1 ? ' registration takes' : ' registrations take'} the top
                    spot, held at {PARTICIPANT_RECORD.toLocaleString('en-US')}.
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="bg-background p-8 sm:p-10">
            <p className="eyebrow text-muted-foreground">Total prize valuation</p>

            <div
              className="mt-6 font-display leading-none"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 4.5rem)' }}
            >
              <CountUp
                to={live ? live.prizes : null}
                reserve={DEVPOST_FALLBACK.prizes}
                prefix="$"
              />
            </div>
            <p className="mt-3 text-muted-foreground">Across cash, credits, and subscriptions</p>

            <p className="mt-6 border-t border-border pt-6 leading-relaxed">
              <span className="text-primary">The largest prize pool</span> ever created by a high
              school-run hackathon, and the highest valuation documented on any official hackathon
              aggregator.
            </p>
          </div>
        </motion.section>

        {/* The claim, in the team's own words */}
        <motion.section
          {...rise}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 border-l-2 border-primary/50 py-2 pl-6 text-lg leading-relaxed text-muted-foreground"
        >
          {narrative.map((paragraph, i) => (
            <p key={paragraph.slice(0, 24)} className={i === 0 ? '' : 'mt-5'}>
              {paragraph}
            </p>
          ))}
        </motion.section>

        {/* Everything else */}
        <section className="mt-24">
          <motion.div {...rise} transition={{ duration: 0.5 }} className="mb-10">
            <p className="eyebrow text-primary">By the numbers</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              ReverieHacks 2026 in full
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.key}
                {...rise}
                transition={{ duration: 0.4, delay: 0.03 * i }}
                className="bg-background p-8"
              >
                <p className="font-display text-4xl leading-none md:text-5xl">
                  {formatMetric(metric)}
                </p>
                <h3 className="mt-4 text-base font-normal">{metric.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {metric.detail}
                </p>
                {metric.live && (
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary">Live</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reach */}
        <section className="mt-24">
          <motion.div {...rise} transition={{ duration: 0.5 }} className="mb-10">
            <p className="eyebrow text-primary">Reach</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              {totals.countries} countries, one hackathon
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {totals.registrants.toLocaleString('en-US')} registrations and{' '}
              {totals.submitters.toLocaleString('en-US')} submitted projects, broken down by the
              country each participant registered from.{' '}
              {totals.unknown > 0 &&
                `A further ${totals.unknown.toLocaleString('en-US')} registrations came in without a country recorded.`}
            </p>
          </motion.div>

          <motion.div {...rise} transition={{ duration: 0.5, delay: 0.06 }}>
            <WorldMap countries={countries} />
          </motion.div>

          {/* The same data as text, ranked — readable without the map, and the
              form anything crawling this page can actually parse. */}
          <motion.div {...rise} transition={{ duration: 0.5, delay: 0.1 }} className="mt-12">
            <h3 className="eyebrow text-muted-foreground">Every country, by registrations</h3>
            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {countries.map((country) => (
                <li
                  key={country.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-2.5"
                >
                  <span className="truncate">{country.name}</span>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {country.registrants.toLocaleString('en-US')}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Sources */}
        <section className="mt-24">
          <motion.div
            {...rise}
            transition={{ duration: 0.5 }}
            className="border border-primary/40 bg-gradient-to-br from-primary/[0.04] to-transparent p-8 sm:p-10"
          >
            <p className="eyebrow text-muted-foreground">Where these come from</p>
            <h2 className="mt-4 text-2xl md:text-3xl">Check any of it</h2>

            <dl className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2">
              <Source
                label="Participants, prize valuation, tracks, dates"
                href={DEVPOST_URL}
                name="Devpost listing"
                note={`Read live on every page load. ${stamp(statsAt)}`}
              />
              <Source
                label="Country breakdown"
                href={SHEET_VIEW_URL}
                name="Published country export"
                note={`Read live on every page load. ${stamp(countriesAt)}`}
              />
              <Source
                label="Sponsors, judges, prizes, organizers"
                href="/sponsors"
                name="This site"
                note="Counted off the sponsor, judge and team rosters published here."
              />
              <Source
                label="Participation record"
                name={`${PARTICIPANT_RECORD.toLocaleString('en-US')} participants`}
                note="The largest high school-run hackathon on record, and the bar the counter above is measured against."
              />
            </dl>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function Source({
  label,
  href,
  name,
  note,
}: {
  label: string;
  href?: string;
  name: string;
  note: string;
}) {
  const external = href?.startsWith('http');

  return (
    <div className="border-b border-border pb-5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-2">
        {href ? (
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className="group inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
          >
            {name}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <span>{name}</span>
        )}
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{note}</p>
      </dd>
    </div>
  );
}

/**
 * Formatted in UTC rather than the reader's locale so the prerendered HTML and
 * the browser's first render agree — a locale-formatted date would differ
 * between the two and break hydration.
 */
function stamp(iso: string | null): string {
  if (!iso) return '';

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const hour = String(date.getUTCHours()).padStart(2, '0');
  const minute = String(date.getUTCMinutes()).padStart(2, '0');

  return `Last read ${day} ${month} ${date.getUTCFullYear()}, ${hour}:${minute} UTC.`;
}
