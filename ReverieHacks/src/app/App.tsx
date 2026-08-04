import { RouterProvider } from 'react-router';
import { router } from './routes';

//Entry point for the app. This is where the router is initialized and rendered.

export default function App() {
  return <RouterProvider router={router} />;
}
