import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const container = document.getElementById("root")!;

// Routes are prerendered to static HTML at build time, so in production there is
// already markup to hydrate. A dev server (or a stale deploy without the
// prerender step) gets an empty container and a plain client render.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
