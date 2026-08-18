import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Seo } from '../components/Seo';
import GradientWaves from '../components/GradientWaves';

export function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change so pages always open at the hero.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <Seo />
      {/* Fixed full-viewport background: gradient waves on every page. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1.0}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={0.9}
          opacity={0.6}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
        />
      </div>
      <div className="relative z-10">
        <Navigation />
        <Outlet />
      </div>
    </div>
  );
}
