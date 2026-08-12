import { useEffect, useLayoutEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

// The prerenderer renders this component on the server, where useLayoutEffect
// isn't run and React warns about it.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function currentTheme(): Theme {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
  }
  return 'dark';
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  // Starts dark on both the server and the browser's first render so the
  // prerendered markup hydrates cleanly, then picks up whatever the inline
  // script in index.html already applied to <html> — before the browser paints,
  // so the wrong icon is never on screen.
  const [theme, setTheme] = useState<Theme>('dark');

  useIsomorphicLayoutEffect(() => setTheme(currentTheme()), []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      className={`flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
