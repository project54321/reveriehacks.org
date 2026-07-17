import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Judges', path: '/judges' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

const DISCORD_URL = 'https://discord.gg/gDQGYSQKrH';

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src="/image.png"
        alt="ReverieHacks logo"
        className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
      />
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Wordmark />

          {/* Desktop links */}
          <div className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative py-1 text-sm tracking-wide transition-colors ${
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA + theme toggle */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-border px-5 py-2 text-sm tracking-wide transition-colors hover:border-primary hover:text-primary"
            >
              Join Discord
            </a>
          </div>

          {/* Mobile: theme toggle + menu */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center text-foreground"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMobile}
                    className={`border-b border-border py-4 text-base tracking-wide transition-colors last:border-b-0 ${
                      active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobile}
                className="mt-5 border border-primary px-4 py-3 text-center text-base tracking-wide text-primary"
              >
                Join Discord
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
