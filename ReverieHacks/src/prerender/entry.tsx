/**
 * Server-side entry, loaded by scripts/prerender.mjs through Vite's SSR
 * pipeline. Never bundled into the browser build.
 */

// Exports functions and constants rather than components on purpose — nothing
// in this file is ever hot-reloaded, because nothing in it reaches a browser.
/* eslint-disable react-refresh/only-export-components */

import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { routeConfig } from '../app/routes';
import { jsonLdFor, seoFor, SITE_URL, type SeoInput } from '../app/seo/meta';

export { ROUTES, SITE_URL } from '../app/seo/meta';

// Re-exported so the prerender script can fall back to the committed snapshots
// without parsing TypeScript itself.
export { DEVPOST_FALLBACK } from '../app/hooks/useDevpostStats';
export { COUNTRY_FALLBACK } from '../app/data/countries-fallback';

export type RenderedRoute = {
  html: string;
  title: string;
  description: string;
  canonical: string;
  jsonLd: object[];
};

/**
 * Renders one route to markup, plus the head content that belongs with it.
 *
 * The live figures are read from globalThis rather than passed in, because
 * that's where the hooks look — the same code path the browser takes when it
 * reads the values this script inlines into the page.
 */
export async function renderRoute(path: string, seo: SeoInput): Promise<RenderedRoute> {
  const handler = createStaticHandler(routeConfig);
  const context = await handler.query(new Request(`${SITE_URL}${path}`));

  if (context instanceof Response) {
    throw new Error(`${path} redirected to ${context.headers.get('location')} instead of rendering`);
  }

  const router = createStaticRouter(routeConfig, context);
  const html = renderToString(<StaticRouterProvider router={router} context={context} />);

  return {
    html,
    ...seoFor(path, seo),
    jsonLd: jsonLdFor(path, seo),
  };
}
