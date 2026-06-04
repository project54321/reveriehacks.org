import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface Judge {
  name: string;
  role: string;
  company: string;
  expertise: string;
  bio: string;
  achievements: string[];
}

export function JudgesPage() {
  const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);

  const judges: Judge[] = [
    {
      name: 'Judge 1',
      role: 'Senior Software Engineer',
      company: 'Tech Co',
      expertise: 'Full-Stack Development',
      bio: 'Building distributed systems and leading engineering teams for over a decade. Passionate about mentoring the next generation of developers and helping them navigate the complexities of modern software engineering.',
      achievements: [
        'Led development of systems serving 10M+ users',
        'Open source contributor to major frameworks',
        'Speaker at 20+ tech conferences',
      ],
    },
    {
      name: 'Judge 2',
      role: 'Product Manager',
      company: 'Startup Inc',
      expertise: 'Product Strategy',
      bio: "Helping startups find product-market fit and scale from 0 to 1. I love seeing innovative ideas turn into products that people actually use and love. Looking for projects that solve real problems in clever ways.",
      achievements: [
        'Launched 5 successful products from scratch',
        'Scaled products to millions in revenue',
        'Former founder of two acquired startups',
      ],
    },
    {
      name: 'Judge 3',
      role: 'UX Designer',
      company: 'Design Studio',
      expertise: 'User Experience',
      bio: 'Creating delightful experiences that users love. I believe great design is invisible—it just works. Excited to see projects that prioritize usability and thoughtful interaction design.',
      achievements: [
        'Designed award-winning consumer apps',
        'Led design for Fortune 500 companies',
        'Published author on UX best practices',
      ],
    },
    {
      name: 'Judge 4',
      role: 'Tech Lead',
      company: 'BigTech',
      expertise: 'System Architecture',
      bio: 'Architecting scalable systems that handle massive traffic and complex data. I appreciate clean architecture, smart tradeoffs, and projects that show deep technical thinking.',
      achievements: [
        'Built systems handling billions of requests daily',
        'Holds 3 patents in distributed systems',
        'Mentored 50+ engineers to senior roles',
      ],
    },
    {
      name: 'Judge 5',
      role: 'Founder & CEO',
      company: 'Innovation Labs',
      expertise: 'Entrepreneurship',
      bio: 'Serial entrepreneur who loves turning crazy ideas into thriving businesses. I look for projects with strong vision, clear execution, and the potential to become real companies.',
      achievements: [
        'Founded 4 companies, 2 successful exits',
        'Raised $50M+ in venture funding',
        'Active angel investor in 30+ startups',
      ],
    },
    {
      name: 'Judge 6',
      role: 'ML Engineer',
      company: 'AI Research',
      expertise: 'Machine Learning',
      bio: 'Pushing the boundaries of what AI can do. From computer vision to NLP, I love seeing creative applications of ML that solve problems in unexpected ways.',
      achievements: [
        'Published research in top AI conferences',
        'Built ML models used by millions',
        'Contributor to major ML frameworks',
      ],
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Meet Our Judges</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Industry leaders who've been where you are. They'll evaluate your projects with fresh eyes and real-world experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {judges.map((judge, index) => (
            <motion.button
              key={judge.name}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedJudge(judge)}
              className="group p-6 bg-card border border-border rounded-2xl hover:border-primary transition-all h-full text-left cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-full aspect-square bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-purple-700/20 rounded-xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                    <div className="w-full h-full bg-muted/30 rounded-lg" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{judge.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{judge.role}</p>
                <p className="text-sm text-primary mb-3">{judge.company}</p>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Specialty</p>
                  <p className="text-sm font-medium">{judge.expertise}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Click to learn more</p>
              </div>
            </motion.button>
          ))}
        </div>

        <Dialog.Root open={!!selectedJudge} onOpenChange={(open) => !open && setSelectedJudge(null)}>
          <AnimatePresence>
            {selectedJudge && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  >
                    <div className="bg-card border border-primary/30 rounded-2xl p-8 m-4 shadow-2xl shadow-purple-500/20">
                      <Dialog.Close className="absolute top-6 right-6 p-2 hover:bg-muted rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                      </Dialog.Close>

                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-48 h-48 bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-purple-700/20 rounded-2xl overflow-hidden">
                            <div className="w-full h-full bg-muted/30" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <Dialog.Title className="text-4xl font-bold mb-2">
                            {selectedJudge.name}
                          </Dialog.Title>
                          <p className="text-muted-foreground mb-1">{selectedJudge.role}</p>
                          <p className="text-primary text-lg mb-6">{selectedJudge.company}</p>

                          <Dialog.Description className="text-gray-300 mb-6 text-lg leading-relaxed">
                            {selectedJudge.bio}
                          </Dialog.Description>

                          <div>
                            <h4 className="font-semibold mb-3 text-lg">Key Achievements</h4>
                            <ul className="space-y-2">
                              {selectedJudge.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-300">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">Expertise Area</p>
                            <p className="text-foreground font-medium">{selectedJudge.expertise}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 max-w-3xl mx-auto"
        >
          <div className="p-10 bg-card/50 border border-border rounded-2xl">
            <h2 className="text-3xl font-bold mb-4 text-center">How Judging Works</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Our judges evaluate projects based on creativity, technical execution, impact, and presentation. They're looking for ideas that push boundaries and solve real problems.
              </p>
              <p>
                Don't stress about making it perfect—focus on making it yours. The best projects come from genuine passion and clever problem-solving, not just polished demos.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
