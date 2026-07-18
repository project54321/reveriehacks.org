import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ExternalLink } from 'lucide-react';

interface Judge {
  name: string;
  img: string;
  role?: string;
  company?: string;
  track?: string;
  bio?: string;
  linkedin?: string;
}

const judges: Judge[] = [
  { name: 'Mahendran Chinnaiah', role: 'Healthcare Software Architect', company: 'CVS', img: '/judges/mahendran.png' },
  { name: 'Vaibhav Patel', role: 'AI Engineer', company: 'Abu Dhabi Investment Authority', img: '/judges/vaibhav.png' },
  { name: 'Mantas Eringis', role: 'Software Engineer', company: 'Blockdaemon', img: '/judges/mantas.png' },
  { name: 'Sandeep Shivam', role: 'Associate Director, Product', company: 'Tavant', img: '/judges/sandeep.png' },
  { name: 'Pulkit Arya', role: 'Founding Engineer', company: 'Pointer', img: '/judges/pulkit.png' },
  {
    name: 'Dmitrii Timoshenko',
    role: 'Applied Scientist',
    company: 'Amazon',
    img: '/judges/dimitrii.png',
    track: 'AI/ML',
  },
  { name: 'Khush Patel', img: '/judges/khush.png', track: 'ML Prompt Engineering' },
  {
    name: 'Sunil Kumar',
    role: 'Principal Agile Practitioner',
    company: 'Bank of America',
    img: '/judges/sunil.png',
    track: 'Ideathon',
    bio: 'A Principal Agile Practitioner at Bank of America with over 13 years in Agile leadership and software development, focused on AI and web accessibility. An international speaker and reviewer, he brings a human-centered lens to evaluating ideas, prioritizing universal design, usability, and sustainable impact, and has mentored 300+ professionals and students across 18 countries. He has judged hackathons including Ideathon 2025 and Beyond the Code, and reviewed research for IEEE, PMI, and ACM conferences.',
  },
  {
    name: 'Fahad Mehfooz',
    role: 'Founding AI Engineer',
    company: 'MenuData',
    img: '/judges/fahaz.png',
    track: 'Datathon',
    bio: 'A Founding AI Engineer at MenuData in New York, working on LLM fine-tuning, RAG, and multi-agent systems. He previously did ML work at Vonage and was a Data Scientist at UnitedHealth Group. A recent judge at United Hacks V7, he has taught data science to 100+ students and enjoys giving encouraging, practical feedback on student projects.',
  },
  {
    name: 'Krunal Patel',
    role: 'Senior Technical Program Manager',
    company: 'Applied Materials',
    img: '/judges/krunal.png',
    track: 'Embedded Systems',
    bio: 'A Senior Technical Program Manager based in Silicon Valley, currently at Applied Materials, leading hardware commercialization and manufacturing programs in the semiconductor industry. Across roles at Applied Materials, Microsoft, and Tesla, he has worked at the intersection of engineering, product, manufacturing, and data, spanning hardware systems, embedded products, and machine learning applications. He holds a USPTO provisional patent for an AI-enabled wearable safety device, has published 19+ peer-reviewed papers, and is a TEDx speaker and Forbes Technology Council member who won Best Judge at ACM Fremont’s NextGen Hackathon 2025.',
    linkedin: 'https://linkedin.com/in/krunalpatel1860',
  },
  {
    name: 'Jyoti Shah',
    role: 'Director of Application Development',
    company: 'ADP',
    img: '/judges/jyoti.png',
    bio: 'A technology leader with over two decades of experience in application development, digital transformation, and AI. As Director of Application Development at ADP, she pairs deep technical expertise with strategic vision, drawing on 15 years as a full-stack developer across AI, big data, React, Angular, and Java. She is a leader in ADP’s International Women’s Inclusion Network (IWIN) and a passionate advocate for inclusion and community growth.',
  },
  {
    name: 'Anindita Bhowmick',
    role: 'Founder & CEO',
    company: 'Anibotix Robotics',
    img: '/judges/anindita.png',
    bio: 'Founder & CEO of Anibotix Robotics, a robotics startup valued at 123 crore INR. An active startup investor, she frequently serves as a judge and mentor at international hackathons and pitch competitions, with collaborations spanning Neura Robotics in Europe, space-tech organizations, and agencies including ISRO, DRDO, and NASA.',
  },
  {
    name: 'Jasmit Kaur',
    company: 'ADP',
    img: '/judges/jasmit.png',
    bio: 'A technology leader at ADP and one of the leaders of its International Women’s Inclusion Network (IWIN) chapter, active across many social causes. A committed mentor and hackathon judge, she is known for nurturing talent, fostering cross-functional collaboration, peer-reviewing others’ work, and aligning technology with business value.',
  },
  {
    name: 'Mayur Jain',
    role: 'Senior Software Engineer',
    company: 'Bridgestone Americas',
    img: '/judges/mayur.png',
    bio: 'A Senior Software Engineer at Bridgestone Americas working on AI-powered, cloud-native, and full-stack systems, with prior founding-engineer roles at Culture Pulse and AmplifyX. His work spans applied AI and machine learning, conversational AI, backend architecture, and cloud infrastructure, including an AI test-automation system that automated 40% of manual QA and an R&D platform used by 10,000+ tire designers worldwide. He holds AWS Solutions Architect, AWS Developer, and Azure AI Engineer certifications.',
    linkedin: 'https://www.linkedin.com/in/maayurjaain',
  },
];

export function JudgesPage() {
  const [selected, setSelected] = useState<Judge | null>(null);

  return (
    <div className="min-h-screen px-6 pb-28 pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-muted-foreground">Meet the panel</p>
          <h1 className="mt-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Our <span className="text-primary">Judges</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Industry leaders who have been where you are. They will evaluate your projects with fresh
            eyes and real-world experience.
          </p>
        </motion.div>

        {/* Judge grid */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
          {judges.map((judge, index) => {
            const hasBio = !!judge.bio;
            const inner = (
              <>
                <img
                  src={judge.img}
                  alt={judge.name}
                  width={128}
                  height={128}
                  loading="lazy"
                  className="rounded-full object-cover ring-1 ring-border transition-all duration-300 group-hover:ring-primary/60"
                  style={{ height: '8rem', width: '8rem' }}
                />
                <h3 className="mt-5 text-lg leading-snug">{judge.name}</h3>
                {judge.role && <p className="mt-1 text-sm text-muted-foreground">{judge.role}</p>}
                {judge.company && <p className="text-sm text-muted-foreground">{judge.company}</p>}
                {judge.track && (
                  <span className="mt-3 inline-block rounded-full border border-primary/30 px-3 py-1 text-xs text-primary">
                    {judge.track}
                  </span>
                )}
                {hasBio ? (
                  <span className="mt-3 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                    Read bio
                  </span>
                ) : (
                  !judge.role &&
                  !judge.company &&
                  !judge.track && <span className="mt-2 text-sm text-muted-foreground">Judge</span>
                )}
              </>
            );

            const props = {
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: '-40px' },
              transition: { duration: 0.4, delay: (index % 4) * 0.05 },
              className: 'group flex flex-col items-center text-center',
            } as const;

            return hasBio ? (
              <motion.button
                key={judge.name}
                {...props}
                onClick={() => setSelected(judge)}
                className={`${props.className} cursor-pointer`}
              >
                {inner}
              </motion.button>
            ) : (
              <motion.div key={judge.name} {...props}>
                {inner}
              </motion.div>
            );
          })}
        </div>

        {/* Bio modal */}
        <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
          <AnimatePresence>
            {selected && (
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
                          <img
                            src={selected.img}
                            alt={selected.name}
                            className="h-40 w-40 rounded-full object-cover ring-1 ring-border"
                          />
                        </div>

                        <div className="flex-1">
                          <Dialog.Title className="text-3xl">{selected.name}</Dialog.Title>
                          {selected.role && <p className="mt-1 text-primary">{selected.role}</p>}
                          {selected.company && (
                            <p className="text-sm text-muted-foreground">{selected.company}</p>
                          )}
                          {selected.track && (
                            <span className="mt-3 inline-block rounded-full border border-primary/30 px-3 py-1 text-xs text-primary">
                              {selected.track}
                            </span>
                          )}

                          <Dialog.Description className="mt-5 leading-relaxed text-muted-foreground">
                            {selected.bio}
                          </Dialog.Description>

                          {selected.linkedin && (
                            <a
                              href={selected.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-accent"
                            >
                              LinkedIn
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>

        {/* How judging works */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 max-w-3xl border-t border-border pt-12"
        >
          <h2 className="text-3xl">How judging works</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Judges evaluate projects on creativity, technical execution, impact, and presentation.
              They are looking for ideas that push boundaries and solve real problems.
            </p>
            <p>
              Do not stress about making it perfect. Focus on making it yours. The best projects come
              from genuine curiosity and clever problem-solving, not just polished demos.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
