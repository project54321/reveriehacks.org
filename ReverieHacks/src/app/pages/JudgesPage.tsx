import { motion } from 'motion/react';

interface Judge {
  name: string;
  img: string;
  role?: string;
  company?: string;
  track?: string;
  linkedin?: string;
}

const judges: Judge[] = [
  { name: 'Mahendran Chinnaiah', role: 'Healthcare Software Architect', company: 'CVS', img: '/judges/mahendran.png', track: 'Datathon' },
  { name: 'Vaibhav Patel', role: 'AI Engineer', company: 'Abu Dhabi Investment Authority', img: '/judges/vaibhav.png', track: 'ML Prompt Engineering' },
  { name: 'Mantas Eringis', role: 'Software Engineer', company: 'Blockdaemon', img: '/judges/mantas.png', track: 'Embedded Systems' },
  { name: 'Sandeep Shivam', role: 'Associate Director, Product', company: 'Tavant', img: '/judges/sandeep.png', track: 'App Development' },
  { name: 'Pulkit Arya', role: 'Founding Engineer', company: 'Pointer', img: '/judges/pulkit.png', track: 'ML Prompt Engineering' },
  { name: 'Dmitrii Timoshenko', role: 'Applied Scientist', company: 'Amazon', img: '/judges/dimitrii.png', track: 'ML Prompt Engineering' },
  { name: 'Khush Patel', role: 'Founding Architect', company: 'Lyzr AI', img: '/judges/khush.png', track: 'Datathon', linkedin: 'https://patelkhush.com' },
  { name: 'Sunil Kumar', role: 'Principal Agile Practitioner', company: 'Bank of America', img: '/judges/sunil.png', track: 'Ideathon' },
  { name: 'Fahad Mehfooz', role: 'Founding AI Engineer', company: 'MenuData', img: '/judges/fahaz.png', track: 'Datathon' },
  { name: 'Jyoti Shah', role: 'Director of Application Development', company: 'ADP', img: '/judges/jyoti.png', track: 'Datathon' },
  { name: 'Anindita Bhowmick', role: 'Founder & CEO', company: 'Anibotix Robotics', img: '/judges/anindita.png', track: 'Ideathon' },
  { name: 'Jasmit Kaur', role: 'Technology Leader', company: 'ADP', img: '/judges/jasmit.png', track: 'Software Development' },
  { name: 'Mayur Jain', role: 'Senior Software Engineer', company: 'Bridgestone Americas', img: '/judges/mayur.png', track: 'Software Development', linkedin: 'https://www.linkedin.com/in/maayurjaain' },
  { name: 'Baron Henderson', role: 'Founder', company: 'Pedro Pathing', img: '/judges/baron.png', track: 'Software Development' },
  { name: 'Vidyasagar Palla', role: 'Senior Security Consultant', company: 'Ernst & Young', img: '/judges/vidyasagar.png', track: 'Ideathon' },
  { name: 'Anisha Yarlapati', role: 'Product Manager', company: 'Adobe', img: '/judges/anisha.png', track: 'Ideathon', linkedin: 'https://www.linkedin.com/in/anisha-yarlapati/' },
  { name: 'Hung Truong', role: 'Incoming Software Engineer', company: 'HubSpot', img: '/judges/hung.png', track: 'App Development', linkedin: 'https://www.linkedin.com/in/hungtk04' },
  { name: 'Udaya Bhaskar Vemuri', role: 'Application Security & DevSecOps', img: '/judges/udaya.png', track: 'Software Development', linkedin: 'https://www.linkedin.com/in/udayabhaskarv' },
  { name: 'Frank Chu', role: 'ML Engineering Manager', company: 'Meta', img: '/judges/frank.png', track: 'ML Prompt Engineering' },
  { name: 'Sai Kishan Naraparaju', role: 'Founder and CEO', company: 'TreeThirty', img: '/judges/sai.png', track: 'App Development', linkedin: 'https://www.linkedin.com/in/sai-kishannaraparaju' },
  { name: 'Volodymyr Lopukhovych', role: 'Lead Software Engineer', company: 'Disney Streaming', img: '/judges/volodymyr.png', track: 'Embedded Systems', linkedin: 'https://www.linkedin.com/in/lopukhovych/' },
  { name: 'Vasuki Vudathala', role:'Staff Performance Engineer', company: 'ServiceNow', img: '/judges/vasuki.png', track: 'Embedded Systems' },
  { name: 'Gayathri Chilukala', role: 'Software Engineer', company: 'Microsoft', img: '/judges/gayathri.png', track: 'App Development', linkedin: 'https://www.linkedin.com/in/gayathrichilukala/'},
  { name: 'Rishik Boddeti', role: 'CEO and Co-founder at Protoflow', company: 'Protoflow', img: '/judges/rishik.png', track: 'Embedded Systems', linkedin: 'https://www.linkedin.com/in/rishik-boddeti/' },
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
          {judges.map((judge, index) => {
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
                <h3 className="mt-5 text-lg leading-snug transition-colors group-hover:text-primary">
                  {judge.name}
                </h3>
                {judge.role && <p className="mt-1 text-sm text-muted-foreground">{judge.role}</p>}
                {judge.company && <p className="text-sm text-muted-foreground">{judge.company}</p>}
                {judge.track && (
                  <span className="mt-3 inline-block rounded-full border border-primary/30 px-3 py-1 text-xs text-primary">
                    {judge.track}
                  </span>
                )}
              </>
            );
            const props = {
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: '-40px' },
              transition: { duration: 0.4, delay: (index % 4) * 0.05 },
            };
            return judge.linkedin ? (
              <motion.a
                key={judge.name}
                {...props}
                href={judge.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex cursor-pointer flex-col items-center text-center"
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div
                key={judge.name}
                {...props}
                className="group flex flex-col items-center text-center"
              >
                {inner}
              </motion.div>
            );
          })}
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
