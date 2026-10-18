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
| Automated tests + CI | **Initial foundation committed** | `src/payment-rules.mjs`, `tests/payment-rules.test.mjs`, `.github/workflows/domain-tests.yml`; 6 tests passed locally in working container; GitHub Actions result not yet confirmed |

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

## Progress update — 2026-10-18 (phone-friendly work)
- Created six pure-domain tests for weighted wheel slices, pending/confirmed credit, waivers, and duplicate records. All six passed in local Node.js 22 test execution.
- Pushed rule module, tests, and GitHub Actions test workflow to `main`. CI outcome is not yet verified.
- Created issues [#1](https://github.com/alexusar/Splitcare/issues/1) through [#5](https://github.com/alexusar/Splitcare/issues/5) for shared database/security, invites/login, wheel migration, reminders/payment handoff and OCR.
- The new module is **not yet wired to the live SplitCare site**. Server-side auth and spin uniqueness remain unimplemented.

## SplitCare dashboard prototype — 2026-10-18
- Added **separate** responsive [member/admin dashboard prototype](../prototypes/splitcare-dashboards/index.html) at `prototypes/splitcare-dashboards/index.html`. It includes role switching, member dues, admin approvals, credit/activity, payment submission demonstration, login and invitation preview.
- Does **not** modify the live root `index.html`; existing tracker remains intact.
- Mock screens use illustrative amounts and simulated interactions. No true authentication, saved user accounts, invitation delivery, server-side authorization, Zelle handoff or uploaded receipts. Do not use real credentials or personal receipts in demo forms.
- GitHub Pages publication and live browser interaction have **not** been independently verified; repository commit was confirmed.
