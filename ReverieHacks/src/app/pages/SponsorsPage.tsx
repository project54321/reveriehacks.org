import { motion } from 'motion/react';

export function SponsorsPage() {
  const sponsorTiers = [
    {
      tier: 'Platinum',
      sponsors: ['Sponsor 1', 'Sponsor 2'],
      color: 'from-purple-400 to-violet-400',
    },
    {
      tier: 'Gold',
      sponsors: ['Sponsor 3', 'Sponsor 4', 'Sponsor 5'],
      color: 'from-purple-500 to-violet-500',
    },
    {
      tier: 'Silver',
      sponsors: ['Sponsor 6', 'Sponsor 7', 'Sponsor 8', 'Sponsor 9'],
      color: 'from-purple-600 to-violet-600',
    },
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Our Sponsors</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Huge shoutout to the amazing companies making this whole thing possible. We literally couldn't do this without them.
          </p>
        </motion.div>

        <div className="space-y-20">
          {sponsorTiers.map((tierData, tierIndex) => (
            <motion.div
              key={tierData.tier}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: tierIndex * 0.1 }}
            >
              <h2 className={`text-4xl font-bold text-center mb-10 bg-gradient-to-r ${tierData.color} bg-clip-text text-transparent`}>
                {tierData.tier} Tier
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {tierData.sponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: (tierIndex * 0.1) + (index * 0.05) }}
                    className="group p-12 bg-card border border-border rounded-2xl hover:border-primary transition-all min-w-[200px] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />
                    <div className="relative z-10 text-xl font-semibold text-muted-foreground text-center">{sponsor}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="p-12 bg-card/50 border border-border rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Want to sponsor?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Help us empower the next generation of builders. Get in touch to learn about sponsorship opportunities.
            </p>
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-medium shadow-lg shadow-purple-500/30">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
