import { Outlet } from 'react-router';
import { Navigation } from '../components/Navigation';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Outlet />
    </div>
  );
}
