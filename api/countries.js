// GET /api/countries -> { countries: [{ name, registrants, submitters }], totals }
//
// This is the copy Vercel routes when the project's Root Directory is blank, so
// the build runs from the repository root. If Root Directory is "ReverieHacks"
// instead, this file is never deployed and ReverieHacks/api/countries.js serves
// the endpoint. Only one is ever live; the other is inert.

import { countriesResponse } from '../ReverieHacks/api/_countries.js';

export const config = { runtime: 'edge' };

export default countriesResponse;
