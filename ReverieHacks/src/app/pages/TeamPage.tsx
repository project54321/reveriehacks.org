import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import ChromaGrid, { type ChromaItem } from '../components/ChromaGrid';
import ParticleText from '../components/ParticleText';

interface TeamMember {
  name: string;
  img: string;
  role: string;
  bio: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  { name: 'Ritvij Sharma', img: '/team/ritvij.jpg', role: 'Chief Executive Officer', bio: 'A founding member of ReverieHacks with a strong background in Java and Python. I am also a boy scout who enjoys hiking and camping in the wilderness.', skills: ['Python','Java','Marketing','CAD','Fundraising'] },
  { name: 'Ishaan Singh', img: '/team/ishaan.jpg', role: 'Chief Operating Officer', bio: 'NBA fanatic with a strong background in computer science, robotics, and engineering.', skills: ['Java','Python','Fusion','Onshape','Web Development'] },
  { name: 'Alexander Skaff', img: '/team/alexander.jpg', role: 'Chief Technical Officer', bio: 'An aspiring medical and robotics student with the ability to code in Python and Java.', skills: ['Python','Java','Robotics','Medicine/Bio','Social Media'] },
  { name: 'Arjun Averineni', img: '/team/arjun.jpg', role: 'Staff Member', bio: 'A committed full-stack web developer who is also passionate about robotics. I play the violin and love to spread STEM education throughout my community.', skills: ['Java','Robotics','Python','Full-Stack Development','Violin'] },
  { name: 'Arnav Deshmukh', img: '/team/arnav.jpg', role: 'Staff Member', bio: 'I have been coding since I was 11, working on frontend projects and teams. I have also been an avid musician for 12 years, playing instruments such as the cello.', skills: ['HTML/CSS','JavaScript','Frontend','Music','CAD'] },
  { name: 'Aarush Tulsyan', img: '/team/aarush.jpg', role: 'Founder / Alumnus', bio: 'An undergraduate at UT Austin majoring in Electrical and Computer Engineering. I am passionate about hardware design, semiconductor research, embedded systems, and PCB design.', skills: ['Research','Semiconductors','Embedded Systems','PCBs'] },
  { name: 'Aditya Rayapedi', img: '/team/aditya.jpg', role: 'Former CEO', bio: 'A robotics and ML researcher, and a beloved fan of Tottenham Hotspur.', skills: ['Web Development','App Development','Machine Learning','CAD','Cloud','Databases'] },
  { name: 'Krishiv Gupta', img: '/team/krishiv.jpg', role: 'Staff Member', bio: 'Passionate builder who loves bridging hardware and software to create impactful tools for students.', skills: ['Hardware','Software','Outreach','Design'] },
];

export function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const chromaItems: ChromaItem[] = teamMembers.map((m,i)=>{
    const grads = [
      'linear-gradient(145deg, color-mix(in srgb, var(--primary) 14%, var(--card)), var(--card))',
      'linear-gradient(145deg, var(--card), color-mix(in srgb, var(--primary) 8%, var(--card)))',
      'linear-gradient(165deg, color-mix(in srgb, var(--primary) 12%, var(--card)), var(--card))',
    ];
    return { image: m.img, title: m.name, subtitle: m.role, handle: m.role.split(' ')[0], borderColor: '#8b5cf6', gradient: grads[i%grads.length] };
  });
  const handleCardClick = (_: ChromaItem, idx:number)=> setSelectedMember(teamMembers[idx]);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="h-[180px] w-full sm:h-[220px]">
              <ParticleText text="The crew that ships it" particleSize={1.4} density={2} color="#ffffff" highlightColor="#8b5cf6" scatter={14} gatherDuration={1000} stagger={30} pointerRepel={20} repelRadius={80} idleDrift={0.15} trigger="mount" fontSize="clamp(2rem, 6vw, 3.8rem)" fontWeight={800} glow />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Eight students who run ReverieHacks end-to-end — partnerships, platform, judging, and community.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20">
        <ChromaGrid items={chromaItems} radius={360} damping={0.45} fadeOut={0.6} ease="power3.out" onCardClick={handleCardClick} className="min-h-[640px] sm:min-h-[680px]" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Want to help next year? <a href="mailto:info@reveriehacks.org" className="font-medium text-primary hover:underline">Reach out</a> — we’re always looking for builders who care.
        </p>

        <Dialog.Root open={!!selectedMember} onOpenChange={(o)=>!o && setSelectedMember(null)}>
          <AnimatePresence>
            {selectedMember && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md" /></Dialog.Overlay>
                <Dialog.Content asChild>
                  <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.24, ease: [0.22,1,0.36,1] }} className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-4">
                    <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                      <Dialog.Close className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-muted/80">
                        <X className="h-4 w-4" />
                      </Dialog.Close>
                      <div className="relative flex flex-col gap-8 p-8 md:flex-row">
                        <div className="shrink-0">
                          <div className="relative h-48 w-48 overflow-hidden rounded-2xl border border-border bg-muted">
                            <img src={selectedMember.img} alt={selectedMember.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="mt-3 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">{selectedMember.role}</div>
                        </div>
                        <div className="flex-1">
                          <Dialog.Title className="font-display text-3xl tracking-tight text-foreground">{selectedMember.name}</Dialog.Title>
                          <Dialog.Description className="mt-3 leading-relaxed text-muted-foreground">{selectedMember.bio}</Dialog.Description>
                          <div className="mt-6">
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Skills</h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {selectedMember.skills.map((s)=>(
                                <span key={s} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">{s}</span>
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
