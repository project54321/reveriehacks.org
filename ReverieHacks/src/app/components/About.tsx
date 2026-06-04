import { motion } from 'motion/react';
import { Code2, Users, Trophy, Rocket } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Code2,
      title: 'Learn & Build',
      description: 'Access workshops, mentorship, and resources to bring your ideas to life',
    },
    {
      icon: Users,
      title: 'Connect',
      description: 'Network with fellow hackers, mentors, and industry professionals',
    },
    {
      icon: Trophy,
      title: 'Compete',
      description: 'Compete for prizes worth up to $10,000 and showcase your projects',
    },
    {
      icon: Rocket,
      title: 'Innovate',
      description: 'Push boundaries and create solutions that make a real impact',
    },
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What is ReverieHacks?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A virtual hackathon bringing together young developers to innovate, collaborate, and create impactful solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
