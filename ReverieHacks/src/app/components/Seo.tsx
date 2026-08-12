import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { jsonLdFor, seoFor, OG_IMAGE, SITE_NAME } from '../seo/meta';
import { DEVPOST_FALLBACK, useDevpostStats } from '../hooks/useDevpostStats';
import { useCountryStats } from '../hooks/useCountryStats';

/**
 * Keeps the document head in step with the current route.
 *
 * The prerenderer already writes correct tags into every route's static HTML,
 * which is what crawlers read. This exists for the two cases that HTML can't
 * cover: client-side navigation between routes, and the live figures moving
 * after the page was built.
 */
export function Seo() {
  const { pathname } = useLocation();
  const { stats } = useDevpostStats();
  const { stats: countries } = useCountryStats();

  const resolved = stats ?? DEVPOST_FALLBACK;

  useEffect(() => {
    const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const input = { stats: resolved, countries };
    const { title, description, canonical } = seoFor(path, input);

    document.title = title;

    meta('name', 'description', description);
    meta('property', 'og:title', title);
    meta('property', 'og:description', description);
    meta('property', 'og:url', canonical);
    meta('property', 'og:image', OG_IMAGE);
    meta('property', 'og:site_name', SITE_NAME);
    meta('property', 'og:type', 'website');
    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', OG_IMAGE);

    link('canonical', canonical);

    structuredData(jsonLdFor(path, input));
  }, [pathname, resolved, countries]);

  return null;
}

function meta(keyAttr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${keyAttr}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(keyAttr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function link(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', href);
}

/**
 * Replaced wholesale rather than patched: the graph changes shape between
 * routes, so leaving the previous route's nodes behind would publish claims
 * about a page the reader is no longer on.
 */
function structuredData(graph: object[]) {
  for (const node of document.head.querySelectorAll('script[data-seo="jsonld"]')) {
    node.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.seo = 'jsonld';
  script.textContent = JSON.stringify(graph);
  document.head.appendChild(script);
}
