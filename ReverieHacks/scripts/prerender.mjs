// Turns the built SPA into one real HTML document per route.
//
// Runs after `vite build`, as the last step of `npm run build`. Without it the
// site ships a single empty <div id="root"> and every page shares one title, so
// anything that reads HTML without executing JavaScript — most AI crawlers, and
// any link preview — sees nothing at all.
//
// Each route gets: the fully rendered markup, its own title, description,
// canonical URL and Open Graph tags, schema.org JSON-LD, and the current
// Devpost and country figures inlined so the numbers are in the HTML itself.
// The browser still hydrates and still refreshes those figures live; this is
// the copy for everyone who never runs the script.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createServer } from 'vite';

import { scrapeDevpostStats } from '../api/_devpost.js';
import { scrapeCountryStats } from '../api/_countries.js';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');

const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const generatedAt = new Date().toISOString();

const vite = await createServer({
  root,
  logLevel: 'warn',
  server: { middlewareMode: true },
  appType: 'custom',
});

let written = 0;

try {
  const entry = await vite.ssrLoadModule('/src/prerender/entry.tsx');
  const { renderRoute, ROUTES, SITE_URL } = entry;

  // Live figures, or the values already committed to the repo. A hackathon site
  // that won't build because Devpost is having a bad afternoon is worse than
  // one showing figures from the last deploy — the browser corrects them the
  // moment anyone opens it.
  const stats = await attempt('Devpost', scrapeDevpostStats, entry.DEVPOST_FALLBACK);
  const countries = await attempt('country sheet', scrapeCountryStats, entry.COUNTRY_FALLBACK);

  // Read lazily by the data hooks on first render, and set again by the inline
  // <script> this writes into every page, so the browser starts from exactly
  // the figures baked into the markup.
  globalThis.__DEVPOST_STATS__ = { ...stats, generatedAt };
  globalThis.__COUNTRY_STATS__ = { ...countries, generatedAt };

  const seo = { stats, countries };

  for (const path of ROUTES) {
    const page = await renderRoute(path, seo);
    const file = path === '/' ? 'index.html' : `${path.slice(1)}/index.html`;
    const target = resolve(dist, file);

    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, compose(page));

    written++;
    console.log(`  ${path.padEnd(11)} ${file}`);
  }

  await writeFile(resolve(dist, 'sitemap.xml'), sitemap(ROUTES, SITE_URL));
  console.log(`  ${'sitemap'.padEnd(11)} sitemap.xml`);

  console.log(
    `\nprerendered ${written} routes with ` +
      `${stats.participants.toLocaleString('en-US')} participants and ` +
      `${countries.totals.countries} countries`,
  );
} finally {
  await vite.close();
}

// Last, and deliberately after vite.close(): closing the server re-fires the
// spa-fallback plugin's closeBundle, which copies the (now prerendered) home
// page over 404.html. Vercel serves this file for anything that matches no
// route, so it has to be the empty shell — a 404 that renders the homepage is a
// soft 404, and search engines treat it as duplicate content.
await writeFile(resolve(dist, '404.html'), notFound());
console.log(`  ${'404'.padEnd(11)} 404.html`);

function notFound() {
  const head = [
    '<title>Page not found — ReverieHacks</title>',
    meta('name', 'robots', 'noindex, follow'),
    meta('name', 'description', 'That page does not exist on reveriehacks.org.'),
  ].join('\n    ');

  return template
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/?>/, '')
    .replace(/\s*<meta\s+property="og:[\s\S]*?\/?>/g, '')
    .replace('</head>', `  ${head}\n  </head>`);
}

/** Slots the rendered route into the built template's shell. */
function compose(page) {
  const head = [
    `<title>${escapeHtml(page.title)}</title>`,
    meta('name', 'description', page.description),
    `<link rel="canonical" href="${escapeHtml(page.canonical)}"/>`,
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:url', page.canonical),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', 'ReverieHacks'),
    meta('property', 'og:image', `${origin(page.canonical)}/image.png`),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', page.description),
    meta('name', 'twitter:image', `${origin(page.canonical)}/image.png`),
    `<script type="application/ld+json" data-seo="jsonld">${inline(page.jsonLd)}</script>`,
    `<script>window.__DEVPOST_STATS__=${inline(globalThis.__DEVPOST_STATS__)};` +
      `window.__COUNTRY_STATS__=${inline(globalThis.__COUNTRY_STATS__)}</script>`,
  ].join('\n    ');

  return template
    // Drop the shell's generic title and social tags; every one of them is
    // replaced per route above, and leaving duplicates confuses crawlers.
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/?>/, '')
    .replace(/\s*<meta\s+property="og:[\s\S]*?\/?>/g, '')
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);
}

function meta(keyAttr, key, content) {
  return `<meta ${keyAttr}="${key}" content="${escapeHtml(content)}"/>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** JSON safe to sit inside a <script> element. */
function inline(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function origin(url) {
  return new URL(url).origin;
}

function sitemap(routes, siteUrl) {
  const today = generatedAt.slice(0, 10);

  const urls = routes
    .map((path) => {
      const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`;
      // The home and impact pages carry live figures, so they change daily;
      // the roster pages only move when someone edits them.
      const frequency = path === '/' || path === '/impact' ? 'daily' : 'monthly';
      const priority = path === '/' ? '1.0' : path === '/impact' ? '0.9' : '0.7';

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function attempt(label, run, snapshot) {
  try {
    return await run();
  } catch (error) {
    console.warn(`  ! ${label} unreachable (${error.message}); using the committed snapshot`);
    return snapshot;
  }
}
