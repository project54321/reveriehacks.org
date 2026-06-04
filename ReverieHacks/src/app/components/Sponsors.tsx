import { motion } from 'motion/react';

export function Sponsors() {
  const sponsorTiers = [
    {
      tier: 'Platinum',
      sponsors: ['Sponsor 1', 'Sponsor 2'],
    },
    {
      tier: 'Gold',
      sponsors: ['Sponsor 3', 'Sponsor 4', 'Sponsor 5'],
    },
    {
      tier: 'Silver',
      sponsors: ['Sponsor 6', 'Sponsor 7', 'Sponsor 8', 'Sponsor 9'],
    },
  ];

  return (
    <section id="sponsors" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Sponsors</h2>
          <p className="text-muted-foreground">
            Powered by amazing organizations making this event possible
          </p>
        </motion.div>

        <div className="space-y-12">
          {sponsorTiers.map((tierData, tierIndex) => (
            <motion.div
              key={tierData.tier}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: tierIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-center mb-8 text-primary">
                {tierData.tier}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {tierData.sponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="p-8 bg-card border border-border rounded-xl hover:border-primary transition-all"
                  >
                    <div className="text-muted-foreground font-medium">{sponsor}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
