# Project status — 2026-10-18

## Snapshot
**Name:** Family Matters (proposed)  
**Repository:** alexusar/Splitcare (public)  
**Current live product:** SplitCare proof of concept on GitHub Pages, root `index.html`.  
**Phase:** planning/design for multiuser expansion. No Supabase project or shared backend connected yet.

| Area | Current status | Evidence / gap |
| --- | --- | --- |
| GitHub Pages | Working by user confirmation | https://alexusar.github.io/Splitcare/ |
| Original AppleCare tracker | Implemented prototype | `index.html`; localStorage; no shared sync |
| Spin to Pay | Implemented prototype | Weighted client-side wheel; local, resettable, not server-enforced |
| Receipt upload | Implemented prototype | Saved in localStorage; no OCR or payment settlement validation |
| Manual payment confirmation | Implemented prototype | User confirmation step, not independent bank verification |
| Actual auth and invitations | **Not started** | No user accounts, sessions or role policies |
| Shared expense database | **Not started** | No DB or server-side transactions |
| Real credit ledger | **Not started** | Prototype recalculates from local statuses |
| Chores | **Not started** | Design only |
| Trips / calendar | **Not started** | Design only |
| Reminders | **Not started** | No scheduling or email integration |
| OCR checks | **Not started** | Planned with admin review; no OCR engine selected |
| Zelle/Venmo handoff | **Not started** | No verified payment recipient configured |
| Page mockups | **Design artifact** | `docs/mockups/index.html` |
| Automated tests + CI | **Not started** | TDD standard documented, not executed |

## Risks
1. Any visitor can download the publicly served page; current data is browser-local, not family-private server data. Anyone using a shared browser can access its local information.
2. Users on other phones have independent data. Wheel uniqueness and admin permissions require a backend.
3. Local receipt images can exhaust browser storage and may disappear if the user clears site data.
4. Screenshot OCR cannot establish funds settled; payment verification needs admin review.
5. Scope of family groups and transaction/credit edge cases not finalized.
6. Production deploy is currently a static public GitHub Pages site; private records must never be shipped in repository assets.

## Next recommended action
Review six-page mockups and confirm scope (one family vs multiple), then create M1 tickets: typed frontend shell, Supabase schema + RLS tests, invitations, and private storage. Do not migrate real receipts until M1 security checks pass.

## How to update this file
Change statuses only with a linked commit, acceptance tests, and observed deployment. Avoid optimistic percentages.
