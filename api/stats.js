// GET /api/stats -> { participants, prizes, tracks, days, daysLeft, dateRange }
//
// This is the copy Vercel routes when the project's Root Directory is blank, so
// the build runs from the repository root. If Root Directory is "ReverieHacks"
// instead, this file is never deployed and ReverieHacks/api/stats.js serves the
// endpoint. Only one is ever live; the other is inert.
//
// Both share the implementation, so there is nothing to keep in sync but this
// import path.

import { statsResponse } from '../ReverieHacks/api/_devpost.js';

export const config = { runtime: 'edge' };

export default statsResponse;
