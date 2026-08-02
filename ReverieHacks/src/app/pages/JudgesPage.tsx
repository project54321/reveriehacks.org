import { motion } from 'motion/react';

interface Judge {
  name: string;
  img?: string;
  role?: string;
  company?: string;
  track?: string;
  linkedin?: string;
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
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
  { name: 'Jasmit Kaur', role: 'Technology Leader', company: 'Meta', img: '/judges/jasmit.png', track: 'Software Development' },
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

// Order the track sections follow on the page (mirrors the tracks on the About page).
const trackOrder = [
  'Ideathon',
  'ML Prompt Engineering',
  'Software Development',
  'Datathon',
  'Embedded Systems',
  'App Development',
];

// Bounty System Panel: assess cross-track bounty submissions for bonus points.
const bountyPanel: Judge[] = [
  { name: 'Michael Chinaloy', role: 'Engineering Manager', company: 'Coinbase', img: '/judges/micheal.png', linkedin: 'https://www.linkedin.com/in/michael-chinaloy/' },
  { name: 'Sanket Rege', role: 'Software Engineering Manager', company: 'EchoStar', img: '/judges/sanket.png', linkedin: 'https://www.linkedin.com/in/sanketrege' },
  { name: 'Ruide Zhu', role: 'Founding Engineer, Infrastructure & Research', company: 'Andromede AI', img: '/judges/ruide.png' },
];

function PersonCard({ person, index }: { person: Judge; index: number }) {
  const inner = (
    <>
      {person.img ? (
        <img
          src={person.img}
          alt={person.name}
          width={128}
          height={128}
          loading="lazy"
          className="rounded-full object-cover ring-1 ring-border transition-all duration-300 group-hover:ring-primary/60"
          style={{ height: '8rem', width: '8rem' }}
        />
      ) : (
        <span
          className="flex items-center justify-center rounded-full bg-card font-display text-2xl text-muted-foreground ring-1 ring-border transition-all duration-300 group-hover:ring-primary/60"
          style={{ height: '8rem', width: '8rem' }}
        >
          {initials(person.name)}
        </span>
      )}
      <h3 className="mt-5 text-lg leading-snug transition-colors group-hover:text-primary">
        {person.name}
      </h3>
      {person.role && <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>}
      {person.company && <p className="text-sm text-muted-foreground">{person.company}</p>}
    </>
  );
  const props = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.4, delay: (index % 4) * 0.05 },
  };
  return person.linkedin ? (
    <motion.a
      {...props}
      href={person.linkedin}
      target="_blank"
      rel="noreferrer"
      className="group flex cursor-pointer flex-col items-center text-center"
    >
      {inner}
    </motion.a>
  ) : (
    <motion.div {...props} className="group flex flex-col items-center text-center">
      {inner}
    </motion.div>
  );
}

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

        {/* Judges, grouped by track */}
        <div className="mt-16 space-y-16">
          {trackOrder.map((track) => {
            const group = judges.filter((judge) => judge.track === track);
            if (!group.length) return null;
            return (
              <div key={track}>
                <div className="flex items-baseline justify-between border-b border-border pb-3">
                  <h2 className="text-2xl">{track}</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {group.length} {group.length === 1 ? 'judge' : 'judges'}
                  </span>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
                  {group.map((judge, index) => (
                    <PersonCard key={judge.name} person={judge} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bounty System Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 border-t border-border pt-12"
        >
          <p className="eyebrow text-muted-foreground">Bonus points</p>
          <h2 className="mt-4 text-3xl">
            Bounty System <span className="text-primary">Panel</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            This panel reviews bounty submissions, the optional add-ons contestants can build for
            bonus points, across every track and awards points accordingly.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
          {bountyPanel.map((person, index) => (
            <PersonCard key={person.name} person={person} index={index} />
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
