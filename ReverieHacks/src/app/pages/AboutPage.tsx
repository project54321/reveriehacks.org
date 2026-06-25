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

export function AboutPage() {
  const features = [
    {
      icon: Code2,
      title: 'Learn & Build',
      description:
        'Join a team with people you want to work with or present an idea you have been thinking about for a while.',
    },
    {
      icon: Users,
      title: 'Connect',
      description:
        'Meet new people, form teams, and create friendships that last long after the event ends.',
    },
    {
      icon: Trophy,
      title: 'Compete',
      description:
        'Win prizes, premium subscriptions, exclusive opportunities, and recognition for your work.',
    },
    {
      icon: Rocket,
      title: 'Innovate',
      description:
        'Build solutions that matter. Experiment, create, and push your ideas further than ever before.',
    },
    {
      icon: Heart,
      title: 'Community First',
      description:
        "We're building more than a competition—we're building a community of makers.",
    },
    {
      icon: Lightbulb,
      title: 'Ideas Welcome',
      description:
        'Whether you are a beginner or an expert, there is a place for your creativity here.',
    },
  ];

  const tracks = [
    {
      icon: Sparkles,
      title: 'Ideathon',
      description:
        'Transform ambitious ideas into actionable projects through brainstorming, validation, planning, and creative problem-solving.',
    },
    {
      icon: Brain,
      title: 'ML Prompt Engineering',
      description:
        'Design sophisticated AI workflows using LLMs such as ChatGPT and Gemini to achieve highly optimized results.',
    },
    {
      icon: Laptop,
      title: 'Software Development',
      description:
        'Build innovative software, platforms, tools, and applications that solve meaningful real-world problems.',
    },
    {
      icon: Database,
      title: 'Datathon',
      description:
        'Apply machine learning, analytics, and data science techniques to uncover insights and drive impactful solutions.',
    },
    {
      icon: Cpu,
      title: 'Embedded Systems',
      description:
        'Create hardware solutions through PCB design, ECAD tools, electronics engineering, and embedded computing.',
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description:
        'Develop mobile experiences for iOS and Android that make technology more accessible and impactful.',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Statement (moved up) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center py-12 mb-14"
        >
          <p className="text-primary uppercase tracking-[0.35em] text-sm mb-5">
            ReverieHacks
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-none">
            WHERE
            <span className="block text-primary">
              EVERY BUILDER
            </span>
            BELONGS
          </h2>

          <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto">
            Whether you're creating hardware, training AI models,
            launching mobile apps, uncovering insights from data,
            or simply turning an idea into reality,
            ReverieHacks gives you a place to build.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <div className="text-lg text-gray-300 leading-relaxed">
            <p>
              ReverieHacks started with a simple question: what if a hackathon felt more like a 
              creative playground than a competition? For two weeks, builders from around the world come 
              together to create ideas they actually care about—apps, AI, hardware, or data-driven solutions.
              We welcome developers, designers, engineers, and beginners alike, because innovation happens 
              best when different minds build together. If you’re excited to create something meaningful, 
              you belong here.
            </p>
          </div>
        </motion.div>

        {/* Tracks */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-28"
        >
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.25em] text-sm mb-4">
              Competition Tracks
            </p>

            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Six Ways To Build
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ReverieHacks is designed for more than just coders.
              Choose the path that best matches your interests.
            </p>
          </div>

          <div className="space-y-10">
            {tracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="flex gap-6 md:gap-10 items-start"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-16 h-16 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center">
                    <track.icon className="w-7 h-7 text-primary" />
                  </div>

                  {index !== tracks.length - 1 && (
                    <div className="w-px h-24 bg-gradient-to-b from-primary/40 to-transparent mt-4" />
                  )}
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-3">
                    {track.title}
                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                    {track.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features (Why Join) */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Why Join?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than a hackathon. A place to learn, connect,
            compete, and create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group p-8 bg-card border border-border rounded-2xl hover:border-primary transition-all h-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}