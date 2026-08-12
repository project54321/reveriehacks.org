// GET /api/countries -> { countries: [{ name, registrants, submitters }], totals }
//
// This is the copy Vercel routes when the project's Root Directory is set to
// "ReverieHacks". There is an identical entry point at the repository root for
// the case where Root Directory is blank; only one of the two is ever live, and
// the other is inert. Both share the implementation in ./_countries.js.

import { countriesResponse } from './_countries.js';

export const config = { runtime: 'edge' };

export default countriesResponse;
