// Prints what /api/stats would currently return.
//
// Run this (npm run stats) if the landing page counters ever look wrong or fall
// back to their baked-in values — it exercises the exact same scraping code as
// the live endpoint, so a failure here means Devpost changed its markup and the
// patterns in api/_devpost.js need updating.

import { scrapeDevpostStats, HACKATHON_URL } from '../api/_devpost.js';

console.log(`Scraping ${HACKATHON_URL}\n`);

const stats = await scrapeDevpostStats();

const rows = [
  ['participants', stats.participants.toLocaleString('en-US')],
  ['prizes', `$${stats.prizes.toLocaleString('en-US')}`],
  ['tracks', stats.tracks],
  ['days', stats.days],
  ['daysLeft', stats.daysLeft],
  ['dateRange', stats.dateRange],
];

for (const [key, value] of rows) {
  const shown = value === null ? 'null  <- best-effort field did not parse' : value;
  console.log(`  ${key.padEnd(13)}${shown}`);
}

console.log('\nKeep the fallbacks in src/app/hooks/useDevpostStats.ts roughly in step.');
