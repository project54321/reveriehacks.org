import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, AtSign, FileText, Mail, MessageSquare } from 'lucide-react';

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

/**
 * The two sponsorship packets, one per kind of sponsor we take. Both are the
 * same prospectus with different financial tiers — the company one starts at
 * $1,000, the team one at $200. Files live in public/packets, and open in the
 * browser's own viewer rather than downloading: nobody commits to a 7 MB file
 * before they have seen a page of it.
 */
interface Packet {
  audience: string;
  blurb: string;
  file: string;
}

const packets: Packet[] = [
  {
    audience: 'Companies',
    blurb: 'Tiers from $1,000, workshop slots, and what a sponsorship puts in front of participants.',
    file: '/packets/reveriehacks-company-packet.pdf',
  },
  {
    audience: 'FTC teams & orgs',
    blurb: 'The same prospectus at team scale, with tiers from $200.',
    file: '/packets/reveriehacks-team-packet.pdf',
  },
];

const rise = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export function ContactPage() {
  return (
    <div className="min-h-screen px-6 pb-28 pt-36">
      <div className="mx-auto max-w-5xl">
        <motion.div {...rise} transition={{ duration: 0.6 }}>
          <p className="eyebrow text-muted-foreground">Get in touch</p>
          <h1 className="mt-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Contact <span className="text-primary">us</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Whether you&apos;re a potential sponsor, judge, mentor, or a participant with a
            question, we&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <motion.div {...rise} transition={{ duration: 0.5, delay: 0.06 }}>
            <ContactForm />
          </motion.div>

          <motion.aside
            {...rise}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="eyebrow text-muted-foreground">Contact information</h2>

              <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border">
                {channels.map((channel) => {
                  const external = channel.href.startsWith('http');

                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="group flex items-center gap-4 bg-background p-5 transition-colors hover:bg-muted"
                    >
                      <channel.icon
                        className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        strokeWidth={1.5}
                      />
                      <div className="min-w-0">
                        <p className="eyebrow text-muted-foreground">{channel.label}</p>
                        <p className="mt-1.5 break-words text-sm">{channel.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Sponsorship, split by who's asking: the two packets read very
                differently, and sending a robotics team the corporate one is
                how a sponsor decides we aren't serious. */}
            <div className="border border-primary/40 bg-gradient-to-br from-primary/[0.04] to-transparent p-7">
              <h2 className="text-2xl">Interested in sponsoring?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                ReverieHacks runs on sponsors who care about putting tools and prizes in students&apos;
                hands. Take the packet that fits.
              </p>

              <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border">
                {packets.map((packet) => (
                  <a
                    key={packet.file}
                    href={packet.file}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 bg-background p-4 transition-colors hover:bg-muted"
                  >
                    <FileText
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-sm">{packet.audience}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {packet.blurb}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <Link
                to="/sponsors"
                className="group mt-5 inline-flex items-center gap-2 text-sm text-primary"
              >
                See who already sponsors us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="border border-border p-7">
              <h2 className="text-2xl">New here?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                What ReverieHacks is, who runs it, and the numbers behind the last one.
              </p>
              <Link
                to="/about"
                className="group mt-5 inline-flex items-center gap-2 text-sm transition-colors hover:text-primary"
              >
                Learn about ReverieHacks
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.aside>
        </div>

        <p className="mt-20 border-t border-border pt-8 text-sm text-muted-foreground">
          &copy; 2026 ReverieHacks. All rights reserved.
        </p>
      </div>
    </div>
  );
}

/**
 * Hands the message to the visitor's own mail client rather than posting it
 * anywhere. There is no inbox on our side to post to — no form endpoint, no
 * mail credentials — and a form that silently swallows what people write is
 * worse than no form. The button says where the message is going.
 */
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Only the organization line is optional — filtering the whole body would
    // take the blank line above the signature with it.
    const details = [
      `From: ${name}`,
      `Reply to: ${email}`,
      organization && `Organization: ${organization}`,
    ].filter(Boolean);

    const body = `${message}\n\n—\n${details.join('\n')}`;

    const subject = name ? `ReverieHacks — message from ${name}` : 'ReverieHacks — message';

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={submit} className="border border-border p-7 sm:p-9">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required>
          <input
            id="contact-name"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            className={FIELD}
          />
        </Field>

        <Field label="Email" htmlFor="contact-email" required>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className={FIELD}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Organization" htmlFor="contact-org">
          <input
            id="contact-org"
            name="organization"
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            placeholder="Company, school, or team (optional)"
            className={FIELD}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Message" htmlFor="contact-message" required>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={7}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us how you'd like to work together, or ask us anything..."
            className={`${FIELD} resize-y`}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-primary px-7 py-4 text-primary-foreground transition-colors hover:bg-accent"
      >
        <span className="eyebrow">Send message</span>
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Opens your email app with the message ready to send to {CONTACT_EMAIL}.
      </p>
    </form>
  );
}

const FIELD =
  'mt-2.5 w-full border border-border bg-input-background px-4 py-3 text-sm outline-none ' +
  'transition-colors placeholder:text-muted-foreground focus:border-primary';

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}
