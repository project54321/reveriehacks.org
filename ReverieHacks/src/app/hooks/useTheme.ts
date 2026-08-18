import { useEffect, useState } from 'react';
export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document === 'undefined') return 'dark';
    return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
  });
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() => {
      const t = el.getAttribute('data-theme') as 'dark' | 'light' || 'dark';
      setTheme(t);
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onMedia = () => {
      if (!localStorage.getItem('theme')) setTheme(media.matches ? 'light' : 'dark');
    };
    media.addEventListener('change', onMedia);
    return () => { obs.disconnect(); media.removeEventListener('change', onMedia); };
  }, []);
  return theme;
}
