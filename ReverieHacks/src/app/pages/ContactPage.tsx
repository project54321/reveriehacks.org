import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, AtSign, FileText, Mail, MessageSquare, Sparkles } from 'lucide-react';
import BorderGlow from '../components/BorderGlow';
import ParticleText from '../components/ParticleText';

const CONTACT_EMAIL = 'info@reveriehacks.org';

interface Channel {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const channels: Channel[] = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: MessageSquare,
    label: 'Discord',
    value: 'discord.gg/gDQGYSQKrH',
    href: 'https://discord.gg/gDQGYSQKrH',
  },
  {
    icon: AtSign,
    label: 'Instagram',
    value: '@reveriehacks',
    href: 'https://www.instagram.com/reveriehacks',
  },
];

interface Packet {
  audience: string;
  blurb: string;
  file: string;
}

const packets: Packet[] = [
  {
    audience: 'Companies',
    blurb: 'Tiers from $1,000, workshop slots, and what sponsorship puts in front of participants.',
    file: '/packets/reveriehacks-company-packet.pdf',
  },
  {
    audience: 'FTC teams & orgs',
    blurb: 'Same prospectus at team scale, with tiers from $200.',
    file: '/packets/reveriehacks-team-packet.pdf',
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen px-6 pb-28 pt-36">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                      <div className="h-[140px] w-full sm:h-[180px]">
              <ParticleText text="Contact us" particleSize={1.2} density={1.8} color="#ffffff" highlightColor="#8b5cf6" scatter={12} gatherDuration={900} stagger={20} pointerRepel={18} repelRadius={70} idleDrift={0.12} trigger="mount" fontSize="clamp(2.2rem, 6vw, 4rem)" fontWeight={800} glow />
            </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Whether you're a potential sponsor, judge, mentor, or participant with a question — we'd love to hear from you.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}>
            <BorderGlow borderRadius={20} colors={['#7c3aed','#8b5cf6','#1a0a2e']} backgroundColor="#0f0a1e" glowColor="270 90 65">
              <div className="p-0">
                <ContactForm />
              </div>
            </BorderGlow>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col gap-6">
            {/* Contact info */}
            <BorderGlow borderRadius={18} colors={['#8b5cf6','#6d28d9','#1a0a2e']} backgroundColor="#0f0a1e" glowColor="272 90 70">
              <div className="p-6">
                <h2 className="eyebrow flex items-center gap-2 text-muted-foreground"><Mail className="h-3.5 w-3.5 text-primary"/> Contact information</h2>
                <div className="mt-5 grid gap-3">
                  {channels.map((channel) => {
                    const external = channel.href.startsWith('http');
                    return (
                      <a
                        key={channel.label}
                        href={channel.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-primary/40 hover:bg-primary/10"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                          <channel.icon className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{channel.label}</p>
                          <p className="mt-0.5 break-words text-sm font-medium">{channel.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </BorderGlow>

            {/* Sponsoring */}
            <BorderGlow borderRadius={18} colors={['#7c3aed','#8b5cf6','#1a0a2e']} backgroundColor="#0f0a1e" glowColor="270 95 65" className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-medium">Interested in sponsoring?</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  ReverieHacks runs on sponsors who put tools and prizes in students' hands. Take the packet that fits.
                </p>

                <div className="mt-6 grid gap-3">
                  {packets.map((packet) => (
                    <a
                      key={packet.file}
                      href={packet.file}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-primary/40 hover:bg-primary/10"
                    >
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{packet.audience}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{packet.blurb}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">Open packet <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" /></span>
                      </div>
                    </a>
                  ))}
                </div>

                <Link to="/sponsors" className="group mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  See who already sponsors us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </BorderGlow>

            <BorderGlow borderRadius={18} colors={['#4c1d95','#7c3aed','#1a0a2e']} backgroundColor="#0f0a1e" glowColor="268 85 70">
              <div className="p-6">
                <h2 className="text-lg font-medium">New here?</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">What ReverieHacks is, who runs it, and the numbers behind the last one.</p>
                <Link to="/about" className="group mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  Learn about ReverieHacks <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </BorderGlow>
          </motion.aside>
        </div>

        <p className="mt-20 border-t border-white/10 pt-8 text-sm text-muted-foreground">&copy; 2026 ReverieHacks. All rights reserved.</p>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const details = [
      `From: ${name}`,
      `Reply to: ${email}`,
      organization && `Organization: ${organization}`,
    ].filter(Boolean);
    const body = `${message}\n\n—\n${details.join('\n')}`;
    const subject = name ? `ReverieHacks — message from ${name}` : 'ReverieHacks — message';
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={submit} className="p-7 sm:p-8">
      <h3 className="text-lg font-medium">Send a message</h3>
      <p className="mt-1 text-sm text-muted-foreground">Opens your email app — no data stored on our servers.</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required>
          <input id="contact-name" name="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={FIELD} />
        </Field>
        <Field label="Email" htmlFor="contact-email" required>
          <input id="contact-email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={FIELD} />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Organization" htmlFor="contact-org">
          <input id="contact-org" name="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Company, school, or team (optional)" className={FIELD} />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Message" htmlFor="contact-message" required>
          <textarea id="contact-message" name="message" required rows={7} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us how you'd like to work together, or ask us anything..." className={`${FIELD} resize-y`} />
        </Field>
      </div>

      <button type="submit" className="mt-8 w-full rounded-xl bg-primary px-7 py-4 font-medium text-primary-foreground transition-colors hover:bg-accent">
        Send message
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">Opens your email app with the message ready to send to {CONTACT_EMAIL}.</p>
    </form>
  );
}

const FIELD =
  'mt-2.5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ' +
  'transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:bg-black/50';

function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}
