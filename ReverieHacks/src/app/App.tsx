import { createBrowserRouter, RouterProvider } from 'react-router';
import { routeConfig } from './routes';

// Entry point for the app. The router is created here rather than in routes.tsx
// because createBrowserRouter reaches for window.history the moment it runs, and
// routes.tsx is also imported by the build-time prerenderer, which has no DOM.
const router = createBrowserRouter(routeConfig);

export default function App() {
  return <RouterProvider router={router} />;
}
