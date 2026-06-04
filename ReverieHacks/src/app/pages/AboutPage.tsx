import { motion } from 'motion/react';
import { Code2, Users, Trophy, Rocket, Heart, Lightbulb } from 'lucide-react';

export function AboutPage() {
  const features = [
    {
      icon: Code2,
      title: 'Learn & Build',
      description: "We've got workshops, mentors who actually care, and resources to help you ship something real.",
    },
    {
      icon: Users,
      title: 'Connect',
      description: 'Meet people who get it. Teammates, mentors, friends—the kind of network that sticks around.',
    },
    {
      icon: Trophy,
      title: 'Compete',
      description: "$10K in prizes for the best projects. Yeah, you read that right.",
    },
    {
      icon: Rocket,
      title: 'Innovate',
      description: 'Build stuff that matters. Solve real problems. Maybe even start your next company.',
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'This is more than a competition—it\'s a movement. We\'re building a family of makers.',
    },
    {
      icon: Lightbulb,
      title: 'Ideas Welcome',
      description: 'No idea is too wild. No skill level is too low. If you want to build, you belong here.',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">About ReverieHacks</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're building the hackathon we always wanted to attend. No BS, just pure creation.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert max-w-4xl mx-auto mb-24"
        >
          <div className="text-lg text-gray-300 space-y-6 leading-relaxed">
            <p>
              ReverieHacks started with a simple question: what if we built a hackathon that felt less like a competition and more like a creative playground?
            </p>
            <p>
              We're talking two weeks of virtual chaos where you can build whatever your brain can dream up. From AI experiments to games to tools that solve problems you've been thinking about for months—if you can code it, you can submit it.
            </p>
            <p>
              The best part? You're not alone. We've assembled a crew of mentors, sponsors, and fellow hackers who are all in this together. Whether you're a seasoned dev or writing your first function, there's a place for you here.
            </p>
            <p>
              This isn't about cramming features at 3 AM (though let's be real, that'll probably happen). It's about taking risks, learning new things, and maybe—just maybe—building something that changes everything.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-card border border-border rounded-2xl hover:border-primary transition-all h-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
