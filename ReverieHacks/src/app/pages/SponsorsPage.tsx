import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  description: string;
  x: number;
  y: number;
}

const sponsorsData: Sponsor[] = [
  {
    id: 'featherless',
    name: 'Featherless',
    logo: '/sponsorLogos/fM.svg',
    url: 'https://featherless.ai',
    description: 'Providing seamless inference APIs and $300 in credits for developers pushing AI boundaries.',
    x: 22,
    y: 25,
  },
  {
    id: 'wolfram',
    name: 'Wolfram Corporate',
    logo: '/sponsorLogos/wolfram.png',
    url: 'https://www.wolfram.com',
    description: 'Empowering the next generation of innovators with Wolfram|One computational access ecosystems.',
    x: 78,
    y: 70,
  },
];

export function SponsorsPage() {
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 pt-32 pb-24 px-4 relative overflow-hidden flex flex-col items-center justify-center selection:bg-purple-500/30">
      
      {/* 1. Ambient High-Tech Backdrop Grid & Nebulas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f18471a_1px,transparent_1px),linear-gradient(to_bottom,#1f18471a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[130px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/15 blur-[100px] rounded-full" 
        />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header Titles */}
        <div className="text-center mb-12 select-none pointer-events-none">
          <span className="text-xs font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Partners & Sponsors
          </span>
          <h1 className="text-4xl md:text-8xl font-black tracking-tight mt-2 text-white">
            Our Network
          </h1>
        </div>

        {/* 2. Interactive Network Map Canvas */}
        <div className="relative w-full max-w-[1000px] h-[600px] md:h-[700px] bg-slate-950/40 border border-slate-800/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/10">
          
          {/* Dynamic SVG Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {sponsorsData.map((sponsor) => (
              <line
                key={`line-${sponsor.id}`}
                x1="50%"
                y1="50%"
                x2={`${sponsor.x}%`}
                y2={`${sponsor.y}%`}
                stroke="url(#lineGrad)"
                strokeWidth={hoveredSponsor === sponsor.id ? "2.5" : "1.5"}
                strokeDasharray={hoveredSponsor === sponsor.id ? "none" : "4 4"}
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* ================= CENTER NODE ================= */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-purple-600 to-indigo-700 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(147,51,234,0.35)] text-center p-2 border border-white/20 select-none"
            >
              <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
              <h2 className="text-sm md:text-lg font-black tracking-wider text-white">REVERIE</h2>
              <p className="text-[10px] uppercase tracking-widest text-purple-200 font-medium">Hacks</p>
            </motion.div>
          </div>

          {/* ================= FLOATING SPONSOR NODES ================= */}
          {sponsorsData.map((sponsor, index) => {
            const isHovered = hoveredSponsor === sponsor.id;
            const floatY = [0, index % 2 === 0 ? -6 : 6, 0];

            return (
              <motion.div
                key={sponsor.id}
                animate={isHovered ? { y: 0 } : { y: floatY }}
                transition={isHovered ? { type: 'tween', duration: 0 } : { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute origin-center -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${sponsor.x}%`, 
                  top: `${sponsor.y}%`,
                  zIndex: isHovered ? 50 : 30 
                }}
                onMouseEnter={() => setHoveredSponsor(sponsor.id)}
                onMouseLeave={() => setHoveredSponsor(null)}
              >
                {/* Unified outer block matched with enlarged circle dimensions */}
                <div className="relative flex items-center justify-center w-32 h-32">
                  <AnimatePresence initial={false} mode="popLayout">
                    {!isHovered ? (
                      /* BASE STATE: Default Unhovered Circle Node (Enlarged) */
                      <motion.div
                        key="circle"
                        layoutId={`card-${sponsor.id}`}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className="w-32 h-32 rounded-full bg-slate-900/90 border border-slate-800/80 backdrop-blur-md shadow-xl flex items-center justify-center cursor-pointer hover:border-purple-500/50 overflow-hidden p-6 group"
                      >
                        <img 
                          src={sponsor.logo} 
                          alt={`${sponsor.name} logo`}
                          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(168,85,247,0.25)] transition-transform duration-300 group-hover:scale-110"
                        />
                      </motion.div>
                    ) : (
                      /* HOVERED STATE: Clean, Expanded Glass Card */
                      <motion.div
                        key="expanded"
                        layoutId={`card-${sponsor.id}`}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className="absolute w-72 md:w-80 p-5 rounded-2xl bg-slate-950 border border-purple-500 shadow-2xl shadow-purple-500/10 backdrop-blur-xl flex flex-col text-left"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 p-2">
                            <img 
                              src={sponsor.logo} 
                              alt={`${sponsor.name} logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h3 className="font-bold text-white tracking-tight text-base">
                            {sponsor.name}
                          </h3>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.15 }}
                        >
                          <p className="text-xs text-slate-400 mb-3 leading-relaxed border-t border-slate-900 pt-2">
                            {sponsor.description}
                          </p>
                          {sponsor.url !== '#' && (
                            <a
                              href={sponsor.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition-colors group/link"
                            >
                              Explore Website
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                            </a>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

        </div>

        {/* Dynamic CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            Interested in joining the ecosystem?{' '}
            <a href="mailto:team@reveriehacks.com" className="text-purple-400 hover:text-purple-300 font-semibold underline-offset-4 hover:underline transition-all">
              Request Info Pack
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}