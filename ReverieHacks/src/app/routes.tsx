import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SponsorsPage } from './pages/SponsorsPage';
import { JudgesPage } from './pages/JudgesPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'sponsors', Component: SponsorsPage },
      { path: 'judges', Component: JudgesPage },
      { path: 'team', Component: TeamPage },
      { path: 'contact', Component: ContactPage },
    ],
  },
]);
