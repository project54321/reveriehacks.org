import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import img1 from '../../imports/image.png';
import img2 from '../../imports/image-1.png';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio: string;
  skills: string[];
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      name: 'Aditya Raypeddi',
      role: 'Chief Executive Officer',
      bio: 'Passionate about creating opportunities for young developers and fostering innovation in the tech community.',
      skills: ['Leadership', 'Strategy', 'Community Building'],
    },
    {
      name: 'Aarush Srivastava',
      role: 'Chief Technical Officer',
      bio: 'Full-stack developer with expertise in modern web technologies and cloud infrastructure.',
      skills: ['React', 'Node.js', 'AWS', 'DevOps'],
    },
    {
      name: 'Ritvij Sharma',
      role: 'Chief Operating Officer',
      bio: 'Expert in operations management and ensuring smooth execution of large-scale events.',
      skills: ['Operations', 'Project Management', 'Logistics'],
    },
    {
      name: 'Aarush Tulsyan',
      role: 'Founder, Alumni & Mentor',
      bio: 'Founding member bringing years of hackathon experience and mentorship to guide participants.',
      skills: ['Mentorship', 'Public Speaking', 'Product Development'],
    },
    {
      name: 'James Tam',
      role: 'Documentation & Reach Lead',
      bio: 'Focused on creating comprehensive documentation and expanding our community reach.',
      skills: ['Technical Writing', 'Marketing', 'Community Outreach'],
    },
    {
      name: 'Viktor Nguyen',
      role: 'Events Lead',
      bio: 'Orchestrating memorable hackathon experiences and managing all event logistics.',
      skills: ['Event Planning', 'Coordination', 'Engagement'],
    },
    {
      name: 'Theo Wong',
      role: 'Finance Lead',
      bio: 'Managing finances, budgets, and ensuring sustainable growth for the organization.',
      skills: ['Finance', 'Budgeting', 'Fundraising'],
    },
    {
      name: 'Nag Vardhineedi',
      role: 'Design Lead',
      bio: 'Crafting beautiful and intuitive designs that enhance the hackathon experience.',
      skills: ['UI/UX Design', 'Branding', 'Visual Design'],
    },
  ];

  return (
    <section id="team" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground">
            Meet the team behind ReverieHacks, whose efforts to create an exhilarating and inspiring hackathon is unmatched in the success of this year's hackathon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.button
              key={member.name}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => setSelectedMember(member)}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary transition-all text-left cursor-pointer"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-purple-600/20 to-purple-400/20 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-muted" />
              </div>
              <h3 className="font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
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
                    <div className="bg-card border border-border rounded-2xl p-8 m-4">
                      <Dialog.Close className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                      </Dialog.Close>

                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-48 h-48 bg-gradient-to-br from-purple-600/20 to-purple-400/20 rounded-xl overflow-hidden">
                            <div className="w-full h-full bg-muted" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <Dialog.Title className="text-3xl font-bold mb-2">
                            {selectedMember.name}
                          </Dialog.Title>
                          <p className="text-primary mb-4">{selectedMember.role}</p>

                          <Dialog.Description className="text-muted-foreground mb-6">
                            {selectedMember.bio}
                          </Dialog.Description>

                          <div className="mb-6">
                            <h4 className="font-semibold mb-3">Skills & Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedMember.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
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
    </section>
  );
}
