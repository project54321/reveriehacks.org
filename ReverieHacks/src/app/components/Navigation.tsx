import { Link } from 'react-router';
import StaggeredMenu from './StaggeredMenu';

const navItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Sponsors', ariaLabel: 'View our sponsors', link: '/sponsors' },
  { label: 'Judges', ariaLabel: 'Meet our judges', link: '/judges' },
  { label: 'Staff', ariaLabel: 'Meet the team', link: '/team' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
  { label: 'Discord', link: 'https://discord.gg/gDQGYSQKrH' },
  { label: 'Instagram', link: 'https://www.instagram.com/reveriehacks' },
  { label: 'Devpost', link: 'https://reverie-hacks-2026.devpost.com/' },
  { label: 'Email', link: 'mailto:info@reveriehacks.org' },
];

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="ReverieHacks home">
      <img src="/image.png" alt="ReverieHacks logo" className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10" />
      <span className="font-wordmark text-[1.15rem] uppercase leading-[0.9] tracking-[0.08em]">
        <span className="block">Reverie</span>
        <span className="block text-primary">Hacks</span>
      </span>
    </Link>
  );
}

export function Navigation() {
  return (
    <StaggeredMenu
      position="right"
      items={navItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      logo={<Wordmark />}
      colors={['#8b5cf6', '#5227FF']}
      accentColor="#8b5cf6"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen={false}
    />
  );
}
