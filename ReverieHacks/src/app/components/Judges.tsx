import { motion } from 'motion/react';

export function Judges() {
  const judges = [
    { name: 'Judge 1', role: 'Senior Software Engineer', company: 'Tech Co' },
    { name: 'Judge 2', role: 'Product Manager', company: 'Startup Inc' },
    { name: 'Judge 3', role: 'UX Designer', company: 'Design Studio' },
    { name: 'Judge 4', role: 'Tech Lead', company: 'BigTech' },
  ];

  return (
    <section id="judges" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Judges</h2>
          <p className="text-muted-foreground">
            Industry experts who will evaluate your incredible projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {judges.map((judge, index) => (
            <motion.div
              key={judge.name}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary transition-all"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-purple-600/20 to-purple-400/20 rounded-lg mb-4" />
              <h3 className="font-semibold mb-1">{judge.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{judge.role}</p>
              <p className="text-xs text-primary">{judge.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
