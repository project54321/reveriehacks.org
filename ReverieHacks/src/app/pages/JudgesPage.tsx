import { motion,  } from 'motion/react';

interface Judge {
  name: string;
  role: string;
  company: string;
  img: string;
}

export function JudgesPage() {

    const judges = [
    { name: 'Mahendran Chinnaiah', role: 'Healthcare Software Architect', company: 'CVS', img: '/judges/mahendran.png' },
    { name: 'Vaibhav Patel', role: 'AI Engineer', company: 'Abu Dhabi Investment Authority', img: '/judges/vaibhav.png' },
    { name: 'Mantas Eringis', role: 'Software Engineer', company: 'Blockdaemon', img: '/judges/mantas.png' },
    { name: 'Sandeep Shivam', role: 'Associate Director of Product Management', company: 'Tavant', img: '/judges/sandeep.png' },
    { name: 'Pulkit Arya', role: 'Founding Engineer', company: 'Pointer', img: '/judges/pulkit.png' },
    { name: 'Dmitrii Timoshenko', role: 'Applied Scientist', company: 'Amazon', img: '/judges/dmitrii.png' },
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Meet Our Judges</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Industry leaders who've been where you are. They'll evaluate your projects with fresh eyes and real-world experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {judges.map((judge, index) => (
            <motion.button
              key={judge.name}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 bg-card border border-border rounded-2xl hover:border-primary transition-all h-full text-left cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />

              <div className="relative z-10">
                
                {/* REPLACED BLOCK */}
                <div className="w-full aspect-square rounded-xl mb-6 overflow-hidden relative">
                  <img
                    src={judge.img}
                    alt={judge.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-2">{judge.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{judge.role}</p>
                <p className="text-sm text-primary mb-3">{judge.company}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 max-w-3xl mx-auto"
        >
          <div className="p-10 bg-card/50 border border-border rounded-2xl">
            <h2 className="text-3xl font-bold mb-4 text-center">How Judging Works</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Our judges evaluate projects based on creativity, technical execution, impact, and presentation. They're looking for ideas that push boundaries and solve real problems.
              </p>
              <p>
                Don't stress about making it perfect—focus on making it yours. The best projects come from genuine passion and clever problem-solving, not just polished demos.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
