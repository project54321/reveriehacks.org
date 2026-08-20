import { motion } from 'motion/react';
import BorderGlow from '../components/BorderGlow';
import PixelCard from '../components/PixelCard';
import { ParticleHero } from '../components/ParticleHero';

interface Judge {
  name: string;
  img?: string;
  role?: string;
  company?: string;
  track?: string;
  linkedin?: string;
}

function initials(name: string) {
  return name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
}

const judges: Judge[] = [
  { name: 'Mahendran Chinnaiah', role: 'Healthcare Software Architect', company: 'CVS', img: '/judges/mahendran.png', track: 'Datathon', linkedin: 'https://www.linkedin.com/in/mahendranchinnaiah/' },
  { name: 'Vaibhav Patel', role: 'AI Engineer', company: 'Abu Dhabi Investment Authority', img: '/judges/vaibhav.png', track: 'ML Prompt Engineering', linkedin: 'https://www.linkedin.com/in/vaibhavp12345/' },
  { name: 'Mantas Eringis', role: 'Software Engineer', company: 'Blockdaemon', img: '/judges/mantas.png', track: 'Embedded Systems', linkedin: 'https://www.linkedin.com/in/mantaseringis' },
  { name: 'Sandeep Shivam', role: 'Associate Director, Product', company: 'Tavant', img: '/judges/sandeep.png', track: 'App Development', linkedin: 'https://www.linkedin.com/in/sandeep-shivam-51910232/'},
  { name: 'Pulkit Arya', role: 'Founding Engineer', company: 'Pointer', img: '/judges/pulkit.png', track: 'ML Prompt Engineering', linkedin: 'https://www.linkedin.com/in/pulkit-arya-037'},
  { name: 'Dmitrii Timoshenko', role: 'Applied Scientist', company: 'Amazon', img: '/judges/dimitrii.png', track: 'ML Prompt Engineering', linkedin: 'https://www.linkedin.com/in/dm-timoshenko/' },
  { name: 'Khush Patel', role: 'Founding Architect', company: 'Lyzr AI', img: '/judges/khush.png', track: 'Datathon', linkedin: 'https://www.linkedin.com/in/sunil-p-41b84b145/' },
  { name: 'Sunil Paidi', role: 'Principal Agile Practitioner', company: 'Bank of America', img: '/judges/sunil.png', track: 'Ideathon', linkedin: 'https://www.linkedin.com/in/sunil-Kumars'},
  { name: 'Fahad Mehfooz', role: 'Founding AI Engineer', company: 'MenuData', img: '/judges/fahaz.png', track: 'Datathon', linkedin: 'https://www.linkedin.com/in/fahadmehfooz'},
  { name: 'Jyoti Shah', role: 'Director of Application Development', company: 'ADP', img: '/judges/jyoti.png', track: 'Datathon', linkedin: 'https://www.linkedin.com/in/jyoti-shah-6a550817/' },
  { name: 'Anindita Bhowmick', role: 'Founder & CEO', company: 'Anibotix Robotics', img: '/judges/anindita.png', track: 'Ideathon', linkedin: 'https://www.linkedin.com/in/anindita-bhowmick-387449395/'},
  { name: 'Jasmit Kaur', role: 'Technology Leader', company: 'Meta', img: '/judges/jasmit.png', track: 'Software Development', linkedin: 'https://www.linkedin.com/in/jasmit-kaur-saluja' },
  { name: 'Mayur Jain', role: 'Senior Software Engineer', company: 'Bridgestone Americas', img: '/judges/mayur.png', track: 'Software Development', linkedin: 'https://www.linkedin.com/in/maayurjaain' },
  { name: 'Baron Henderson', role: 'Founder', company: 'Pedro Pathing', img: '/judges/baron.png', track: 'Software Development' },
  { name: 'Vidyasagar Palla', role: 'Senior Security Consultant', company: 'Ernst & Young', img: '/judges/vidyasagar.png', track: 'Ideathon', linkedin: 'https://www.linkedin.com/in/pallavidyasagar/'},
  { name: 'Anisha Yarlapati', role: 'Product Manager', company: 'Adobe', img: '/judges/anisha.png', track: 'Ideathon', linkedin: 'https://www.linkedin.com/in/anisha-yarlapati/' },
  { name: 'Hung Truong', role: 'Incoming Software Engineer', company: 'HubSpot', img: '/judges/hung.png', track: 'App Development', linkedin: 'https://www.linkedin.com/in/hungtk04' },
  { name: 'Udaya Bhaskar Vemuri', role: 'Application Security & DevSecOps', img: '/judges/udaya.png', track: 'Software Development', linkedin: 'https://www.linkedin.com/in/udayabhaskarv' },
  { name: 'Frank Chu', role: 'ML Engineering Manager', company: 'Meta', img: '/judges/frank.png', track: 'ML Prompt Engineering', linkedin: 'https://www.linkedin.com/in/haobing-frank-chu-4b38aba3/' },
  { name: 'Sai Kishan Naraparaju', role: 'Founder and CEO', company: 'TreeThirty', img: '/judges/sai.png', track: 'App Development', linkedin: 'https://www.linkedin.com/in/sai-kishannaraparaju' },
  { name: 'Volodymyr Lopukhovych', role: 'Lead Software Engineer', company: 'Disney Streaming', img: '/judges/volodymyr.png', track: 'Embedded Systems', linkedin: 'https://www.linkedin.com/in/lopukhovych/' },
  { name: 'Vasuki Vudathala', role: 'Staff Performance Engineer', company: 'ServiceNow', img: '/judges/vasuki.png', track: 'Embedded Systems', linkedin: 'https://www.linkedin.com/in/vasukiudaykiran/' },
  { name: 'Gayathri Chilukala', role: 'Software Engineer', company: 'Microsoft', img: '/judges/gayathri.png', track: 'App Development', linkedin: 'https://www.linkedin.com/in/gayathrichilukala/' },
  { name: 'Rishik Boddeti', role: 'CEO and Co-founder at Protoflow', company: 'Protoflow', img: '/judges/rishik.png', track: 'Embedded Systems', linkedin: 'https://www.linkedin.com/in/rishik-boddeti/' },
  { name: 'Keyao An', role: 'Senior Software Engineer', company: 'OpenAI', img: '/judges/keyao.png', track: 'ML Prompt Engineering', linkedin: 'https://www.linkedin.com/in/keyao-an-786656178'},
  { name: 'Gaurav Shah', role: 'Director Staff Engineer', company: 'Fidelity Investments', img: '/judges/gaurav.png', track: 'Datathon', linkedin: 'http://www.linkedin.com/in/gaurav-v-shah'},
  { name: 'Ian Ku', role: 'Founding Engineer', company: 'Archiboost AI', img: '/judges/ian.png', track: 'App Development', linkedin: 'https://www.linkedin.com/in/ian-ku-yi-sien/' },
  { name: 'Aditya Shrivastava', role: 'Software Engineer', company: 'Barclays', img: '/judges/aditya.png', track: 'Software Development', linkedin: 'https://linkedin.com/in/aditya-shrivastava30/'},
  { name: 'Akhil Sharma', role: 'Senior Software Developer', company: 'Meta', img: '/judges/akhil.png', track: 'Ideathon', linkedin: 'https://www.linkedin.com/in/akhil-sharma-sde/' },
  { name: 'Sanjuksha Nirgude', role: 'Autonomy Technical Lead', company: 'Nightingale Security', img: '/judges/sanjuksha.png', track: 'Embedded Systems', linkedin: 'https://www.linkedin.com/in/sanjuksha/' },
];

const trackOrder = ['Ideathon','ML Prompt Engineering','Software Development','Datathon','Embedded Systems','App Development'];

const bountyPanel: Judge[] = [
  { name: 'Michael Chinaloy', role: 'Engineering Manager', company: 'Coinbase', img: '/judges/micheal.png', linkedin: 'https://www.linkedin.com/in/michael-chinaloy/' },
  { name: 'Sanket Rege', role: 'Software Engineering Manager', company: 'EchoStar', img: '/judges/sanket.png', linkedin: 'https://www.linkedin.com/in/sanketrege' },
  { name: 'Ruide Zhu', role: 'Founding Engineer, Infrastructure & Research', company: 'Andromede AI', img: '/judges/ruide.png' },
  { name: 'Nilesh Dhage', role: 'Director, Product Management', company: 'Fidelity Investments', img: '/judges/nilesh.png' },
];

function JudgeCard({ person, index }: { person: Judge; index: number }) {
  const content = (
    <div className="absolute inset-0">
      {person.img ? (
        <img src={person.img} alt={person.name} loading="lazy" className="h-full w-full object-cover object-top" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted font-display text-3xl text-muted-foreground">{initials(person.name)}</div>
      )}
      {/* gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      {/* track pill */}
      {person.track && (
        <span className="absolute left-2 top-2 rounded-full bg-black/45 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
          {person.track}
        </span>
      )}
      {/* name + role on image */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="font-semibold leading-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] text-[13px] sm:text-[14px] line-clamp-1">{person.name}</h3>
        {person.role && <p className="mt-0.5 line-clamp-1 text-[11px] leading-tight text-white/75">{person.role}</p>}
        {person.company && <p className="text-[11px] font-medium text-primary-foreground/90 drop-shadow">{person.company}</p>}
      </div>
      {/* company badge bottom-right */}
      {person.company && (
        <span className="absolute right-2 top-2 hidden rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white shadow-md sm:block">
          {person.company}
        </span>
      )}
    </div>
  );

  const card = (
    <BorderGlow borderRadius={16} glowColor="270 90 70" colors={['#7c3aed','#8b5cf6','#1a0a2e']} backgroundColor="var(--card)" glowRadius={20} className="h-full">
      <PixelCard variant="default" colors="#8b5cf6,#a78bfa,#ede9fe" gap={6} speed={45} className="aspect-[3/4] h-auto min-h-[200px] w-full border-0 !rounded-[15px] sm:min-h-[240px]">
        {content}
      </PixelCard>
    </BorderGlow>
  );

  const motionProps = {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-40px' as const },
    transition: { duration: 0.45, delay: (index % 5) * 0.04, ease: [0.22,1,0.36,1] as any },
  };

  return person.linkedin ? (
    <motion.a {...motionProps} href={person.linkedin} target="_blank" rel="noreferrer" className="group block h-full">{card}</motion.a>
  ) : (
    <motion.div {...motionProps} className="group h-full">{card}</motion.div>
  );
}

export function JudgesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-6xl text-center">
          <ParticleHero text="Our Judges" />
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            Leaders from Meta, Amazon, Microsoft, OpenAI, Coinbase and more — 30 judges across 6 tracks, plus bounty panel.
          </p>
        </motion.div>

        <div className="mt-8 space-y-10 sm:mt-16 sm:space-y-16">
          {trackOrder.map((track) => {
            const group = judges.filter(j=>j.track===track);
            if (!group.length) return null;
            return (
              <div key={track}>
                <div className="mx-auto max-w-xl text-center border-b border-border/50 pb-3">
                  <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">{track}</h2>
                  <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{group.length} judges</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
                  {group.map((j,i)=><JudgeCard key={j.name} person={j} index={i}/>)}
                </div>
              </div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mt-14 overflow-hidden rounded-2xl border border-primary/20 bg-card p-4 shadow-sm sm:p-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <p className="eyebrow text-primary">Bounty panel</p>
          <h2 className="mt-2 font-display text-xl sm:text-2xl">Bonus points review</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {bountyPanel.map((p,i)=><JudgeCard key={p.name} person={p} index={i}/>)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
