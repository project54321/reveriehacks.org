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
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ritvij Sharma',
    img: '/team/ritvij.jpg',
    role: 'Chief Executive Officer',
    bio: 'A founding member of ReverieHacks with a strong background in Java and Python. I am also a boy scout who enjoys hiking and camping in the wilderness.',
    skills: ['Python', 'Java', 'Marketing', 'CAD', 'Fundraising'],
  },
  {
    name: 'Ishaan Singh',
    img: '/team/ishaan.jpg',
    role: 'Chief Operating Officer',
    bio: 'NBA fanatic with a strong background in computer science, robotics, and engineering.',
    skills: ['Java', 'Python', 'Fusion', 'Onshape', 'Web Development'],
  },
    {
    name: 'Alexander Skaff',
    img: '/team/alexander.jpg',
    role: 'Chief Technical Officer',
    bio: 'An aspiring medical and robotics student with the ability to code in Python and Java.',
    skills: ['Python', 'Java', 'Robotics', 'Medicine/Bio', 'Social Media'],
  },
  {
    name: 'Arjun Averineni',
    img: '/team/arjun.jpg',
    role: 'Staff Member',
    bio: 'A committed full-stack web developer who is also passionate about robotics. I play the violin and love to spread STEM education throughout my community.',
    skills: ['Java', 'Robotics', 'Python', 'Full-Stack Development', 'Violin'],
  },
  {
    name: 'Arnav Deshmukh',
    img: '/team/arnav.jpg',
    role: 'Staff Member',
    bio: 'I have been coding since I was 11, working on frontend projects and teams. I have also been an avid musician for 12 years, playing instruments such as the cello.',
    skills: ['HTML/CSS', 'JavaScript', 'Frontend', 'Music', 'CAD'],
  },
  {
    name: 'Aarush Tulsyan',
    img: '/team/aarush.jpg',
    role: 'Founder / Alumnus',
    bio: 'An undergraduate at UT Austin majoring in Electrical and Computer Engineering. I am passionate about hardware design, semiconductor research, embedded systems, and PCB design.',
    skills: ['Research', 'Semiconductors', 'Embedded Systems', 'PCBs'],
  },
  {
    name: 'Aditya Rayapedi',
    img: '/team/aditya.jpg',
    role: 'Former CEO',
    bio: 'A robotics and ML researcher, and a beloved fan of Tottenham Hotspur.',
    skills: ['Web Development', 'App Development', 'Machine Learning', 'CAD', 'Cloud', 'Databases'],
  },
];

export function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen px-6 pb-28 pt-36">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-muted-foreground">The people behind it</p>
          <h1 className="mt-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Our <span className="text-primary">Team</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Students, creators, and dreamers who believe in the power of building together.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.button
              key={member.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
              onClick={() => setSelectedMember(member)}
              className="group bg-background text-left"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg">{member.name}</h3>
                <p className="mt-1 text-sm text-primary">{member.role}</p>
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
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm"
                  />
                </Dialog.Overlay>

                <Dialog.Content asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: 16 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto"
                  >
                    <div className="m-4 border border-border bg-card p-8">
                      <Dialog.Close className="absolute right-6 top-6 p-2 text-muted-foreground transition-colors hover:text-foreground">
                        <X className="h-5 w-5" />
                      </Dialog.Close>

                      <div className="flex flex-col gap-8 md:flex-row">
                        <div className="shrink-0">
                          <div className="h-44 w-44 overflow-hidden border border-border">
                            <img
                              src={selectedMember.img}
                              alt={selectedMember.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <Dialog.Title className="text-3xl">{selectedMember.name}</Dialog.Title>
                          <p className="mb-6 mt-1 text-primary">{selectedMember.role}</p>

                          <Dialog.Description className="mb-6 leading-relaxed text-muted-foreground">
                            {selectedMember.bio}
                          </Dialog.Description>

                          <div>
                            <h4 className="eyebrow mb-3 text-muted-foreground">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedMember.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="border border-border px-3 py-1.5 text-sm text-foreground"
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
