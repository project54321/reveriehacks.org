import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Calendar, MapPin, Users, Trophy, Zap, Code2, Sparkles, Rocket } from 'lucide-react';

export function HomePage() {
  const stats = [
    { icon: Users, value: '500+', label: 'Participants' },
    { icon: Trophy, value: '$TBD', label: 'In Prizes' },
    { icon: Code2, value: '16 Days', label: 'Of Hacking' },
    { icon: Zap, value: '100+', label: 'Projects' },
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: 'Build Something Amazing',
      description: 'Have a cool project idea you wanted to build? Create it with a team or by yourself through one of our many tracks and get feedback from industry judges.',
    },
    {
      icon: Users,
      title: 'Meet Cool People',
      description: 'Team up with other creators, swap ideas with mentors who actually get it, and make friends from around the world through competing.',
    },
    {
      icon: Trophy,
      title: 'Win Big',
      description: "We're talking serious prizes here. Get premium subscriptions, free trials and gifts from sponsors to celebrate your win.",
    },
    {
      icon: Rocket,
      title: 'Level Up',
      description: 'Walk away with new skills, portfolio projects, and maybe even your next startup idea. No cap.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 pb-24">
        {/* Animated background gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/30 rounded-full blur-[128px]"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-[128px]"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo with gradient */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 rounded-full blur-2xl opacity-50 scale-150" />

              <img
                src="/image.png"
                alt="ReverieHacks Logo"
                className="relative w-32 h-32 rounded-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            Let's change the world,{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              together.
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Two weeks. One mission. Unlimited possibilities. Join hundreds of young creators building the future, one line of code at a time.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <div className="flex items-center gap-3 px-6 py-3 bg-card/50 border border-border rounded-full backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-lg">August 2nd - 17th, 2026</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-card/50 border border-border rounded-full backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg">Virtual • Worldwide</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
          <button
            onClick={() => window.open("https://discord.gg/gDQGYSQKrH", "_blank")}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all text-lg font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
          >
            Join Discord
          </button>

          <button
            onClick={() => window.open("https://reverie-hacks-2026.devpost.com/", "_blank")}
            className="px-10 py-4 bg-card/50 border border-border rounded-xl hover:border-primary transition-all text-lg font-medium backdrop-blur-sm hover:scale-105"
          >
            View Devpost
          </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-card/50 border border-border rounded-2xl backdrop-blur-sm text-center hover:border-primary transition-all group"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Why ReverieHacks?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              This isn't your average hackathon. We're doing things differently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-card border border-border rounded-2xl hover:border-primary transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <highlight.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{highlight.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/30 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to build?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join ReverieHacks through our Devpost to bring your ideas to life!
            </p>
            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all text-lg font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
            >
              Get Notified
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
