import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Seo } from '../components/Seo';
import { SiteBackground } from '../components/SiteBackground';

export function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change so pages always open at the hero.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Seo />
      <SiteBackground />
      <Navigation />
      <Outlet />
    </div>
  );
}
