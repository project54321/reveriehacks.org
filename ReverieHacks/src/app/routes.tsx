import type { RouteObject } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ImpactPage } from './pages/ImpactPage';
import { SponsorsPage } from './pages/SponsorsPage';
import { PrizesPage } from './pages/PrizesPage';
import { JudgesPage } from './pages/JudgesPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';

/**
 * Shared by the browser router below and by the build-time prerenderer in
 * scripts/prerender.mjs, which renders these same routes to static HTML so
 * crawlers get real markup instead of an empty <div id="root">.
 */
export const routeConfig: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'impact', Component: ImpactPage },
      { path: 'sponsors', Component: SponsorsPage },
      { path: 'prizes', Component: PrizesPage },
      { path: 'judges', Component: JudgesPage },
      { path: 'team', Component: TeamPage },
      { path: 'contact', Component: ContactPage },
    ],
  },
];
