import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Judges', path: '/judges' },
  { name: 'Staff', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

const DISCORD_URL = 'https://discord.gg/gDQGYSQKrH';

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img src="/image.png" alt="ReverieHacks logo" className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10" />
      <span className="font-wordmark text-[1.15rem] uppercase leading-[0.9] tracking-[0.08em]">
        <span className="block">Reverie</span>
        <span className="block text-primary">Hacks</span>
      </span>
    </Link>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { const h = () => setScrolled(window.scrollY > 16); h(); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  const closeMobile = () => setMobileOpen(false);
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || mobileOpen ? 'border-b border-white/10 bg-[#09090c]/70 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Wordmark />
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} className={`relative py-1 text-sm tracking-wide transition-colors ${active ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                  {item.name}
                  {active && <motion.span layoutId="nav-underline" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary" />}
                </Link>
              );
            })}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium tracking-wide text-white/90 backdrop-blur transition-colors hover:bg-white/10 hover:text-white">Join Discord</a>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <button type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(v=>!v)} className="flex h-10 w-10 items-center justify-center text-white">
              {mobileOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden border-t border-white/10 bg-[#09090c]/95 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return <Link key={item.name} to={item.path} onClick={closeMobile} className={`border-b border-white/10 py-4 text-base tracking-wide transition-colors last:border-b-0 ${active ? 'text-primary' : 'text-white/60 hover:text-white'}`}>{item.name}</Link>;
              })}
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" onClick={closeMobile} className="mt-5 rounded-full border border-primary bg-primary/10 px-4 py-3 text-center text-base tracking-wide text-primary">Join Discord</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
