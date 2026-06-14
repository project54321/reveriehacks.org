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
      name: 'Ritvij Sharma',
      role: 'Chief Executive Officer',
      bio: 'I am a founding member of Reverie Hacks with strong background in Java and Python. I am also a boy scout who enjoys hiking and camping in the wilderness.',
      skills: ['Python', 'Java', 'Marketing', 'CAD', 'Fundraising'],
    },
    {
      name: 'Ishaan Singh',
      role: 'Staff Member',
      bio: 'NBA Fanatic with a strong background in computer science, robotics, and engineering as well.',
      skills: ['Java', 'Python', 'Fusion', 'Onshape', 'Web Development'],
    },
    {
      name: 'Arjun Averineni',
      role: 'Staff Member',
      bio: 'Expert in operations management and ensuring smooth execution of large-scale events.',
      skills: ['Operations', 'Project Management', 'Logistics'],
    },
    {
      name: 'Krishiv Piduri',
      role: 'Staff Member',
      bio: 'I am an AWS Certified DevOps Professional who built several web apps with 30,000 users and hosted hackathons with 150 participants prior to ReverieHacks.',
      skills: ['Cloud Infrastructure', 'Full-Stack Development'],
    },
    {
      name: 'Arnav Desmukh',
      role: 'Staff Member',
      bio: 'I have been coding since I was 11, working on frontend projects and teams. I have also been an avid musician for 12 years playing instruments such as the Cello.',
      skills: ['HTML/CSS', 'JavaScript', 'Vibe Coding', 'Music', 'CAD'],
    },
    {
      name: 'Alexander Skaff',
      role: 'Staff Member',
      bio: 'An aspiring medical and robotics student, I also have the ability to code in Python and Java.',
      skills: ['Python', 'Java', 'Robotics', 'Medcine/Bio', 'Social Media'],
    },
    {
      name: 'Aarush Tulsyan',
      role: 'Alumi/Founder',
      bio: 'I am Aarush, an undergraduate at UT Austin, majoring in Electrical and Computer Engineering. I am passionate about hardware design, semiconductor research, embedded systems, and PCB design.',
      skills: ['Research', 'Semiconductors', 'Embedded Systems', 'PCBs'],
    },
    {
      name: 'Tom the Lizard',
      role: 'Beloved Mascot',
      bio: 'I love to scream and do funny stuff to engage my peers.',
      skills: ['Lizard', 'Comedy'],
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
