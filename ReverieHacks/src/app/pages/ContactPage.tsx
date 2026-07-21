import { motion } from 'motion/react';
import { Mail, MessageSquare, AtSign, ArrowUpRight } from 'lucide-react';

interface Channel {
  icon: typeof Mail;
  title: string;
  blurb: string;
  value: string;
  href: string;
}

const channels: Channel[] = [
  {
    icon: Mail,
    title: 'Email',
    blurb: 'For general inquiries',
    value: 'info@reveriehacks.org',
    href: 'mailto:info@reveriehacks.org',
  },
  {
    icon: MessageSquare,
    title: 'Discord',
    blurb: 'Join the community',
    value: 'discord.gg/gDQGYSQKrH',
    href: 'https://discord.gg/gDQGYSQKrH',
  },
  {
    icon: AtSign,
    title: 'Instagram',
    blurb: 'Follow along',
    value: '@reveriehacks',
    href: 'https://www.instagram.com/reveriehacks',
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen px-6 pb-28 pt-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-muted-foreground">Say hello</p>
          <h1 className="mt-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Get in <span className="text-primary">touch</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Questions, ideas, or just want to say hi? Reach us through any of these.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {channels.map((channel, index) => {
            const external = channel.href.startsWith('http');
            return (
              <motion.a
                key={channel.title}
                href={channel.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group flex flex-col bg-background p-9"
              >
                <div className="flex items-start justify-between">
                  <channel.icon
                    className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary"
                    strokeWidth={1.5}
                  />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="mt-8 text-xl">{channel.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{channel.blurb}</p>
                <p className="mt-4 break-words text-sm text-primary">{channel.value}</p>
              </motion.a>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 border-t border-border pt-8 text-sm text-muted-foreground"
        >
          &copy; 2026 ReverieHacks. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
}
