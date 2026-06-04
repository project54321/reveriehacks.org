import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  funFact?: string;
}

export function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      name: 'Aditya Raypeddi',
      role: 'Chief Executive Officer',
      bio: "Leading the charge to make ReverieHacks the hackathon everyone's talking about. When I'm not planning world domination, I'm probably debugging something. I'm passionate about creating spaces where young developers can thrive and push the boundaries of what's possible.",
      skills: ['Leadership', 'Strategy', 'Community Building', 'Public Speaking', 'Event Management'],
      funFact: 'Started coding at 12 and has been hooked ever since. Can quote every Silicon Valley episode.',
    },
    {
      name: 'Aarush Srivastava',
      role: 'Chief Technical Officer',
      bio: 'Full-stack wizard making sure our tech stack is as solid as our memes. Building scalable systems and mentoring hackers is my jam. I love diving deep into architecture decisions and helping teams ship better code.',
      skills: ['React', 'Node.js', 'AWS', 'DevOps', 'System Design', 'TypeScript'],
      funFact: 'Built my first web app in 7th grade. Tabs > Spaces (fight me). Lives on coffee and Stack Overflow.',
    },
    {
      name: 'Ritvij Sharma',
      role: 'Chief Operating Officer',
      bio: "The one making sure everything actually happens. From logistics to late-night pizza orders, I keep the chaos organized. I'm all about smooth execution and making sure every detail is perfect so hackers can focus on building.",
      skills: ['Operations', 'Project Management', 'Logistics', 'Problem Solving', 'Team Coordination'],
      funFact: 'Has a spreadsheet for everything, including spreadsheets. Master of Google Calendar and Notion boards.',
    },
    {
      name: 'Aarush Tulsyan',
      role: 'Founder, Alumni & Mentor',
      bio: "Started this whole thing because I wanted to give hackers the experience I wish I'd had. Now I help others build cool stuff and turn wild ideas into real products. Mentoring the next generation of builders is what gets me out of bed in the morning.",
      skills: ['Mentorship', 'Product Development', 'Entrepreneurship', 'Public Speaking', 'Strategy'],
      funFact: 'First line of code was in QBasic. Started three companies before graduating. Still debugging on weekends.',
    },
    {
      name: 'James Tam',
      role: 'Documentation & Reach Lead',
      bio: "Writing docs that people actually want to read and spreading the word about ReverieHacks across the internet. I believe great documentation is just as important as great code, and I'm on a mission to prove it.",
      skills: ['Technical Writing', 'Marketing', 'Community Outreach', 'Content Strategy', 'Social Media'],
      funFact: 'Somehow makes documentation exciting. Once wrote a 50-page guide that people actually enjoyed reading.',
    },
    {
      name: 'Viktor Nguyen',
      role: 'Events Lead',
      bio: "Creating memorable experiences and making sure every moment of ReverieHacks is absolutely legendary. I'm all about the details that make events unforgettable, from opening ceremonies to closing celebrations.",
      skills: ['Event Planning', 'Coordination', 'Engagement', 'Creative Direction', 'Community Management'],
      funFact: 'Can plan an event in their sleep. Has coordinated hackathons with 1000+ attendees. Never misses a deadline.',
    },
    {
      name: 'Theo Wong',
      role: 'Finance Lead',
      bio: "Managing the money so we can keep the lights on and the prizes flowing. Numbers are my love language, and I'm passionate about financial sustainability and making sure every dollar goes toward making ReverieHacks better.",
      skills: ['Finance', 'Budgeting', 'Fundraising', 'Sponsorship Management', 'Analytics'],
      funFact: 'Excel shortcuts > keyboard shortcuts. Can spot a budget error from a mile away. Loves pivot tables.',
    },
    {
      name: 'Nag Vardhineedi',
      role: 'Design Lead',
      bio: "Making everything look fire. From branding to UI, I ensure ReverieHacks is visually stunning top to bottom. I believe great design isn't just about aesthetics—it's about creating experiences that feel intuitive and memorable.",
      skills: ['UI/UX Design', 'Branding', 'Visual Design', 'Figma Wizardry', 'Typography', 'Animation'],
      funFact: 'Will roast your color choices (lovingly). Has strong opinions about kerning. Pixel-perfect is the only way.',
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The humans behind the hackathon. We're students, creators, and dreamers who believe in the power of building together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.button
              key={member.name}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => setSelectedMember(member)}
              className="group p-6 bg-card border border-border rounded-2xl hover:border-primary transition-all h-full text-left cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-full aspect-square bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-purple-700/20 rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                    <div className="w-full h-full bg-muted/30 rounded-lg" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">Click to learn more</p>
              </div>
            </motion.button>
          ))}
        </div>

        <Dialog.Root open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <AnimatePresence>
            {selectedMember && (
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
                            {selectedMember.name}
                          </Dialog.Title>
                          <p className="text-primary text-lg mb-6">{selectedMember.role}</p>

                          <Dialog.Description className="text-gray-300 mb-6 text-lg leading-relaxed">
                            {selectedMember.bio}
                          </Dialog.Description>

                          {selectedMember.funFact && (
                            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                              <p className="text-sm text-muted-foreground mb-1">Fun Fact</p>
                              <p className="text-foreground">{selectedMember.funFact}</p>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold mb-3 text-lg">Skills & Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedMember.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm border border-primary/20 hover:bg-primary/20 transition-colors"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
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
      </div>
    </div>
  );
}
