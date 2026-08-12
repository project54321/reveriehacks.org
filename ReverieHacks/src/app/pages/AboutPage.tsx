import { motion } from 'motion/react';
import {
  Code2,
  Users,
  Trophy,
  Rocket,
  Heart,
  Lightbulb,
  Brain,
  Database,
  Smartphone,
  Cpu,
  Sparkles,
  Laptop,
} from 'lucide-react';

const tracks = [
  {
    icon: Sparkles,
    title: 'Ideathon',
    description:
      'Turn ambitious ideas into actionable projects through brainstorming, validation, and planning.',
  },
  {
    icon: Brain,
    title: 'ML & Prompt Engineering',
    description:
      'Design AI workflows using LLMs such as ChatGPT, Claude, and Gemini to reach optimized results.',
  },
  {
    icon: Laptop,
    title: 'Software Development',
    description: 'Build software, platforms, and tools that solve meaningful real-world problems.',
  },
  {
    icon: Database,
    title: 'Datathon',
    description:
      'Apply machine learning and data science to uncover insights and drive real solutions.',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Create hardware through PCB design, ECAD tools, and embedded computing.',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Develop iOS and Android experiences that make technology more accessible.',
  },
];

const reasons = [
  {
    icon: Code2,
    title: 'Learn & Build',
    description:
      'Join a team you want to work with, or present an idea you have been sitting on for a while.',
  },
  {
    icon: Users,
    title: 'Connect',
    description: 'Meet new people, form teams, and make friendships that outlast the event.',
  },
  {
    icon: Trophy,
    title: 'Compete',
    description: 'Win prizes, subscriptions, and recognition for the work you put in.',
  },
  {
    icon: Rocket,
    title: 'Innovate',
    description: 'Experiment, create, and push your ideas further than you have before.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'More than a competition. A community of people who like to make things.',
  },
  {
    icon: Lightbulb,
    title: 'Ideas Welcome',
    description: 'Beginner or expert, there is a place for your creativity here.',
  },
];

function Matrix({ items }: { items: { icon: typeof Code2; title: string; description: string }[] }) {
  return (
    <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
          className="group bg-background p-8"
        >
          <item.icon
            className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary"
            strokeWidth={1.5}
          />
          <h3 className="mt-6 text-xl">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen px-6 pb-28 pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-muted-foreground">About ReverieHacks</p>
          <h1 className="mt-6 leading-[1.0]" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Where <span className="text-primary">every builder</span> belongs
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Whether you are creating hardware, training AI models, launching apps, or turning an idea
            into reality, ReverieHacks gives you a place to build.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-3xl border-l-2 border-primary/50 pl-6 text-lg leading-relaxed text-muted-foreground"
        >
          ReverieHacks started with a simple question: what if a hackathon felt more like a creative
          playground than a competition? For three weeks, builders from around the world come together
          to create things they actually care about. We welcome developers, designers, engineers, and
          beginners alike, because the best work happens when different minds build together.
        </motion.div>

        {/* Tracks */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="eyebrow text-primary">Competition Tracks</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Six ways to build
            </h2>
          </motion.div>
          <Matrix items={tracks} />
        </section>

        {/* Why join */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="eyebrow text-primary">Why Join</p>
            <h2 className="mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              More than a hackathon
            </h2>
          </motion.div>
          <Matrix items={reasons} />
        </section>
      </div>
    </div>
  );
}
