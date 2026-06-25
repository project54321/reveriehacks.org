import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface TeamMember {
  name: string;
  img: string;
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
      img: './team/ritvij.jpg',
      role: 'Chief Executive Officer',
      bio: 'I am a founding member of Reverie Hacks with strong background in Java and Python. I am also a boy scout who enjoys hiking and camping in the wilderness.',
      skills: ['Python', 'Java', 'Marketing', 'CAD', 'Fundraising'],
    },
    {
      name: 'Ishaan Singh',
      img: './team/ishaan.jpg',
      role: 'Chief Operating Officer',
      bio: 'NBA Fanatic with a strong background in computer science, robotics, and engineering as well.',
      skills: ['Java', 'Python', 'Fusion', 'Onshape', 'Web Development'],
    },
    {
      name: 'Arjun Averineni',
      img: './team/arjun.jpg',
      role: 'Staff Member',
      bio: 'I am a committed Full-Stack Web Developer who is also passionate about Robotics. I also play the violin and love to spread STEM Education throughout my community.',
      skills: ['Java', 'Robotics', 'Python', 'Full-Stack Development', 'Music/Violin'],
    },
    {
      name: 'Krishiv Piduri',
      img: './team/krishiv.jpg',
      role: 'Staff Member',
      bio: 'I am an AWS Certified DevOps Professional who built several web apps with 30,000 users and hosted hackathons with 150 participants prior to ReverieHacks.',
      skills: ['Cloud Infrastructure', 'Full-Stack Development'],
    },
    {
      name: 'Arnav Desmukh',
      img: './team/arnav.jpg',
      role: 'Staff Member',
      bio: 'I have been coding since I was 11, working on frontend projects and teams. I have also been an avid musician for 12 years playing instruments such as the Cello.',
      skills: ['HTML/CSS', 'JavaScript', 'Vibe Coding', 'Music', 'CAD'],
    },
    {
      name: 'Alexander Skaff',
      img: './team/alexander.jpg',
      role: 'Staff Member',
      bio: 'An aspiring medical and robotics student, I also have the ability to code in Python and Java.',
      skills: ['Python', 'Java', 'Robotics', 'Medcine/Bio', 'Social Media'],
    },
    {
      name: 'Aarush Tulsyan',
      img: './team/aarush.jpg',
      role: 'Alumi/Founder',
      bio: 'I am an undergraduate at UT Austin, majoring in Electrical and Computer Engineering. I am passionate about hardware design, semiconductor research, embedded systems, and PCB design.',
      skills: ['Research', 'Semiconductors', 'Embedded Systems', 'PCBs'],
    },
    {
      name: 'Aditya Rayapedi',
      img: './team/aditya.jpg',
      role: 'Ex. Reverie Hacks CEO',
      bio: 'I am a robotics and ML researcher who is also a beloved fan of Tottenhan Hotspurs. ',
      skills: ['Web Development', 'App Development', 'Machine Learning', 'CAD', 'Cloud', 'Databases'],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
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

        {/* Grid */}
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

                {/* Image */}
                <div className="w-full aspect-square rounded-xl mb-4 overflow-hidden bg-muted/30 relative">
                  <img
                    src={member.img || '/placeholder.png'}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>

                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">Click to learn more</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Modal */}
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

                        {/* Modal Image */}
                        <div className="flex-shrink-0">
                          <div className="w-48 h-48 rounded-2xl overflow-hidden bg-muted/30">
                            <img
                              src={selectedMember.img || '/placeholder.png'}
                              alt={selectedMember.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <Dialog.Title className="text-4xl font-bold mb-2">
                            {selectedMember.name}
                          </Dialog.Title>

                          <p className="text-primary text-lg mb-6">
                            {selectedMember.role}
                          </p>

                          <Dialog.Description className="text-gray-300 mb-6 text-lg leading-relaxed">
                            {selectedMember.bio}
                          </Dialog.Description>

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