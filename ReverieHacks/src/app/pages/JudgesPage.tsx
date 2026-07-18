import { motion } from 'motion/react';

interface Judge {
  name: string;
  img: string;
  role?: string;
  company?: string;
  track?: string;
}

const judges: Judge[] = [
  { name: 'Mahendran Chinnaiah', role: 'Healthcare Software Architect', company: 'CVS', img: '/judges/mahendran.png' },
  { name: 'Vaibhav Patel', role: 'AI Engineer', company: 'Abu Dhabi Investment Authority', img: '/judges/vaibhav.png' },
  { name: 'Mantas Eringis', role: 'Software Engineer', company: 'Blockdaemon', img: '/judges/mantas.png' },
  { name: 'Sandeep Shivam', role: 'Associate Director, Product', company: 'Tavant', img: '/judges/sandeep.png' },
  { name: 'Pulkit Arya', role: 'Founding Engineer', company: 'Pointer', img: '/judges/pulkit.png' },
  { name: 'Dmitrii Timoshenko', role: 'Applied Scientist', company: 'Amazon', img: '/judges/dimitrii.png', track: 'AI/ML' },
  { name: 'Khush Patel', img: '/judges/khush.png', track: 'ML Prompt Engineering' },
  { name: 'Sunil Kumar', role: 'Principal Agile Practitioner', company: 'Bank of America', img: '/judges/sunil.png', track: 'Ideathon' },
  { name: 'Fahad Mehfooz', role: 'Founding AI Engineer', company: 'MenuData', img: '/judges/fahaz.png', track: 'Datathon' },
  { name: 'Krunal Patel', role: 'Senior Technical Program Manager', company: 'Applied Materials', img: '/judges/krunal.png', track: 'Embedded Systems' },
  { name: 'Jyoti Shah', role: 'Director of Application Development', company: 'ADP', img: '/judges/jyoti.png' },
  { name: 'Anindita Bhowmick', role: 'Founder & CEO', company: 'Anibotix Robotics', img: '/judges/anindita.png' },
  { name: 'Jasmit Kaur', role: 'Technology Leader', company: 'ADP', img: '/judges/jasmit.png' },
  { name: 'Mayur Jain', role: 'Senior Software Engineer', company: 'Bridgestone Americas', img: '/judges/mayur.png' },
];

export function JudgesPage() {
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
          {judges.map((judge, index) => (
            <motion.div
              key={judge.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
              className="group flex flex-col items-center text-center"
            >
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
            </motion.div>
          ))}
        </div>

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
